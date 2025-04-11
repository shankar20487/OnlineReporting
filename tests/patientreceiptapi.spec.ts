import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import db from '../utils/Database';
import endpoint from '../config/endpoint';
import patientReceipt from '../test-data/api-requests/patientreceipt.json'
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
        const startDate = patientReceipt.testcase1.startDate;
        const endDate = patientReceipt.testcase1.endDate;
        const patientId = patientReceipt.testcase1.patientId;
        const phyId = patientReceipt.testcase1.phyId;
        const phyAddress = patientReceipt.testcase1.phyAddress;
        const paymentMethod = patientReceipt.testcase1.paymentMethod;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-15');
        const header = { "Authorization": `Bearer ${authToken}`}
        const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate,endDate,patientId);
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
        const rawData = fs.readFileSync('schema/patientreceiptSchema.json', 'utf-8');
        const jsonSchema = JSON.parse(rawData); 
        const validator = new apivalidation();
        const isValid = await validator.validateResponse(jsonSchema,responseBody);

       
        expect(apiResponse.status).toBe(200);
        expect(responseBody.Data.dataObject[0].phyId).toBe(phyId);
        expect(responseBody.Data.dataObject[0].phyAddress).toBe(phyAddress);
        expect(responseBody.Data.dataObject[0].receipts[0].paymentMethod).toBe(paymentMethod);
        expect(responseBody.Data.dataObject).toHaveLength(1);
        expect(isValid).toBe(true);
        
    });
})

test('Validation of Patient Pay receipts Api Without passing start date ,End date and patientID', async ({},testInfo) => {
   await test.step(' Patient Pay receipts sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const phyName = patientReceipt.testcase2.PhyName;
        const patientName = patientReceipt.testcase2.patientName;
        const paymentAmount = patientReceipt.testcase2.paymentAmount;
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
       expect(responseBody.Data.dataObject[0].phyName).toBe(phyName);
       expect(responseBody.Data.dataObject[0].patientName).toBe(patientName)
       expect(responseBody.Data.dataObject[0].receipts[0].paymentAmount).toBe(paymentAmount)
   });
})

test('Validation of Patient Pay receipts Api With particular patientID and start and end date', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase3.startDate;
       const endDate = patientReceipt.testcase3.endDate;
       const patientId = patientReceipt.testcase3.patientId;
       const phyName = patientReceipt.testcase3.PhyName;
       const phyAddress = patientReceipt.testcase3.phyAddress;
       const amount = patientReceipt.testcase3.paymentAmount;   
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId);
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
       expect(responseBody.Data.dataObject[0].phyName).toBe(phyName);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(phyAddress);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentAmount).toBe(amount);
     
   });
})

test('Validation of patient Pay receipts Api With particular Date Range', async ({}, testInfo) => {
   await test.step('patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase4.startDate;
       const endDate = patientReceipt.testcase4.endDate;
       const patientId = patientReceipt.testcase4.patientId;
       const phyName = patientReceipt.testcase4.PhyName;
       const phyadd = patientReceipt.testcase4.phyAddress;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId);
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
       expect(responseBody.Data.dataObject[0].phyName).toBe(phyName);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(phyadd);
       expect(responseBody.Data.dataObject[0].receipts).toHaveLength(4);
   });
})


test('Validation of Patient Pay receipts Api With payment method Master Card', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase5.startDate;
        const endDate = patientReceipt.testcase5.endDate;
        const patientId = patientReceipt.testcase5.patientId;
        const phyName= patientReceipt.testcase5.PhyName;
        const phyAddress = patientReceipt.testcase5.phyAddress;
        const paymentMethod = patientReceipt.testcase5.paymentMethod;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", paymentMethod);
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
       expect(responseBody.Data.dataObject[0].phyName).toBe(phyName);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(phyAddress);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentMethod).toBe(paymentMethod);
       expect(responseBody.Data.dataObject[0].receipts).toHaveLength(229);
   });
})

test('Validation of Patient Pay receipts Api With payment method Visa', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase6.startDate;
       const endDate = patientReceipt.testcase6.endDate;
       const patientId = patientReceipt.testcase6.patientId;
       const phyName= patientReceipt.testcase6.PhyName;
       const phyAddress = patientReceipt.testcase6.phyAddress;
       const paymentMethod = patientReceipt.testcase6.paymentMethod;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", paymentMethod);
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
       expect(responseBody.Data.dataObject[0].phyName).toBe(phyName);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(phyAddress);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentMethod).toBe(paymentMethod);
       expect(responseBody.Data.dataObject[0].receipts).toHaveLength(2);
   });
})

test('Validation of Patient Pay receipts Api With payment method Cash', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase7.startDate;
       const endDate = patientReceipt.testcase7.endDate;
       const patientId = patientReceipt.testcase7.patientId;
       const phyName= patientReceipt.testcase7.PhyName;
       const phyAddress = patientReceipt.testcase7.phyAddress;
       const paymentMethod = patientReceipt.testcase7.paymentMethod;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", paymentMethod);
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
       expect(responseBody.Data.dataObject[0].phyName).toBe(phyName);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(phyAddress);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentMethod).toBe(paymentMethod);
       expect(responseBody.Data.dataObject[0].receipts).toHaveLength(2);
   });
})

test('Validation of Patient Pay receipts Api With sortBy patientId', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase8.startDate;
       const endDate = patientReceipt.testcase8.endDate;
       const patientId = undefined;
       const patientId1 = patientReceipt.testcase8.patientId1;
        const patientId2 = patientReceipt.testcase8.patientId2;
     const patientId3 = patientReceipt.testcase8.patientId3;
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
       expect(responseBody.Data.dataObject[0].patId).toBe(patientId1);
       expect(responseBody.Data.dataObject[1].patId).toBe(patientId2);
       expect(responseBody.Data.dataObject[2].patId).toBe(patientId3);
     
   });
})


test('Validation of Patient Pay receipts Api With sortBy patientName,paymentDate', async ({}, testInfo) => {
   await test.step('Ezclaim Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase9.startDate;
       const endDate = patientReceipt.testcase9.endDate;
       const patientId1 = patientReceipt.testcase9.patientId1;
       const patientId2 = patientReceipt.testcase9.patientId2;
       const amount = patientReceipt.testcase9.paymentAmount;
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
       expect(responseBody.Data.dataObject[0].patId).toBe(patientId1)
       expect(responseBody.Data.dataObject[1].patId).toBe(patientId2)
       expect(responseBody.Data.dataObject[0].receipts[0].paymentAmount).toBe(amount)
      
   });
});


test('Validation of Patient Pay receipts Api With Aditional Payment Reference', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase12.startDate;
       const endDate = patientReceipt.testcase12.endDate;
       const patientId = patientReceipt.testcase12.patientId;
       const paymentMethod = patientReceipt.testcase12.paymentMethod;
       const lastFourDigit = patientReceipt.testcase12.lastFourDigit;
       const phyId= patientReceipt.testcase12.phyId;
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
       expect(responseBody.Data.dataObject[0].phyId).toBe(phyId);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentMethod).toBe(paymentMethod);
    
   });
})

test('Validation of Patient receipts Api With Payment Ref', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase13.startDate;
        const endDate = patientReceipt.testcase13.endDate;
        const patientId = patientReceipt.testcase13.patientId;
        const transactionId = patientReceipt.testcase13.transactionID;
        const phyId = patientReceipt.testcase13.phyId;
       const apiEndpoint = new GenerateReportEndpoint(url, 'EZR-15');
       const header = { "Authorization": `Bearer ${authToken}` };
       const payload = await apiEndpoint.generateEzClaimPayReceiptPayload(startDate, endDate, patientId, "patientName", "", transactionId);
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
       expect(responseBody.Data.dataObject[0].phyId).toBe(phyId);
       expect(responseBody.Data.dataObject[0].receipts[0].reff).toContain(transactionId);
   });
})


test('Validation of Patient Pay receipts Api Without passing the end date', async ({}, testInfo) => {
   await test.step('patient Pay receipts Successful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase14.startDate;
       const endDate = patientReceipt.testcase14.endDate;
       const patientId = patientReceipt.testcase14.patientId;
       const paymentMethod = patientReceipt.testcase14.paymentMethod;
       const phyId = patientReceipt.testcase14.phyId;
       const phyadd = patientReceipt.testcase14.phyAddress;
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
       expect(responseBody.Data.dataObject[0].phyId).toBe(phyId);
       expect(responseBody.Data.dataObject[0].phyAddress).toBe(phyadd);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentMethod).toBe(paymentMethod);
      
   });  
})

test('Validation of Patient Pay receipts Api Without passing the start date', async ({}, testInfo) => {
   await test.step('Patient Pay receipts sucessful case and response validation', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase15.startDate;
       const endDate = patientReceipt.testcase15.endDate;
       const patientId = patientReceipt.testcase15.patientId;
       const phyName= patientReceipt.testcase15.PhyName; 
       const paymentMethod = patientReceipt.testcase15.paymentMethod;
       const amount = patientReceipt.testcase15.amount;
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
       expect(responseBody.Data.dataObject[0].phyName).toBe(phyName);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentMethod).toBe(paymentMethod);
       expect(responseBody.Data.dataObject[0].receipts[0].paymentAmount).toBe(amount);
       
       //expect(isValid).toBe(true);
   });
})

test('Validation of Patient Pay receipts Api While wrong sortby parameter', async ({}, testInfo) => {
   await test.step('Patient Pay receipts Negative case', async () => {
       const url = `${endpoint.baseUrl}`;
       const startDate = patientReceipt.testcase16.startDate;
       const endDate = patientReceipt.testcase16.endDate;
       const patientId = patientReceipt.testcase16.patientId;
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
       const startDate = patientReceipt.testcase17.startDate;
       const endDate = patientReceipt.testcase17.endDate;
       const patientId = patientReceipt.testcase17.patientId;
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
       const startDate = patientReceipt.testcase18.startDate;
       const endDate = patientReceipt.testcase18.endDate;
       const patientId = patientReceipt.testcase18.patientId;
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
       const startDate = patientReceipt.testcase19.startDate;
       const endDate = patientReceipt.testcase19.endDate;
       const patientId = patientReceipt.testcase19.patientId;
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
