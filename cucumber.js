module.exports = {
  default: {
    require: [
      "tests/step-definitions/*.js"
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ],
    paths: ["tests/features/*.feature"],
    publishQuiet: true
  }
};