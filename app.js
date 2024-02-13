const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dotEnvValidate = require("./src/middleware/dotEnvValidate");

const app = express();
const Router = express.Router();

app.use(cors());
app.use(express.json());
app.use(dotEnvValidate);
dotenv.config();

module.exports = {
  app,
  Router,
};
