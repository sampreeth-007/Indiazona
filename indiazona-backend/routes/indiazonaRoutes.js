const express = require("express");
const router = express.Router();
const db = require("../config/db");
// const { v4: uuidv4 } = require("uuid");
const { getAllProducts } = require("../controllers/indiazonaControllers");

router.get("/list", getAllProducts);

module.exports = router;