// Include playwright module
const { expect } = require('@playwright/test');
import * as fs from 'fs/promises';
import pdf from 'pdf-parse';

// Create class
exports.PatientFollowupPage = class PatientFollowupPage {
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

    async setReportOption(mindays,ageMoreDays,minimumPatientBalance,patientClassification,startDate,endDate) {
        await this.page.getByRole('textbox', { name: 'Minimum # of Statements Since' }).fill(mindays);
        await this.page.getByRole('textbox', { name: 'Aged More than (in days)' }).fill(ageMoreDays);
        await this.page.getByRole('textbox', { name: 'Minimum Patient Balance' }).fill(minimumPatientBalance);

        if(patientClassification !== ''){
            await this.page.locator('ezr-api-lookup').filter({ hasText: 'Patient Classificationsearch' }).getByRole('button').click();
            await this.page.getByRole('row', { name: `Select row ${patientClassification}` }).getByLabel('Select row').click();
            await this.page.getByRole('button', { name: 'OK' }).click();
        }
        if(startDate !== ''){
            await this.page.getByRole('combobox', { name: 'Service Date ALL' }).locator('path').click();
            await this.page.getByRole('option', { name: 'Custom' }).click();
            await this.page.getByText('Start date').click();
            await this.page.getByRole('textbox', { name: 'Start date' }).fill(startDate);
            await this.page.getByText('End date').click();
            await this.page.getByRole('textbox', { name: 'End date' }).fill(endDate);
        }
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
    

   
    async sortReportByColumnName(columnName){

        if(columnName==='patientname'){
            await this.page.getByRole('columnheader', { name: 'Column Patient Name' }).click();
            await this.page.waitForTimeout(2000);
           // await this.page.getByRole('columnheader', { name: 'Column Name' }).click();
        }
        else if (columnName =='dob'){
            await this.page.getByText('DOB').click();
            await this.page.waitForTimeout(2000);
            await this.page.getByText('DOB').click();
        }
        else if (columnName =='phone'){
            await this.page.getByRole('columnheader', { name: 'Column Phone No' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Phone No' }).click();
        }
        else if (columnName =='lastpatientpayment'){
            await this.page.getByRole('columnheader', { name: 'Column Last Patient Payment' }).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('columnheader', { name: 'Column Last Patient Payment' }).click();
        }
        else{
            await this.page.getByText('Patient Balance').nth(1).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByText('Patient Balance').nth(1).click();
            
        }
    }

    async getsortedValueByColumnName(columnName){
        let columnValue 
        if(columnName==='patientname'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[2]').first().textContent();
            return columnValue;
        }
        else if (columnName =='dob'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[3]').first().textContent();
            return columnValue;
        }
        else if (columnName =='phone'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[4]').first().textContent();
            return columnValue;
        }
        else if (columnName =='lastpatientpayment'){
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[6]').first().textContent();
            return columnValue;
        }
        else{
            await this.page.waitForTimeout(2000);
            columnValue = await this.page.locator('//div/table/tbody/tr[@class="dx-row dx-data-row"]/td[12]').first().textContent();
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
        else if (columnName =='dob'){
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

   async VerifySpecificTransactionDetailsPatient(patientName,expectedProcCode,expectedDos,expectedAging) {
    let transactionId
    await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().click();
    await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().fill(patientName);
    await this.page.getByRole('textbox', { name: 'Search in the data grid' }).first().press('Enter');
    await this.page.getByRole('gridcell', { name: patientName }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('gridcell', { name: 'Expand' }).locator('div').click();
    await this.page.getByRole('button', { name: 'Page 1'}).scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);

    const actualDos = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[2]').nth(0).textContent();
    const actualAging = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[3]').nth(0).textContent();
    const actualProcCode = await this.page.locator('//tr[@class="dx-row dx-data-row dx-column-lines"]/td[1]').nth(0).textContent();
    if(actualDos === expectedDos && actualAging === expectedAging && actualProcCode === expectedProcCode)
    {
        return true;
    }
    else{
        return false;
    }
}


}
   
   



