const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("node:https");

const countryClass = require("./country.js");
const country = new countryClass();

const app = express();

app.set("view engine", "ejs", { async: true });
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const url = `https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region`;

  // https.get(url, function (response) {
  //   response.on("data", function (data) {
  //     const countries = JSON.parse(data);
  //     // console.log(countryData);

  //     res.render('country', {countries: countries})
  //   });
  // });
  res.render("index");
});

app.post("/", function (req, res) {
  const requestedCountry = req.body.country.toLowerCase();
  const url = `https://restcountries.com/v3.1/name/${requestedCountry}?fullText=true`;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const [countryData] = JSON.parse(data);
      console.log(countryData);

      res.render('country', {country: countryData})
    });
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
