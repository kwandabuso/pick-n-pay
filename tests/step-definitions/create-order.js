import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { request, expect } from "@playwright/test";
import assert from "assert";
import { readUrls } from "../../common/utils/utils.js";
import { ApiServices } from "../../common/utils/api-services.js";
import {
  buildCreateOrderPayloadSuccess,
  buildUpdateOrderPayload,
} from "../../common/utils/payload-builder.js";
import { createOrdersHeadersSuccess } from "../../data/headers/create-order-headers.js";
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

When("an order Id is generated", function () {
  orderId = body.id;
});

//GET
Given("a valid retrieve order API endpoint is available", function () {
  this.url = baseURL + endpoints.getOrder.replace("{id}", orderId);
});

When("I send a GET request", async function () {
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
