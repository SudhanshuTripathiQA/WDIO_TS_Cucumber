import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import SecurianCalPage from '../pageobjects/securian.page';
// import SecurePage from '../pageobjects/secure.page';

const fs = require('fs')
let testData = JSON.parse(fs.readFileSync('testdata/data.json'))

const pages = {
    sec: SecurianCalPage
}

Given(/^User is on the securian retirement calculator page$/, async () => {
    await SecurianCalPage.open();
});

When(/^User provide the valid data for retirement calculator$/, async () => {
    const { currentage, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate } = testData;
    await SecurianCalPage.calculateRetirementIncomeWithValidData(currentage, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate);
    await SecurianCalPage.clickOnCalculateBtn;
});

Then(/^Success message should be visible$/, async () => {
    await expect(SecurianCalPage.getResultAlertMessage).toContain(testData.successMessage);
});



When(/^User provide the invalid data for retirement calculator$/, async () => {
    const { invalidCurrentAge, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate } = testData;
    await SecurianCalPage.calculateRetirementIncomeWithValidData(invalidCurrentAge, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate);
    await SecurianCalPage.clickOnCalculateBtn;
});

Then(/^Error message should be visible$/, async () => {
    await expect(SecurianCalPage.getResultAlertMessage).toContain(testData.errorMessage);
});



When(/^User provide the data with Social Security income$/, async () => {
    const { currentage, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate, additionalIncome } = testData;
    await SecurianCalPage.calculateRetirementIncomeWithValidData(currentage, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate);
    await SecurianCalPage.calculateRetirementIncomeWithSocialSecurityIncome(additionalIncome);
});


When(/^User provide the data for default calculator values$/, async () => {
    const { currentage, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate, additionalIncome } = testData;
    await SecurianCalPage.calculateRetirementIncomeWithValidData(currentage, retirementAge, currentIncome, spouseIncome, retirementSavingBalance, savingEachYear, interestRate);
    const {otherIncome, retirementDuration,retirementAnnualIncome, preRetirementRoi, postRetirementRoi} = testData;
    await SecurianCalPage.calculateRetirementIncomeWithDefaultAdjustValues(otherIncome, retirementDuration,retirementAnnualIncome, preRetirementRoi, postRetirementRoi);

});





