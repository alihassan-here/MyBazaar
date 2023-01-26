const { Router } = require("express");
const express = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-checkout-session", paymentController.paymentProcess);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.checkOutSession
);

router.get("/verify-payment/:id", paymentController.paymentVerify);

module.exports = router;
