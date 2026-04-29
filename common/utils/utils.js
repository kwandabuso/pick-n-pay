import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readUrls() {
  const filePath = path.join(__dirname, "../../data/urls.json");
  console.log("reading from:", filePath);

  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
