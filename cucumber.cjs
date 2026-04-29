module.exports = {
  default: {
    paths: ["./tests/features/**/*.feature"],
    require: ["./tests/step-definations/**/*.js"],
    format: [
      "progress",
      "json:reports/cucumber-report.json",
      "html:test-results/cucumber-report.html",
    ],
    publishQuiet: true,
  },
};
