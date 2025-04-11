import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { PatientLedgerReportPage } from '../pages/PatientLedgerReportPage';

const reportName = "Patient Ledger";
test.beforeEach('Running before Each test',async ({page}) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    await loginpage.goto();
    await loginpage.login(userName,pasword);
    await homepage.changeCompanyProfile("Iteris");

   
})

// Write a test
test('Validation of search patient in Patient Leadger Report ', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientLedgerPage = new PatientLedgerReportPage(page);
 
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Setting up filter options and select specific patient', async () => {
        await patientLedgerPage.searchPatient("api");
        await patientLedgerPage.selectandCancelPatient(true);
        
    });
})


test('Validation of search patient Pagination and Cancel Button in patient Ledger Report ', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientLedgerPage = new PatientLedgerReportPage(page);
 
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Setting up filter options and select specific patient', async () => {
        await patientLedgerPage.searchPatient("api");
        await patientLedgerPage.verifyPaginationOfPatient();
        await patientLedgerPage.selectandCancelPatient(false);
        
    });
})

test('Validation of Report generation and download without filter in Patient Ledger Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientLedgerPage = new PatientLedgerReportPage(page);
 
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting any Filters', async () => {
        await patientLedgerPage.generateReport();
        
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientLedgerPage.VerifySpecificPatientInReportandDownloadToPdf("Andrew, Wagner");
        
    });

});



test('Validation of Report generation for particular patient', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientleadgerpage = new PatientLedgerReportPage(page);
 
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting Specific Patient with different Filters', async () => {
        await patientleadgerpage.searchPatient("Andrew, Wagner");
        await patientleadgerpage.selectandCancelPatient(true);
        await patientleadgerpage.generateReport("Andrew, Wagner","","02/03/2022","02/03/2025");
       
    });

    await test.step('Verify the Report is generated for particular patient', async () => {
        const count = await patientleadgerpage.VerifySpecificPatientInReportSection("Andrew, Wagner");
        expect(count).toBe(1);
    });
})





test('Validation of Report generation for particular patient Classfication', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientleadgerpage = new PatientLedgerReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting Specific Patient with different Filters', async () => {
       
        await patientleadgerpage.generateReport("SECONDARY","SECONDARY","","02/03/2022","02/03/2025");
       
    });

    await test.step('Verify the Report is generated for particular patient', async () => {
        const count = await patientleadgerpage.VerifySpecificPatientInReportSection("SECONDARY, PATIENT S");
        expect(count).toBe(1);
    });
})

test('Validation of Report generation based on Account Starts with', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientleadgerpage = new PatientLedgerReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting Specific Patient with different Filters', async () => {
       
        await patientleadgerpage.generateReport("SECONDARY","","","02/03/2022","02/03/2025","1002");
       
    });

    await test.step('Verify the Report is generated for particular patient', async () => {
        const count = await patientleadgerpage.VerifySpecificPatientInReportSection("SMITH, JOHN D");
        expect(count).toBe(1);
    });
})


test('Validation of Report generation based on Date Range', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientleadgerpage = new PatientLedgerReportPage(page);
 
    
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting Specific Patient with different Filters', async () => {
        await patientleadgerpage.generateReport("SECONDARY","","CUSTOM","02/03/2021","02/03/2025","1002");
       
    });

    await test.step('Verify the transaction specfic Date Range', async () => {
        await patientleadgerpage.gotoTransactionForSpecificPatient("SMITH, JOHN D")
        const transactionDate = await patientleadgerpage.getTransctionDetails("transactionDate");
        expect(transactionDate[0]).toBe('8/2/2021')
    });
})

test('Validation of Report generation based on Multiple Filter Options', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientleadgerpage = new PatientLedgerReportPage(page);
   
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting Specific Patient with different Filters', async () => {
        await patientleadgerpage.searchPatient("Andrew, Wagner");
        await patientleadgerpage.selectandCancelPatient(true);
        await patientleadgerpage.generateReport("Andrew, Wagner","","CUSTOM","02/03/2021","02/03/2025");
    });

    await test.step('Verify the Patients are avaiable in report Section', async () => {
        const count = await patientleadgerpage.VerifySpecificPatientInReportSection("Andrew, Wagner");
        expect(count).toBe(1);
    });
})

