const express = require("express");
const router = express.Router();
const Authorization = require("../services/Authorization");
const productController = require("../controllers/productController");
const productValidations = require("../validations/productValidations");
const homeProducts = require("../controllers/homeProducts");

router.post("/product", [Authorization.authorized], productController.create);
router.get(
  "/products/:page",
  Authorization.authorized,
  productController.getProducts
);
router.get("/product/:id", productController.getProduct);
router.put(
  "/product",
  [Authorization.authorized, productValidations],
  productController.updateProduct
);
router.delete(
  "/product/:id",
  [Authorization.authorized],
  productController.deleteProduct
);

router.get("/cat-products/:name/:page?", homeProducts.catProducts);

module.exports = router;
