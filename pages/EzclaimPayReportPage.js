// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.EzclaimPayReportPage = class EzclaimPayReportPage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;

        // Elements
        this.patient = page.locator('//*[@id="dropDownEdit_PatID_EZCLAIM11282018_PatientIs_I"]');
        this.userPatientBillingForRetAddr = page.locator('//*[@id="parameterUsePatBillingProvider_EZCLAIM11282018_CheckboxInt0-1_S_D"]');
        this.message = page.locator('//*[@id="parameterReceiptMessage_EZCLAIM11282018_TextIs_I"]');
        this.reportPreview = page.locator('//*[@id="button_PreviewReport"]');
        this.name = page.locator('//*[@id="criterionGridView_PatID_EZCLAIM11282018_PatientIs_DXFREditorcol1_I"]');

       
    }

    async verifyPreviewOfReport(){
        await this.page.waitForTimeout(3000);
        await expect(this.patient).toBeEnabled();
        await this.patient.click();
        await this.name.fill("Andrew");
        await this.userPatientBillingForRetAddr.click();
        await this.message.fill('Testing')
        await this.reportPreview.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//*[@id="popupControlReports_PWH-1T"]',{state:'visible'});
        expect(this.reportHeader).toHaveText('EZClaimPay Receipt');
       
    }

}