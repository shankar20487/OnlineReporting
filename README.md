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

##sample .env file
USER_NAME_API=dhouglas.oliveira@fullsteam.com
PASSWORD_API=Dl@212121
DB_USER=EZ1
DB_SERVER= 10.2.1.4
DB_NAME=EZData_Demo_Company_Andrew
DB_PASSWORD=H@ppysumm2r
DB_PORT=1433
EXPIRED_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwidW5pcXVlX25hbWUiOiJEaG91Z2xhcyIsImVtYWlsIjoiZGhvdWdsYXMub2xpdmVpcmFAZnVsbHN0ZWFtLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhdG9yLE1hbmFnZVBhdGllbnRTdGF0ZW1lbnRzLE1hbmFnZURhdGFFbnRyeUxpYnJhcmllcyxBZGRFZGl0QW5kRGVsZXRlUGF5bWVudHNBbmRBZGp1c3RtZW50cyxVbmxvY2tQYXRpZW50cyxNYW5hZ2VBZGRPblNlcnZpY2VzLFZpZXdEZWZhdWx0IiwiQ29tcGFueUZpbGVJZCI6IjEiLCJEYXRhYmFzZU5hbWUiOiJFWkRhdGFfRGVtb19Db21wYW55X0FuZHJldyIsIkV4dGVybmFsSWQiOiJjYzA4M2IxMy1jNTkwLTRmZTctMTk1Yy0wOGRhYTU3NzM0MDQiLCJuYmYiOjE3NDA5ODE1NDAsImV4cCI6MTc0MDk4NTE0MCwiaWF0IjoxNzQwOTgxNTQwLCJpc3MiOiItIiwiYXVkIjoiLSJ9.d7SLlSdxKR5-CWVUC4WwBQgcXhGImSjYlK903GS6j4A

### And check out the following files:
  - .\tests\accountreceivableapi.spec.ts - Example of ui testing of Reporting framework
  - .\playwright.config.js - Playwright Test configuration
  - .\tests\filteringapi.spec.ts - Example of Api testing of Reporting Framework

- Step: Run Playwright tests.
  ### npx playwright test

- Step: To open last HTML report run using following command:
  ### npx playwright show-report



   





  
  
