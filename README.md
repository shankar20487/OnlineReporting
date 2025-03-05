## Over-view
This project is designed to automate the testing of the EZClaim Online reporting system.
It uses Javascript, playwright based test runner and  assertions and it use html reporting of Playwright.
The tests validate various aspects of the online web, api and MSSQL database.
UI testing it uses the page object model.

## Features

- **API Testing**: Validates the responses from the multiple APIs and validate response schema.
- **MSSQL Validation**: Verifies the data in MSSQL.
- **Web Testing**: Verifies the Ui of Report Screens.
- **Detailed Reporting**: playwright provices a comprehensive report of the test execution

## Pre-requisite
Node js needs to installed before install the play-wright


## test Data 
Reading test Data from json file .
DB configuration reading from json file.

#### Install Playwright & Select Configurations
- npm init playwright@latest

Playwright will download the browsers needed as well as create the following files.

- node_modules
- playwright.config.js
- package.json
- package-lock.json
- tests/
    example.spec.js
- tests-examples/
    demo-todo-app.spec.js

  
#### dotenv Package Installation Command
- npm install dotenv --save

#### faker-js plugin for test data generation
- npm install @faker-js/faker --save-dev



### And check out the following files:
  - .\tests\accountreceivableapi.spec.ts - Example of ui testing of Reporting framework
  - .\playwright.config.js - Playwright Test configuration
  - .\tests\filteringapi.spec.ts - Example of Api testing of Reporting Framework

- Step: Run Playwright tests.
  ### npx playwright test

- Step: To open last HTML report run using following command:
  ### npx playwright show-report



   





  
  
