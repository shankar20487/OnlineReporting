import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import patientservice from '../test-data/api-requests/patientservices.json';
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
test('Validation of Patient Service Api without applying any filter', async ({},testInfo) => {
     await test.step('Patient Service Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patientName = patientservice.testcase1.patientName;
        const totCharges = patientservice.testcase1.totCharges;
        const patientClassification = patientservice.testcase1.patientClassification;
        const payload = await apiEndpoint.generatePatientServicesPayload()
      

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Patient Service Report', {
        body: body, 
        contentType: 'application/json'
        }); 
      
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
        expect(jsonData.Data.dataObject[0].totCharges).toEqual(totCharges); 
        expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       
       
    });
})

test('Validation of Patient Service Api for particular patient', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase2.patientName;
       const patientId = patientservice.testcase2.patientId;
       const totCharges = patientservice.testcase2.totCharges;
       const patientClassification = patientservice.testcase2.patientClassification;
       const payload = await apiEndpoint.generatePatientServicesPayload({patient: patientId})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(totCharges); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})


test('Validation of Patient Service Api for particular payer', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase3.patientName;
       const patientId = patientservice.testcase3.patientId;
       const totCharges = patientservice.testcase3.totCharges;
       const payer = patientservice.testcase3.payer;
       const patientClassification = patientservice.testcase3.patientClassification;
       const payload = await apiEndpoint.generatePatientServicesPayload({payer: [payer]})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(totCharges); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Patient Service Api for particular patient Classification', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase4.patientName;
       const patientId = patientservice.testcase4.patientId;
       const totCharges = patientservice.testcase4.totCharges;
       const patientClassification = patientservice.testcase4.patientClassification;
       const payload = await apiEndpoint.generatePatientServicesPayload({patientClassification: [patientClassification]})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(totCharges); 
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
      
      
   });
})

test('Validation of Patient Service Api for particular Account Starts With', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase5.patientName;
       const accountStartWith = patientservice.testcase5.accountStartWith;
       const patientClassification = patientservice.testcase5.patientClassification;
       const balance = patientservice.testcase5.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({acctStartsWith: accountStartWith})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
      
   });
})

test('Validation of Patient Service Api for particular Patient Active Status is Active', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase6.patientName;
       const activeStatus = patientservice.testcase6.activeStatus;
       const patientClassification = patientservice.testcase6.patientClassification;
       const balance = patientservice.testcase6.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({activeStatus: activeStatus})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Patient Active Status is InActive', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase7.patientName;
       const activeStatus = patientservice.testcase7.activeStatus;
     
       const payload = await apiEndpoint.generatePatientServicesPayload({activeStatus: activeStatus})
     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject.length).toEqual(0);
      
   });
})

test('Validation of Patient Service Api for particular Patient City', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase8.patientName;
       const city = patientservice.testcase8.city;
       const patientClassification = patientservice.testcase8.patientClassification;
       const balance = patientservice.testcase8.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({city: [city]})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Patient State', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase9.patientName;
       const state = patientservice.testcase9.state;
       const patientClassification = patientservice.testcase9.patientClassification;
       const balance = patientservice.testcase9.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({state: [state]})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Patient ZIP', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase10.patientName;
       const zip = patientservice.testcase10.zip;
       const patientClassification = patientservice.testcase10.patientClassification;
       const balance = patientservice.testcase10.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({zip: [zip]})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Claim Render', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase11.patientName;
       const claimRender = patientservice.testcase11.claimRender;
       const patientClassification = patientservice.testcase11.patientClassification;
       const balance = patientservice.testcase11.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({claimRenderingProvider: [claimRender]})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})


test('Validation of Patient Service Api for particular Claim Facility', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase12.patientName;
       const facility = patientservice.testcase12.facility;
       const patientClassification = patientservice.testcase12.patientClassification;
       const balance = patientservice.testcase12.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({facility: [facility]})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})


test('Validation of Patient Service Api for particular Claim Billing Provider', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase13.patientName;
       const claimBillingProvider = patientservice.testcase13.claimBillingProvider;
       const patientClassification = patientservice.testcase13.patientClassification;
       const balance = patientservice.testcase13.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({claimBillingProvider: [claimBillingProvider]})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Invoice StartsWith', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase14.patientName;
       const invoiceStartWith = patientservice.testcase14.invoiceStartWith;
       const patientClassification = patientservice.testcase14.patientClassification;
       const balance = patientservice.testcase14.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({invoiceStartsWith: invoiceStartWith})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Primary Dignosis StartsWith', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase15.patientName;
       const primaryDiaStartWith = patientservice.testcase15.primaryDiaStartWith;
       const patientClassification = patientservice.testcase15.patientClassification;
       const balance = patientservice.testcase15.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({primaryDiagnosisStartsWith: primaryDiaStartWith})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       //expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       //expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       //expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       //expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular productCodeStartsWith', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase16.patientName;
       const productCodeStartsWith = patientservice.testcase16.productCodeStartsWith;
       const patientClassification = patientservice.testcase16.patientClassification;
       const balance = patientservice.testcase16.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({productCodeStartsWith: productCodeStartsWith})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular procedureCodeStartsWith', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase17.patientName;
       const procedureCodeStartsWith = patientservice.testcase17.procedureCodeStartsWith;
       const patientClassification = patientservice.testcase17.patientClassification;
       const balance = patientservice.testcase17.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({procedureCodeStartsWith: procedureCodeStartsWith})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular patient has Insurance', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase18.patientName;
       const hasInsurance = patientservice.testcase18.hasInsurance;
       const patientClassification = patientservice.testcase18.patientClassification;
       const balance = patientservice.testcase18.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({hasInsurancePayment: hasInsurance})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular ServiceLine Minimum Balance', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase19.patientName;
       const serviceLineMinBalance = patientservice.testcase19.serviceLineMinBalance;
       const patientClassification = patientservice.testcase19.patientClassification;
       const balance = patientservice.testcase19.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({serviceLineMinimumBalance: serviceLineMinBalance})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular ServiceLine Balance', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase20.patientName;
       const serviceLineBalance = patientservice.testcase20.serviceLineBalance;
       const patientClassification = patientservice.testcase20.patientClassification;
       const balance = patientservice.testcase20.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({serviceLineBalance: serviceLineBalance})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].patientClassification).toEqual(patientClassification); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Original Bill Date Range', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase21.patientName;
       const startDate = patientservice.testcase21.startDate;
       const endDate = patientservice.testcase21.endDate;
       const visit = patientservice.testcase21.visits;
       const balance = patientservice.testcase21.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({originalBillDate: {startDate: startDate, endDate: endDate}})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].visits).toEqual(visit); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for particular Doller Zero Date Range', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase22.patientName;
       const startDate = patientservice.testcase22.startDate;
       const endDate = patientservice.testcase22.endDate;
       const visit = patientservice.testcase22.visits;
       const balance = patientservice.testcase22.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({dollarZeroDate: {startDate: startDate, endDate: endDate}})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       //expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       //expect(jsonData.Data.dataObject[0].visits).toEqual(visit); 
       //expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       //expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})


test('Validation of Patient Service Api for particular Service Date Range', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase23.patientName;
       const startDate = patientservice.testcase23.startDate;
       const endDate = patientservice.testcase23.endDate;
       const visit = patientservice.testcase23.visits;
       const balance = patientservice.testcase23.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({originalBillDate: {startDate: startDate, endDate: endDate}})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].visits).toEqual(visit); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})


test('Validation of Patient Service Api for particular Last Exported Date Range', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase24.patientName;
       const startDate = patientservice.testcase24.startDate;
       const endDate = patientservice.testcase24.endDate;
       const visit = patientservice.testcase24.visits;
       const balance = patientservice.testcase24.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({originalBillDate: {startDate: startDate, endDate: endDate}})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].visits).toEqual(visit); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})

test('Validation of Patient Service Api for patient Date of Birth Range', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase25.patientName;
       const startDate = patientservice.testcase25.startDate;
       const endDate = patientservice.testcase25.endDate;
       const visit = patientservice.testcase25.visits;
       const balance = patientservice.testcase25.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({birthDate: {startDate: startDate, endDate: endDate}})     

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].visits).toEqual(visit); 
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       expect(jsonData.Data.dataObject[0].patientService.length).toBeGreaterThan(0);
      
   });
})


test('Validation of Patient Service Api for GroupBY None and Hide Patient Details true', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase26.patientName;
       const groupBy = patientservice.testcase26.groupBy;
       const hideDetails = patientservice.testcase26.hideDetails;
       const balance = patientservice.testcase26.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({groupBy: groupBy, hidePatientDetail: hideDetails})  
          

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
    
      
   });
})

test('Validation of Patient Service Api for GroupBY PatientClassification and Hide Patient Details true', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase27.patientName;
       const groupBy = patientservice.testcase27.groupBy;
       const hideDetails = patientservice.testcase27.hideDetails;
       const balance = patientservice.testcase27.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({groupBy: groupBy, hidePatientDetail: hideDetails})  

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       
      
   });
})

test('Validation of Patient Service Api for Hide Service Line Details true', async ({},testInfo) => {
    await test.step('Patient Service Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = patientservice.testcase28.patientName;
       const groupBy = patientservice.testcase28.groupBy;
       const hideServiceLineDetail = patientservice.testcase28.hideServiceLineDetail;
       const balance = patientservice.testcase28.balance;
       const payload = await apiEndpoint.generatePatientServicesPayload({groupBy: groupBy, hideServiceLineDetail: hideServiceLineDetail})  

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].totCharges).toEqual(balance);
       
      
   });
})

test('Validation of Patient Service Api for Wrong Start Date', async ({},testInfo) => {
    await test.step('Patient Service Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const startDate = patientservice.testcase29.startDate;
       const endDate = patientservice.testcase29.endDate;
       const payload = await apiEndpoint.generatePatientServicesPayload({birthDate: {startDate: startDate, endDate: endDate}})  

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(415);

       
      
   });
})

test('Validation of Patient Service Api for Wrong End Date', async ({},testInfo) => {
    await test.step('Patient Service Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-16');
       const header = { "Authorization": `Bearer ${authToken}`}
       const startDate = patientservice.testcase30.startDate;
       const endDate = patientservice.testcase30.endDate;
       const payload = await apiEndpoint.generatePatientServicesPayload({birthDate: {startDate: startDate, endDate: endDate}})  

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Patient Service Report', {
       body: body, 
       contentType: 'application/json'
       }); 
     
       expect(apiResponse.status).toBe(415);
       
      
   });
})
