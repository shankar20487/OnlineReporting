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
        this.analyticsOption = page.locator('//*[@id="leftNavbar_GR3"]//div[@id="leftNavbar_GHC3"]');
        this.reportOption = page.locator('//*[@id="leftNavbar_GC3"]//li[@title="Reports"]');
    }

    async goToReportSection(){
        await this.page.waitForTimeout(2000);
        await this.analyticsOption.click();
        await this.reportOption.click();
    }

}