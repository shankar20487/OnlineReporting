// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.HomePage = class HomePage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;

       // Elements
        this.homeLogo = page.getByRole('img', { name: 'EzClaim Logo' })
        this.analyticsOption = page.getByRole('button', { name: 'Analytics' })
        this.reportOption =   page.locator('a')
    }

    async goToReportSection(){
        await this.page.waitForTimeout(2000);
        await this.homeLogo.isVisible();
        await this.analyticsOption.click();
        await this.reportOption.click();
    }

}