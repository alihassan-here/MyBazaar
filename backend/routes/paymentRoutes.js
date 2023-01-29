const { Router } = require("express");
const express = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");
const authorization = require("../services/Authorization");

router.post(
  "/create-checkout-session",
  authorization.authorized,
  paymentController.paymentProcess
);

router.post(
  "/webhook",
  authorization.authorized,
  express.raw({ type: "application/json" }),
  paymentController.checkOutSession
);

router.get(
  "/verify-payment/:id",
  authorization.authorized,
  paymentController.paymentVerify
);

module.exports = router;
