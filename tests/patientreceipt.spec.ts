import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { PatientReceiptPage } from '../pages/PatientReceiptPage';

const reportName = "Patient Receipt";
test.beforeAll('Running before all tests', () => {
    
})

// Write a test



test('Validation of Report generation and download without filter in Patient Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
   
   
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
        await patientReceiptPage.generateReport(false);
       
    });

    
    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientReceiptPage.VerifySpecificPatientInReportandDownloadToPdf("Wagner");
        
    });

})

test('Validation of Patient Receipt Report generation for particular patient', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    
   
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

    await test.step(' Generate Report With Selecting Specific Patient with different Filters', async () => {
        //await patientReceiptPage.searchPatient("Andrew, Wagner");
        await patientReceiptPage.selectandCancelPatient(true,"Wagner");
        await patientReceiptPage.generateReportSpecificPeriod("Andrew, Wagner","","","");
       
    });

    await test.step('Verify the Report is generated for particular patient', async () => {
        const count = await patientReceiptPage.VerifySpecificPatientInReportSection("Wagner");
        expect(count).toBe(1);
    });
})

test('Validation of Report generation and download with filter in Patient Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    
   
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
        await patientReceiptPage.generateReport(true);
       
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientReceiptPage.VerifySpecificPatientInReportandDownloadToPdf("Wagner");
       
    });
})


test('Validation of Report for search Specific Date Range from the Patient Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
   
   
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
        const startDate ='2015-01-01';
        const endDate = '2025-12-31';
        await patientReceiptPage.generateReportSpecificPeriod(startDate,endDate,"");
       
    });
    await test.step('Verify the transaction specfic Date Range', async () => {
        await patientReceiptPage.gotoTransactionForSpecificPatient("Patient, Brooks D")
        const transactionDate = await patientReceiptPage.getTransctionDetails("transactionDate");
        expect(transactionDate[0]).toBe('1/15/2016')
    });
})



test('Validation of Report for search Specific transaction based on transactionID from the Patient Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
   
   
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
        const startDate ='2015-01-01';
        const endDate = '2025-12-31';
        await patientReceiptPage.generateReportSpecificPeriod(startDate,endDate,"2152412145");
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const payment = await patientReceiptPage.VerifySpecificTransactionDetailsByTransactionId("Patient, Brooks D");
        expect(payment).toEqual("2152412145");
    });
})


test('Validation of Report for search Specific transaction based on aditionalInfo from the Patient Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;

   
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
        await patientReceiptPage.generateReportSpecificPeriod(startDate,endDate,"","...5454");
       
    });

    await test.step('Verify the and transaction Details for the patient', async () => {
        const addInfomation = await patientReceiptPage.VerifySpecificTransactionDetailsByAddInfo("Patient, Brooks D","...5454");
        expect(addInfomation).toContain("5454");
    });
})


test('Validation of Report for sorting of report columns by name,adress of Patient Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    
   
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
        await patientReceiptPage.generateReportSpecificPeriod(startDate,endDate,"","");
       
    });

    await test.step('Verify the and sorting  patient by name', async () => {
       await patientReceiptPage.sortReportByColumnName("name");
       const patientName = await patientReceiptPage.getsortedValueByColumnName("name");
       expect(patientName).toBe("Patient, Brooks D")
    });
    await test.step('Verify the and sorting  patient by address', async () => {
        await patientReceiptPage.sortReportByColumnName("address");
        const patientName = await patientReceiptPage.getsortedValueByColumnName("address");
        expect(patientName).toBe("909 GREEN NEW STREET ")
     });
})


test('Validation of Report for sorting of report columns by phone,city of Patient Receipt Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientReceiptPage = new PatientReceiptPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
   
   
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
        await patientReceiptPage.generateReportSpecificPeriod(startDate,endDate,"","");
       
    });

    await test.step('Verify the and sorting  patient by name', async () => {
       await patientReceiptPage.sortReportByColumnName("phone");
       const phoneNum = await patientReceiptPage.getsortedValueByColumnName("phone");
       expect(phoneNum).toBe("9512346841")
    });
    await test.step('Verify the and sorting  patient by address', async () => {
        await patientReceiptPage.sortReportByColumnName("");
        const patientAmount = await patientReceiptPage.getsortedValueByColumnName("");
        expect(patientAmount).toBe("$25.00")
     });
})

