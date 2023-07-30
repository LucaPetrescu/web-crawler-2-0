const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");
const axios = require("axios");
const csvReader = require("../../crawler/helpers/csv-reader");

router.post("/massAddCSV", async (req, res, next) => {
  try {
    await controllers.massAdd(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/executeCrawler", async (req, res) => {
  try {
    const batchSize = 20;
    const allWebsites = await csvReader.readCSVSingleColumn(
      "C:/Users/luca.petrescu/Documents/web-crawler/assets/sample-websites.csv"
    );
    for (let i = 0; i < allWebsites.length; i += batchSize) {
      const batch = allWebsites.slice(i, i + batchSize);
      const response = await axios.post(
        "http://10.109.18.41:30000/startCrawler",
        batch
      );
    }
    res.send({ message: "Crawling done!" });
  } catch (error) {
    console.log("eroare din server local " + error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
});

router.post("/mergeDataset", async (req, res, next) => {});

router.use((error, req, res, next) => {
  console.error(`Error: ${error.message}`);
  res.status(500).send(`Error: ${error.message}`);
});

module.exports = router;
