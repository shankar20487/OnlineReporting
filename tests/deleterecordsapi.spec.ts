import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import deleterecords from '../test-data/api-requests/deletedreords.json';
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
test('Validation of Delete Records Api for Payer', async ({},testInfo) => {
     await test.step('Delete Records Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
        const header = { "Authorization": `Bearer ${authToken}`}
        const deletedDescription = deleterecords.testcase1.deletedDescription
        const deletetedItems = deleterecords.testcase1.deletetedItems;
        const payload = await apiEndpoint.generateDeleteRecordPayload('','',["payer"]);
       

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Delete Records Report', {
        body: body, 
        contentType: 'application/json'
        }); 

     
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].recordType).toEqual(deletetedItems);
        expect(jsonData.Data.dataObject[0].description).toEqual(deletedDescription);
       
    });
})


test('Validation of Delete Records Api for Patient', async ({},testInfo) => {
    await test.step('Delete Records Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       const deletedDescription = deleterecords.testcase2.deletedDescription
       const deletetedItems = deleterecords.testcase2.deletetedItems;
    
       const payload = await apiEndpoint.generateDeleteRecordPayload('','',["patient"]);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually  
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Deleted Records report Api', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].recordType).toEqual(deletetedItems);
       expect(jsonData.Data.dataObject[0].description).toEqual(deletedDescription);
    
   });
})


test('Validation of Deleted Records Api for Payment', async ({},testInfo) => {
    await test.step('Deleted Records Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const deletedDescription = deleterecords.testcase3.deletedDescription
       const deletetedItems = deleterecords.testcase3.deletetedItems;
       
       const payload = await apiEndpoint.generateDeleteRecordPayload('','',["payment"]);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Deleted Recordss report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].recordType).toEqual(deletetedItems);
       expect(jsonData.Data.dataObject[0].description).toEqual(deletedDescription);
      

   });
})   



test('Validation of Deleted Records Api filter by Claim ', async ({},testInfo) => {
    await test.step('Deleted Records Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
        const header = { "Authorization": `Bearer ${authToken}`}
       const computer = deleterecords.testcase4.computer
       const deletetedItems = deleterecords.testcase4.deletetedItems;
       const payload = await apiEndpoint.generateDeleteRecordPayload('','',["Claim"]);
       console.log(payload);
     
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Deleted Records report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].recordType).toEqual(deletetedItems);
       expect(jsonData.Data.dataObject[0].computer).toEqual(computer);
       
      

   });
})

test('Validation of Deleted Records for ServiceLines', async ({},testInfo) => {
    await test.step('Deleted Records Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const computer = deleterecords.testcase5.computer
       const deletetedItems = deleterecords.testcase5.deletetedItems;
       const payload = await apiEndpoint.generateDeleteRecordPayload('','',["Service_Line"]);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Deleted Records report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].recordType).toEqual(deletetedItems);
       expect(jsonData.Data.dataObject[0].computer).toEqual(computer);
    });
})

test('Validation of Deleted Records Api without selecting any Filter', async ({},testInfo) => {
    await test.step('Deleted Records Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       const deletetedItems1 = deleterecords.testcase6.deletetedItems1
       const deletetedItems2 = deleterecords.testcase6.deletetedItems2
       
       const payload = await apiEndpoint.generateDeleteRecordPayload();
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Deleted Records report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].recordType).toEqual(deletetedItems1);
       expect(jsonData.Data.dataObject[1].recordType).toEqual(deletetedItems2);
   });

})

test('Validation of Deleted Records Api filter by Specific Period ', async ({},testInfo) => {
    await test.step('Deleted Records Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const deletetedItems = deleterecords.testcase7.deletetedItems
       const startDate = deleterecords.testcase7.startDate
       const endDate = deleterecords.testcase7.endDate
       const computer = deleterecords.testcase7.computer
       
     
       const payload = await apiEndpoint.generateDeleteRecordPayload(startDate,endDate);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Leadgers report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].recordType).toEqual(deletetedItems); 
       expect(jsonData.Data.dataObject[0].computer).toEqual(computer);
      
   });
})



test('Validation of Deleted Records Api filter by wrong startdate ', async ({},testInfo) => {
    await test.step('Deleted Records Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = deleterecords.testcase8.startDate
       const endDate = deleterecords.testcase8.endDate
     
       const payload = await apiEndpoint.generateDeleteRecordPayload(startDate,endDate);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Leadgers report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(415);
         
     
      
   });
})

test('Validation of Deleted Records Api filter by wrong enddate ', async ({},testInfo) => {
    await test.step('Deleted Records Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = deleterecords.testcase9.startDate
       const endDate = deleterecords.testcase9.endDate
     
       const payload = await  apiEndpoint.generateDeleteRecordPayload(startDate,endDate);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Deleted Records report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(415);
         
     
      
   });


})

test('Validation of Deleted Records Api filter by wrong Deleted Items', async ({},testInfo) => {
    await test.step('Deleted Records Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-6');
       const header = { "Authorization": `Bearer ${authToken}`}
       
     
       const startDate = deleterecords.testcase10.startDate
       const endDate = deleterecords.testcase10.endDate
      
     
       const payload = await apiEndpoint.generateDeleteRecordPayload(startDate,endDate,["wrongDeletedItem"]);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Deleted Records report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
        
  
      
   });
})







