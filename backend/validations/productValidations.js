const { body } = require("express-validator");

module.exports = [
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("title is required"),
  body("price")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("price is required"),
  body("discount")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("discount is required"),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("description is required"),
  body("stock")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("stock is required"),
];
