const readCSV = require("../../crawler/helpers/csv-reader");
const Domains = require("../database/model");
const fs = require("fs");

const path =
  "C:/Users/luca.petrescu/Documents/web-crawler/crawler/assets/sample-websites.csv";

const resultPath =
  "C:/Users/luca.petrescu/Documents/web-crawler/assets/data.json";
async function massAdd(req, res) {
  const data = await readCSV.readCSVMultipleColumns(path);
  try {
    for (let i = 0; i < data.length; i++) {
      const domainDocument = new Domains({
        domainName: data[i].domain,
        companyName: data[i].company_commercial_name,
        companyLegalName: data[i].company_legal_name,
        companyAllAvailableNames: data[i].company_all_available_names,
      });

      await domainDocument.save();
    }
    res.status(200).json({ message: "Data added successfully." });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function mergeDataset(req, res) {
  fs.readFile(resultPath, "utf8");
}

module.exports = { massAdd, mergeDataset };
