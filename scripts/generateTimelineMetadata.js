const fs = require("fs");
const path = require("path");
const timelineDir = path.resolve(process.cwd(), "public", "doc", "timeline");
const timelinePaths = fs.readdirSync(timelineDir);
const timelineMetadata = Object.fromEntries(
  timelinePaths.map((timelinePath) => [
    timelinePath.split(".")[0],
    `doc/timeline/${timelinePath}`,
  ])
);
fs.writeFileSync(
  path.resolve(process.cwd(), "public", "data", "timelineMetadata.json"),
  JSON.stringify(timelineMetadata)
);
