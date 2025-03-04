Feature: Excel Read/Write

  Scenario: Read and Write data from/to an Excel file
  
    Given I read data from "sampleData.xlsx"
    Then I write data "New Value" to "sampleData.xlsx"
