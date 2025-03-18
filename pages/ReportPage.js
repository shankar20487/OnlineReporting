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
        this.reportDropdown = page.locator('path')
        
    }

    async clickOnSpecificReport(reportName) {
        await this.reportDropdown.click();
        await this.page.getByRole('option', { name: reportName }).click();
    }

}