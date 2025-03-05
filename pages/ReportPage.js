// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.ReportPage = class ReportPage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        // Init page object
        this.page = page;

        // Elements
        this.filterReportTextbox = page.locator('//*[@id="gridview_Reports_DXFREditorcol1"]//input[@type="text"]');
        this.specificReport = page.locator('//*[@id="gridview_Reports_DXMainTable"]/tbody/tr[2]/td');
    }

    async clickOnSpecificReport(reportName) {
        await this.filterReportTextbox.fill(reportName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.specificReport.click();
    }

}