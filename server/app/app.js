const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routes = require("../routes/routes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

module.exports = app;
