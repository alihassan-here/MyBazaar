const express = require("express");
const router = express.Router();
const Authorization = require("../services/Authorization");
const productController = require("../controllers/productController");

router.post(
  "/create-product",
  [Authorization.authorized],
  productController.create
);

module.exports = router;
