import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { request, expect } from "@playwright/test";
import assert from "assert";
import { readUrls } from "../../common/utils/utils.js";
import { ApiServices } from "../../common/utils/api-services.js";
import {
  buildCreateOrderPayloadSuccess,
  buildUpdateOrderPayload,
} from "../../common/utils/payload-builder.js";
import {
  createOrdersHeadersSuccess,
  createOrdersHeadersUnauthorized,
} from "../../data/headers/create-order-headers.js";
console.log("Step definitions loaded");

let apiContext;
let response;
let orderData = {};
let apiServices;
let body = {};
let orderId;
const { baseURL, endpoints } = readUrls();

Before(async function () {
  apiContext = await request.newContext({
    baseURL: baseURL,
  });
  apiServices = new ApiServices(apiContext);
});

After(async function () {
  if (apiContext) {
    await apiContext.dispose();
  }
});

Given("a valid API endpoint is available", async function () {
  this.url = baseURL + endpoints.createOrder;
});

Given(
  "valid headers for authentication and content type are provided",
  function () {
    this.headers = createOrdersHeadersSuccess;
  },
);

Given(
  "order payload with customerId {string}, sku {string} and quantity {int} is provided",
  function (customerId, sku, quantity) {
    console.log("Building order payload with:", { customerId, sku, quantity });

    orderData = buildCreateOrderPayloadSuccess(customerId, sku, quantity);
  },
);

When(
  "I send a POST request to {string} with the order data",
  async function (endpoint) {
    response = await apiServices.sendPostRequest(
      this.url,
      orderData,
      this.headers,
    );
  },
);

Then("the response status should be {int}", function (expectedStatus) {
  assert.strictEqual(response.status(), expectedStatus);
});

Then(
  "the response should contain the correct order information",
  async function () {
    body = await response.json();

    apiServices.validateResponseBody(
      body,
      "id",
      "customerId",
      "items",
      "status",
      "createdAt",
    );

    expect(typeof body.id).toBe("string");
    expect(typeof body.customerId).toBe("string");
    expect(Array.isArray(body.items)).toBe(true);

    expect(body.id).toMatch(
      /^[0-9a-fA-F-]{36}$/, // UUID format
    );

    expect(["CREATED", "RESERVED"]).toContain(body.status);
  },
);

When("an order Id is generated", async function () {
  body = await response.json();
  orderId = body.id;
});

//GET
Given("a valid retrieve order API endpoint is available", function () {
  this.url = baseURL + endpoints.getOrder.replace("{id}", orderId);
});

When("I send a GET request", async function () {
  console.log("Sending GET request to:", this.url);
  console.log("Sending GET request to:", this.headers);

  response = await apiServices.sendGetRequest(this.url, this.headers);
});

Given("order update payload is provided", function () {
  orderData = buildUpdateOrderPayload();
});

When("I send a Update request", async function () {
  response = await apiServices.sendPatchRequest(
    this.url,
    orderData,
    this.headers,
  );
});

Given("a valid update order API endpoint is available", function () {
  this.url = baseURL + endpoints.updateOrder.replace("{id}", orderId);
});

Then(
  "the response should contain the bad request-customerId is required message",
  async function () {
    body = await response.json();
    console.log("response body:", body);

    apiServices.validateResponseBody(body, "message");

    expect(body.message).toBe("customerId is required");
  },
);

Then(
  "the response should contain the bad request-sku is required message",
  async function () {
    body = await response.json();
    console.log("response body:", body);

    apiServices.validateResponseBody(body, "message");

    expect(body.message).toBe("customerId is required");
  },
);

Given(
  "invalid headers without authentication and the content type is provided",
  function () {
    this.headers = createOrdersHeadersUnauthorized;
  },
);

Then("the response should contain the unauthorized message", async function () {
  body = await response.json();
  console.log("response body:", body);

  apiServices.validateResponseBody(body, "message");

  expect(body.message).toBe("Missing token");
});

When("an invalid order Id is generated", function () {
  orderId = "testing";
});

Then("the response should contain the not found message", async function () {
  body = await response.json();
  console.log("response body:", body);

  apiServices.validateResponseBody(body, "message");

  expect(body.message).toBe("Not found");
});
