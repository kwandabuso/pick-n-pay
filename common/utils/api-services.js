export class ApiServices {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }
  sendPostRequest(url, data, headers) {
    try {
      return this.apiContext.post(url, {
        data,
        headers,
      });
    } catch (error) {
      throw new Error(`Could not send POST request: ${error.message}`);
    }
  }

  sendGetRequest(url, headers) {
    try {
      return this.apiContext.get(url, {
        headers,
      });
    } catch (error) {
      throw new Error(`Could not send GET request: ${error.message}`);
    }
  }

  sendPatchRequest(url, data, headers) {
    try {
      return this.apiContext.patch(url, {
        data,
        headers,
      });
    } catch (error) {
      throw new Error(`Could not send PATCH request: ${error.message}`);
    }
  }

  validateResponseBody(responseBody, ...expectedStatus) {
    for (const status of expectedStatus) {
      if (!responseBody.hasOwnProperty(status)) {
        throw new Error(
          `Response body does not contain expected status: ${status}`,
        );
      }
    }
  }
}
