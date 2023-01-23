const { Router } = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-checkout-session", paymentController.paymentProcess);

module.exports = router;
