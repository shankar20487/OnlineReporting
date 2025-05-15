// Include playwright module
const { expect } = require('@playwright/test');

// Create class
exports.PatientReceiptPage = class PatientReceiptPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        // Init page object
        this.page = page;

        // Elements
        this.patient = page.locator('//*[@id="dropDownEdit_PatID_EZCLAIM11282018_PatientIs_I"]');
        this.paymentDate = page.getByRole('combobox', { name: 'Payment Date ALL' }).locator('svg');
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
    async VerifySpecificPatientInReportandDownloadToPdf(patientName) {
       
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).nth(1).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').nth(1).click();
        
        
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.locator("//div[@aria-label='pdffile']").click();
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
            
            //
           await this.page.getByRole('combobox', { name: 'Payment Date ALL' }).locator('svg').click();
           await this.page.getByRole('option', { name: 'Custom' }).click();
           await this.page.locator('#mat-input-6').click();
           await this.page.locator('#mat-input-6').fill(startDate);
           await this.page.locator('#mat-input-7').click();
           await this.page.locator('#mat-input-7').fill(endDate);

            //
            await this.page.getByRole('region', { name: 'Payment' }).locator('svg').click();
            await this.page.getByRole('option', { name: 'CC', exact: true }).locator('mat-pseudo-checkbox').click();
            await this.page.getByRole('option', { name: 'Cash' }).locator('mat-pseudo-checkbox').click();
            await this.page.getByRole('option', { name: 'Mastercard' }).locator('mat-pseudo-checkbox').click();
            await this.page.waitForTimeout(2000);
         
            await this.page.locator('.cdk-overlay-backdrop').click();
            await this.page.getByRole('combobox', { name: 'Payment Entered Date ALL' }).locator('svg').click();
            await this.page.getByRole('option', { name: 'Custom' }).click();
            await this.page.locator('#mat-input-8').click();
            await this.page.locator('#mat-input-8').fill(startDate);
            await this.page.locator('#mat-input-9').click();
            await this.page.locator('#mat-input-9').fill(endDate);
            await this.page.getByRole('textbox', { name: 'Ref #' }).click();
            await this.page.getByRole('textbox', { name: 'Ref #' }).fill(transactionID);
            await this.page.getByRole('textbox', { name: 'Addl. Ref. #' }).click();
            await this.page.getByRole('textbox', { name: 'Addl. Ref. #' }).fill(last4Digits);            

        
        const element = await this.page.getByRole('button', { name: 'Generate Report' });
        await element.scrollIntoViewIfNeeded();
        await element.click();
    }

    async VerifySpecificTransactionDetailsByPaymentMethod(patientName,payMethod,iteration=1) {
        if(iteration === 1){
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).nth(1).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').nth(1).click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
       }
        await this.page.waitForTimeout(2000);
        const payment = await this.page.locator('//input[@class="dx-texteditor-input"]').nth(1).textContent();
        console.log(payment)
       
        if(payment === 'MasterCard' ||payment === 'Cash'){
            await this.page.getByLabel('Data grid with 114 rows and').getByRole('toolbar', { name: 'Data grid toolbar' }).locator('span').nth(1).click();
            await this.page.locator('//div/input[@placeholder="Search..."]').nth(1).fill(payMethod);
           
        }
        else{
            await this.page.locator('//div/input[@placeholder="Search..."]').nth(1).fill(payMethod);
        }

        
        await this.page.waitForTimeout(2000);
        const paymentMethod= await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[3]').first().textContent();
        
        console.log(paymentMethod);
        return paymentMethod;
        
    }

    async VerifySpecificTransactionDetailsByTransactionId(patientName) {
        let transactionId
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
        await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
     
        const isavaiable = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[2]').isVisible()
            
        if(isavaiable){
            transactionId= await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[2]').first().textContent();
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
        const addInfomation= await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[3]').first().textContent();
        console.log(addInfomation);
        return addInfomation;
        
    }
    async sortReportByColumnName(columnName){

        if(columnName==='name'){
            await this.page.getByRole('columnheader', { name: 'Column Name' }).click();
            await this.page.waitForTimeout(2000);
           // await this.page.getByRole('columnheader', { name: 'Column Name' }).click();
        }
        else if (columnName =='address'){
            await this.page.getByText('Address').nth(1).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByText('Address').nth(1).click();
        }
        else if (columnName =='phone'){
            await this.page.getByRole('columnheader', { name: 'Column Phone' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Phone' }).click();
        }
        else{
            await this.page.getByText('Total Payment').click();
            await this.page.waitForTimeout(2000);
            
            
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
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[4]').first().textContent();
            return columnValue;
        }
        else{
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[5]').first().textContent();
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
        await this.page.getByRole('gridcell', { name: patientName }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
        await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);

    }
}
   
   



