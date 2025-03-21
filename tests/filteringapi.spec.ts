import { test, expect } from '@playwright/test';
import FilteringApiEndpoint from '../api_requests/FilteringApiEndpoint';
import db from '../utils/Database';
import endpoint from '../config/endpoint';
import fiteringApiTestData from '../test-data/api-requests/filteringApiTestData.json';
import apivalidation from '../utils/ApiValidator';
import * as fs from 'fs';

let authToken;
const userName = process.env.USER_NAME_API;
const passWord = process.env.PASSWORD_API;

test.beforeAll(async ({ request }) => {
  const url = `${endpoint.tokenUrl}${endpoint.endpoints.login}`;
  const loginResponse = await request.post(url, {
    data: { email: userName, password: passWord }
  });

  // Ensure login is successful
  expect(loginResponse.ok()).toBeTruthy();
  const responseBody = await loginResponse.json();
  // Store token for later use
  authToken = responseBody.data.tokens.token;
});

// Write a test
test('Validation of Filter Api for Patients', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    let patientsData;
    let patient;
    const url = `${endpoint.baseUrl}`;
    const apiEndpoint = new FilteringApiEndpoint(url);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(1, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Api for Patients Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    // Validate the JSON schema
    const rawData = fs.readFileSync('schema/patientSchema.json', 'utf-8');
    const jsonSchema = JSON.parse(rawData);
    const validator = new apivalidation();
    const isValid = await validator.validateResponse(jsonSchema, responseBody);

    try {
      const patientId = `${fiteringApiTestData.patientId}`;
      patientsData = await db.query(`select patFirstName, patLastName, patPhoneNo, patAccountNo, patPriEmail from Patient where PATID= ${patientId}`);
      console.log(patientsData);
    } catch (error) {
      console.error('Database error:', error);
    } finally {
      await db.close();
    }

    if (patientsData.length > 0) {
      patient = patientsData[0];
    }
    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].patLastName).toBe(`${patient.patLastName}`);
    expect(responseBody.Data.dataObject[0].patFirstName).toBe(`${patient.patFirstName}`);
    expect(responseBody.Data.dataObject[0].patPhoneNo).toBe(`${patient.patPhoneNo}`);
    expect(responseBody.Data.dataObject[0].patAccountNo).toBe(`${patient.patAccountNo}`);
    expect(responseBody.Data.dataObject[0].patPriEmail).toBe(`${patient.patPriEmail}`);
    expect(isValid).toBe(true);
  });
});

test('Validation of Filter Api for Payers', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(2, header);
    const responseBody = await apiResponse.json();
    let payerData;
    let payer;

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for Payers Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    // Validate the JSON schema
    const rawData = fs.readFileSync('schema/payerSchema.json', 'utf-8');
    const jsonSchema = JSON.parse(rawData);
    const validator = new apivalidation();
    const isValid = await validator.validateResponse(jsonSchema, responseBody);

    try {
      const payId = `${fiteringApiTestData.payerId}`;
      payerData = await db.query(`select PayName, payInactive from payer where PayID=${payId}`);
      console.log(payerData);
    } catch (error) {
      console.error('Database error:', error);
    } finally {
      await db.close();
    }

    if (payerData.length > 0) {
      payer = payerData[0];
    }
    const payInactive = `${payer.payInactive}`;
    const bool = payInactive.toLowerCase() === "true";
    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].payName).toBe(`${payer.PayName}`);
    expect(responseBody.Data.dataObject[0].payInactive).toBe(bool);
    expect(isValid).toBe(true);
  });
});

test('Validation of Filter Api for Classification', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(3, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for Classification Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    // Validate the JSON schema
    const rawData = fs.readFileSync('schema/classficationSchema.json', 'utf-8');
    const jsonSchema = JSON.parse(rawData);
    const validator = new apivalidation();
    const isValid = await validator.validateResponse(jsonSchema, responseBody);

    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].patClassification).toBe("Allegheny General Hospital - VAD");
    expect(responseBody.Data.dataObject[1].patClassification).toBe("DR BROOKS");
    expect(responseBody.Data.dataObject[2].patClassification).toBe("GENERAL GROUP");
    expect(isValid).toBe(true);
  });
});

test('Validation of Filter Api for Claim Status', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(4, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for Classification Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    // Validate the JSON schema
    const rawData = fs.readFileSync('schema/claimstatusSchema.json', 'utf-8');
    const jsonSchema = JSON.parse(rawData);
    const validator = new apivalidation();
    const isValid = await validator.validateResponse(jsonSchema, responseBody);

    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].claStatus).toBe("Other");
    expect(responseBody.Data.dataObject[1].claStatus).toBe("Ready to Submit");
    expect(responseBody.Data.dataObject[2].claStatus).toBe("Submitted");
    expect(isValid).toBe(true);
  });
});

test('Validation of Filter Api for Phycian', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(5, header);
    const responseBody = await apiResponse.json();
    let PhycianData;
    let phycian;

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    // Validate the JSON schema
    const rawData = fs.readFileSync('schema/claimstatusSchema.json', 'utf-8');
    const jsonSchema = JSON.parse(rawData);
    const validator = new apivalidation();
    const isValid = await validator.validateResponse(jsonSchema, responseBody);

    try {
      const phyId = `${fiteringApiTestData.phyId}`;
      PhycianData = await db.query(`select phyName from Physician where phyID=${phyId}`);
      console.log(PhycianData);
    } catch (error) {
      console.error('Database error:', error);
    } finally {
      await db.close();
    }

    if (PhycianData.length > 0) {
      phycian = PhycianData[0];
    }

    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].phyName).toBe(`${phycian.phyName}`);
    expect(isValid).toBe(true);
  });
});

test('Validation of Filter Api for Claim Referring Provider', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(6, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].phyName).toBe("BLANK, ANDREW");
    expect(responseBody.Data.dataObject[0].phyID).toBe(64);
    expect(responseBody.Data.dataObject[1].phyName).toBe("REFERRING MIKE");
    expect(responseBody.Data.dataObject[1].phyID).toBe(4);
  });
});

test('Validation of Filter Api for Claim Rendering Provider', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(7, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].phyName).toBe("Bunin, Will");
    expect(responseBody.Data.dataObject[0].phyID).toBe(49);
    expect(responseBody.Data.dataObject[1].phyName).toBe("DOCTOR, TEST");
    expect(responseBody.Data.dataObject[1].phyID).toBe(65);
  });
});

test('Validation of Filter Api for Claim Billing Provider', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(8, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].phyName).toBe("Bella Care Physical Therapy Inc update");
    expect(responseBody.Data.dataObject[0].phyID).toBe(15);
    expect(responseBody.Data.dataObject[1].phyName).toBe("Bunin, Will");
    expect(responseBody.Data.dataObject[1].phyID).toBe(50);
  });
});

test('Validation of Filter Api for Claim Ordering Provider', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(9, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(200);
    expect(responseBody.Data.dataObject[0].phyName).toBe("Arun Date");
    expect(responseBody.Data.dataObject[0].phyID).toBe(20);
  });
});

test('Validation of Filter Api for Claim Operating Provider', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(10, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(200);
  });
});

test('Validation of Filter Api for Claim Attending Provider', async ({}, testInfo) => {
  await test.step('Filter Api successful case and response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(10, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(200);
  });
});

test('Validation of Filter Api for Invalid Filter Options', async ({}, testInfo) => {
  await test.step('Filter Api error case and 4xx response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(100, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(415);
  });
});

test('Validation of Filter Api for without passing Filter Options', async ({}, testInfo) => {
  await test.step('Filter Api error case and 4xx response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${authToken}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi("", header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(400);
  });
});

test('Validation of Filter Api for without passing Authentication Token', async ({}, testInfo) => {
  await test.step('Filter Api error case and 4xx response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer '' ` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(1, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(403);
    expect(responseBody.description).toBe('The supplied access credential could not be found.');
  });
});

test('Validation of Filter Api with Invalid Authentication Token', async ({}, testInfo) => {
  await test.step('Filter Api error case and 4xx response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const token = "111111111111111";
    const header = { "Authorization": `Bearer ${token}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(1, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(403);
    expect(responseBody.description).toBe('The supplied access credential could not be found.');
  });
});

test('Validation of Filter Api with Expired Authentication Token', async ({}, testInfo) => {
  await test.step('Filter Api error case and 4xx response validation', async () => {
    const apiEndpoint = new FilteringApiEndpoint(`${endpoint.baseUrl}`);
    const header = { "Authorization": `Bearer ${process.env.EXPIRED_TOKEN}` };
    const apiResponse = await apiEndpoint.getFilteringDetailsApi(1, header);
    const responseBody = await apiResponse.json();

    // ✅ Attach API response to Playwright report
    await testInfo.attach('Filter Api for ClaimStatus Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json'
    });

    expect(apiResponse.status).toBe(403);
    expect(responseBody.description).toBe('The supplied access credential could not be found.');
  });
});
