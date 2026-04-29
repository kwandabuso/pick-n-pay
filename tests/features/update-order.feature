@api @orders @update @regression
Feature: Update a customer order via API
    As a system user
    I want to update an existing customer order
    So that the order status can be changed in the system

  @smoke @positive
  Scenario Outline: Update a customer order by ID
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

  @negative @auth
  Scenario Outline: Update a customer order by ID with no Authorisation
    Given a valid API endpoint is available
    And valid headers for authentication and content type are provided
    And order payload with customerId "<customerID>", sku "<sku>" and quantity <quantity> is provided
    When I send a POST request to "/orders" with the order data
    And an order Id is generated
    Given a valid update order API endpoint is available
    And invalid headers without authentication and the content type is provided
    And order update payload is provided
    When I send a Update request
    Then the response status should be <status>
    And the response should contain the unauthorized message

    Examples:
      | customerID | sku | quantity | status |
      |      12345 | A1  |        2 |    401 |

  @negative
  Scenario Outline: Update a customer order by ID with invalid order Id
    Given a valid API endpoint is available
    And valid headers for authentication and content type are provided
    And order payload with customerId "<customerID>", sku "<sku>" and quantity <quantity> is provided
    When I send a POST request to "/orders" with the order data
    And an invalid order Id is generated
    Given a valid update order API endpoint is available
    And valid headers for authentication and content type are provided
    And order update payload is provided
    When I send a Update request
    Then the response status should be <status>
    And the response should contain the not found message

    Examples:
      | customerID | sku | quantity | status |
      |      12345 | A1  |        2 |    404 |
