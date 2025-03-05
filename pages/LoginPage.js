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
        this.userName = page.locator('id=Username_I')
        this.password = page.locator('id=Password_I')
        this.loginBtn = page.locator('id=submitButton')
        this.homeLogo = page.locator('id=breadcrumbCompanyFilePopupTargetElement')
    }

    async goto(){
        await this.page.setViewportSize({width:1366, height:728})
        await this.page.goto(process.env.URL);
    }

    async login(param1,param2){
        await expect(this.userName).toBeEnabled();
        await this.userName.fill(param1)
        await this.password.fill(param2);
        await this.loginBtn.click();
        await this.homeLogo.waitFor({state:'visible', timeout: 10000});
        await expect(this.homeLogo).toHaveText('Andrew');
    }

}