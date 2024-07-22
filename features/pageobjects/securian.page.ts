import { $ } from '@wdio/globals'
import Page from './page';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurianCalPage extends Page {
    /**
     * define selectors using getter methods
     */

    public get inputCurrentAge() {
        return $('#current-age');
    }

    public get inputRetirementAge() {
        return $('#retirement-age');
    }

    public get inputCurrentIncome() {
        return $('#current-income');
    }

    public get inputSpouseIncome() {
        return $('#spouse-income');
    }

    public get inputCurrentTotalSavings() {
        return $('#current-total-savings');
    }

    public get inputCurrentAnnualSavings() {
        return $('#current-annual-savings');
    }

    public get inputSavingIncreaseRate() {
        return $('#savings-increase-rate');
    }

    public get selectSocialBenefits() {
        return $('#yes-social-benefits');
    }

    // Web Elements for Adjust default values
    public get clickOnAdjustDefaultValue() {
        return $("//a[text()='Adjust default values']");
    }
    public get inputAdditonalIncome() {
        return $('#additional-income');
    }

    public get inputRetirementDuration() {
        return $('#retirement-duration');
    }
    public get selectInflation() {
        return $('#include-inflation');
    }

    public get inputExpectedInflation() {
        return $('#expected-inflation-rate');
    }

    public get inputRetirementAnnualncome() {
        return $('#retirement-annual-income');
    }

    // Web Elements for Investment expectations under Adjust default values

    public get inputPreRetirementRoi() {
        return $('#pre-retirement-roi');
    }

    public get inputPostRetirementRoi() {
        return $('#post-retirement-roi');
    }

    public get clickOnCalculateBtn() {
        return $("//button[text()='Calculate']");
    }

    public get getResultMessage() {
        return $('#result-message');
    }

    public get selectMartialStatus() {
        return $('#married');
    }

    public get inputSocialSecurityAmount() {
        return $('#social-security-override');
    }

    public get getCalculatorAlertMessage() {
        return $('#calculator-input-alert-desc');
    }
    public get clickOnSaveChanges() {
        return $("//button[text()='Save changes']");
    }

    /**
    * overwrite specific options to adapt it to page object
    */
    public open() {
        return super.open('retirement-calculator.html');
    }


    public async calculateRetirementIncomeWithValidData(currentAge: number, retirementAge: number, currentIncome: number, spouseIncome: number, currentTotalSaving: number, currentSavingEachYearPercentage: number, rateOfIncreaseInYear: number) {
        await this.inputCurrentAge.setValue(currentAge);
        await this.inputRetirementAge.setValue(retirementAge);
        await this.inputCurrentIncome.setValue(currentIncome);
        await this.inputSpouseIncome.setValue(spouseIncome);
        await this.inputCurrentTotalSavings.setValue(currentTotalSaving);
        await this.inputCurrentAnnualSavings.setValue(currentSavingEachYearPercentage);
        await this.inputSavingIncreaseRate.setValue(rateOfIncreaseInYear);
    }

    public async getResultAlertMessage() {
        return await this.getCalculatorAlertMessage.getText();
    }

    public async getSuccessResultMessage() {
        return await this.getResultMessage.getText();
    }

    public async selectSocialBenefitsOption() {
        await this.selectSocialBenefits.click();
    }

    public async doClickOnCalculateBtn() {
        await this.clickOnCalculateBtn.click();
    }

    public async calculateRetirementIncomeWithSocialSecurityIncome(additionalIncome: number) {
        await this.selectSocialBenefits.click();
        await this.selectMartialStatus.click();
        await this.inputSocialSecurityAmount.setValue(additionalIncome);
        await this.clickOnCalculateBtn.click();
    }


    public async calculateRetirementIncomeWithDefaultAdjustValues(otherIncome: number, retirementDuration: number, retirementAnnualIncome: number, preRetirementRoi: number, postRetirementRoi: number) {
        await this.clickOnAdjustDefaultValue.click();
        await this.inputAdditonalIncome.setValue(otherIncome);
        await this.inputRetirementDuration.setValue(retirementDuration);
        await this.inputRetirementAnnualncome.setValue(retirementAnnualIncome);
        await this.inputPreRetirementRoi.setValue(preRetirementRoi);
        await this.inputPostRetirementRoi.setValue(postRetirementRoi);
        await this.clickOnSaveChanges.click();
        await this.clickOnCalculateBtn.click();
    }


}

export default new SecurianCalPage();
