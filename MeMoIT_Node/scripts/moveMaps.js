import fs from "fs";
import path from "path";

const jsDir = "dist/js";
const typeDir = "dist/types"
const destDir = "dist/maps";

fs.mkdirSync(destDir, { recursive: true });

function moveMaps(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      moveMaps(fullPath);
    } else if (file.endsWith(".map")) {
      const destPath = path.join(destDir, file);
      fs.renameSync(fullPath, destPath);
      console.log(`Moved: ${file}`);
    }
  }
}

moveMaps(jsDir);
moveMaps(typeDir);
console.log("✅ All .map files moved successfully!");