import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { EzclaimPayReportPage } from '../pages/EzclaimPayReportPage';


test.beforeAll('Running before all tests', () => {
   
})

// Write a test
test('Validation of search patient in ezclaim Pay Receipt Report ', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Setting up filter options and select specific patient', async () => {
        await ezclaimpayreceiptpage.searchPatient("api");
        await ezclaimpayreceiptpage.selectandCancelPatient(true);
        
    });
})


test('Validation of search patient Pagination and Cancel Button in ezclaim Pay Receipt Report ', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Setting up filter options and select specific patient', async () => {
        await ezclaimpayreceiptpage.searchPatient("api");
        await ezclaimpayreceiptpage.verifyPaginationOfPatient();
        await ezclaimpayreceiptpage.selectandCancelPatient(false);
        
    });
})


test('Validation of Report generation and download without filter in ezclaim Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting any Filters', async () => {
        await ezclaimpayreceiptpage.generateReport(false);
       
    });

    
    await test.step('Verify the Report is generated and download Properly', async () => {
        await ezclaimpayreceiptpage.VerifySpecificPatientInReportandDownloadToPdf("Andrew, Wagner");
        
    });

})

test('Validation of Report generation and download multiple pdfs without filter in ezclaim Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting any Filters', async () => {
        await ezclaimpayreceiptpage.generateReport(false);
       
    });

    
    await test.step('Verify the Report is generated and download Properly', async () => {
        await ezclaimpayreceiptpage.VerifySpecificPatientInReportandDownloadToPdf("Andrew, Wagner");
        await ezclaimpayreceiptpage.VerifySpecificPatientInReportandDownloadToPdf("Westen, Michael");
    });

})


test('Validation of Report generation and few transaction Details in ezclaim Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting any Filters', async () => {
        await ezclaimpayreceiptpage.generateReport(false);
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const trasactionDetails = await ezclaimpayreceiptpage.VerifySpecificPatientFirstTransactionDetails("Andrew, Wagner");
        console.log(trasactionDetails);
        expect(trasactionDetails.length).toEqual(3);
        expect(trasactionDetails[0]).toEqual("2162900566");
        expect(trasactionDetails[1]).toEqual("2162901734");
        expect(trasactionDetails[2]).toEqual("2163095549");
    });
})

test('Validation of Report generation and download with filter in ezclaim Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        await ezclaimpayreceiptpage.generateReport(true);
       
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await ezclaimpayreceiptpage.VerifySpecificPatientInReportandDownloadToPdf("Andrew, Wagner");
       
    });
})


test('Validation of Report for Specific Period of time the Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        const startDate ='2021-01-01';
        const endDate = '2025-12-31';
        await ezclaimpayreceiptpage.generateReportSpecificPeriod(startDate,endDate);
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const trasactionDetails = await ezclaimpayreceiptpage.VerifySpecificPatientFirstTransactionDetails("Andrew, Wagner");
        console.log(trasactionDetails);
        expect(trasactionDetails.length).toEqual(3);
        expect(trasactionDetails[0]).toEqual("2162900566");
        expect(trasactionDetails[1]).toEqual("2162901734");
        expect(trasactionDetails[2]).toEqual("2163095549");
    });
})

test('Validation of Report for search Specific transaction based on payment type Mastercard from the Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        const startDate ='2021-01-01';
        const endDate = '2025-12-31';
        await ezclaimpayreceiptpage.generateReportSpecificPeriod(startDate,endDate);
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const payment = await ezclaimpayreceiptpage.VerifySpecificTransactionDetailsByPaymentMethod("Andrew, Wagner","MasterCard");
        expect(payment).toEqual("Mastercard");
        const payment2 = await ezclaimpayreceiptpage.VerifySpecificTransactionDetailsByPaymentMethod("Andrew, Wagner","Cash");
        expect(payment2).toEqual("CASH");
    });
})

   


test('Validation of Report for search Specific transaction based on transactionID from the Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        const startDate ='2021-01-01';
        const endDate = '2025-12-31';
        await ezclaimpayreceiptpage.generateReportSpecificPeriod(startDate,endDate,"2149708444");
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const payment = await ezclaimpayreceiptpage.VerifySpecificTransactionDetailsByTransactionId("Andrew, Wagner","2149708444");
        expect(payment).toEqual("2149708444");
    });
})


test('Validation of Report for search Specific transaction based on aditionalInfo from the Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        const startDate ='2021-01-01';
        const endDate = '2025-12-31';
        await ezclaimpayreceiptpage.generateReportSpecificPeriod(startDate,endDate,"","5454");
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const addInfomation = await ezclaimpayreceiptpage.VerifySpecificTransactionDetailsByAddInfo("Andrew, Wagner","5454");
        expect(addInfomation).toContain("5454");
    });
})


test('Validation of Report for sorting of report columns by name,adress of Ezclaim Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        const startDate ='2021-01-01';
        const endDate = '2025-12-31';
        await ezclaimpayreceiptpage.generateReportSpecificPeriod(startDate,endDate,"","5454");
       
    });

    await test.step('Verify the and sorting  patient by name', async () => {
       await ezclaimpayreceiptpage.sortReportByColumnName("name");
       const patientName = await ezclaimpayreceiptpage.getsortedValueByColumnName("name");
       expect(patientName).toBe("Andrew, Wagner")
    });
    await test.step('Verify the and sorting  patient by address', async () => {
        await ezclaimpayreceiptpage.sortReportByColumnName("address");
        const patientName = await ezclaimpayreceiptpage.getsortedValueByColumnName("address");
        expect(patientName).toBe("sdfasdf ")
     });
})

test('Validation of Report for sorting of report columns by phone,city of Ezclaim Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        const startDate ='2021-01-01';
        const endDate = '2025-12-31';
        await ezclaimpayreceiptpage.generateReportSpecificPeriod(startDate,endDate,"","5454");
       
    });

    await test.step('Verify the and sorting  patient by name', async () => {
       await ezclaimpayreceiptpage.sortReportByColumnName("phone");
       const phoneNum = await ezclaimpayreceiptpage.getsortedValueByColumnName("phone");
       expect(phoneNum).toBe("9512346841")
    });
    await test.step('Verify the and sorting  patient by address', async () => {
        await ezclaimpayreceiptpage.sortReportByColumnName("");
        const patientadd = await ezclaimpayreceiptpage.getsortedValueByColumnName("");
        expect(patientadd).toBe("TAYLOR, MI 48855")
     });
})

test('Validation of Report for search the transaction for non-existing transactionID from the Pay Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const ezclaimpayreceiptpage = new EzclaimPayReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "EZClaim Pay Receipt";
   
    await test.step('Go to URL', async () => {
        await loginpage.goto();
    });

    await test.step('Login using credentials', async () => {
        await loginpage.login(userName,pasword);
    });
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting with different Filters', async () => {
        const startDate ='2021-01-01';
        const endDate = '2025-12-31';
        await ezclaimpayreceiptpage.generateReportSpecificPeriod(startDate,endDate,"2149708444");
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const data = await ezclaimpayreceiptpage.VerifySpecificTransactionDetailsByTransactionId("Andrew, Wagner","21497084441234");
        expect(data).toEqual("");
    });
})
