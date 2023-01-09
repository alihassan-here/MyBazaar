const express = require("express");
const router = express.Router();
const Authorization = require("../services/Authorization");
const productController = require("../controllers/productController");
const productValidations = require("../validations/productValidations");

router.post("/product", [Authorization.authorized], productController.create);
router.get(
  "/products/:page",
  Authorization.authorized,
  productController.getProducts
);
router.get(
  "/product/:id",
  Authorization.authorized,
  productController.getProduct
);
router.put(
  "/product",
  [Authorization.authorized, productValidations],
  productController.updateProduct
);

module.exports = router;
