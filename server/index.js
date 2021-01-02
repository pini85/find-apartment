const express = require("express");
const app = express();
const searchPage = require("./scrapper/yad2");
const geoLocation = require("./services/geoLocation");

const url =
  "https://www.yad2.co.il/realestate/rent?property=3&rooms=3-4&price=3000-4800";
const main = async () => {
  const results = await searchPage(url, geoLocation);
  console.log(results);
};
main();
