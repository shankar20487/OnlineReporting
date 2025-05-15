import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import endpoint from '../config/endpoint';
import claimlist from '../test-data/api-requests/claimlist.json';
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
test('Validation of Claim List Api for Particular patient', async ({},testInfo) => {
     await test.step('Claim List Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
        const header = { "Authorization": `Bearer ${authToken}`}
        const patients = claimlist.testcase1.patientId
        const patientName = claimlist.testcase1.patientName;
        const payload = await apiEndpoint.generateClaimListReportPayload({patient: patients});
        const claimBillingProvider = claimlist.testcase1.claimBillingProvider;
        const claID = claimlist.testcase1.claID;

        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const body = await apiResponse.text();
        console.log(body); // See raw response
        
        // Try parsing manually
        const jsonData = JSON.parse(body);
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Claim List Report', {
        body: body, 
        contentType: 'application/json'
        }); 

      
        expect(apiResponse.status).toBe(200);
        expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
        expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);  
        expect(jsonData.Data.dataObject[0].claID).toEqual(claID);
       
    });
})


test('Validation of Claim List Api for the default values', async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patients = claimlist.testcase2.patientId
       const patientName = claimlist.testcase2.patientName;
       const payload = await apiEndpoint.generateClaimListReportPayload();
       const claimBillingProvider = claimlist.testcase2.claimBillingProvider;
       const claID = claimlist.testcase2.claID;

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);  
       expect(jsonData.Data.dataObject[0].claID).toEqual(claID);
      
   });
})

test('Validation of Claim List Api for the Paticular Patient Classification', async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientClassification = claimlist.testcase3.patientClassification
       const patientName = claimlist.testcase3.patientName;
       const payload = await apiEndpoint.generateClaimListReportPayload();
       const claimBillingProvider = claimlist.testcase2.claimBillingProvider;
       const claID = claimlist.testcase2.claID;

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);  
       expect(jsonData.Data.dataObject[0].claID).toEqual(claID);
      
   });
})


test('Validation of Claim List Api for the Paticular Account Starts With', async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const accountStartWith = claimlist.testcase4.accountStartWith
       const patientName = claimlist.testcase4.patientName;
       const payload = await apiEndpoint.generateClaimListReportPayload({acctStartsWith: accountStartWith});
       const claimBillingProvider = claimlist.testcase4.claimBillingProvider;
      

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);  
           
   });
})

test('Validation of Claim List Api for the Paticular Account Status Active', async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const activeStatus1 = claimlist.testcase5.activeStatus1
      
       const patientName = claimlist.testcase5.patientName;
       const claimBillingProvider = claimlist.testcase5.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({activeStatus: activeStatus1});
           

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);  
           
   });
})

test('Validation of Claim List Api for the Paticular Account Status InActive', async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const activeStatus1 = claimlist.testcase6.activeStatus1
     
       const claimBillingProvider = claimlist.testcase5.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({activeStatus: activeStatus1});
           

       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject.length).toEqual(0);
           
   });
})

test('Validation of Claim List Api for the particular Claim Bill to Payer', async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimPrimaryPayer = claimlist.testcase7.claimPrimaryPayer
       const patientName = claimlist.testcase7.patientName
       const payer = claimlist.testcase7.payer;
       const payload = await apiEndpoint.generateClaimListReportPayload({payer: [payer]});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimPrimaryPayer).toEqual(claimPrimaryPayer);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Minimum Insurance Balance', async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimPrimaryPayer = claimlist.testcase8.claimPrimaryPayer
       const patientName = claimlist.testcase8.patientName
       const insuranceMinBalance = claimlist.testcase8.insuranceMinBalance;
       const payload = await apiEndpoint.generateClaimListReportPayload({insuranceMinBalance: insuranceMinBalance});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimPrimaryPayer).toEqual(claimPrimaryPayer);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Claim Bill Sequence' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimBillSq = claimlist.testcase9.claimBillSq
       const patientName = claimlist.testcase9.patientName
       const claimBillingProvider = claimlist.testcase9.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({billToSequence: claimBillSq});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Claim Primary Payer' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimPrimaryPayer = claimlist.testcase10.claimPrimaryPayer
       const patientName = claimlist.testcase10.patientName
       const claimBillingProvider = claimlist.testcase10.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({claimPrimaryPayer: claimPrimaryPayer});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Claim Rendering Provider' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimRenderingProvider = claimlist.testcase11.claimRenderingProvider
       const patientName = claimlist.testcase11.patientName
       const claimBillingProvider = claimlist.testcase11.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({claimRenderingProvider: [claimRenderingProvider]});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Claim Billing Provider' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const claimRenderingProvider = claimlist.testcase12.claimRenderingProvider
       const patientName = claimlist.testcase12.patientName
       const claimBillingProvider = claimlist.testcase12.claimBillingProvider;
       const expectedClaimBillingProvider = claimlist.testcase12.expectedClaimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({claimBillingProvider: [claimBillingProvider]});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(expectedClaimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Claim Facility' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase13.patientName
       const claimBillingProvider = claimlist.testcase13.claimBillingProvider;
       const claimFacility = claimlist.testcase13.claimFacility;
       const payload = await apiEndpoint.generateClaimListReportPayload({facility: [claimFacility]});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Claim Ordering Provider' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase14.patientName
       const claimOrderingProvider = claimlist.testcase14.claimOrderingProvider;
       const claimBillingProvider = claimlist.testcase14.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({claimOrderingProvider: [claimOrderingProvider]});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Claim Minimum Balance' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase15.patientName
       const claimMinBalance = claimlist.testcase15.claimMinBalance;
       const claimBillingProvider = claimlist.testcase15.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({claimMinBalance: claimMinBalance});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the particular Patient Minimum Balance' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase16.patientName
       const patientMinBalance = claimlist.testcase16.patientMinBalance;
       const claimBillingProvider = claimlist.testcase16.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({patientMinBalance: patientMinBalance});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the printed Yes' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase17.patientName
       const print = claimlist.testcase17.print;
       const claimBillingProvider = claimlist.testcase17.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({printed: print});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Exported Yes' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase18.patientName
       const exported = claimlist.testcase18.exported;
       const claimBillingProvider = claimlist.testcase18.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({exported: exported});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Self Pay Yes' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase19.patientName
       const selfpay = claimlist.testcase19.selfpay;
       const claimBillingProvider = claimlist.testcase19.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({selfPay: selfpay});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Self Pay No' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase20.patientName
       const selfpay = claimlist.testcase20.selfpay;
       const claimBillingProvider = claimlist.testcase20.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({selfPay: selfpay});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Claim Min Balance' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase21.patientName
       const claimBalance = claimlist.testcase21.claimBalance;
       const claimBillingProvider = claimlist.testcase21.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({claimMinBalance: claimBalance});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Age More Than filter' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase22.patientName
       const agedMoreThan = claimlist.testcase22.agedMoreThan;
       const claimBillingProvider = claimlist.testcase22.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({agedMoreThan: agedMoreThan});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})



test('Validation of Claim List Api for the Original Bill Date Range Filter' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase23.patientName
       const startDate = claimlist.testcase23.startDate;
       const endDate = claimlist.testcase23.endDate;
       const claimBillingProvider = claimlist.testcase23.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({originalBillDate:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Doller Zero Date Range Filter' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase24.patientName
       const startDate = claimlist.testcase24.startDate;
       const endDate = claimlist.testcase24.endDate;
       const claimBillingProvider = claimlist.testcase24.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({dollarZeroDate:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})


test('Validation of Claim List Api for the Claim Created Date Range Filter' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase25.patientName
       const startDate = claimlist.testcase25.startDate;
       const endDate = claimlist.testcase25.endDate;
       const claimBillingProvider = claimlist.testcase25.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({claimCreatedDate:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the 1st DOS Date Range Filter' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase26.patientName
       const startDate = claimlist.testcase26.startDate;
       const endDate = claimlist.testcase26.endDate;
       const claimBillingProvider = claimlist.testcase26.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({firstDOS:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Last Exported Date Range Filter' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase27.patientName
       const startDate = claimlist.testcase27.startDate;
       const endDate = claimlist.testcase27.endDate;
       const claimBillingProvider = claimlist.testcase27.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({lastExportedDate:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Last Printed Date Range Filter' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase28.patientName
       const startDate = claimlist.testcase28.startDate;
       const endDate = claimlist.testcase28.endDate;
       const claimBillingProvider = claimlist.testcase28.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({lastPrintedDate:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Invoices Starts With' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase29.patientName
       const invoiceStartsWith = claimlist.testcase29.invoiceStartWith;
       const claimBillingProvider = claimlist.testcase29.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({invoiceStartsWith:invoiceStartsWith});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the default values with showServiceLineDetail True' , async ({},testInfo) => {
    await test.step('Claim List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase30.patientName
       const shwoDetails = claimlist.testcase30.shwoDetails;
       const claimBillingProvider = claimlist.testcase30.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({showServiceLineDetail:shwoDetails});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(200);
       expect(jsonData.Data.dataObject[0].claimBillingProvider).toEqual(claimBillingProvider);
       expect(jsonData.Data.dataObject[0].patFullNameCC).toEqual(patientName);   
   });
})

test('Validation of Claim List Api for the Wrong Start Date' , async ({},testInfo) => {
    await test.step('Claim List Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase31.patientName
       const startDate = claimlist.testcase31.startDate;
       const endDate = claimlist.testcase31.endDate;
       const claimBillingProvider = claimlist.testcase31.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({lastPrintedDate:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(415);
     
   });
})

test('Validation of Claim List Api for the Wrong End Date' , async ({},testInfo) => {
    await test.step('Claim List Api Negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-3');
       const header = { "Authorization": `Bearer ${authToken}`}
       const patientName = claimlist.testcase32.patientName
       const startDate = claimlist.testcase32.startDate;
       const endDate = claimlist.testcase32.endDate;
       const claimBillingProvider = claimlist.testcase32.claimBillingProvider;
       const payload = await apiEndpoint.generateClaimListReportPayload({lastPrintedDate:{ startDate: startDate, endDate: endDate}});
           
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const body = await apiResponse.text();
       console.log(body); // See raw response
       
       // Try parsing manually
       const jsonData = JSON.parse(body);
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Claim List Report', {
       body: body, 
       contentType: 'application/json'
       }); 

     
       expect(apiResponse.status).toBe(415);
       
   });
})