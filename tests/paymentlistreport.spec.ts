import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { PaymentListReportPage } from '../pages/PaymentListReportPage';

const reportName = "Payment List";
test.beforeEach('Running before Each test',async ({page}) => {
    const loginpage = new LoginPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    await loginpage.goto();
    await loginpage.login(userName,pasword);
   
})

// Write a test



test('Validation of Report generation and download without filter in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting any Filters', async () => {
        await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the Report is generated with proper content', async () => {
        const expectedHeader ="Community Counseling"
        const expectedColumns = ["PaymentDate","Amount","Remain","MethodRef #","Addl Ref #","Note"];
         const isAvailable = await paymentListReportPage.paymentReportdDownloadToPdf(expectedHeader,"Total Amount:","Total Remaining:");
         expect(isAvailable).toBeTruthy();
    });

})

test('Validation of Report generation and download with filter Patient in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillGeneralReportDetails("","Patient","Patient, Brooks");
        await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$988.99";
        const expectedRemainingBalace = "$894.99"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        const expectedHeader ="Community Counseling"
        const expectedColumns = ["PaymentDate","Amount","Remain","MethodRef #","Addl Ref #","Note"];
         const isAvailable = await paymentListReportPage.paymentReportdDownloadToPdf(expectedHeader,"Total Amount:","Total Remaining:");
         expect(isAvailable).toBeTruthy();
    });
})
test('Validation of Report generation and download with filter Payer in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillGeneralReportDetails("","Payer","","BLUE CROSS");
        await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$280.00";
        const expectedRemainingBalace = "$0.00"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });

    await test.step('Verify the Report is generated and download Properly', async () => {
        const expectedHeader ="Community Counseling"
        const expectedColumns = ["PaymentDate","Amount","Remain","MethodRef #","Addl Ref #","Note"];
         const isAvailable = await paymentListReportPage.paymentReportdDownloadToPdf(expectedHeader,"Total Amount:","Total Remaining:");
         expect(isAvailable).toBeTruthy();
    });

})

test('Validation of Report generation and with filter Minimum Balance in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillGeneralReportDetails("","Patient","Patient, Brooks","","50");
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$892.99";
        const expectedRemainingBalace = "$892.99"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });

});

test('Validation of Report generation and with filter Minimum Remaining Amount in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillGeneralReportDetails("","Patient","Patient, Brooks","","50");
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$892.99";
        const expectedRemainingBalace = "$892.99"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });

});

test('Validation of Report generation and with filter Date Range in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPaymentDateDetails("2021-01-01","2025-12-31");
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$2,266.99";
        const expectedRemainingBalace = "$2,242.99"
        const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
        expect(isAvailable).toBeTruthy();
    });

});

test('Validation of Report generation and with filter With Different Payment Method in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPaymentMethodDetails("Cash");
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$519.00";
        const expectedRemainingBalace = "$340.00"
        const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
        expect(isAvailable).toBeTruthy();
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPaymentMethodDetails("Cash");
        await paymentListReportPage.generateReport();
       
    });

    
    await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$1,551.00";
        const expectedRemainingBalace = "$521.50"
        const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
        expect(isAvailable).toBeTruthy();
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPaymentMethodDetails("AmericanExpress");
        await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$1,551.00";
        const expectedRemainingBalace = "$521.50"
        const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
        expect(isAvailable).toBeTruthy();
    });
});

test('Validation of Report generation and with filter based on Ref# in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPaymentDetails("134","","")
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$20.00";
        const expectedRemainingBalace = "$0.00"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });

});

test('Validation of Report generation and with filter based on Additional Ref# in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPaymentDetails("","Co-Insurance","")
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$310.00";
        const expectedRemainingBalace = "$300.00"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });

    
}); 



test('Validation of Report generation and with filter based on Payment Note in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPaymentDetails("","","Reason Note 100")
        await paymentListReportPage.generateReport();
       
    });
     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$100.00";
        const expectedRemainingBalace = "$100.00"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });
});

test('Validation of Report generation and with filter based on Patient Classification in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillPatientClassificationDetails("MEDICARE");
        await paymentListReportPage.generateReport();
       
    });
     await test.step('Verify Total Amount And Remaining Amount displayed Properly', async () => {
        const expectedTotalBalance = "$120.00";
        const expectedRemainingBalace = "$0.00"
         const isAvailable = await paymentListReportPage.verifyTotalAmountAndRemainingAmount(expectedTotalBalance,expectedRemainingBalace);
         expect(isAvailable).toBeTruthy();
    });
});

test('Validation of Report generation with filter Patient and hidedisbustment false in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillGeneralReportDetails("","Patient","Patient, Brooks","","","",false);
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify the Report is generated and Display the Disbursement', async () => {
        const expectedDisbustment = "100.00";
        await paymentListReportPage.gotoTransactionForSpecificPatient("Patient, Brooks");
        const disbursementAmount = await paymentListReportPage.getDisubursementDetails(expectedDisbustment);
        expect(disbursementAmount).toBe(expectedDisbustment);
    });
})

test('Validation of Report generation with filter Payer and hidedisbustment false in Payment List Report', async ({ page }) => {
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
  
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report Without Selecting  Filters', async () => {
        await paymentListReportPage.fillGeneralReportDetails("","Payer","","BLUE CROSS","","",false);
        await paymentListReportPage.generateReport();
       
    });

     await test.step('Verify the Report is generated and Display the Disbursement', async () => {
        const expectedDisbustment = "40.00";
        await paymentListReportPage.gotoTransactionForSpecificPatient("BLUE CROSS");
        const disbursementAmount = await paymentListReportPage.getDisubursementDetails(expectedDisbustment);
        expect(disbursementAmount).toBe(expectedDisbustment);
    });
})


test('Validation of Report for sorting of report by columns of PaymentList Report', async ({ page }) => {

    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
   
   
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
          await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the and sorting  patient or payer by name', async () => {
       await paymentListReportPage.sortReportByColumnName("PatientOrPayer");
       const patientName = await paymentListReportPage.getsortedValueByColumnName("PatientOrPayer");
       expect(patientName).toBe("Wagner8, Andrew8")
    });
    await test.step('Verify the and sorting by paymentDate', async () => {
        await paymentListReportPage.sortReportByColumnName("paymentDate");
        const patientName = await paymentListReportPage.getsortedValueByColumnName("paymentDate");
        expect(patientName).toBe("2/10/2025")
     });

     await test.step('Verify the and sorting by amount', async () => {
        await paymentListReportPage.sortReportByColumnName("amount");
        const patientName = await paymentListReportPage.getsortedValueByColumnName("amount");
        expect(patientName).toBe("$363.33")
     });

     await test.step('Verify the and sorting by Remain', async () => {
        await paymentListReportPage.sortReportByColumnName("Remain");
        const patientName = await paymentListReportPage.getsortedValueByColumnName("Remain");
        expect(patientName).toBe("$363.33")
     });
     await test.step('Verify the and sorting by Method', async () => {
        await paymentListReportPage.sortReportByColumnName("Method");
        const patientName = await paymentListReportPage.getsortedValueByColumnName("Method");
        expect(patientName).toBe("Mastercard")
     });
     await test.step('Verify the and sorting by ref', async () => {
        await paymentListReportPage.sortReportByColumnName("ref");
        const patientName = await paymentListReportPage.getsortedValueByColumnName("ref");
        expect(patientName).toBe("DFR8974")
     });
     await test.step('Verify the and sorting by Additional ref', async () => {
        await paymentListReportPage.sortReportByColumnName("addtionalRef");
        const patientName = await paymentListReportPage.getsortedValueByColumnName("addtionalRef");
        expect(patientName).toBe("Co-Insurance")
     });
     await test.step('Verify the and sorting by Payment Note', async () => {
        await paymentListReportPage.sortReportByColumnName("note");
     const patientName = await paymentListReportPage.getsortedValueByColumnName("note");
        expect(patientName).toBe("TestNote18")
     });
})


test('Validation of Report using group by of the PaymentList Report', async ({ page }) => {

    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const paymentListReportPage = new PaymentListReportPage(page);
   
   
    await test.step('Go to report Section', async () => {
        await homepage.goToReportSection();
    });
   
    await test.step('Go to report Section', async () => {
        await reportpage.clickOnSpecificReport(reportName);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await paymentListReportPage.fillGroupByDetails("Payment Source");
          await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Payment Source:";
        const actualcolumn = await paymentListReportPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await paymentListReportPage.fillGroupByDetails("Payment Date",2,"Payment Source");
          await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Payment Date:";
        const actualcolumn = await paymentListReportPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await paymentListReportPage.fillGroupByDetails("Payment Month Year",2,"Payment Date");
          await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Payment Month Year:";
        const actualcolumn = await paymentListReportPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await paymentListReportPage.fillGroupByDetails("Payment Method",2,"Payment Month Year");
          await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Method:";
        const actualcolumn = await paymentListReportPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });


    await test.step(' Generate Report With Selecting any Filters', async () => {
        await paymentListReportPage.fillGroupByDetails("Patient Name",2,"Payment Method");
          await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Patient Or Payer Name:";
        const actualcolumn = await paymentListReportPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });

    await test.step(' Generate Report With Selecting any Filters', async () => {
        await paymentListReportPage.fillGroupByDetails("Patient Classification",2,"Patient Name");
          await paymentListReportPage.generateReport();
       
    });

    await test.step('Verify the Dispaly should be based on group By', async () => {
      
        const expectedColumn = "Patient Classification:";
        const actualcolumn = await paymentListReportPage.validateOnlineDisplayGroupBy();
        expect(actualcolumn).toContain(expectedColumn);
    });
});
