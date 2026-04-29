# PicknPay Mock OMS API Automation

A lightweight automation framework for testing a mock Order Management System (OMS) API using Cucumber with Playwright and Express.

## Project Overview

This repository contains:

- `src/mock-server/` - mock API server implementation and request handling.
- `tests/features/` - Cucumber feature files for order creation, retrieval, and update.
- `tests/step-definations/` - step definition implementations for the feature scenarios.
- `generate-report.js` - converts `cucumber-report.json` into an HTML report.
- `cucumber.cjs` - Cucumber configuration for running feature tests.

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## Running the Mock Server

Start the mock OMS server locally:

```bash
npm start
```

This runs `src/mock-server/mock-server/server.js`.

## Running Tests

Run the full Cucumber test suite:

```bash
npm test
```

Run specific tagged suites:

```bash
npm run test:create
npm run test:retrieve
npm run test:update
npm run test:smoke
npm run test:positive
npm run test:negative
npm run test:regression
npm run test:create:smoke
```

## Report Generation

After test execution, generate the HTML report with:

```bash
npm run report
```

The reporter reads `reports/cucumber-report.json` and writes `reports/cucumber-report.html`.

## Project Structure

- `common/` - reusable utilities and API helpers.
- `data/` - URL data, headers, and payload templates.
- `src/mock-server/` - mock server code, middleware, and test data.
- `tests/features/` - Gherkin feature files.
- `tests/step-definations/` - step definition JavaScript files.
- `reports/` - generated Cucumber report output.
- `test-results/` - generated HTML report output from Cucumber.
- `playwright-report/` - Playwright report output.

## Notes

- The project uses ES modules (`type: "module"`) where applicable.
- Cucumber configuration is defined in `cucumber.cjs`.
- HTML report generation is handled by `cucumber-html-reporter`.

## License

This project is licensed under the ISC License.
