Feature: Employee API Testing

  Scenario: Verify employee list is retrieved successfully
    When I send a GET request to the employees endpoint
    Then the response status code should be 200
    And the response should contain a list of employees
    And each employee should have an "id", "employee_name", "employee_salary", and "employee_age"
    And the content type should be "application/json"
