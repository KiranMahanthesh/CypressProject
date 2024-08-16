Feature: Example feature

Background :   Given I open the homepage

Scenario: Visit the Cypress homepage
  Then I should see the Cypress homepage

 Scenario Outline: Check valid login credentials
    When I enter a valid username "<username>" and password "<password>"
    Then an "Invalid username or password" message should be displayed

    Examples:
      | username                   | password  |
      | kiranprince8904@gmail.com  | Passcode1 |
      | kiranprince8994@gmail.com  | Passcode2 |
      | kiranprince8004@gmail.com  | Passcode3 |
