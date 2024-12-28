require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mysqlPool = require("./config/db");
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(cors()); // Use the cors middleware
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