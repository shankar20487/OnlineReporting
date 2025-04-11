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

    async changeCompanyProfile(dbName)
    {
        await this.page.locator('//input[@data-testid="ez-select-company"]').click();
        await this.page.locator('//input[@data-testid="ez-select-company"]').fill('Iteris');
        await this.page.locator('//input[@data-testid="ez-select-company"]').press('Enter');
        await this.page.locator('//input[@name="Iteris"]').click();
        await this.page.getByRole('button', { name: 'Change company file' }).click();

    }
    async goToReportSection(){
        await this.page.waitForTimeout(2000);
        await this.homeLogo.isVisible();
        await this.analyticsOption.click();
        await this.reportOption.click();
    }

}