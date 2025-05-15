import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { InsuranceFollowupPage } from '../pages/InsuranceFollowupPage';

const reportName = "Insurance Followup";

test.beforeEach('Running before Each test', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    await loginpage.goto();
    await loginpage.login(userName, pasword);
});

test('Validation of Report generation and download without filter Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await insuranceFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("AETNA");
    });
});

test('Validation of Report generation based on Sepecific Patient Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await insuranceFollowupPage.selectandCancelPatient(true,"Patient, Brooks")
        await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await insuranceFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("AETNA");
    });
});

test('Validation of Report generation based on Sepecific Patient classification Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await insuranceFollowupPage.selectPatientClassification("GENERAL GROUP");
        await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await insuranceFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("BLUE CROSS");
    });
});


test('Validation of Report generation based on Sepecific Payer Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await insuranceFollowupPage.selectPatientClassification("GENERAL GROUP");
        await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await insuranceFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("BLUE CROSS");
    });
});

test('Validation of Report generation based on Specific Facility Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await insuranceFollowupPage.selectFacility("EZCLAIM MEDICAL FACILITY");
        await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await insuranceFollowupPage.VerifySpecificPatientInReportSection("BLUE CROSS");
    });
});

test.skip('Validation of Report generation based on Specific Payer Classification Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        //await insuranceFollowupPage.selectPatientClassification("BLUE CROSS");
        await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await insuranceFollowupPage.VerifySpecificPatientInReportSection("BLUE CROSS");
    });
});

test('Validation of Report generation based on Specific ServiceDate Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await insuranceFollowupPage.setServiceDate("2021-01-01", "2024-12-31");
        await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await insuranceFollowupPage.VerifySpecificPatientInReportSection("BLUE CROSS");
    });
});

test('Validation of Pdf file for Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
           await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the connt of the generated Report', async () => {
        const expectedHeader ="Community Counseling";
        const totalBalance = "$4,652.00";
        const expectedColumns = ["Patient Name","DOB","Insured ID","Proc Code","DOS","Balance"];
        const isAvailable = await insuranceFollowupPage.VerifyDownloadedPdf(expectedHeader,expectedColumns,totalBalance);
         expect(isAvailable).toBeTruthy();
    });
});


test('Validation of Sorting  of Online Display for Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
           await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Sorting based on Payer Name of generated Report', async () => {
        await insuranceFollowupPage.sortReportByColumnName("payer");
        const sortedPayerName = await insuranceFollowupPage.getsortedValueByColumnName("payer");
        expect(sortedPayerName).toEqual("AARP");
    });
    await test.step('Verify the Sorting based on Phone NO of generated Report', async () => {
        await insuranceFollowupPage.sortReportByColumnName("phone");
        const sortedPayerName = await insuranceFollowupPage.getsortedValueByColumnName("phone");
        expect(sortedPayerName).toEqual("(248) 555-0904");
    });
});


test('Validation of Search Payer,Phone of Online Display for Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
           await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the Search based on Payer Name of generated Report', async () => {
        const expectedPayerName = "HUMANA";
        const actualPayerName =await insuranceFollowupPage.validateSearchbasedOnColumn("payer",expectedPayerName);
        expect(actualPayerName).toBe(expectedPayerName);
    });
    await test.step('Verify the Sorting based on Phone NO of generated Report', async () => {
        const expectedPhoneNo = "(248) 650-0904";
        const actualPhoneNo =await insuranceFollowupPage.validateSearchbasedOnColumn("phone",expectedPhoneNo);
        expect(actualPhoneNo).toBe(expectedPhoneNo);
    });
});

test('Validation of Transaction Details of Payer for Insurance Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const insuranceFollowupPage = new InsuranceFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
           await insuranceFollowupPage.generateReport();
    });

    await test.step('Verify the transaction based on Payer Name of generated Report', async () => {
        const expectedPayerName = "BLUE CROSS";
        const expectedProcCode = "90834";
        const expectedInsurance = "A999884444";
        const expectedBalance="$50.00"
        const isValid =await insuranceFollowupPage.VerifySpecificTransactionDetailsPayer(expectedPayerName,expectedProcCode,expectedInsurance,expectedBalance);
        expect(isValid).toBe(true)
    });
   
});