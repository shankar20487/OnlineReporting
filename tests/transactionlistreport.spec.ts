import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { TransactionListReportPage } from '../pages/TransactionListReportPage';

const reportName = "Transaction List";

test.beforeEach('Running before Each test', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    await loginpage.goto();
    await loginpage.login(userName, pasword);
});

test('Validation of Report generation and download without filter in Transaction List Report', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {
        await transactionListPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Patient, Brooks D");
    });
});

test('Validation of Report generation of Transaction List Report with filter as patient', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting Patient as Filters', async () => {
        await transactionListPage.selectandCancelPatient(true, "Patient, Brooks");
        await transactionListPage.generateReport();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Patient, Brooks D");
    });
});

test('Validation of Report generation of Transaction List Report with filter as TransactionType', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting Patient Payment as Filters', async () => {
        await transactionListPage.setTranscactionType("Patient payment");
        await transactionListPage.generateReport();
        await transactionListPage.resetTranscactionType("Patient payment");
    });
    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Wagner, Andrew S");
    });
    await test.step('Generate Report With Selecting Payer Payment as Filters', async () => {
        await transactionListPage.setTranscactionType("Payer payment");
        await transactionListPage.generateReport();
        await transactionListPage.resetTranscactionType("Payer payment");
    });
    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("MEDICARE");
    });
    await test.step('Generate Report With Selecting Changes as Filters', async () => {
        await transactionListPage.setTranscactionType("Charges");
        await transactionListPage.generateReport();
        await transactionListPage.resetTranscactionType("Charges");
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Adam, West");
    });
    await test.step('Generate Report With Selecting Contract Adjustment as Filters', async () => {
        await transactionListPage.setTranscactionType("Contract Adjustments");
        await transactionListPage.generateReport();
        await transactionListPage.resetTranscactionType("Contract Adjustments");
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Adam, West");
    });

    await test.step('Generate Report With Selecting Patient Payment as Filters', async () => {
        await transactionListPage.setTranscactionType("Other Adjustments");
        await transactionListPage.generateReport();
        await transactionListPage.resetTranscactionType("Other Adjustments");
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Adam, West");
    });

});

test('Validation of Report generation of Transaction List Report with filter as Transaction Date', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting transaction Date as Filters', async () => {
         const startDate = '01/01/2020';
         const endDate = '01/01/2025';
        await transactionListPage.setTransactionDate(startDate, endDate);
        await transactionListPage.generateReport();
        
    });
    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Wagner, Andrew S");
    });


});

test('Validation of Report generation of Transaction List Report with filter as Created Date', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report With Selecting transaction Date as Filters', async () => {
         const startDate = '01/01/2020';
         const endDate = '01/01/2025';
        await transactionListPage.setCreatedDate(startDate, endDate);
        await transactionListPage.generateReport();
        
    });
    await test.step('Verify the Report is generated and download Properly', async () => {
        await transactionListPage.VerifySpecificPatientInReportandDownloadToPdf("Wagner, Andrew S");
    });


});

test('Validation of Pdf report for Transaction List Report ', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);

    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });

    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step('Generate Report Without Selecting any Filters', async () => {

        await transactionListPage.generateReport();
        
    });
    await test.step('Verify the PDF Report is generated and download Properly', async () => {
        const expectedHeader ="Community Counseling";
        const charges = ":$8,882.50";
        const expectedColumns = ["Patient Name","Reference","Charges","Patient Payment","Contract","Payment"];
        const isAvailable = await transactionListPage.VerifyDownloadedPdf(expectedHeader,expectedColumns,charges);
         expect(isAvailable).toBeTruthy();
    });


});

test.only('Validation of Report using group by of the Transaction List Report', async ({ page }) => {

    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);
   
   
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await transactionListPage.fillGroupByDetails("Month Year");
          await transactionListPage.generateReport();
       
    });

    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Month Year:";
        const actualcolumn = await transactionListPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });
    await test.step(' Generate Report With Selecting any Filters', async () => {
        await transactionListPage.fillGroupByDetails("Day",2,"Month Year");
          await transactionListPage.generateReport();
       
    });
    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Day:";
        const actualcolumn = await transactionListPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await transactionListPage.fillGroupByDetails("Name",2,"Day");
          await transactionListPage.generateReport();
       
    });
    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Patient Name:";
        const actualcolumn = await transactionListPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await transactionListPage.fillGroupByDetails("Transaction Type",2,"Name");
          await transactionListPage.generateReport();
       
    });
    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Transaction Type:";
        const actualcolumn = await transactionListPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });
});

test.only('Validation of Report Sorting of the Transaction List Report', async ({ page }) => {

    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const transactionListPage = new TransactionListReportPage(page);
   
   
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
       await transactionListPage.generateReport();
       
    });

    await test.step('Verify the and sorting by  patient name', async () => {
        await transactionListPage.sortReportByColumnName("patientname");
        const patientName = await transactionListPage.getsortedValueByColumnName("patientname");
        expect(patientName).toBe("Adam, West");
     });
     await test.step('Verify the and sorting by Refernce Number', async () => {
        await transactionListPage.sortReportByColumnName("reference");
        const patientName = await transactionListPage.getsortedValueByColumnName("reference");
        expect(patientName).toBe("J2501");
     });
     await test.step('Verify the and sorting by transaction Number', async () => {
        await transactionListPage.sortReportByColumnName("transactiondate");
        const patientName = await transactionListPage.getsortedValueByColumnName("transactiondate");
        expect(patientName).toBe("6/20/2013");
     });
     await test.step('Verify the and sorting by transaction Number', async () => {
        await transactionListPage.sortReportByColumnName("charges");
        const patientName = await transactionListPage.getsortedValueByColumnName("charges");
        expect(patientName).toBe("$1,099.00");
     });
     await test.step('Verify the and sorting by Insurance Payment', async () => {
        await transactionListPage.sortReportByColumnName("insuranace");
        const patientName = await transactionListPage.getsortedValueByColumnName("insuranace");
        expect(patientName).toBe("$115.00");
     });
     await test.step('Verify the and sorting by Patient Payment', async () => {
        await transactionListPage.sortReportByColumnName("patientpayment");
        const patientName = await transactionListPage.getsortedValueByColumnName("patientpayment");
        expect(patientName).toBe("$363.33");
     });
     await test.step('Verify the and sorting by Patient Payment', async () => {
        await transactionListPage.sortReportByColumnName("otheradjustments");
        const patientName = await transactionListPage.getsortedValueByColumnName("otheradjustments");
        expect(patientName).toBe("$20");
     });


});