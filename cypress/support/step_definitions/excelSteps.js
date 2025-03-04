import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I read data from {string}', (fileName) => {
    cy.task('readExcel', { fileName }).then((jsonData) => {
      cy.log('Read Data:', JSON.stringify(jsonData)); // Logging data to Cypress Test Runner console
    });
  });
  
  Then('I write data {string} to {string}', (newValue, fileName) => {
    cy.task('writeExcel', { fileName, newValue }).then(() => {
      cy.log(`Updated ${fileName} with new value: ${newValue}`);
    });
  });
  