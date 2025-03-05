import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ReportPage } from '../pages/ReportPage';
import { AccountReceivableReportPage } from '../pages/AccountReceivableReportPage';


test.beforeAll('Running before all tests', () => {
   
})

// Write a test
test('Validation of Account Receivable Report', async ({ page }) => {

    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    const reportpage = new ReportPage(page);
    const accountreceviablepage = new AccountReceivableReportPage(page);
    const userName = process.env.USER_NAME;
    const pasword = process.env.PASSWORD;
    const reportName = "Accounts Receivable";
   
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

    await test.step('Setting up filter options and preview Account Receivable Report', async () => {
        await accountreceviablepage.verifyPreviewOfReport();
        await accountreceviablepage.verifyAddresInHeader('Community' ,'Counseling');
    });
})

