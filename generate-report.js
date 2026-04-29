const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber-report.json",
  output: "reports/cucumber-report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    App: "Order API",
    "Test Environment": "PREPROD",
    Browser: "API",
    Platform: "Node.js",
    Executed: "Local",
  },
};

reporter.generate(options);
