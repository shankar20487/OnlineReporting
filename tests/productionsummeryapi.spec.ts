import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import productionsummery from '../test-data/api-requests/productionsummery.json';
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
test('Validation of Production Summery Api without applying any filter', async ({},testInfo) => {
     await test.step('Production Summery Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
        const header = { "Authorization": `Bearer ${authToken}`}
        const amount1 = productionsummery.testcase1.amount1
        const amount2 = productionsummery.testcase1.amount2;
        const transactionType1 = productionsummery.testcase1.transactionType1;
        const transactionType2 = productionsummery.testcase1.transactionType2;
        const transactionType3 = productionsummery.testcase1.transactionType3;
        const payload = await apiEndpoint.generateProductionSummeryPayload();
       

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Production Summery Report', {
        body: body, 
        contentType: 'application/json'
        }); 
      
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
        expect(jsonData.Data.dataObject[1].transactionType).toEqual(transactionType2); 
        expect(jsonData.Data.dataObject[2].transactionType).toEqual(transactionType3); 
        expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
        expect(jsonData.Data.dataObject[1].amount).toEqual(amount2);
       
       
    });
})

test('Validation of Production Summery Api for specific Patient Classification', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase2.amount1
       const amount2 = productionsummery.testcase2.amount2;
       const transactionType1 = productionsummery.testcase2.transactionType1;
       const patientClassification = productionsummery.testcase2.patientClassification;
       const payload = await apiEndpoint.generateProductionSummeryPayload({PatientClassification: [patientClassification]});
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
       expect(jsonData.Data.dataObject[1].amount).toEqual(amount2);
      
      
   });
})


test('Validation of Production Summery Api for spcific claimReferring Provider', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase3.amount1
       const amount2 = productionsummery.testcase3.amount2;
       const transactionType1 = productionsummery.testcase3.transactionType1;
       const claimReferringProvider = productionsummery.testcase3.claimReferringProvider;
       const payload = await apiEndpoint.generateProductionSummeryPayload({claimReferringProvider: [claimReferringProvider]});
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
       expect(jsonData.Data.dataObject[1].amount).toEqual(amount2);
      
      
   });
})



test('Validation of Production Summery Api for spcific claim Primary Payer', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase4.amount1
       const amount2 = productionsummery.testcase4.amount2;
       const transactionType1 = productionsummery.testcase4.transactionType1;
       const claimPrimaryPayer = productionsummery.testcase4.claimPrimaryPayer;
       const payload = await apiEndpoint.generateProductionSummeryPayload({claimPrimaryPayer: [claimPrimaryPayer]});
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
       expect(jsonData.Data.dataObject[1].amount).toEqual(amount2);
      
      
   });
})

test('Validation of Production Summery Api for spcific claim Rendering Provider', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase5.amount1
       const transactionType1 = productionsummery.testcase5.transactionType1;
       const claimRenderingProvider = productionsummery.testcase5.claimRenderingProvider;
       const payload = await apiEndpoint.generateProductionSummeryPayload({claimRenderingProvider: [claimRenderingProvider]});
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
       expect(jsonData.Data.dataObject).toHaveLength(1);
      
      
   });
})


test('Validation of Production Summery Api for spcific claim Billing Provider', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase6.amount1
       const transactionType1 = productionsummery.testcase6.transactionType1;
       const claimBillingProvider = productionsummery.testcase6.claimBillingProvider;
       const payload = await apiEndpoint.generateProductionSummeryPayload({claimBillingProvider: [claimBillingProvider]});
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
       expect(jsonData.Data.dataObject).toHaveLength(4);
      
      
   });
})

test('Validation of Production Summery Api for spcific claim Facility', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase7.amount1
       const transactionType1 = productionsummery.testcase7.transactionType1;
       const claimFacility = productionsummery.testcase7.claimFacility;
       const payload = await apiEndpoint.generateProductionSummeryPayload({facility: [claimFacility]});
      
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
       expect(jsonData.Data.dataObject).toHaveLength(4);
      
      
   });
})


test('Validation of Production Summery Api for spcific claim Ordering Provider', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase8.amount1
       const transactionType1 = productionsummery.testcase8.transactionType1;
       const claimOrderingProvider = productionsummery.testcase8.claimOrderingProvider;
       const payload = await apiEndpoint.generateProductionSummeryPayload({claimOrderingProvider: [claimOrderingProvider]});
      
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
         
   });
})


test('Validation of Production Summery Api for spcific UserName', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase9.amount1
       const transactionType1 = productionsummery.testcase9.transactionType1;
       const userName = productionsummery.testcase9.userName;
       const payload = await apiEndpoint.generateProductionSummeryPayload({userName: [userName]});
      
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
         
   });
})


test('Validation of Production Summery Api for spcific transaction date range', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase10.amount1
       const transactionType1 = productionsummery.testcase10.transactionType1;
       const startDate = productionsummery.testcase10.startDate;
       const endDate = productionsummery.testcase10.endDate;
      
       const payload = await apiEndpoint.generateProductionSummeryPayload({transactionDate: {startDate: startDate,endDate: endDate}});  
      
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
         
   });
})


test('Validation of Production Summery Api with groupBy None and showClaimDetail true', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase11.amount1
       const transactionType1 = productionsummery.testcase11.transactionType1;
          
       const payload = await apiEndpoint.generateProductionSummeryPayload({groupBy: 'None',showClaimDetail: true});  
      
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
         
   });
})

test('Validation of Production Summery Api with groupBy userName and showClaimDetail true', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase12.amount1
       const transactionType1 = productionsummery.testcase12.transactionType1;
          
       const payload = await apiEndpoint.generateProductionSummeryPayload({groupBy: 'userName',showClaimDetail: true});  
      
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transactionType).toEqual(transactionType1);
       expect(jsonData.Data.dataObject[0].amount).toEqual(amount1);
         
   });
})

test('Validation of Production Summery Api with wrong End Date', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase13.amount1
       const transactionType1 = productionsummery.testcase13.transactionType1;
       const startDate = productionsummery.testcase13.startDate;
       const endDate = productionsummery.testcase13.endDate;
       const payload = await apiEndpoint.generateProductionSummeryPayload({transactionDate: {startDate: startDate,endDate: endDate}});  
      
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(415);


    });
})

test('Validation of Production Summery Api with wrong Start Date', async ({},testInfo) => {
    await test.step('Production Summery Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-19');
       const header = { "Authorization": `Bearer ${authToken}`}
       const amount1 = productionsummery.testcase14.amount1
       const transactionType1 = productionsummery.testcase14.transactionType1;
       const startDate = productionsummery.testcase14.startDate;
       const endDate = productionsummery.testcase14.endDate;
       const payload = await apiEndpoint.generateProductionSummeryPayload({transactionDate: {startDate: startDate,endDate: endDate}});
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Production Summery Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(415);


    });
})

