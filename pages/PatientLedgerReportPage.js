// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.PatientLedgerReportPage = class PatientLedgerReportPage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        // Init page object
        this.page = page;

    }

    async searchPatient(patientName) {
        await this.page.waitForTimeout(2000);
        await this.page.locator('ezr-api-lookup').filter({ hasText: 'Patientsearch' }).getByRole('button').click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill(patientName);
    }

    async selectandCancelPatient(isSelect,patientName='Andrew') {
        if (isSelect) {
            await this.page.getByRole('gridcell', { name: `${patientName}` }).first().click();
            await this.page.getByRole('button', { name: 'OK' }).click();
        } else {
            await this.page.getByRole('gridcell', { name: 'api with Patient_Note' }).first().click();
            await this.page.getByRole('button', { name: 'Cancel' }).click();
        }
    }

    async verifyPaginationOfPatient() {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('button', { name: 'Page 2' }).click();
        await this.page.getByRole('button', { name: 'Page 3' }).click();
        await this.page.getByRole('button', { name: 'Page 4' }).click();
        await this.page.getByRole('button', { name: 'Page 8' }).click();
        await this.page.getByRole('button', { name: 'Page 9' }).click();
        await this.page.getByRole('button', { name: 'Page 1' }).click();
    }

    async generateReport(patient='',classfication='',dateservice='',startDate='',endDate='',accountStartwith='') {
        await this.page.waitForTimeout(2000);
        if(patient !==''){
            if(classfication === 'SECONDARY'){
                await this.page.locator('ezr-api-lookup').filter({ hasText: 'Patient Classificationsearch' }).getByRole('button').click();
                await this.page.getByRole('row', { name: 'Select row SECONDARY' }).getByLabel('Select row').click();
                await this.page.getByRole('button', { name: 'OK' }).click();
            }
            if(dateservice ==='CUSTOM'){
                await this.page.getByRole('combobox', { name: 'Date of Service ALL' }).locator('svg').click();
                await this.page.getByRole('option', { name: 'Custom' }).click();
                await this.page.getByText('Start date').click();
                await this.page.getByRole('textbox', { name: 'Start date' }).fill(startDate);
                await this.page.getByText('End date').click();
                await this.page.getByRole('textbox', { name: 'End date' }).fill(endDate);   
            }
           await this.page.getByRole('textbox', { name: 'Acct. # Starts With' }).fill(accountStartwith);
            
        }
        
        const element = await this.page.getByRole('button', { name: 'Generate Report' });
        await element.scrollIntoViewIfNeeded();
        await element.click();
    }
  
    async VerifySpecificPatientInReportandDownloadToPdf(patientName) {
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        
        
        const downloadPromise = this.page.waitForEvent('download');
         await this.page.getByRole('button', { name: 'Export all data to PDF' }).click();
        const download = await downloadPromise;
    }


    async VerifySpecificPatientInReportSection(patientName) {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: `${patientName}` }).scrollIntoViewIfNeeded();
        const isVisble = await this.page.getByRole('gridcell', { name: `${patientName}` }).isVisible()
        expect(isVisble).toBe(true);
        await this.page.waitForTimeout(2000);
        const count = await this.page.locator("//table[@class='dx-datagrid-table dx-datagrid-table-fixed']/tbody/tr[@class='dx-row dx-data-row']").count();
        console.log(count);
        return count;
        
       
    }

    async getTransctionDetails(columnName){
        const collectedData = [];
        if(columnName ==='transactionDate')
        {
            const ageCells = await this.page.locator("//tr[@class='dx-row dx-data-row dx-column-lines']/td[1]");
            const rows = await this.page.locator("//tr[@class='dx-row dx-data-row dx-column-lines']/td[1]").count();
            console.log(rows);
             for (let i = 0; i < rows; i++) {
                 const cellText = await ageCells.nth(i).innerText();
                 console.log(`Row ${i + 1} Age:`, cellText);
                 collectedData.push(cellText);
               }
        }
        return collectedData;
    }

    async gotoTransactionForSpecificPatient(patientName){
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);

    }
}