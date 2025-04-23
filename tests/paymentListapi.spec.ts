import { test, expect } from '@playwright/test';
import GenerateReportEndpoint from '../api_requests/GenerateReportEndpoint';
import db from '../utils/Database';
import endpoint from '../config/endpoint';
import paymentList from '../test-data/api-requests/paymentList.json'


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
test('Validation of payment List for Particular patient', async ({},testInfo) => {
     await test.step('payment List Api sucessful case and response validation', async () => {
        const url =`${endpoint.baseUrl}`;
        const patientId = paymentList.testcase1.patientId;
        const payId = paymentList.testcase1.payId;
        const patientOrPayerName = paymentList.testcase1.patientOrPayerName;
        const paymentMethod = paymentList.testcase1.paymentMethod;
        const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
        const header = { "Authorization": `Bearer ${authToken}`}
        const payload = await apiEndpoint.generatePaymentListPayload("","",false,"","",patientId);
        console.log(payload);
        const apiResponse = await apiEndpoint.generateReportApi(header,payload);
        const responseBody= await apiResponse.json();
        console.log(responseBody);
       
        
        // ✅ Attach API response to Playwright report
        await testInfo.attach('Payment Lists Api', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json'
        }); 

        //validate the json schema
        //const rawData = fs.readFileSync('schema/patientreceiptSchema.json', 'utf-8');
        //const jsonSchema = JSON.parse(rawData); 
        //const validator = new apivalidation();
        //const isValid = await validator.validateResponse(jsonSchema,responseBody);

       
        expect(apiResponse.status).toBe(200);
        expect(responseBody.Data.dataObject[0].payId).toBe(payId);
        expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
        expect(responseBody.Data.dataObject[0].paymentMethod).toBe(paymentMethod);
      
        //expect(isValid).toBe(true);
        
    });
})

test('Validation of payment List for Particular payment Method', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase2.patientId;
       const payId = paymentList.testcase2.payId;
       const patientOrPayerName = paymentList.testcase2.patientOrPayerName;
       const paymentMethod = paymentList.testcase2.paymentMethod;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayload("","",false,"","",patientId,"CASH");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
       expect(responseBody.Data.dataObject[0].paymentMethod).toBe(paymentMethod);
   
   });
})

test('Validation of payment List for filtering based on minimumBalance', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase3.patientId;
       const payId = paymentList.testcase3.payId;
       const patientOrPayerName = paymentList.testcase3.patientOrPayerName;
       const minimumBalance = paymentList.testcase3.minimumBalance;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayload("",minimumBalance,false,"","",patientId,"");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
       expect(responseBody.Data.dataObject[0].ledgers[0].charge).toBe(minimumBalance);
       expect(responseBody.Data.dataObject[0].ledgers[1].charge).toBe(minimumBalance);
   });
})

test('Validation of payment List for filtering based on minimumPaymentAmount', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase4.patientId;
       const payId = paymentList.testcase4.payId;
       const patientOrPayerName = paymentList.testcase4.patientOrPayerName;
       const minimumPaymentAmount = paymentList.testcase4.minimumPaymentAmount;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayload("",'',false,minimumPaymentAmount,"",patientId,"");
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
       expect(responseBody.Data.dataObject[0].paymentAmount).toBeGreaterThan(minimumPaymentAmount);
      
   });
})


test('Validation of payment List for filtering based on payer', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase6.patientId;
       const payId = paymentList.testcase6.payId;
       const patientOrPayerName = paymentList.testcase6.patientOrPayerName;
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2('',payId);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
     
      
   });
})

test('Validation of payment List for filtering based on payment Date Range', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase7.patientId;
       const payId = paymentList.testcase7.payId;
       const patientOrPayerName = paymentList.testcase7.patientOrPayerName;
       const startDate = paymentList.testcase7.startDate
       const endDate = paymentList.testcase7.endDate
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2(patientId,'',startDate,endDate);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
       expect(responseBody.Data.dataObject[0].ledgers).toHaveLength(2);
      
   });
})


test('Validation of payment List for filtering based on payment Ref', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase8.patientId;
       const payId = paymentList.testcase8.payId;
       const patientOrPayerName = paymentList.testcase8.patientOrPayerName;
       const startDate = paymentList.testcase8.startDate
       const endDate = paymentList.testcase8.endDate
       const paymentRef = paymentList.testcase8.paymentRef
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2(patientId,'',startDate,endDate,'',paymentRef);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
       expect(responseBody.Data.dataObject[0].reff).toBe(paymentRef)
      
   });
})


test('Validation of payment List for filtering based on payment Additional Ref', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase9.patientId;
       const payId = paymentList.testcase9.payId;
       const patientOrPayerName = paymentList.testcase9.patientOrPayerName;
       const startDate = paymentList.testcase9.startDate
       const endDate = paymentList.testcase9.endDate
       const paymentAddRef = paymentList.testcase9.paymentAddRef
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2(patientId,'',startDate,endDate,'','',paymentAddRef);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
       expect(responseBody.Data.dataObject[0].additionalRef).toBe(paymentAddRef)
      
   });
})

test('Validation of payment List for filtering based on payment Hide Disbustment is True', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
      
       const payId = paymentList.testcase10.payId;
       const patientOrPayerName = paymentList.testcase10.patientOrPayerName;
       const hideDisbustment = paymentList.testcase10.hideDisbustment
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayload("","",hideDisbustment);
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].patientOrPayerName).toBe(patientOrPayerName);
       expect(responseBody.Data.dataObject[0].type).toBe("payment")
      
   });
})


test('Validation of payment List for filtering based on Sort By patientOrPayerName,pmtDate', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
      
       const payId = paymentList.testcase11.payId;
       const patient = paymentList.testcase11.patientId
       const pmtDate = paymentList.testcase11.pmtDate;
       const sortby = paymentList.testcase11.sortby
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayload("","",false,"","",1,"",sortby)
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].patId).toBe(patient);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].pmtDate).toBe(pmtDate)
      
   });
})

test('Validation of payment List for filtering based on Disbustment Off and Sort By patientOrPayerName,pmtDate', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
      
       const payId = paymentList.testcase12.payId;
       const patient = paymentList.testcase12.patientId
       const pmtDate = paymentList.testcase12.pmtDate;
       const sortby = paymentList.testcase12.sortby
       const hideDisbustment = paymentList.testcase12.hideDisbustment;
       const pmtID1 = paymentList.testcase12.pmtId1
       const pmtID2 = paymentList.testcase12.pmtId2
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2("","","","","","","",sortby,hideDisbustment)
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].patId).toBe(patient);
       expect(responseBody.Data.dataObject[0].payId).toBe(payId);
       expect(responseBody.Data.dataObject[0].type).toBe("payment")
       expect(responseBody.Data.dataObject[0].pmtID).toBe(pmtID1)
       expect(responseBody.Data.dataObject[1].pmtID).toBe(pmtID2)
   });
})



test('Validation of payment List for filtering based on payment Source as Payer', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
      
       const payId = paymentList.testcase13.payId;
       const patient = paymentList.testcase13.patientId
       const paymentSource = paymentList.testcase13.paymentSource;
       const sortby = paymentList.testcase13.sortby
       const patientOrPayerName = paymentList.testcase13.patientOrPayerName
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2("",16,"","",paymentSource,'','',sortby)
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[2].patId).toBe(patient);
       expect(responseBody.Data.dataObject[2].payId).toBe(payId);
       expect(responseBody.Data.dataObject[2].patientOrPayerName).toBe(patientOrPayerName)
       expect(responseBody.Data.dataObject[2].isPayer).toBe(true)
       
})

})

test('Validation of payment List with Disbustment off for filtering based on payment Source as Payer', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const payId = paymentList.testcase14.payId;
       const patient = paymentList.testcase14.patientId
       const paymentSource = paymentList.testcase14.paymentSource;
       const sortby = paymentList.testcase14.sortby
       const patientOrPayerName = paymentList.testcase14.patientOrPayerName
       const hideDisbusementDetails = paymentList.testcase14.hideDisbusementDetails

       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2("","","","",paymentSource,'','',sortby,hideDisbusementDetails)
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[2].patId).toBe(patient);
       expect(responseBody.Data.dataObject[2].payId).toBe(payId);
       expect(responseBody.Data.dataObject[2].isPayer).toBe(true)
       
})

})

test('Validation of payment List for filtering based on payment Source as Patient and paymentNote', async ({},testInfo) => {
    await test.step('payment List Api sucessful case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase15.patientId;
       const paymentNote = paymentList.testcase15.paymentNote

       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2(patientId,"","","","",'','',"",false,paymentNote)
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject[0].patId).toBe(patientId);
       expect(responseBody.Data.dataObject[0].note).toBe(paymentNote)
       expect(responseBody.Data.dataObject[0].isPayer).toBe(false)
       
})

})


test('Validation of payment List for filtering based on Patient Id which is not exist', async ({},testInfo) => {
    await test.step('payment List Api negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase16.patientId;
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2(patientId,"","","","",'','',"")
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject).toHaveLength(0);
   
       
})

})


test('Validation of payment List for filtering based on Payer Id which is not exist', async ({},testInfo) => {
    await test.step('payment List Api negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase17.patientId;
       const payId = paymentList.testcase17.payId;
      
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2("",payId,"","","",'','',"")
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(200);
       expect(responseBody.Data.dataObject).toHaveLength(0);
   
       
})

})


test('Validation of payment List for filtering based on wrong StartDate', async ({},testInfo) => {
    await test.step('payment List Api negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase18.patientId;
       const startDate = paymentList.testcase18.startDate;
       const endDate = paymentList.testcase18.endDate;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2("","",startDate,endDate,"",'','',"")
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(415);
         
       
})

})

test('Validation of payment List for filtering based on wrong EndDate', async ({},testInfo) => {
    await test.step('payment List Api negative case and response validation', async () => {
       const url =`${endpoint.baseUrl}`;
       const patientId = paymentList.testcase19.patientId;
       const startDate = paymentList.testcase19.startDate;
       const endDate = paymentList.testcase19.endDate;
       const apiEndpoint = new GenerateReportEndpoint(url,'EZR-18');
       const header = { "Authorization": `Bearer ${authToken}`}
       const payload = await apiEndpoint.generatePaymentListPayloadV2("","",startDate,endDate,"",'','',"")
    
       console.log(payload);
       const apiResponse = await apiEndpoint.generateReportApi(header,payload);
       const responseBody= await apiResponse.json();
       console.log(responseBody);
      
       
       // ✅ Attach API response to Playwright report
       await testInfo.attach('Payment Lists Api', {
       body: JSON.stringify(responseBody, null, 2),
       contentType: 'application/json'
       }); 

       expect(apiResponse.status).toBe(415);
         
       
})

})