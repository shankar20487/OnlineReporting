import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import db from '../utils/Database';
import endpoint from '../config/endpoint';
import fiteringApiTestData from '../test-data/api-requests/filteringApiTestData.json'
import apivalidation from '../utils/ApiValidator';
import * as fs from 'fs';


let authToken; 
const userName = process.env.USER_NAME_API;
const passWord = process.env.PASSWORD_API;


test.beforeAll(async ({ request }) => {
    const url =  `${endpoint.tokenUrl}${endpoint.endpoints.login}`;
    const loginResponse = await request.post(url, {
        data: { email: userName , password: passWord}
    });
    
    // Ensure login is successful
    expect(loginResponse.ok()).toBeTruthy(); 
    const responseBody = await loginResponse.json();
    // Store token for later use
    authToken = responseBody.data.tokens.token; 
    
})

// Write a test
test('Validation of Patient receipts Api for Particular patient', async ({},testInfo) => {
     await test.step('Patient receipts Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const startDate ='2015-01-31'
        const endDate = '2025-01-31'
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-15');
        const header = { "Authorization": `Bearer ${authToken}`}
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate,endDate,14975);
        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const responseBody= await apiResponse.json();
        console.log(responseBody);
       
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Patient receipts Api', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json'
        }); 

        //validate the json schema
        //const rawData = fs.readFileSync('schema/patientSchema.json', 'utf-8');
        //const jsonSchema = JSON.parse(rawData); 
        //const validator = new apivalidation();
        //const isValid = await validator.validateResponse(jsonSchema,responseBody);

       
        expect(apiResponse.status).toBe(200);
        expect(responseBody.Data.dataObject[0].phyId).toBe(6);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
        expect(responseBody.Data.dataObject[0].ledgers[0].paymentMethod).toBe("Mastercard")

        
        //expect(isValid).toBe(true);

        
    });
})

test('Validation of Patient Pay receipts Api Without passing start date ,End date and patientID', async ({},testInfo) => {
   await test.step(' Patient Pay receipts sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const startDate ='2015-01-31'
       const endDate = '2025-01-31'
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload('','');
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`Nurse Easy`);
       expect(responseBody.Data.dataObject[0].patientName).toBe("Westen, Michael")
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentAmount).toBe(55)
   });
})

test('Validation of Patient Pay receipts Api With particular patientID and start and end date', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, 14975);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentAmount).toBe(124.23);
       expect(responseBody.Data.dataObject[0].ledgers[0].subLedgers[0].appliedCharges).toBe(124.23);
   });
})

test('Validation of patient Pay receipts Api With particular Date Range', async ({}, testInfo) => {
   await test.step('patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2024-01-31';
       const endDate = '2025-01-31';
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, 5685);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
       expect(responseBody.Data.dataObject[0].ledgers).toHaveLength(2);
   });
})


test('Validation of Patient Pay receipts Api With payment method Master Card', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, 5685, "patientName", "Mastercard");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentMethod).toBe("Mastercard");
       expect(responseBody.Data.dataObject[0].ledgers).toHaveLength(114);
   });
})

test('Validation of Patient Pay receipts Api With payment method Visa', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, 5685, "patientName", "Visa");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentMethod).toBe("Visa");
       expect(responseBody.Data.dataObject[0].ledgers).toHaveLength(1);
   });
})

test('Validation of Patient Pay receipts Api With payment method Cash', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, 5685, "patientName", "Cash");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentMethod).toBe("CASH");
       expect(responseBody.Data.dataObject[0].ledgers).toHaveLength(1);
   });
})

test('Validation of Patient Pay receipts Api With sortBy patientId', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const patientId = undefined;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patId", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for EzClaim Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].patId).toBe(1);
       expect(responseBody.Data.dataObject[1].patId).toBe(3);
       expect(responseBody.Data.dataObject[2].patId).toBe(8);
     
   });
})


test('Validation of Patient Pay receipts Api With sortBy patientName,paymentDate', async ({}, testInfo) => {
   await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const patientId = undefined;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName,paymentDate", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for EzClaim Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].patId).toBe(5685)
       expect(responseBody.Data.dataObject[1].patId).toBe(16439)
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentAmount).toBe(203)
      
   });
});

test('Validation of Patient Pay receipts Api for Multiple patients', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const payload = {
           reportId: 'EZR-15',
           options: {
               message: '',
               sortby: 'patientName',
               patient: [14975, 5685],
               paymentMethod: [],
               paymentRef: '',
               paymentAdditionalRef: '',
               usePatientBillingAddress: false,
               paymentDate: { startDate: '', endDate: '' },
               paymentEnteredDate: { startDate: '', endDate: '' }
           }
       };
       console.log(payload);
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
       const header = { "Authorization": `Bearer ${authToken}` };
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for EzClaim Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);

   });
})

test('Validation of Patient Pay receipts Api With Aditional Payment Reference', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const patientId = 5685;
       const transactionID = "2149708444";
       const lastFourDigit = "...";
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "", "", lastFourDigit);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 


       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyId).toBe(66);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentMethod).toBe("Mastercard");
    
   });
})

test('Validation of Patient receipts Api With Payment Ref', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '2025-01-31';
       const patientId = 5685;
       const transactionID = "2149708444";
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "", transactionID);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyId).toBe(66);
       expect(responseBody.Data.dataObject[0].ledgers[0].reff).toContain(transactionID);
   });
})


test('Validation of Patient Pay receipts Api Without passing the end date', async ({}, testInfo) => {
   await test.step('patient Pay receipts Successful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-31';
       const endDate = '';
       const patientId = 14975;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentMethod).toBe("Mastercard");
       expect(responseBody.Data.dataObject[0].totalPayment).toBe(124.23);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentAmount).toBe(124.23);
   });
})

test('Validation of Patient Pay receipts Api Without passing the start date', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '';
       const endDate = '2025-03-31';
       const patientId = 14975;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentMethod).toBe("Mastercard");
       expect(responseBody.Data.dataObject[0].ledgers[0].paymentAmount).toBe(124.23);
       
       //expect(isValid).toBe(true);
   });
})

test('Validation of Patient Pay receipts Api While wrong sortby parameter', async ({}, testInfo) => {
   await test.step('Patient Pay receipts Negative case', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '';
       const endDate = '2025-03-31';
       const patientId = 14975;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patient", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(415);
   });
})

test('Validation of Patient Pay receipts Api While patients Not Present', async ({}, testInfo) => {
   await test.step('Patient Pay receipts Negative case', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '';
       const endDate = '2025-03-31';
       const patientId = 12345;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for EzClaim Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
   });
})

test('Validation of Patient Pay receipts Api While passing the wrong start date', async ({}, testInfo) => {
   await test.step('Patient Pay receipts Successful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021';
       const endDate = '';
       const patientId = 14975;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(415);
   });
})

test('Validation of Patient Pay receipts Api While passing the wrong end date', async ({}, testInfo) => {
   await test.step('Patient Pay receipts Successful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = '2021-01-20';
       const endDate = '2022';
       const patientId = 14975;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header, payload);
       const responseBody = await apiResponse.json();
       console.log(responseBody);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Api for Patient Pay Receipt', {
           body: JSON.stringify(responseBody, null, 2),
           contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(415);
   });
})
