import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import claimstatement from '../test-data/api-requests/claimstatement.json';
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
test('Validation of Claim Statement Api for Particular patient', async ({},testInfo) => {
     await test.step('Claim Statement Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = claimstatement.testcase1.patientId
        const patientName = claimstatement.testcase1.patientName;
        const payload = await apiEndpoint.generatePayloadClaimStatement(patients,'','','','','');
        const phoneNumber = claimstatement.testcase1.patientPhone;

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Claim Statement Report', {
        body: body, 
        contentType: 'application/json'
        }); 

        //validate the json schema
       // const rawData = fs.readFileSync('schema/claimstatementSchema.json', 'utf-8');
        //const jsonSchema = JSON.parse(rawData); 
       // const validator = new apivalidation();
        //const isValid = await validator.validateResponse(jsonSchema,jsonData);

       
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
        expect(jsonData.Data.dataObject[0].patientPhone).toEqual(phoneNumber);  
        expect(jsonData.Data.dataObject).toHaveLength(2);
       
    });
})


test('Validation of Claim Statement Api for particulart Service start and Service end Date', async ({},testInfo) => {
    await test.step('Claim Statement Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = claimstatement.testcase2.patientId
       const startDate = claimstatement.testcase2.startDate
       const endDate = claimstatement.testcase2.endDate
       const patientName2 = claimstatement.testcase2.patientName2;
       const patientName = claimstatement.testcase2.patientName;
       const payload = await apiEndpoint.generatePayloadClaimStatement('',startDate,endDate,'','','');
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually  
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim Statement report Api', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[1].patientName).toEqual(patientName2);
       expect(jsonData.Data.dataObject[0].statement).toHaveLength(7);
    
   });
})


test('Validation of Claim Statements Api for minimumBalance option', async ({},testInfo) => {
    await test.step('Claim Statements Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = claimstatement.testcase3.startDate
       const endDate = claimstatement.testcase3.endDate
       const patientId = claimstatement.testcase3.patientId
       const minimumBalance = claimstatement.testcase3.minimumBalance
       const patientBalance = claimstatement.testcase3.patientBalance
       
       const payload = await apiEndpoint.generatePayloadClaimStatement('',startDate,endDate,'','',minimumBalance);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim Statements report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patId).toEqual(patientId);
       expect(jsonData.Data.dataObject[0].patTotalBalance).toEqual(patientBalance);
       expect(jsonData.Data.dataObject).toHaveLength(2);
      

   });
})   



test('Validation of Claim Statement Api filter by claimID ', async ({},testInfo) => {
    await test.step('Claim Statement Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = claimstatement.testcase4.patientId
        const claimID = claimstatement.testcase4.claimID;
        const payload = await apiEndpoint.generatePayloadClaimStatement(patients,'','','',claimID,'');
      
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim Statement report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].statement[0].claID).toEqual(parseInt(claimID));
       expect(jsonData.Data.dataObject[0].statement[1].claID).toEqual(parseInt(claimID));
       
      

   });
})

test('Validation of Claim Statements Api filter by claimBillingProvider', async ({},testInfo) => {
    await test.step('Patient Followup Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
       const header = { "Authorization": `Bearer ${authToken}`}
       
      
       const phyId = claimstatement.testcase5.phyId
       const claimBillingProvider = claimstatement.testcase5.claimBillingProvider
       const payload = await apiEndpoint.generatePayloadClaimStatement('','','','','','',claimBillingProvider);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim Statements report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].phyId).toEqual(phyId);
       
    });
})

test('Validation of Claim Statements Api with selecting any Filter', async ({},testInfo) => {
    await test.step('Claim Statements Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = claimstatement.testcase6.patientId
    
       const payload = await apiEndpoint.generatePatientFollowupPayload(true);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim Statements report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patId).toEqual(patients);
        
      

   });
})

test('Validation of Claim Statements Api filter by wrong PatientId ', async ({},testInfo) => {
    await test.step('Claim Statements Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = claimstatement.testcase7.patientId;
       const startDate = claimstatement.testcase7.startDate
       const endDate = claimstatement.testcase7.endDate
       
     
       const payload = await apiEndpoint.generatePayloadClaimStatement(patients,startDate,endDate,'','','');
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
       expect(jsonData.Data.dataObject).toHaveLength(0);    
     
      
   });
})



test('Validation of Claim Statements Api filter by wrong startdate ', async ({},testInfo) => {
    await test.step('Claim Statements Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = claimstatement.testcase8.patientId;
       const startDate = claimstatement.testcase8.startDate
       const endDate = claimstatement.testcase8.endDate
     
       const payload = await apiEndpoint.generatePayloadClaimStatement('',startDate,endDate,'','','');
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim Statements report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(415);
         
     
      
   });
})

test('Validation of Claim Statements Api filter by wrong enddate ', async ({},testInfo) => {
    await test.step('Claim Statements Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-5');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = claimstatement.testcase9.patientId;
       const startDate = claimstatement.testcase9.startDate
       const endDate = claimstatement.testcase9.endDate
     
       const payload = await apiEndpoint.generatePayloadClaimStatement('',startDate,endDate,'','','');
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Follow up report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(415);
         
     
      
   });


})

