const { Router } = require("express");
const express = require("express");
const router = Router();
const orderController = require("../controllers/orderControllers");
const authorization = require("../services/Authorization");
const ratingValidations = require("../validations/ratingValidations");

router.get("/orders", authorization.authorized, orderController.getOrders);
router.get(
  "/order-details/:id",
  authorization.authorized,
  orderController.orderDetails
);
router.put(
  "/order-update",
  authorization.authorized,
  orderController.updateOrder
);

router.post(
  "/add-review",
  [authorization.authorized, ratingValidations],
  orderController.createRating
);
module.exports = router;
