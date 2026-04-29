# Solution Design and Trade-offs

## Overview

This project is built as a mock OMS API automation framework with:

- A simple Express-based mock API server (`src/mock-server/mock-server/server.js`).
- In-memory order storage and status rule enforcement (`src/mock-server/mock-server/orderStore.js`).
- A lightweight authorization middleware for bearer token validation (`src/mock-server/mock-server/authMiddleware.js`).
- Cucumber feature-driven tests backed by Playwright request handling.
- A separate report generator using `cucumber-html-reporter`.

## Design Decisions

### 1. Mock server as a lightweight Express app

- The server exposes RESTful endpoints for order creation, retrieval, status updates, health checks, and debugging resets.
- This keeps the framework easy to run locally and debug without external dependencies.
- Endpoints include validation and explicit HTTP status codes for common API failure modes.

### 2. In-memory order store

- `orderStore.js` uses a plain JavaScript object as an in-memory store.
- Order IDs are generated with `uuid` and orders are timestamped.
- Status transitions are enforced through a `validTransitions` map.

Trade-off:

- Pros: fast, simple, no database setup required.
- Cons: data is transient and lost when the server restarts, so this is appropriate only for mock/demo/test scenarios.

### 3. Simple authorization middleware

- `authMiddleware.js` validates a static bearer token: `Bearer mock-valid-token`.
- The middleware is applied globally after health checks.

Trade-off:

- Pros: sufficient for API positive/negative authentication tests.
- Cons: not realistic for production authentication; it is intentionally minimal to keep the mock API focused on behavior rather than auth implementation.

### 4. Cucumber for behavior-driven testing

- Feature files are written with BDD-style scenarios for create, retrieve, and update flows.
- Tags like `@smoke`, `@positive`, `@negative`, and `@regression` enable selective execution.
- The tests intentionally target both happy paths and failure modes.

### 5. Playwright request context for API testing

- Step definitions use `@playwright/test` request fixtures to send API requests.
- `common/utils/api-services.js` wraps POST, GET, and PATCH calls and centralizes response validation.

Trade-off:

- Pros: leveraging Playwright HTTP capabilities provides a stable API test experience and built-in request lifecycle management.
- Cons: adds a dependency on Playwright even though the tests are purely API-focused.

### 6. Configuration and test data separation

- Base URLs and endpoints are stored in `data/urls.json`.
- Headers and payload templates are separated into `data/headers/` and `data/payloads/`.
- The payload builder creates request bodies for scenarios.

Trade-off:

- Pros: improves maintainability and reusability of test data.
- Cons: some indirection is introduced, which is heavier than embedding small payloads directly in step definitions.

### 7. Decoupled report generation

- `generate-report.js` reads the Cucumber JSON report and generates an HTML report independently from cucumber execution.
- A dedicated npm script (`npm run report`) triggers this step.

Trade-off:

- Pros: clean separation between test run and reporting.
- Cons: requires an extra command after test execution unless additional automation is added.

## Observed Limitations

- The in-memory store is not durable and does not support concurrent process state sharing.
- Authorization is static and not suitable for real-world token flows.
- The server currently validates only a small subset of order payload fields.
- Some API routes such as listing all orders are implemented but not fully exercised by feature tests.
- The test suite mixes Playwright and Cucumber, which is effective for this setup but could be simplified in a pure HTTP framework.

## Future Improvements

- Swap the in-memory store for a lightweight database or persisted storage layer.
- Replace static auth middleware with pluggable auth strategies, JWT validation, or token issuing.
- Add broader payload validation and schema enforcement.
- Expand test coverage for list/delete flows and invalid status transitions.
- Automate report generation as part of the CI/test workflow.

## Conclusion

This solution prioritizes clarity, maintainability, and fast local execution. It is intentionally designed as a mock API automation framework with a strong separation between server behavior, test data, and BDD-style coverage, while accepting the trade-offs of in-memory storage and simplified authentication.
