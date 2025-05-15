// Include playwright module
const { expect } = require('@playwright/test');
import * as fs from 'fs/promises';
import pdf from 'pdf-parse';

// Create class
exports.InsuranceFollowupPage = class InsuranceFollowupPage {
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
        await element.scrollIntoViewIfNeeded();
        await element.click();
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

    async selectPayer(payerName) {
        await page.locator('ezr-api-lookup').filter({ hasText: 'Payersearch' }).getByRole('button').click();
        await page.getByRole('row', { name: `Select row ${payerName}` }).getByLabel('Select row').click();
        await page.getByRole('button', { name: 'OK' }).click();

    }
    async selectPatientClassification(classificationName) {
        await this.page.locator('ezr-api-lookup').filter({ hasText: 'Patient Classificationsearch' }).getByRole('button').click();
        await this.page.getByRole('row', { name: `Select row ${classificationName}` }).getByLabel('Select row').click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async searchPatient(patientName) {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('region', { name: 'General' }).getByRole('button').click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).waitFor({ state: 'visible' });
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill(patientName);
    }
    async selectPayerClassification(classificationName) {
        await this.page.locator('ezr-api-lookup').filter({ hasText: 'Payer Classificationsearch' }).getByRole('button').click();
        await this.page.getByRole('row', { name: `Select row ${classificationName} ` }).getByLabel('Select row').click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async selectFacility(facilityName) {
        await this.page.locator('ezr-api-lookup').filter({ hasText: 'Facilitysearch' }).getByRole('button').click();
        await this.page.getByRole('checkbox', { name: 'Select row' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async setServiceDate(startDate, endDate) {
        await this.page.getByRole('combobox', { name: 'Service Date ALL' }).locator('svg').click();
        await this.page.getByRole('option', { name: 'Custom' }).click();
        await this.page.getByText('Start date').click();
        await this.page.getByRole('textbox', { name: 'Start date' }).fill(startDate);
        await this.page.getByText('End date').click();
        await this.page.getByRole('textbox', { name: 'End date' }).fill(endDate);
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
       
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).nth(0).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').nth(0).click();
        
        
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.locator("//div[@aria-label='pdffile']").click();
        const download = await downloadPromise;
    }

    
    

   
    async sortReportByColumnName(columnName){

        if(columnName==='payer'){
            await this.page.getByRole('columnheader', { name: 'Column Payer Name' }).click();
            await this.page.waitForTimeout(2000);
           // await this.page.getByRole('columnheader', { name: 'Column Name' }).click();
        }
      
        else{
            await this.page.getByRole('columnheader', { name: 'Column Phone' }).click();
            await this.page.waitForTimeout(2000);
        }
    }
            
        

    async getsortedValueByColumnName(columnName){
        let columnValue 
        if(columnName==='payer'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[2]').first().textContent();
            return columnValue;
        }
        else{
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[3]').first().textContent();
            return columnValue;
        }
    }

  
    async validateSearchbasedOnColumn(columnName,expectedColumnValue){
        let columnValue;
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(expectedColumnValue);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.waitForTimeout(2000);
        if(columnName ==='payer'){
           columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[2]').first().textContent();
        
        }
        else{
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[3]').first().textContent();
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

   async VerifySpecificTransactionDetailsPayer(payerName,expectedProcCode,expectedInsuranceId,expecteBalance) {
    let transactionId
    await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
    await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(payerName);
    await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
    await this.page.getByRole('gridcell', { name: payerName }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();

    const actualInsuranceId = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[3]').nth(0).textContent();
    const actualBalance = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[11]').nth(0).textContent();
    const actualProcCode = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[4]').nth(0).textContent();
    if(actualInsuranceId === expectedInsuranceId && actualBalance === expecteBalance && actualProcCode === expectedProcCode)
    {
        return true;
    }
    else{
        console.log('Insurance ID:', actualInsuranceId);
        console.log('Balance:', actualBalance);
        console.log('Proc Code:', actualProcCode);
        return false;
    }
}

}
   
   



