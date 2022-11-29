const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("../routes/routes");

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser([process.env.ACCESS_TOKEN_NAME]));
app.use(express.json());
app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    console.log(err);
    const message = err.status && err.message ? err.message : "Internal Server Error";
    const status = err.status ? err.status : 500;
    console.log(err.message);
    res.status(status).json({
        message,
    });
});

module.exports = app;
