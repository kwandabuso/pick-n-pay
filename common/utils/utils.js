const fs = require("fs");
const path = require("path");

function readUrls() {
  const filePath = path.join(__dirname, "../../data/urls.json");
  console.log("reading from: ", filePath);

  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

module.exports = { readUrls };
