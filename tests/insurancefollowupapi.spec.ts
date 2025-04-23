import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import insurancefollowup from '../test-data/api-requests/insurancefollowup.json';
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
test('Validation of Insurance Follow up Api without any Filter', async ({},testInfo) => {
     await test.step('Insurance Follow up Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = insurancefollowup.testcase1.patientId
        const payName = insurancefollowup.testcase1.payName;
        const payload = await apiEndpoint.generateInsuranceFollowupPayload(true)
        const balance = insurancefollowup.testcase1.balance;

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Insurance Follow up Report', {
        body: body, 
        contentType: 'application/json'
        }); 

       

       
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[1].payName).toEqual(payName);
        expect(jsonData.Data.dataObject[1].insurance[0].balance).toEqual(balance);  
        expect(jsonData.Data.dataObject[1].insurance[0].patId).toEqual(patients); 
       
    });
})

test('Validation of Insurance Follow up Api for Particular Patient', async ({},testInfo) => {
    await test.step('Insurance Follow up Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = insurancefollowup.testcase2.patientId
       const payName = insurancefollowup.testcase2.payName;
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(false,1,1,patients)
       const balance = insurancefollowup.testcase2.balance;

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].insurance[0].patId).toEqual(patients);
       expect(jsonData.Data.dataObject[0].insurance[0].balance).toEqual(balance);  
        
      
   });
})


test('Validation of Insurance Follow up Api for Particular Payer', async ({},testInfo) => {
    await test.step('Insurance Follow up Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payerId = insurancefollowup.testcase3.payerId
       const payName = insurancefollowup.testcase3.payName;
       const patientClassification = insurancefollowup.testcase3.patientClassification;
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(false,payerId,1,1)
       

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

    
      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].payName).toEqual(payName);
       expect(jsonData.Data.dataObject[0].insurance[0].payId).toEqual(payerId);  
       expect(jsonData.Data.dataObject[0].insurance[0].patClassification).toEqual(patientClassification);
        
      
   });
})


test('Validation of Insurance Follow up Api for Particular Patient Classification', async ({},testInfo) => {
    await test.step('Insurance Follow up Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payerId = insurancefollowup.testcase4.payerId
       const payName = insurancefollowup.testcase4.payName;
       const patientClassification = insurancefollowup.testcase4.patientClassification;
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(false,1,1,1,patientClassification)
       

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

         
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[1].payName).toEqual(payName);
       expect(jsonData.Data.dataObject[1].insurance[0].payId).toEqual(payerId);  
       expect(jsonData.Data.dataObject[1].insurance[0].patClassification).toEqual(patientClassification);
        
      
   });
})


test('Validation of Insurance Follow up Api for Particular Payer Classification', async ({},testInfo) => {
    await test.step('Insurance Follow up Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payerId = insurancefollowup.testcase5.payerId
       const payName = insurancefollowup.testcase5.payName;
       const payerClassification = insurancefollowup.testcase5.payerClassification;
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(false,1,1,1,"",payerClassification)
       

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
      
       expect(apiResponse.status).toBe(200);
       //expect(jsonData.Data.dataObject[1].payName).toEqual(payName);
       //expect(jsonData.Data.dataObject[1].insurance[0].payId).toEqual(payerId);  
       //expect(jsonData.Data.dataObject[1].insurance[0].payClassification).toEqual(payerClassification);
        
      
   });
})

test('Validation of Insurance Follow up Api for Particular Facility', async ({},testInfo) => {
    await test.step('Insurance Follow up Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const facility = insurancefollowup.testcase6.facility
       const payerId = insurancefollowup.testcase6.payerId;
       const patientClassification = insurancefollowup.testcase6.patientClassification;
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(false,1,facility,1,"","")
       

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].insurance[0].payId).toEqual(payerId);  
       expect(jsonData.Data.dataObject[0].insurance[0].patClassification).toEqual(patientClassification);
        
      
   });
})

test('Validation of Insurance Follow up Api for Particular Service Date Range', async ({},testInfo) => {
    await test.step('Insurance Follow up Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const startDate = insurancefollowup.testcase7.startDate
       const endDate = insurancefollowup.testcase7.endDate;
       const patients = insurancefollowup.testcase7.patientId
       const patientClassification = insurancefollowup.testcase7.patientClassification;
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(true,1,1,1,"","",startDate,endDate)
       

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].insurance[0].patId).toEqual(patients);  
       expect(jsonData.Data.dataObject[0].insurance[0].patClassification).toEqual(patientClassification);
        
      
   });
})

test('Validation of Insurance Follow up Api for Non Existing Patient ', async ({},testInfo) => {
    await test.step('Insurance Follow up Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = insurancefollowup.testcase8.patientId
     
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(false,1,1,patients)
       const balance = insurancefollowup.testcase2.balance;

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
      
        
      
   });
})

test('Validation of Insurance Follow up Api for wrong start Date ', async ({},testInfo) => {
    await test.step('Insurance Follow up Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const startDate = insurancefollowup.testcase9.startDate
       const endDate = insurancefollowup.testcase9.endDate;
     
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(true,1,1,1,"","",startDate,endDate)
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(415);
      
        
      
   });
})

test('Validation of Insurance Follow up Api for wrong End Date ', async ({},testInfo) => {
    await test.step('Insurance Follow up Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-9');
       const header = { "Authorization": `Bearer ${authToken}`}
       const startDate = insurancefollowup.testcase10.startDate
       const endDate = insurancefollowup.testcase10.endDate;
     
       const payload = await apiEndpoint.generateInsuranceFollowupPayload(true,1,1,1,"","",startDate,endDate)

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Insurance Follow up Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(415);
      
        
      
   });
})