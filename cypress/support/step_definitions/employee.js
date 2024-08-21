import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let response;

const baseUrl = "https://dummy.restapiexample.com/api/v1";

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
  expect(response.body.data).to.be.an('array');
  expect(response.body.data.length).to.be.greaterThan(0);
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
