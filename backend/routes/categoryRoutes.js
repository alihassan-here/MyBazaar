const express = require("express");
const categoryValidations = require("../validations/categoryValidations");
const categoryController = require("../controllers/categoryControllers");
const Category = require("../controllers/categoryControllers");
const router = express.Router();


router.post("create-category", categoryValidations, Category.create);

module.exports = router;