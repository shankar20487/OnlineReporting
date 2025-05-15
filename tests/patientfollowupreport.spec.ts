import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { PatientFollowupPage } from '../pages/PatientFollowupPage';

const reportName = "Patient Followup";

test.beforeEach('Running before Each test', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    await loginpage.goto();
    await loginpage.login(userName, pasword);
});

test('Validation of Report generation and download without filter in Patient Followup Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("Patient, Brooks D");
    });
});

test('Validation of Report generation of Patient Followup Report with filter as patient', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting Patient as Filters', async () => {
        await patientFollowupPage.selectandCancelPatient(true, "Patient, Brooks");
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("Patient, Brooks D");
    });
});

test('Validation of Report generation of Patient Followup Report with filter as Minimum Statement from Last patient Payment', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting Minimum Statement as Filters', async () => {
        await patientFollowupPage.setReportOption("2", "", "", "", "");
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("Wagner, Andrew");
    });
});

test('Validation of Report generation of Patient Followup Report with filter as Aged More Days', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting Aged More Days as Filters', async () => {
        await patientFollowupPage.setReportOption("", "120", "", "", "");
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("Test, Patient");
    });
});

test('Validation of Report generation of Patient Followup Report with filter as Patient Classification', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting Patient Classification as Filters', async () => {
        await patientFollowupPage.setReportOption("", "", "", "GENERAL GROUP", "");
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("Wagner4");
    });
});

test('Validation of Report generation of Patient Followup Report with filter as Service Date Range', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Service Date Range as Filters', async () => {
        await patientFollowupPage.setReportOption("", "", "", "", "02/06/2021", "03/02/2025");
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await patientFollowupPage.VerifySpecificPatientInReportandDownloadToPdf("Patient, Brooks D");
    });
});

test('Validation of Sorting based on Column Values for patient Follow up Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the sorting based on patient name', async () => {
        await patientFollowupPage.sortReportByColumnName("patientname");
        const patientName = await patientFollowupPage.getsortedValueByColumnName("patientname");
        expect(patientName).toBe("Adam, West");
    });

    await test.step('Verify the sorting based on DOB', async () => {
        await patientFollowupPage.sortReportByColumnName("dob");
        const patientName = await patientFollowupPage.getsortedValueByColumnName("dob");
        expect(patientName).toBe("1/5/1970");
    });

    await test.step('Verify the and sorting by Phone No', async () => {
        await patientFollowupPage.sortReportByColumnName("phone");
        const patientName = await patientFollowupPage.getsortedValueByColumnName("phone");
        expect(patientName).toBe("(951) 234-6841");
    });

    await test.step('Verify the and sorting by Last Payment Date', async () => {
        await patientFollowupPage.sortReportByColumnName("lastpatientpayment");
        const patientName = await patientFollowupPage.getsortedValueByColumnName("lastpatientpayment");
        expect(patientName).toBe("4/22/2025");
    });

    await test.step('Verify the and sorting by Patient Balance', async () => {
        await patientFollowupPage.sortReportByColumnName("patientbalance");
        const patientName = await patientFollowupPage.getsortedValueByColumnName("patientbalance");
        expect(patientName).toBe("$1599.00");
    });
});

test('Validation of Search based on Column Values for patient Follow up Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the search based on patient name', async () => {
        const expectedPatientName = "Adam, West";
        const actualPatientName =await patientFollowupPage.validateSearchbasedOnColumn("patientname",expectedPatientName);
        expect(actualPatientName).toBe(expectedPatientName);
    });

    await test.step('Verify the search based on patient Date Of Birth', async () => {
        const expectedDob = "10/6/1947";
        const actualDob =await patientFollowupPage.validateSearchbasedOnColumn("dob",expectedDob);
        expect(actualDob).toBe(expectedDob);
    });

    await test.step('Verify the search based on patient Phone Number', async () => {
        const expectedPhoneNumber = "(555) 211-5000";
        const actualPhoneNumber =await patientFollowupPage.validateSearchbasedOnColumn("phone",expectedPhoneNumber);
        expect(actualPhoneNumber).toBe(expectedPhoneNumber);
    });

    await test.step('Verify the search based on patient Phone Balance', async () => {
        const expectedBalance = "1599";
        const actualBalance =await patientFollowupPage.validateSearchbasedOnColumn("balance",expectedBalance);
        expect(actualBalance).toBe("$1599.00");
    });

});


test('Validation of Search based on transaction for Patient  for patient Follow up Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the search based on Proc Code,DOS and Aging', async () => {
        const expectedProcCode= "90834";
        const expectedDos= "9/4/2024";
        const expectedAging= "10/4/2024";
        const isavaiable =await patientFollowupPage.VerifySpecificTransactionDetailsPatient("Adam, West",expectedProcCode,expectedDos,expectedAging);
        expect(isavaiable).toBe(true);
    });

});


test('Validation of Pdf File  for patient Follow up Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const patientFollowupPage = new PatientFollowupPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await patientFollowupPage.generateReport();
    });

    await test.step('Verify the Content of DownLoaded Pdf', async () => {
        const expectedHeader ="Community Counseling";
        const totalBalance = "$2,423.00";
        const expectedColumns = ["Patient Name","DOB","Phone No","Proc Code","DOS","Aging Date","Patient Balance"];
        const isAvailable = await patientFollowupPage.VerifyDownloadedPdf(expectedHeader,expectedColumns,totalBalance);
         expect(isAvailable).toBeTruthy();
    });

});

