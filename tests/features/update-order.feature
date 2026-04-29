Feature: Create a new customer order via API
    As a system user
    I want to create a new customer order
    So that the order is processed and stored in the system

  Background:
  # Scenario Outline: Create a new customer order
  #   Given a valid API endpoint is available
  #   And valid headers for authentication and content type are provided
  #   And order payload with customerId "<customerID>", sku "<sku>" and quantity <quantity> is provided
  #   When I send a POST request to "/orders" with the order data
  #   Then the response status should be <status>
  #   And the response should contain the correct order information
  #   Examples:
  #     | customerID | sku | quantity | status |
  #     |      12345 | A1  |        2 |    201 |

  Scenario Outline: Retrieve a customer order by ID
    Given a valid API endpoint is available
    And valid headers for authentication and content type are provided
    And order payload with customerId "<customerID>", sku "<sku>" and quantity <quantity> is provided
    When I send a POST request to "/orders" with the order data
    And an order Id is generated
    Given a valid update order API endpoint is available
    And valid headers for authentication and content type are provided
    And order update payload is provided
    When I send a Update request
    Then the response status should be <status>
    And the response should contain the correct order information

    Examples:
      | customerID | sku | quantity | status |
      |      12345 | A1  |        2 |    200 |
