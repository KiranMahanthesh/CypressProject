Feature: Employee API Testing and Data Handling

  Background:
    Given I am on the employee API
     
  Scenario: Verify employee list is retrieved successfully and Write employee details to a file and verify the success message.
    When I send a GET request to the employees endpoint
    Then the response status code should be 200
    And the response should contain a list of employees
    And each employee should have an "id", "employee_name", "employee_salary", and "employee_age"
    And the content type should be "application/json"
    And there should be no error messages in the response body
    And I write the employee details to a file
    And the response message should be "Successfully! All records has been fetched."
