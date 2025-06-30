import "dotenv/config";
import express from "express";
import gistCard from "./api/gist.js";
import statsCard from "./api/index.js";
import leetcodeCard from "./api/leetcode.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";

const app = express();
app.listen(process.env.port || 9000);

app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);
app.get("/leetcode", leetcodeCard);
