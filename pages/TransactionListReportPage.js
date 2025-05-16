// Include playwright module
const { expect } = require('@playwright/test');
import * as fs from 'fs/promises';
import pdf from 'pdf-parse';

// Create class
exports.TransactionListReportPage = class TransactionListReportPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        // Init page object
        this.page = page;

      
    }

    async generateReport() {
        await this.page.waitForTimeout(2000);
        const element = await this.page.getByRole('button', { name: 'Generate Report' });
        //await element.scrollIntoViewIfNeeded();
        await element.click();
    }
    async resetTranscactionType(transactionType) {
        await this.page.getByRole('combobox', { name: `Transaction Type ${transactionType}` }).locator('svg').click();
        await this.page.getByRole('option', { name: `${transactionType}` }).locator('mat-pseudo-checkbox').click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('.cdk-overlay-backdrop').click();
        await this.page.waitForTimeout(2000);
    }
    async setTranscactionType(transactionType) {
        await this.page.getByRole('combobox', { name: 'Transaction Type Select' }).locator('svg').click();
        await this.page.getByRole('option', { name: `${transactionType}` }).locator('mat-pseudo-checkbox').click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('.cdk-overlay-backdrop').click();
        await this.page.waitForTimeout(2000);
    }
    async setTransactionDate(startDate, endDate) {
        await this.page.getByRole('combobox', { name: 'Transaction Date ALL' }).locator('svg').click();
        await this.page.getByRole('option', { name: 'Custom' }).click();
        await this.page.locator('#mat-input-5').fill(startDate);
        await this.page.locator('#mat-input-6').fill(endDate);
    }

    async setCreatedDate(startDate, endDate) {
        await this.page.getByRole('combobox', { name: 'Created Date ALL' }).locator('svg').click();
        await this.page.getByRole('option', { name: 'Custom' }).click();
        await this.page.locator('#mat-input-7').fill(startDate);
        await this.page.locator('#mat-input-8').fill(endDate);
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

    async searchPatient(patientName) {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('region', { name: 'General' }).getByRole('button').click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).waitFor({ state: 'visible' });
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill(patientName);
    }

    async selectandCancelPatient(isSelect,patientName='') {
        if (isSelect) {
            
            await this.page.locator('ezr-api-lookup').filter({ hasText: 'Patientsearch' }).getByRole('button').click();;
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('textbox', { name: 'Search in the data grid' }).click();
            await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill(patientName);
            await this.page.getByRole('textbox', { name: 'Search in the data grid' }).press('Enter');
            await this.page.getByRole('gridcell', { name: `${patientName}` }).first().click();
            await this.page.getByRole('button', { name: 'OK' }).click();
        } else {
            await this.page.getByRole('gridcell', { name: 'api with Patient_Note' }).first().click();
            await this.page.getByRole('button', { name: 'Cancel' }).click();
        }
    }

    
    async VerifySpecificPatientInReportandDownloadToPdf(patientName) {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.locator("//div[@aria-label='pdffile']").click();
    }

 

   
    async sortReportByColumnName(columnName){

        if(columnName==='patientname'){
            await this.page.getByRole('columnheader', { name: 'Column Patient Name' }).click();
            await this.page.waitForTimeout(2000);
           // await this.page.getByRole('columnheader', { name: 'Column Name' }).click();
        }
        else if (columnName =='reference'){
            await this.page.getByText('Reference').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByText('Reference').click();
        }
        else if (columnName =='transactiondate'){
            await this.page.getByRole('columnheader', { name: 'Column Transaction Date' }).click();
            await this.page.waitForTimeout(2000);
            ;
        }
        else if (columnName =='charges'){
            await this.page.getByRole('columnheader', { name: 'Column Charges' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Charges' }).click();
        }
        else if (columnName =='insurance'){
            await this.page.getByRole('columnheader', { name: 'Column Insurance Payment' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Insurance Payment' }).click();
        }
        else if (columnName =='patientpayment'){
            await this.page.getByRole('columnheader', { name: 'Column Patient Payment' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Patient Payment' }).click();
            
        }
        else{
            await this.page.getByText('Other Adjustment').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByText('Other Adjustment').click();
            
        }
    }

    async getsortedValueByColumnName(columnName){
        let columnValue 
        if(columnName==='patientname'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[1]').first().textContent();
            return columnValue;
        }
        else if (columnName =='reference'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[2]').first().textContent();
            return columnValue;
        }
        else if (columnName =='transactiondate'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[3]').first().textContent();
            return columnValue;
        }
        else if (columnName =='charges'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[4]').first().textContent();
            return columnValue;
        }
        else if (columnName =='insurance'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[5]').first().textContent();
            return columnValue;
        }
        else if (columnName =='patientpayment'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[6]').first().textContent();
            return columnValue;
        }
        else{
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[8]').first().textContent();
            return columnValue;
        }
    }

  
    async validateSearchbasedOnColumn(columnName,expectedColumnValue){
        let columnValue;
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(expectedColumnValue);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.waitForTimeout(2000);
        if(columnName ==='patientname'){
           columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[2]').first().textContent();
        
        }
        else if (columnName =='reference'){
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[3]').first().textContent();
        }
        else if (columnName =='phone'){
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[4]').first().textContent();
        }
        else if (columnName =='lastpatientpayment'){
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[6]').first().textContent();
        }
        else{
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[12]').first().textContent();
        }
        return columnValue;
}

    async VerifyDownloadedPdf(expectedHeader,expectedColumns,expectedTotalAmount) {
        await this.page.waitForTimeout(2000);
        await this.page.locator("//div[@aria-label='pdffile']").click();
        const downloadPromise = this.page.waitForEvent('download');
       const download = await downloadPromise;
       const path = await download.path();
       if (path) {
           const pdfBuffer = await fs.readFile(path);
           const parsed = await pdf(pdfBuffer);
           console.log('PDF Text Content:\n', parsed.text);
           
           const text = parsed.text;

           // === Header Validation ===
        
          
           const hasHeader = text.includes(expectedHeader);
           const matchingTotalAmount = text.includes(expectedTotalAmount);
           const missingColumns = expectedColumns.filter(col => !text.includes(col));
           console.log(matchingTotalAmount);
           console.log(missingColumns);
           if (hasHeader && matchingTotalAmount && missingColumns.length === 0) {
                    return true;
               }
        
           } 
           else {
           console.error('Failed to get download path');
           
         }
         return false;
   }

   async fillGroupByDetails(groupBy,num=1,previousGroupBy='') {
      
    if(groupBy !== '' && num === 1){
    
        await this.page.getByRole('combobox', { name: 'Group By None' }).locator('svg').click();
        await this.page.getByRole('option', { name: `${groupBy}` }).locator('span').click();
        
        }
    if(num === 2){      
        await this.page.getByRole('combobox', { name: `Group By ${previousGroupBy}` }).locator('path').click();
        await this.page.getByRole('option', { name: `${groupBy}` }).locator('span').click();
    }

}
async validateOnlineDisplayGroupBy(){

    await this.page.waitForTimeout(2000);
    await this.page.locator("(//table/tbody/tr[1]/td[2])[2]").waitFor({state:'visible', timeout: 10000})
    const columnHeader = await this.page.locator("(//table/tbody/tr[1]/td[2])[2]").first().textContent();
    return columnHeader;

}   
  


}
   
   



