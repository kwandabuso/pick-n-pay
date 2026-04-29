@api @orders @create @regression
Feature: Create a new customer order via API
    As a system user
    I want to create a new customer order
    So that the order is processed and stored in the system

  @smoke @positive
  Scenario Outline: Create a new customer order
    Given a valid API endpoint is available
    And valid headers for authentication and content type are provided
    And order payload with customerId "<customerID>", sku "<sku>" and quantity <quantity> is provided
    When I send a POST request to "/orders" with the order data
    Then the response status should be <status>
    And the response should contain the correct order information

    Examples:
      | customerID | sku | quantity | status |
      |      12345 | A1  |        2 |    201 |

  @negative
  Scenario Outline: Create a new customer order without a customer ID
    Given a valid API endpoint is available
    And valid headers for authentication and content type are provided
    And order payload with customerId "<customerID>", sku "<sku>" and quantity <quantity> is provided
    When I send a POST request to "/orders" with the order data
    Then the response status should be <status>
    And the response should contain the bad request-customerId is required message

    Examples:
      | customerID | sku | quantity | status |
      |            | A1  |        2 |    400 |

  @negative @auth
  Scenario Outline: Create a new customer order without Authorisation
    Given a valid API endpoint is available
    And invalid headers without authentication and the content type is provided
    And order payload with customerId "<customerID>", sku "<sku>" and quantity <quantity> is provided
    When I send a POST request to "/orders" with the order data
    Then the response status should be <status>
    And the response should contain the unauthorized message

    Examples:
      | customerID | sku | quantity | status |
      |       1234 | A1  |        2 |    401 |
