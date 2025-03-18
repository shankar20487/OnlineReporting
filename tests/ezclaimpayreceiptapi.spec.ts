import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import db from '../utils/Database';
import endpoint from '../config/endpoint';
import ezclaimpaymentReceipt from '../test-data/api-requests/ezclaimpaymentreceipt.json'
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
test('Validation of Ezclaim Pay receipts Api for Particular patient', async ({},testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase1.startDate;
        const endDate = ezclaimpaymentReceipt.testcase1.endDate;
        const patientId = ezclaimpaymentReceipt.testcase1.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}`}
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate,endDate,patientId);
        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const responseBody= await apiResponse.json();
        console.log(responseBody);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Api for EzClaim Pay Receipt', {
            body: JSON.stringify(responseBody, null, 2),
            contentType: 'application/json'
        }); 

        //validate the json schema
        const rawData = fs.readFileSync('schema/ezclaimpayreceiptSchema.json', 'utf-8');
        const jsonSchema = JSON.parse(rawData); 
        const validator = new apivalidation();
        const isValid = await validator.validateResponse(jsonSchema, responseBody);

        expect(apiResponse.status).toBe(200);
        expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Mastercard")
        expect(responseBody.Data.dataObject[0].transactions[0].transactionID).toBe("2166302950")
        expect(responseBody.Data.dataObject[0].transactions[0].amount).toBe(124.23)
        expect(isValid).toBeTruthy();
     
    });
})

test('Validation of Ezclaim Pay receipts Api Without passing start date ,End date and patientID', async ({},testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}`}
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload('','');
        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const responseBody= await apiResponse.json();
        console.log(responseBody);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Api for EzClaim Pay Receipt', {
            body: JSON.stringify(responseBody, null, 2),
            contentType: 'application/json'
        }); 

        expect(apiResponse.status).toBe(200);
        expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Mastercard")
        expect(responseBody.Data.dataObject[0].transactions[0].amount).toBe(44)
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With particular patientID and start and end date', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase2.startDate;
        const endDate = ezclaimpaymentReceipt.testcase2.endDate;
        const patientId = ezclaimpaymentReceipt.testcase2.patientId; 
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId);
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Mastercard");
        expect(responseBody.Data.dataObject[0].transactions[0].transactionID).toBe("2166302950");
        expect(responseBody.Data.dataObject[0].transactions[0].amount).toBe(124.23);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With particular Date Range', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase3.startDate;
        const endDate = ezclaimpaymentReceipt.testcase3.endDate;
        const patientId = ezclaimpaymentReceipt.testcase3.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId);
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
        expect(responseBody.Data.dataObject[0].transactions).toHaveLength(5);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With payment method Master Card', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase4.startDate;
        const endDate = ezclaimpaymentReceipt.testcase4.endDate;
        const patientId = ezclaimpaymentReceipt.testcase4.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "Mastercard");
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Mastercard");
        expect(responseBody.Data.dataObject[0].transactions).toHaveLength(114);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With payment method Visa', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase5.startDate;
        const endDate = ezclaimpaymentReceipt.testcase5.endDate;
        const patientId = ezclaimpaymentReceipt.testcase5.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "Visa");
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Visa");
        expect(responseBody.Data.dataObject[0].transactions).toHaveLength(1);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With payment method OP CC', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase6.startDate;
        const endDate = ezclaimpaymentReceipt.testcase6.endDate;
        const patientId = ezclaimpaymentReceipt.testcase6.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "OP CC");
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("OP CC");
        expect(responseBody.Data.dataObject[0].transactions).toHaveLength(11);
     
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With multiple payment method', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const payload = {
          reportId: 'EZR-8',
          options: {
              message: '',
              sortby: 'patientName',
              patient: [5685],
              paymentMethod: ["Cash","Mastercard","Visa","OP CC"],
              paymentRef: '',
              paymentAdditionalRef: '',
              usePatientBillingAddress: false,
              paymentDate: { startDate: '', endDate: '' },
              paymentEnteredDate: { startDate: '', endDate: '' }
          }
      };
        
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`EZCLAIM MEDICAL BILLING SOFTWARE EZCLAIM`);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`337 S MAIN STREET  ROCHESTER, MI 48307`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Mastercard");
        expect(responseBody.Data.dataObject[0].transactions).toHaveLength(132);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With sortBy patientId', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase7.startDate;
        const endDate = ezclaimpaymentReceipt.testcase7.endDate;
        const patientId = undefined;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
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

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With sortBy patientId and phyName', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase8.startDate;
        const endDate = ezclaimpaymentReceipt.testcase8.endDate;
        const patientId = undefined;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patId,phyName", "");
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
        expect(responseBody.Data.dataObject[0].patId).toBe(1)
        expect(responseBody.Data.dataObject[1].patId).toBe(3)
        expect(responseBody.Data.dataObject[2].patId).toBe(8)
       
    });
});

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With sortBy phyId and phyName', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase9.startDate;
        const endDate = ezclaimpaymentReceipt.testcase9.endDate;
        const patientId = undefined;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "phyId,phyName", "");
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
        expect(responseBody.Data.dataObject[0].phyId).toBe(0);
      
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With sortBy patId, patientName and phyName', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase10.startDate;
        const endDate = ezclaimpaymentReceipt.testcase10.endDate;
        const patientId = undefined;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patId,patientName,phyName", "");
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
        expect(responseBody.Data.dataObject[0].phyId).toBe(6);
        expect(responseBody.Data.dataObject[0].patId).toBe(1);
     
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api for Multiple patients', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const payload = {
            reportId: 'EZR-8',
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

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With Last Four Digit', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase11.startDate;
        const endDate = ezclaimpaymentReceipt.testcase11.endDate;
        const patientId = ezclaimpaymentReceipt.testcase11.patientId;
        const transactionID = "2149708444";
        const lastFourDigit = "5454";
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "", "", lastFourDigit);
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
        expect(responseBody.Data.dataObject[0].phyId).toBe(66);
        expect(responseBody.Data.dataObject[0].transactions[0].accountLast4).toContain(lastFourDigit);
     
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api With Transaction ID', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase12.startDate;
        const endDate = ezclaimpaymentReceipt.testcase12.endDate;
        const patientId = ezclaimpaymentReceipt.testcase12.patientId;
        const transactionID = "2149708444";
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "", transactionID);
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
        expect(responseBody.Data.dataObject[0].phyId).toBe(66);
        expect(responseBody.Data.dataObject[0].transactions[0].transactionID).toContain(transactionID);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api Without passing the end date', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts Successful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase13.startDate;
        const endDate = ezclaimpaymentReceipt.testcase13.endDate;
        const patientId = ezclaimpaymentReceipt.testcase13.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Mastercard");
        expect(responseBody.Data.dataObject[0].transactions[0].transactionID).toBe("2166302950");
        expect(responseBody.Data.dataObject[0].transactions[0].amount).toBe(124.23);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api Without passing the start date', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase14.startDate;
        const endDate = ezclaimpaymentReceipt.testcase14.endDate;
        const patientId = ezclaimpaymentReceipt.testcase14.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
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
        expect(responseBody.Data.dataObject[0].phyName).toBe(`HEALTH CLINIC `);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(`100 MAIN STREET SUITE 200 ROCHESTER, MI 555554444`);
        expect(responseBody.Data.dataObject[0].transactions[0].paymentMethod).toBe("Mastercard");
        expect(responseBody.Data.dataObject[0].transactions[0].transactionID).toBe("2166302950");
        expect(responseBody.Data.dataObject[0].transactions[0].amount).toBe(124.23);
        
        //expect(isValid).toBe(true);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api While wrong sortby parameter', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts Negative case', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase15.startDate;
        const endDate = ezclaimpaymentReceipt.testcase15.endDate;
        const patientId = ezclaimpaymentReceipt.testcase15.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
        const header = { "Authorization": `Bearer ${authToken}` };
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patient", "");
        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header, payload);
        const responseBody = await apiResponse.json();
        console.log(responseBody);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Api for EzClaim Pay Receipt', {
            body: JSON.stringify(responseBody, null, 2),
            contentType: 'application/json'
        }); 

        expect(apiResponse.status).toBe(415);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api While patients Not Present', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts Negative case', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase16.startDate;
        const endDate = ezclaimpaymentReceipt.testcase16.endDate;
        const patientId = ezclaimpaymentReceipt.testcase16.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
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

// ...existing code...

test('Validation of Ezclaim Pay receipts Api While passing the wrong start date', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts Successful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase17.startDate;
        const endDate = ezclaimpaymentReceipt.testcase17.endDate;
        const patientId = ezclaimpaymentReceipt.testcase17.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
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

        expect(apiResponse.status).toBe(415);
    });
})

// ...existing code...

test('Validation of Ezclaim Pay receipts Api While passing the wrong end date', async ({}, testInfo) => {
    await test.step('Ezclaim Pay receipts Successful case and response validation', async () => {
        const url = `${endpoint.baseUrl}`;
        const startDate = ezclaimpaymentReceipt.testcase18.startDate;
        const endDate = ezclaimpaymentReceipt.testcase18.endDate;
        const patientId = ezclaimpaymentReceipt.testcase18.patientId;
        const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-8');
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

        expect(apiResponse.status).toBe(415);
    });
})









