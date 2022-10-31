const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routes = require("../routes/routes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    console.log(err);
    const message = err.message ? err.message : "Server Error Occured";
    const status = err.status ? err.status : 500;
    console.log(err.message);
    res.status(status).json({
        message,
    });
});

module.exports = app;
