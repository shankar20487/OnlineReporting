// Include playwright module
const { expect } = require('@playwright/test');

// Create class
exports.EzclaimPayReportPage = class EzclaimPayReportPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        // Init page object
        this.page = page;

        // Elements
        this.patient = page.locator('//*[@id="dropDownEdit_PatID_EZCLAIM11282018_PatientIs_I"]');
        this.paymentDate = page.getByRole('combobox', { name: 'Payment Date Select' }).locator('path');
        this.message = page.getByRole('textbox', { name: 'Message' });
    }

    async generateReport(isFilter) {
        await this.page.waitForTimeout(2000);
        if(isFilter){
            await this.message.fill('Testing');
            await this.paymentDate.click();
            await this.page.getByRole('option', { name: 'Past', exact: true }).click();
            await this.page.getByRole('region', { name: 'Payment' }).locator('svg').click();
            await this.page.getByRole('option', { name: 'CC', exact: true }).locator('mat-pseudo-checkbox').click();
            await this.page.getByRole('option', { name: 'Cash' }).locator('mat-pseudo-checkbox').click();
            await this.page.getByRole('option', { name: 'Mastercard' }).locator('mat-pseudo-checkbox').click();
            await this.page.locator('.cdk-overlay-backdrop').click();
        }
        
        const element = await this.page.getByRole('button', { name: 'Generate Report' });
        await element.scrollIntoViewIfNeeded();
        await element.click();
    }

    async searchPatient(patientName) {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('region', { name: 'General' }).getByRole('button').click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).waitFor({ state: 'visible' });
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).fill(patientName);
    }

    async selectandCancelPatient(isSelect) {
        if (isSelect) {
            await this.page.getByRole('gridcell', { name: 'api with Patient_Note' }).first().click();
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

    async VerifySpecificPatientFirstTransactionDetails(patientName) {
        let transactionDetails = [];
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
        
        
        const transactionID= await this.page.locator('//table/tbody/tr[17]/td[6]').textContent();
        const transactionID2 = await this.page.locator('//table/tbody/tr[18]/td[6]').textContent();
        const transactionID3 = await this.page.locator('//table/tbody/tr[19]/td[6]').textContent();
        console.log(transactionID);
        transactionDetails.push(transactionID);
        transactionDetails.push(transactionID2);
        transactionDetails.push(transactionID3);
        return transactionDetails;
        
    }
    async generateReportSpecificPeriod(startDate,endDate,transactionID='',last4Digits='') {
        await this.page.waitForTimeout(2000);
       
            await this.message.fill('Testing');
            await this.paymentDate.click();
            await this.page.getByRole('option', { name: 'Custom', exact: true }).click();
            await this.page.locator('#mat-mdc-form-field-label-14').getByText('Start date').click();
            await this.page.locator('#mat-input-6').fill(startDate);
            await this.page.locator('#mat-mdc-form-field-label-16').getByText('End date').click();
            await this.page.locator('#mat-input-7').fill(endDate);
            await this.page.getByRole('region', { name: 'Payment' }).locator('svg').click();
            await this.page.getByRole('option', { name: 'CC', exact: true }).locator('mat-pseudo-checkbox').click();
            await this.page.getByRole('option', { name: 'Cash' }).locator('mat-pseudo-checkbox').click();
            await this.page.getByRole('option', { name: 'Mastercard' }).locator('mat-pseudo-checkbox').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('option', { name: 'EFT' }).locator('mat-pseudo-checkbox').click();
            await this.page.getByRole('option', { name: 'OP CC' }).locator('mat-pseudo-checkbox').click();
            await this.page.waitForTimeout(2000);
            await this.page.locator('.cdk-overlay-backdrop').click();
            await this.page.getByRole('combobox', { name: 'Payment Entered Date Select' }).locator('svg').click();
            await this.page.getByRole('option', { name: 'Custom' }).click();
            await this.page.locator('#mat-input-8').click();
            await this.page.locator('#mat-input-8').fill(startDate);
            await this.page.locator('#mat-input-8').press('Tab');
            await this.page.locator('#mat-mdc-form-field-label-22').getByText('End date').click();
            await this.page.locator('#mat-input-9').fill(endDate);
            await this.page.getByRole('textbox', { name: 'Ref #' }).click();
            await this.page.getByRole('textbox', { name: 'Ref #' }).fill(transactionID);
            await this.page.getByRole('textbox', { name: 'Addl. Ref. #' }).click();
            await this.page.getByRole('textbox', { name: 'Addl. Ref. #' }).fill(last4Digits);            

        
        const element = await this.page.getByRole('button', { name: 'Generate Report' });
        await element.scrollIntoViewIfNeeded();
        await element.click();
    }

    async VerifySpecificTransactionDetailsByPaymentMethod(patientName,payMethod) {
        
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.page.locator('//div/input[@placeholder="Search..."]').nth(1).fill(payMethod);
        await this.page.waitForTimeout(2000);
        const paymentMethod= await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[3]').first().textContent();
        
        console.log(paymentMethod);
        return paymentMethod;
        
    }

    async VerifySpecificTransactionDetailsByTransactionId(patientName,transactionID) {
        let transactionId
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.page.locator('//div/input[@placeholder="Search..."]').nth(1).fill(transactionID);
        await this.page.waitForTimeout(2000);
        const isavaiable = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[6]').isVisible()
            
        if(isavaiable){
            transactionId= await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[6]').first().textContent();
            console.log(transactionId);
            return transactionId;
        }
        else{
            return "";
        }
        
    }

    async VerifySpecificTransactionDetailsByAddInfo(patientName,addInfo) {
        
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.page.locator('//div/input[@placeholder="Search..."]').nth(1).fill(addInfo);
        await this.page.waitForTimeout(2000);
        const addInfomation= await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[2]').first().textContent();
        
        console.log(addInfomation);
        return addInfomation;
        
    }
    async sortReportByColumnName(columnName){

        if(columnName==='name'){
            await this.page.getByRole('columnheader', { name: 'Column Name' }).click();
        }
        else if (columnName =='address'){
            await this.page.getByText('Address').nth(1).click();
            await this.page.getByText('Address').nth(1).click();
        }
        else if (columnName =='phone'){
            await this.page.getByRole('columnheader', { name: 'Column Phone' }).click();
            await this.page.getByRole('columnheader', { name: 'Column Phone' }).click();
        }
        else{
            await this.page.getByText('City, State & Zip').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByText('City, State & Zip').click();
            
        }
    }

    async getsortedValueByColumnName(columnName){
        let columnValue 
        if(columnName==='name'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[2]').first().textContent();
            return columnValue;
        }
        else if (columnName =='address'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[3]').first().textContent();
            return columnValue;
        }
        else if (columnName =='phone'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[5]').first().textContent();
            return columnValue;
        }
        else{
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[4]').first().textContent();
            return columnValue;
        }
    }
   
};


