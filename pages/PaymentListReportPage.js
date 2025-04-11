// Include playwright module
const { expect } = require('@playwright/test');
import * as fs from 'fs/promises';
import pdf from 'pdf-parse';

// Create class
exports.PaymentListReportPage = class PaymentListReportPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        // Init page object
        this.page = page;
        // Elements
       
    }

    async generateReport() {
        await this.page.waitForTimeout(2000);
        const element = await this.page.getByRole('button', { name: 'Generate Report' });
        await element.scrollIntoViewIfNeeded();
        await element.click();
    }

    async fillGeneralReportDetails(groupBy,paymentSource='Patient',patientName='',payerName='',minimumPaymentAmount=0,minimumRemainingBalace=0,hideDetail=true) {
        if(groupBy !== ''){
        await this.page.getByRole('combobox', { name: 'Group By Select' }).locator('path').click();
        await this.page.getByRole('option', { name: `${groupBy}` }).locator('span').click();
        }
        if(paymentSource === 'Patient'){
            await this.page.getByLabel('Report Options').getByRole('button', { name: `${paymentSource}` }).click();
            await this.page.locator('ezr-api-lookup').filter({ hasText: 'Payments by Patientsearch' }).getByRole('button').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill(patientName);
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('gridcell', { name: `${patientName}` }).click();
            await this.page.getByRole('button', { name: 'OK' }).click();
        }
       else{
            const inputPayerName = "Select row "+` ${payerName}`;
            //await this.page.getByLabel('Report Options').getByRole('button', { name: `${paymentSource}` }).click();
            await this.page.locator('ezr-api-lookup').filter({ hasText: 'Payments by Payersearch' }).getByRole('button').click();
            await this.page.getByRole('row', { name: inputPayerName }).getByLabel('Select row').click();
            await this.page.getByRole('button', { name: 'OK' }).click();
        }
        if(!hideDetail){
            await this.page.getByRole('checkbox', { name: 'Hide Disbursement Details' }).uncheck();
        }
        
        if(minimumPaymentAmount !== 0){
        await this.page.getByRole('textbox', { name: 'Minimum Payment Amount' }).fill(minimumPaymentAmount);
        }
        if(minimumRemainingBalace !== 0){
        await this.page.getByRole('textbox', { name: 'Minimum Remaining Balance' }).fill(minimumRemainingBalace);
       }
    }

    async fillPaymentDateDetails(startDate, endDate) {
        await this.page.getByRole('combobox', { name: 'Payment Created Date ALL' }).locator('svg').click();
        await this.page.getByRole('option', { name: 'Custom' }).click();
        await this.page.locator('#mat-input-9').click();
        await this.page.locator('#mat-input-9').fill(startDate);
        await this.page.locator('#mat-mdc-form-field-label-28').getByText('End date').click();
        await this.page.locator('#mat-input-10').fill(endDate);

        await this.page.getByRole('combobox', { name: 'Payment Date ALL' }).locator('svg').click();
        await this.page.getByRole('option', { name: 'Custom' }).click();
        await this.page.locator('#mat-input-7').click();
        await this.page.locator('#mat-input-7').fill(startDate);
        await this.page.locator('#mat-input-8').click();
        await this.page.locator('#mat-input-10').fill(endDate);

    }

    async fillPaymentMethodDetails(paymentMethod) {
        await this.page.getByRole('region', { name: 'Payment' }).locator('svg').click();
        await this.page.getByRole('option', { name: `${paymentMethod}`, exact: true }).locator('mat-pseudo-checkbox').click();
        await this.page.locator('.cdk-overlay-backdrop').click();
    }

    async  fillPaymentDetails(transactionID, addInfo,paymentNote) {
        await this.page.getByRole('textbox', { name: 'Ref #' }).click();
        await this.page.getByRole('textbox', { name: 'Ref #' }).fill(transactionID);
        await this.page.getByRole('textbox', { name: 'Addl. Ref. #' }).click();
        await this.page.getByRole('textbox', { name: 'Addl. Ref. #' }).fill(addInfo);
        await this.page.getByRole('textbox', { name: 'Note' }).click();
        await this.page.getByRole('textbox', { name: 'Note' }).fill(paymentNote);

    }
    async fillPatientClassificationDetails() {
        await this.page.getByRole('region', { name: 'Patient' }).getByRole('button').click();
        await this.page.getByRole('row', { name: 'Select row MEDICARE' }).getByLabel('Select row').click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        //await this.page.locator('.cdk-overlay-backdrop').click();
    }

    async verifyTotalAmountAndRemainingAmount(expectedTotalAmount, expectedReminingBalance) {
        await this.page.waitForTimeout(2000);
       // await this.page.getByRole('button', { name: 'Page 2' }).click();
        const TotalAmount = await this.page.locator("//td/div[contains(@aria-label,'Amount')]").textContent();
        const ReminingBalance = await this.page.locator("//td/div[contains(@aria-label,'Remain')]").textContent();
        console.log('Total Amount:', TotalAmount);
        console.log('Remaining Balance:', ReminingBalance);
        // Remove any non-numeric characters (like $ or commas) from the strings
        if (TotalAmount === expectedTotalAmount && ReminingBalance === expectedReminingBalance) {
            return true;
        }
        else {
            return false;
        }   

    }

    async searchPatient(patientName) {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('region', { name: 'General' }).getByRole('button').click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).waitFor({ state: 'visible' });
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill(patientName);
    }

    async selectandCancelPatient(isSelect,patientName='') {
        if (isSelect) {
            
            await this.page.getByRole('region', { name: 'General' }).getByRole('button').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('textbox', { name: 'Search in the data grid' }).click();
            await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill('Wagner');
            await this.page.getByRole('textbox', { name: 'Search in the data grid' }).press('Enter');
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
    async paymentReportdDownloadToPdf(expectedHeader,expectedTotalAmount,expectedReminingBalance) {
         const downloadPromise = this.page.waitForEvent('download');
         await this.page.getByRole('button', { name: 'Export all data to PDF' }).click();
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
            const matchingReminingBalance = text.includes(expectedReminingBalance);
            //const missingColumns = expectedColumns.filter(col => !text.includes(col));
            console.log(matchingTotalAmount);
            console.log(matchingReminingBalance);
            if (hasHeader && matchingTotalAmount && matchingReminingBalance) {
                     return true;
                }
         
            } 
            else {
            console.error('Failed to get download path');
            
          }
          return false;
    }

   
    async sortReportByColumnName(columnName){

        if(columnName==='PatientOrPayer'){
            await this.page.getByRole('columnheader', { name: 'Column Patient Or Payer Name' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Patient Or Payer Name' }).click();
        }
        else if (columnName =='paymentDate'){
            await this.page.getByRole('columnheader', { name: 'Column Payment Date' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Payment Date' }).click();
        }
        else if (columnName =='amount'){
            await this.page.getByRole('columnheader', { name: 'Column Amount' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Amount' }).click();
        }
        else if (columnName =='Remain'){
            await this.page.getByRole('columnheader', { name: 'Column Remain.' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Remain.' }).click();
        }
        else if (columnName =='Method'){
            await this.page.getByRole('columnheader', { name: 'Column Method' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Method' }).click();
        }
        else if (columnName =='ref'){
            await this.page.getByRole('columnheader', { name: 'Column Ref #' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Ref #' }).click();
        }
        else if (columnName =='addtionalRef'){
            await this.page.getByRole('columnheader', { name: 'Column Addl Ref #' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Addl Ref #' }).click();
        }
        else{
            await this.page.getByRole('columnheader', { name: 'Note' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Note' }).click();
            
        }
    }

    async getsortedValueByColumnName(columnName){
        let columnValue 
        if(columnName==='PatientOrPayer'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-5']").first().innerText();
            return columnValue;
        }
        else if (columnName =='paymentDate'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-6']").first().textContent();
            return columnValue;
        }
        else if (columnName =='amount'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-7']").first().textContent();
            return columnValue;
        }
        else if (columnName =='Remain'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-8']").first().textContent();
            return columnValue;
        }
        else if (columnName =='Method'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-9']").first().textContent();
            return columnValue;
        }
        else if (columnName =='ref'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-10']").first().textContent();
            return columnValue;
        }
        else if (columnName =='addtionalRef'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-11']").first().textContent();
            return columnValue;
        }
        else{
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator("//td[@aria-describedby='dx-col-12']").first().textContent();
            return columnValue;
        }
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
        await this.page.getByRole('gridcell', { name: patientName }).nth(1).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').nth(1).click();
        await this.page.waitForTimeout(2000);

    }
    async getDisubursementDetails(){

        const disbustmentAmount = await this.page.locator("//tr[@class='dx-row dx-data-row dx-column-lines']/td[3]").textContent();
        return disbustmentAmount
    }
}
   
   



