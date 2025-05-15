import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import accountreceivable from '../test-data/api-requests/accountreceivable.json';
import apivalidation from '../utils/ApiValidator';
import * as fs from 'fs';
import { start } from 'repl';

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
test('Validation of Account Receivable Api without applying any filter', async ({},testInfo) => {
     await test.step('Account Receivable Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = accountreceivable.testcase1.patientId
        const patientName = accountreceivable.testcase1.patientName;
        const balance = accountreceivable.testcase1.balance;
        const patientClassification = accountreceivable.testcase1.patientClassification;
        const payload = await apiEndpoint.generateAccountReceivablePayload()
      

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Account Receiveable Report', {
        body: body, 
        contentType: 'application/json'
        }); 
      
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
        expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
        expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       
       
    });
})

test('Validation of Account Receivable report for particular Payer', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = accountreceivable.testcase2.patientId
       const patientName = accountreceivable.testcase2.patientName;
       const payer = accountreceivable.testcase2.payer;
       const balance = accountreceivable.testcase1.balance;
       const patientClassification = accountreceivable.testcase2.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({payer:[payer]})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})


test('Validation of Account Receivable report for particular Patient', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = accountreceivable.testcase3.patientId
       const patientName = accountreceivable.testcase3.patientName;
       const balance = accountreceivable.testcase3.balance;
       const patientClassification = accountreceivable.testcase2.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({patient: patients})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Account Receivable report for particular claimRenderingProvider', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimRenderingProvider = accountreceivable.testcase4.claimRenderingProvider
       const patientName = accountreceivable.testcase4.patientName;
       const balance = accountreceivable.testcase4.balance;
       const patientClassification = accountreceivable.testcase4.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({claimRenderingProvider: [claimRenderingProvider]})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Account Receivable report for particular claim Staus', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimStatus = accountreceivable.testcase5.claimStatus
       const patientName = accountreceivable.testcase5.patientName;
       const balance = accountreceivable.testcase5.balance;
       const patientClassification = accountreceivable.testcase5.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({claimStatus: [claimStatus]})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Account Receivable report for particular Facility', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const facility = accountreceivable.testcase6.facility
       const patientName = accountreceivable.testcase6.patientName;
       const balance = accountreceivable.testcase6.balance;
       const patientClassification = accountreceivable.testcase6.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({facility: [facility]})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})


test('Validation of Account Receivable report for particular Patient Classification', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patientName = accountreceivable.testcase7.patientName;
       const balance = accountreceivable.testcase7.balance;
       const patientClassification = accountreceivable.testcase7.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({patientClassification: [patientClassification]})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Account Receivable report for particular Patient Account StartsWith', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const accountStartWith = accountreceivable.testcase8.accountStartWith
       const patientName = accountreceivable.testcase8.patientName;
       const balance = accountreceivable.testcase8.balance;
       const patientClassification = accountreceivable.testcase8.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({accountStartWith: accountStartWith})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Account Receivable report for particular Patient Active Status as active', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const activeStatus = accountreceivable.testcase9.activeStatus
       const patientName = accountreceivable.testcase9.patientName;
       const balance = accountreceivable.testcase9.balance;
       const patientClassification = accountreceivable.testcase9.patientClassification;
       const payload = await apiEndpoint.generateAccountReceivablePayload({activeStatus: activeStatus})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Account Receivable report for particular Patient Active Status as inactive', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const activeStatus = accountreceivable.testcase10.activeStatus
     
       const payload = await apiEndpoint.generateAccountReceivablePayload({activeStatus: activeStatus})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject.length).toEqual(0);
       
      
      
   });
})

test('Validation of Account Receivable report for particular Service Line Responsible Party As Patient', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const responsibleParty = accountreceivable.testcase11.responsibleParty
       const patientName = accountreceivable.testcase11.patientName;
       const balance = accountreceivable.testcase11.balance;
     
       const payload = await apiEndpoint.generateAccountReceivablePayload({responsibleParty: responsibleParty})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       
      
      
   });
})

test('Validation of Account Receivable report for particular Service Line Responsible Party As Primary', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const responsibleParty = accountreceivable.testcase12.responsibleParty
       const patientName = accountreceivable.testcase12.patientName;
       const balance = accountreceivable.testcase12.balance;
     
       const payload = await apiEndpoint.generateAccountReceivablePayload({responsibleParty: responsibleParty})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       
      
      
   });
})

test('Validation of Account Receivable report for particular Service Line Responsible Party As Secondary', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const responsibleParty = accountreceivable.testcase13.responsibleParty
       const patientName = accountreceivable.testcase13.patientName;
       const balance = accountreceivable.testcase13.balance;
     
       const payload = await apiEndpoint.generateAccountReceivablePayload({responsibleParty: responsibleParty})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
          
   });
})

test('Validation of Account Receivable report for particular Service Line Responsible Party As Tritanary', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const responsibleParty = accountreceivable.testcase14.responsibleParty
       const payload = await apiEndpoint.generateAccountReceivablePayload({responsibleParty: responsibleParty})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
      
    });
})

test('Validation of Account Receivable report for service Line Date Range', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = accountreceivable.testcase15.patientName;
       const balance = accountreceivable.testcase15.balance;
       const patientClassification = accountreceivable.testcase15.patientClassification;
       const serviceLineStartDate = accountreceivable.testcase15.startDate
       const serviceLineEndDate = accountreceivable.testcase15.endDate
       const payload = await apiEndpoint.generateAccountReceivablePayload({serviceDate: {startDate: serviceLineStartDate, endDate: serviceLineEndDate}})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification);
      
    });
})


test('Validation of Account Receivable report for GroupBy None and calculateAgingByDOS is true', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = accountreceivable.testcase16.patientName;
       const balance = accountreceivable.testcase16.balance;
       const calculateAgingByDOS = accountreceivable.testcase16.calculateAgingByDOS
       const againgBalance = accountreceivable.testcase16.agingBalance
       const payload = await apiEndpoint.generateAccountReceivablePayload({groupBy: 'None', calculateAgingByDOS: calculateAgingByDOS})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance);
       expect(jsonData.Data.dataObject[0].Over120).toEqual(againgBalance); 
             
    });
})

test('Validation of Account Receivable report for GroupBy None and Hide Details is true', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = accountreceivable.testcase17.patientName;
       const balance = accountreceivable.testcase17.balance;
       const hideDetails = accountreceivable.testcase17.hideDetails
       const groupBy = accountreceivable.testcase17.groupBy
       const payload = await apiEndpoint.generateAccountReceivablePayload({groupBy: groupBy, hideDetail: hideDetails})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
             
    });
})


test('Validation of Account Receivable report for GroupBy PatientClassification and Hide Details is true', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = accountreceivable.testcase18.patientName;
       const balance = accountreceivable.testcase18.balance;
       const hideDetails = accountreceivable.testcase18.hideDetails
       const groupBy = accountreceivable.testcase18.groupBy
       const payload = await apiEndpoint.generateAccountReceivablePayload({groupBy: groupBy, hideDetail: hideDetails})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].balance).toEqual(balance); 
             
    });
})


test('Validation of Account Receivable report for Wrong Start Date', async ({},testInfo) => {
    await test.step('Account Receivable Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const startDate = accountreceivable.testcase19.startDate
       const endDate = accountreceivable.testcase19.endDate
      
       const payload = await apiEndpoint.generateAccountReceivablePayload({serviceDate: {startDate: startDate, endDate: endDate}})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(415);
      
             
    });
})

test('Validation of Account Receivable report for Wrong End Date', async ({},testInfo) => {
    await test.step('Account Receivable Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-2');
       const header = { "Authorization": `Bearer ${authToken}`}
       const startDate = accountreceivable.testcase20.startDate;
       const endDate = accountreceivable.testcase20.endDate;
      
       const payload = await apiEndpoint.generateAccountReceivablePayload({serviceDate: {startDate: startDate, endDate: endDate}})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Account Receiveable Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(415);
             
    });
})









