Feature: Financial calculator from Securian application

Scenario: Verify Securian Financial calculator with valid data
Given User is on the securian retirement calculator page
When User provide the valid data for retirement calculator
Then Success message should be visible

Scenario: Verify Securian Financial calculator with invalid data
Given User is on the securian retirement calculator page
When User provide the invalid data for retirement calculator
Then Error message should be visible


Scenario: Verify Securian Financial calculator with Social Security income
Given User is on the securian retirement calculator page
When User provide the data with Social Security income
Then Success message should be visible


Scenario: Verify Securian Financial calculator with default calculator values
Given User is on the securian retirement calculator page
When User provide the data for default calculator values
Then Success message should be visible