require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const apis = fs.readdirSync("api");

apis.forEach((apiFile) => {
  const endpoint = path.parse(apiFile);
  const endpointUrl = `/api/${endpoint.name}`;
  const route = require(`./api/${endpoint.name}`);
  app.all(endpointUrl, route);
});

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
  console.log(`> Available at http://${host}:${port}`);
});
