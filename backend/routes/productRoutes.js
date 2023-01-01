const express = require("express");
const router = express.Router();
const Authorization = require("../services/Authorization");
const productController = require("../controllers/productController");
const productValidations = require("../validations/productValidations");

router.post(
  "/create-product",
  [Authorization.authorized, productValidations],
  productController.create
);

module.exports = router;
