const express = require("express");
const router = express.Router();
const Authorization = require("../services/Authorization");
const productController = require("../controllers/productController");

router.post(
  "/create-product",
  [Authorization.authorized],
  productController.create
);
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

module.exports = router;
