import { Before } from "@badeball/cypress-cucumber-preprocessor";
import apiUrls from '../../fixtures/apiUrls.json';

// Hook specific to the homepage feature
Before({ tags: "@homepage" }, () => {
  cy.visit(apiUrls.loginPage);
});
