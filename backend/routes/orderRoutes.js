const { Router } = require("express");
const express = require("express");
const router = Router();
const orderController = require("../controllers/orderControllers");

router.get("/orders/:page", orderController.getOrders);

module.exports = router;
