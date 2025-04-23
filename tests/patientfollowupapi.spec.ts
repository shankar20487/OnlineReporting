import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import patientfollowup from '../test-data/api-requests/patientfollowup.json';
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
test('Validation of Patient Followup Api for Particular patient', async ({},testInfo) => {
     await test.step('Patient Followup Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = patientfollowup.testcase1.patientId
        const patientName = patientfollowup.testcase1.patientName;
        const payload = await apiEndpoint.generatePatientFollowupPayload(false,'','','',patients,'','');
        const phoneNumber = patientfollowup.testcase1.patientPhone;
;
        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Patient Followup Report', {
        body: body, 
        contentType: 'application/json'
        }); 

        //validate the json schema
       // const rawData = fs.readFileSync('schema/patientfollowupSchema.json', 'utf-8');
        //const jsonSchema = JSON.parse(rawData); 
       // const validator = new apivalidation();
        //const isValid = await validator.validateResponse(jsonSchema,jsonData);

       
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
        expect(jsonData.Data.dataObject[0].patientPhone).toEqual(phoneNumber);  
        expect(jsonData.Data.dataObject).toHaveLength(1);
       

        
    });
})


test('Validation of Patient Followup Api for particulart Service start and Service end Date', async ({},testInfo) => {
    await test.step('Patient FollowUP Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = patientfollowup.testcase2.patientId
       const startDate = patientfollowup.testcase2.startDate
       const endDate = patientfollowup.testcase2.endDate
       const totalBalance = patientfollowup.testcase2.totalPatBalance
       const patientName = patientfollowup.testcase2.patientName;
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,'','','',patients,'',startDate,endDate);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Followup report Api', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patientName).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].totalPatBalance).toEqual(parseFloat(totalBalance));
       expect(jsonData.Data.dataObject[0].followups).toHaveLength(1);
    
   });
})


test('Validation of Patient Follow up Api for minStatements option', async ({},testInfo) => {
    await test.step('Patient Follow Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = patientfollowup.testcase3.startDate
       const endDate = patientfollowup.testcase3.endDate
       const patientId = patientfollowup.testcase3.patientId
       const minStatements = patientfollowup.testcase3.minStatements
       
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,minStatements,'','','','',startDate,endDate);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient FollowUP report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patId).toEqual(patientId);
       //expect(jsonData.Data.dataObject[1].patId).toEqual(patientId2);
       //expect(jsonData.Data.dataObject[2].patId).toEqual(patientId3);
      

   });
})



test('Validation of Patient Follow Up Api filter by agedDays ', async ({},testInfo) => {
    await test.step('Patient Leadger Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = patientfollowup.testcase4.startDate
       const endDate = patientfollowup.testcase4.endDate
       const agedDays = patientfollowup.testcase4.agedDays
       const patientId = patientfollowup.testcase4.patientId
      
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,'',agedDays,'','','','','');
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

      
       expect(apiResponse.status).toBe(200);
      
      

   });
})

test('Validation of Patient Followup Api filter by patientClassification', async ({},testInfo) => {
    await test.step('Patient Followup Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = patientfollowup.testcase5.startDate
       const endDate = patientfollowup.testcase5.endDate
       const patientClassification = patientfollowup.testcase5.patientClassification
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,'','','','',patientClassification,startDate,endDate);
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

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patClassification).toEqual(patientClassification);
       expect(jsonData.Data.dataObject[1].patClassification).toEqual(patientClassification);
    });
})

test('Validation of Patient Follow up Api with selecting any Filter', async ({},testInfo) => {
    await test.step('Patient Follow up Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = patientfollowup.testcase6.patientId
       const patientPhone = patientfollowup.testcase6.patientPhone
       const payload = await apiEndpoint.generatePatientFollowupPayload(true);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Follow Up report', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patId).toEqual(patients);
       expect(jsonData.Data.dataObject[1].patientPhone).toEqual(patientPhone);
       ;
      

   });
})

test('Validation of Patient Follow up Api filter by wrong PatientId ', async ({},testInfo) => {
    await test.step('Patient Follow up Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientfollowup.testcase7.patientId;
       const startDate = patientfollowup.testcase7.startDate
       const endDate = patientfollowup.testcase7.endDate
       
     
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,'','','',patients,'',startDate,endDate);
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



test('Validation of Patient Follow up Api filter by wrong startdate ', async ({},testInfo) => {
    await test.step('Patient Follow up Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientfollowup.testcase8.patientId;
       const startDate = patientfollowup.testcase8.startDate
       const endDate = patientfollowup.testcase8.endDate
     
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,'','','',patients,'',startDate,endDate);
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

test('Validation of Patient Follow up Api filter by wrong enddate ', async ({},testInfo) => {
    await test.step('Patient Follow up Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientfollowup.testcase9.patientId;
       const startDate = patientfollowup.testcase9.startDate
       const endDate = patientfollowup.testcase9.endDate
     
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,'','','',patients,'',startDate,endDate);
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

test('Validation of Patient Follow up Api filter by wrong Patient Classifications', async ({},testInfo) => {
    await test.step('Patient Follow up Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-10');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientfollowup.testcase10.patientId;
       const startDate = patientfollowup.testcase10.startDate
       const endDate = patientfollowup.testcase10.endDate
       const patientClassification = patientfollowup.testcase10.patientClassification
     
       const payload = await apiEndpoint.generatePatientFollowupPayload(false,'','','','',patientClassification,startDate,endDate);
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

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject).toHaveLength(0);    
  
      
   });
})







