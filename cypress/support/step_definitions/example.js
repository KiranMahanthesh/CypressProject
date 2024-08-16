import { Before, Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  // This hook runs before each scenario and visits the login page
  cy.visit("https://rahulshettyacademy.com/locatorspractice/");
});

Given("I open the homepage", () => {
  cy.contains('Sign in')

});

Then("I should see the Cypress homepage", () => {
  cy.contains('Rahul Shetty Academy')

});

When('I enter a valid username {string} and password {string}', (username, password) => {
  cy.fixture('loginCredentials').then((data) => {
    const user = data.users.find((user) => user.username === username && user.password === password);
    
    if (user) {
      cy.get('#inputUsername').type(user.username);
      cy.get('input[placeholder="Password"]').type(user.password);
      cy.get('button[type="submit"]').click();
    }
  });
});

Then('an "Invalid username or password" message should be displayed', () => {
  // Check that the error message is visible
  cy.contains("* Incorrect username or password").should("be.visible");

  cy.writeFile('cypress/fixtures/loginFailures.json', {
    status: "Login failed",
    reason: "Invalid username or password"
  });
});
