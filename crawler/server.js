const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const cors = require("cors");

const crawler = require("./crawler");
require("dotenv").config();
const app = express();

// const path = "/crawler_server/assets/sample-websites.csv";
// const pathFromLocal =
//   "C:/Users/luca.petrescu/Documents/web-crawler/crawler/assets/sample-websites.csv";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.post("/startCrawler", async (req, res) => {
  const batch = req.body;
  try {
    const info = await crawler.crawl(batch);
    const response = {
      msg: "Crawling...",
      crawled: info,
      hostname: os.hostname().toString(),
    };
    res.send(response);
  } catch (error) {
    console.log("eroare din crawler: " + error.message);
    res.status(500).send(error.message);
  }
});

app.post("/", (req, res) => {
  console.log(os.hostname());

  let response = {
    msg: "hello world",
    hostname: os.hostname().toString(),
  };
  res.send(response);
});
