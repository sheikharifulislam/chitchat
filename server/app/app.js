const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routes = require("../routes/routes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.use((_req, res, _next, err) => {
    const message = err.msg ? err.msg : "Server Error Occured";
    const status = err.status ? err.status : 500;
    res.status(status).json(message);
});

module.exports = app;
