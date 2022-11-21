require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const server = http.createServer(app);
const connectDB = require("./db/db");

const port = process.env.PORT || 5000;
connectDB(process.env.DB_URL)
    .then(async () => {
        console.log("Database connection established");
        server.listen(port, () => {
            console.log(`Server is listen on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
