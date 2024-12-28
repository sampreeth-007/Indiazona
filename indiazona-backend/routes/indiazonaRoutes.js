const express = require("express");
const router = express.Router();
// const db = require("../config/db");
// const { v4: uuidv4 } = require("uuid");
const { listAllProducts } = require("../controllers/indiazonaControllers");
const { validatorForProduct } = require("../commons/validator");

router.get("/list", validatorForProduct(), listAllProducts);

module.exports = router;