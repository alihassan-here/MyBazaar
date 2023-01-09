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
    .custom((value) => {
      if (parseInt(value) < 1) {
        throw new Error("Price should be above $1");
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
  body("discount")
    .not()
    .custom((value) => {
      if (parseInt(value) < 1) {
        throw new Error("Discount must not be negative");
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("description is required"),
  body("stock")
    .not()
    .custom((value) => {
      if (parseInt(value) < 20) {
        throw new Error("Stock must be above 20");
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
];
