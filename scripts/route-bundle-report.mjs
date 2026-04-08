import fs from "node:fs";
import path from "node:path";

const statsPath = path.join(
  process.cwd(),
  ".next",
  "diagnostics",
  "route-bundle-stats.json"
);

if (!fs.existsSync(statsPath)) {
  console.error(
    "Missing .next/diagnostics/route-bundle-stats.json. Run `npm run build` first."
  );
  process.exit(1);
}

const stats = JSON.parse(fs.readFileSync(statsPath, "utf8"));
const formatKb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const publicRoutes = stats
  .filter((entry) => !entry.route.startsWith("/api/"))
  .sort(
    (a, b) => b.firstLoadUncompressedJsBytes - a.firstLoadUncompressedJsBytes
  );

const homeEntry = publicRoutes.find((entry) => entry.route === "/");

console.log("Route first-load JS:");
for (const entry of publicRoutes) {
  console.log(
    `${entry.route.padEnd(24)} ${formatKb(entry.firstLoadUncompressedJsBytes)}`
  );
}

if (homeEntry) {
  console.log("\nHome route chunk files:");
  for (const chunkPath of homeEntry.firstLoadChunkPaths) {
    const absoluteChunkPath = path.join(process.cwd(), chunkPath);
    const size = fs.existsSync(absoluteChunkPath)
      ? fs.statSync(absoluteChunkPath).size
      : 0;
    console.log(
      `${path.basename(chunkPath).padEnd(28)} ${formatKb(size)}`
    );
  }
}
