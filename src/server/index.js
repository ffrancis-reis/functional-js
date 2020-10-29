require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");
const { URL } = require("url");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls
const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";
const CURIOSITY_ROVER = "/curiosity";
const OPPORTUNITY_ROVER = "/opportunity";
const SPIRIT_ROVER = "/spirit";

getTodayDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()-1}`;
};

app.get("/curiosity/photos", async (request, response) => {
  const url = new URL(
    `${NASA_API_URL}${CURIOSITY_ROVER}/photos?earth_date=${getTodayDateString()}&page=1&api_key=${
      process.env.API_KEY
    }`
  );

  console.log(url)

  const data = await fetch(url)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  response.send(data);
});

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
