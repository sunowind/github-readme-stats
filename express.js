import "dotenv/config";
import express from "express";
import gistCard from "./api/gist.js";
import statsCard from "./api/index.js";
import leetcodeCard from "./api/leetcode.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";

const app = express();
const port = process.env.port || 9000;

app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);
app.get("/leetcode", leetcodeCard);

app
  .listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📊 Available endpoints:`);
    console.log(`   - GET / (GitHub Stats)`);
    console.log(`   - GET /pin (Repository Card)`);
    console.log(`   - GET /top-langs (Top Languages)`);
    console.log(`   - GET /wakatime (WakaTime Stats)`);
    console.log(`   - GET /gist (Gist Card)`);
    console.log(`   - GET /leetcode (LeetCode Stats)`);
  })
  .on("error", (err) => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });

process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  process.exit(0);
});
