require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const server = http.createServer(app);
const connectDB = require("./config/db");

app.get("/", (req, res) => {
    res.send("hello world");
});

const port = process.env.PORT || 5000;
connectDB("mongodb://localhost:27017/chitchat")
    .then(() => {
        console.log("Database connection established");
        server.listen(port, () => {
            console.log(`Server is listen on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
