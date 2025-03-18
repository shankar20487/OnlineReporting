// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.LoginPage = class LoginPage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;

        // Elements
        this.userName = page.locator("//input[@type='email']")
        this.password = page.locator("//input[@type='password']")
        this.loginBtn = page.locator("//button[@type='submit']")
        this.homeLogo = page.getByRole('img', { name: 'EzClaim Logo' })
    }

    async goto(){
        await this.page.setViewportSize({width: 1920, height: 1080})
        await this.page.goto(process.env.URL);
    }

    async login(param1,param2){
        await expect(this.userName).toBeEnabled();
        await this.userName.fill(param1)
        await this.password.fill(param2);
        await this.loginBtn.click();
        await this.homeLogo.waitFor({state:'visible', timeout: 10000});
        
    }

}