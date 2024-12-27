const express = require("express");
const morgan = require("morgan");
const mysqlPool = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/products", require("./routes/indiazonaRoutes"));

app.get("/test", (req, res) => {
    res.status(200).send("<h1>Welcome to Indiazona!</h1>");
});

const port = process.env.PORT || 3000;  

mysqlPool.query("SELECT 1").then(() => {
    console.log(`MySQL database connected.....`);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.error("Database connection error:", err);
});