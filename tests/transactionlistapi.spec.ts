import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import transactionlist from '../test-data/api-requests/trasactionlist.json';
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
test('Validation of Transaction List Api with applying any filter', async ({},testInfo) => {
     await test.step('Transaction List Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = transactionlist.testcase1.patientId
        const patientName = transactionlist.testcase1.patientName;
        const payload = await apiEndpoint.generateTransactionListPayload()
        const transRef = transactionlist.testcase1.transRef;
        const transPatientPmtAmount = transactionlist.testcase1.transPatientPmtAmount;

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Transaction List Report', {
        body: body, 
        contentType: 'application/json'
        }); 
      
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].transName).toEqual(patientName);
        expect(jsonData.Data.dataObject[0].transRef).toEqual(transRef); 
        expect(jsonData.Data.dataObject[0].transPatientPmtAmount).toEqual(transPatientPmtAmount); 
       
       
    });
})


test('Validation of Transaction List Api for particular Patient', async ({},testInfo) => {
    await test.step('Transaction List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = transactionlist.testcase2.patientId
       const patientName = transactionlist.testcase2.patientName;
       const transRef = transactionlist.testcase2.transRef;
       const transPatientPmtAmount = transactionlist.testcase2.transPatientPmtAmount;
       const payload = await apiEndpoint.generateTransactionListPayload('','',[''],patients)
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].transRef).toEqual(transRef); 
       expect(jsonData.Data.dataObject[0].transPatientPmtAmount).toEqual(transPatientPmtAmount); 
      
      
   });
})


test('Validation of Transaction List Api for particular Transaction Type', async ({},testInfo) => {
    await test.step('Transaction List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
     
       const payer = transactionlist.testcase3.payer;
       const transRef = transactionlist.testcase3.transRef;
       const transType = transactionlist.testcase3.transType;
       const transPayerPmtAmount = transactionlist.testcase3.transPayerPmtAmount;
       const payload = await apiEndpoint.generateTransactionListPayload('','',[transType])
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transName).toEqual(payer);
       expect(jsonData.Data.dataObject[0].transRef).toEqual(transRef); 
       expect(jsonData.Data.dataObject[0].transPayerPmtAmount).toEqual(transPayerPmtAmount);     
      
   });
})

test('Validation of Transaction List Api for Multiple Transaction Type', async ({},testInfo) => {
    await test.step('Transaction List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
     
       const payer = transactionlist.testcase4.payer;
       const transRef = transactionlist.testcase4.transRef;
       const transPatientPmtAmount = transactionlist.testcase4.transPatientPmtAmount;
       const payload = await apiEndpoint.generateTransactionListPayload('','',["payer pmts","patient pmts","chages"])
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transName).toEqual(payer);
       expect(jsonData.Data.dataObject[0].transRef).toEqual(transRef); 
       expect(jsonData.Data.dataObject[0].transPatientPmtAmount).toEqual(transPatientPmtAmount);     
      
   });
})

test('Validation of Transaction List Api for Specific Date Range', async ({},testInfo) => {
    await test.step('Transaction List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
     
       const payer = transactionlist.testcase5.payer;
       const startDate = transactionlist.testcase5.startDate;
       const endDate = transactionlist.testcase5.endDate;
       const transRef = transactionlist.testcase5.transRef;
         const transPatientPmtAmount = transactionlist.testcase5.transPatientPmtAmount;
      
       const payload = await apiEndpoint.generateTransactionListPayload(startDate,endDate)
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].transName).toEqual(payer);
       expect(jsonData.Data.dataObject[0].transRef).toEqual(transRef); 
       expect(jsonData.Data.dataObject[0].transPatientPmtAmount).toEqual(transPatientPmtAmount);     
      
   });
})

test('Validation of Transaction List Api with Filter type HideDetails True', async ({},testInfo) => {
    await test.step('Transaction List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
     
       const payer = transactionlist.testcase6.payer;
       const transRef = transactionlist.testcase6.transRef;
       const transPatientPmtAmount = transactionlist.testcase6.transPatientPmtAmount;
       const payload = await apiEndpoint.generateTransactionListPayload('','',["payer pmts","patient pmts","chages"])
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       //expect(jsonData.Data.dataObject[0].transName).toEqual(payer);
      // expect(jsonData.Data.dataObject[0].transRef).toEqual(transRef); 
       //expect(jsonData.Data.dataObject[0].transPatientPmtAmount).toEqual(transPatientPmtAmount);     
      
   });
})


test('Validation of Transaction List Api for the Patient which not exist', async ({},testInfo) => {
    await test.step('Transaction List Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = transactionlist.testcase7.patientId
      
       const payload = await apiEndpoint.generateTransactionListPayload('','',[''],patients)
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
            
      
   });
})


test('Validation of Transaction List Api for the wrong start Date', async ({},testInfo) => {
    await test.step('Transaction List Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = transactionlist.testcase8.patientId
       const startDate = transactionlist.testcase8.startDate;
       const endDate = transactionlist.testcase8.endDate;
       const payload = await apiEndpoint.generateTransactionListPayload(startDate,endDate)
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(415);
            
      
   });
})


test('Validation of Transaction List Api for the wrong End Date', async ({},testInfo) => {
    await test.step('Transaction List Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-22');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = transactionlist.testcase9.patientId
       const startDate = transactionlist.testcase9.startDate;
       const endDate = transactionlist.testcase9.endDate;
       const payload = await apiEndpoint.generateTransactionListPayload(startDate,endDate)
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Transaction List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(415);
            
      
   });
})