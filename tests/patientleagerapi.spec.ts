import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import patientleadger from '../test-data/api-requests/patientleadger.json'
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
test('Validation of Patient Leadger Api for Particular patient', async ({},testInfo) => {
     await test.step('Patient Leadger Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = patientleadger.testcase1.patientId
        const provider = patientleadger.testcase1.provider;
        const payload = await apiEndpoint.generatePatientLedgerPayload(patients);
        const srvID = patientleadger.testcase1.srvID;
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

        //validate the json schema
        const rawData = fs.readFileSync('schema/patientleadgerSchema.json', 'utf-8');
        const jsonSchema = JSON.parse(rawData); 
        const validator = new apivalidation();
        const isValid = await validator.validateResponse(jsonSchema,jsonData);

       
        expect(apiResponse.status).toBe(200);
       // expect(jsonData.Data.dataObject[0].ledgers[0].srvID).toEqual(srvID);
        expect(jsonData.Data.dataObject[0].ledgers[0].provider).toEqual(provider);
        expect(jsonData.Data.dataObject).toHaveLength(1);
        //expect(isValid).toBe(true);

        
    });
})


test('Validation of Patient Leadger Api for particulart start and end Date', async ({},testInfo) => {
    await test.step('Patient Leadger Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = patientleadger.testcase2.patientId
       const startDate = patientleadger.testcase2.startDate
       const endDate = patientleadger.testcase2.endDate
       const accountNo = patientleadger.testcase2.accountNo
       const payload = await apiEndpoint.generatePatientLedgerPayload(patients,startDate,endDate);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Leadgers report Api', {
       body: body, 
       contentType: 'application/json'
       }); 

      
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].accountNo).toEqual(accountNo);
       expect(jsonData.Data.dataObject[0].patId).toEqual(patients);
       expect(jsonData.Data.dataObject[0].ledgers).toHaveLength(6);
    
   });
})


test('Validation of Patient Leadger Api for sort by Patient Id', async ({},testInfo) => {
    await test.step('Patient Leadger Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = patientleadger.testcase3.startDate
       const endDate = patientleadger.testcase3.endDate
       const payload = await apiEndpoint.generatePatientLedgerPayload(1,startDate,endDate,'patId');
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
       expect(jsonData.Data.dataObject[0].patId).toEqual(1);
       expect(jsonData.Data.dataObject[1].patId).toEqual(21);
       expect(jsonData.Data.dataObject[2].patId).toEqual(29);
      

   });
})



test('Validation of Patient Leadger Api filter by Account Starts with ', async ({},testInfo) => {
    await test.step('Patient Leadger Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = patientleadger.testcase4.startDate
       const endDate = patientleadger.testcase4.endDate
       const accountNo1 = patientleadger.testcase4.accountNo1
       const accountNo2 = patientleadger.testcase4.accountNo2
       const accountNo3 = patientleadger.testcase4.accountNo3
       const payload = await apiEndpoint.generatePatientLedgerPayload(1,startDate,endDate,'','100');
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
       expect(jsonData.Data.dataObject[0].accountNo).toEqual(accountNo1);
       expect(jsonData.Data.dataObject[1].accountNo).toEqual(accountNo2);
       expect(jsonData.Data.dataObject[2].accountNo).toEqual(accountNo3);
      

   });
})

test('Validation of Patient Leadger Api filter by multiple patientId', async ({},testInfo) => {
    await test.step('Patient Leadger Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const startDate = patientleadger.testcase5.startDate
       const endDate = patientleadger.testcase5.endDate
       const accountNo = patientleadger.testcase5.accountNo
       const payload = await apiEndpoint.generatePatientLedgerPayload(2,startDate,endDate);
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
       expect(jsonData.Data.dataObject[0].accountNo).toEqual(accountNo);
       //expect(jsonData.Data.dataObject[1].accountNo).toEqual("1000");
       //expect(jsonData.Data.dataObject[2].accountNo).toEqual("1001");
      

   });
})

test('Validation of Patient Leadger Api filter by patientClassification', async ({},testInfo) => {
    await test.step('Patient Leadger Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = patientleadger.testcase6.patientId
       const startDate = patientleadger.testcase6.startDate
       const endDate = patientleadger.testcase6.endDate
       const patientClassification = patientleadger.testcase6.patientClassification
       const accountNo = patientleadger.testcase6.accountNo
       const payload = await apiEndpoint.generatePatientLedgerPayload(patients,startDate,endDate,'','',patientClassification);
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
       expect(jsonData.Data.dataObject[0].accountNo).toEqual(accountNo);
       //expect(jsonData.Data.dataObject[1].accountNo).toEqual("1000");
       //expect(jsonData.Data.dataObject[2].accountNo).toEqual("1001");
      

   });
})

test('Validation of Patient Leadger Api filter by wrong Account Startwith ', async ({},testInfo) => {
    await test.step('Patient Leadger Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientleadger.testcase7.patientId;
       const startDate = patientleadger.testcase7.startDate
       const endDate = patientleadger.testcase7.endDate
       const accountStartWith = patientleadger.testcase7.accountStartWith
     
       const payload = await apiEndpoint.generatePatientLedgerPayload(patients,startDate,endDate,'',accountStartWith);
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
         
     
      
   });
})



test('Validation of Patient Leadger Api filter by wrong startdate ', async ({},testInfo) => {
    await test.step('Patient Leadger Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientleadger.testcase8.patientId;
       const startDate = patientleadger.testcase8.startDate
       const endDate = patientleadger.testcase8.endDate
     
       const payload = await apiEndpoint.generatePatientLedgerPayload(patients,startDate,endDate);
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

test('Validation of Patient Leadger Api filter by wrong enddate ', async ({},testInfo) => {
    await test.step('Patient Leadger Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientleadger.testcase9.patientId;
       const startDate = patientleadger.testcase9.startDate
       const endDate = patientleadger.testcase9.endDate
     
       const payload = await apiEndpoint.generatePatientLedgerPayload(patients,startDate,endDate);
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

test('Validation of Patient Leadger Api filter by wrong sortby', async ({},testInfo) => {
    await test.step('Patient Leadger Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-11');
       const header = { "Authorization": `Bearer ${authToken}`}
       
       const patients = patientleadger.testcase10.patientId;
       const startDate = patientleadger.testcase10.startDate
       const endDate = patientleadger.testcase10.endDate
     
       const payload = await apiEndpoint.generatePatientLedgerPayload(patients,startDate,endDate,"patient");
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







