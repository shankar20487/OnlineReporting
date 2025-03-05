// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.AccountReceivableReportPage = class AccountReceivableReportPage {

   constructor(page){
        // Init page object
        this.page = page;

        // Elements
        this.reportPreview = page.locator('id=button_PreviewReport_CD');
        this.ageAsOfDate = page.locator('id=TransactionDate_EZCLAIM11282018_DateIsOrIsBefore_I');
        this.groupBy = page.locator('//*[@id="parameterGroupByField_EZCLAIM11282018_CustomStringValueAndStringDescriptionIsNoAll_I"]');
        this.calcuteAgingByDos = page.locator('//*[@id="parameterAgingByField_EZCLAIM11282018_CheckboxInt0-1_S_D"]');
        this.hideDetail = page.locator('//*[@id="parameterHideDetail_EZCLAIM11282018_CheckboxInt0-1_S_D"]');
        this.responsibleParty = page.locator('//*[@id="SrvResponsibleParty_EZCLAIM11282018_BillToSequenceIs_I"]');
        this.serviceDate = page.locator('//*[@id="SrvFromDate_EZCLAIM11282018_DateIsBetween*DateRange_I"]');
        this.reportHeader = page.locator('//*[@id="popupControlReports_PWH-1T"]');
        this.addressLine1Loc = page.locator('//*[@class="csA8F3C1D1"]/nobr[1]');
       
    }

    
    async verifyPreviewOfReport(){
        await this.page.waitForTimeout(3000);
        await expect(this.ageAsOfDate).toBeEnabled();
        await this.ageAsOfDate.fill('1/22/2025');
        await this.groupBy.fill('None');
        await this.calcuteAgingByDos.click();
        await this.reportPreview.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//*[@id="popupControlReports_PWH-1T"]',{state:'visible'});
        expect(this.reportHeader).toHaveText('Accounts Receivable');
       
    }

    async compareStringsIgnoringSpacesFunction(str1, str2) {
        return str1.split(' ').join('') === str2.split(' ').join('');
    }
    
    
    async verifyAddresInHeader(addressline1,addressline2) {
        let isVisible = false;
        await this.page.waitForSelector('//*[@id="popupControlReports_PWH-1T"]',{state:'visible'});
        const frame = await this.page.frame({ name: 'OnlineReportViewer_Splitter_Viewer_ContentFrame' });
        //const frame = await frameElement.contentFrame(); // Get the frame object

        if (frame) {
            const text1 = await frame.locator('//*[@class="csA8F3C1D1" and @colspan="19"]/nobr').first().textContent();
             expect(text1).toContain(addressline1);
           
        }

   }
}