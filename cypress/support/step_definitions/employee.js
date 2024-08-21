import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let response;
let baseUrl;

before(() => {
  // Load the baseUrl from the fixture file before any test runs
  cy.fixture('apiUrls').then((data) => {
    baseUrl = data.baseUrl;
  });
});

// Given Step for Background
Given('I am on the employee API', () => {
  // This step sets up the context for the scenarios, and now it uses the baseUrl from the fixture.
  cy.log('Navigated to the employee API using URL from fixture');
});

// Scenario: Verify employee list is retrieved successfully
When('I send a GET request to the employees endpoint', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/employees`,
  }).then((res) => {
    response = res;
  });
});

Then('the response status code should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

Then('the response should contain a list of employees', () => {
  expect(response.body.data).to.be.an('array').that.is.not.empty;
});

Then('each employee should have an {string}, {string}, {string}, and {string}', (id, name, salary, age) => {
    response.body.data.forEach((employee) => {
      expect(employee).to.have.property(id);
      expect(employee).to.have.property(name);
      expect(employee).to.have.property(salary);
      expect(employee).to.have.property(age);
    });
  });

Then('the content type should be {string}', (contentType) => {
  expect(response.headers['content-type']).to.include(contentType);
});

// Scenario: Write employee details to a file and verify the success message
Then('I write the employee details to a file', () => {
  const employeeDetails = response.body.data.map(employee => 
    `ID: ${employee.id}, Name: ${employee.employee_name}, Salary: ${employee.employee_salary}`
  ).join('\n');

  cy.writeFile('cypress/fixtures/employeeDetails.txt', employeeDetails);
});

Then('the response message should be {string}', (message) => {
  expect(response.body.message).to.eq(message);
});

// New Step: Validate if there are any error messages in the response body
Then('there should be no error messages in the response body', () => {
  expect(response.body).to.not.have.property('error');
  expect(response.body.status).to.not.eq('error');
});
