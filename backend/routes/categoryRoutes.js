const express = require("express");
const categoryValidations = require("../validations/categoryValidations");
const categoryController = require("../controllers/categoryControllers");
const Authorization = require("../services/Authorization");


const router = express.Router();


router.post("/create-category", [categoryValidations, Authorization.authorized], categoryController.create);

router.get("/categories/:page", Authorization.authorized, categoryController.getAllCategories)

module.exports = router;