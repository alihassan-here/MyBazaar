const { Router } = require("express");
const express = require("express");
const router = Router();
const orderController = require("../controllers/orderControllers");
const authorization = require("../services/Authorization");

router.get(
  "/orders/:page",
  authorization.authorized,
  orderController.getOrders
);
router.get(
  "/order-details/:id",
  authorization.authorized,
  orderController.orderDetails
);

module.exports = router;
