import { Before } from "@badeball/cypress-cucumber-preprocessor";

let baseUrl;

// Hook specific to the employee API feature
Before({ tags: "@LoginFeature" }, () => {
  cy.fixture('apiUrls').then((data) => {
    baseUrl = data.baseUrl;
  });
});

export { baseUrl };
