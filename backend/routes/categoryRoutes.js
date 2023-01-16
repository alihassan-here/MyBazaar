const express = require("express");
const categoryValidations = require("../validations/categoryValidations");
const categoryController = require("../controllers/categoryControllers");
const Authorization = require("../services/Authorization");

const router = express.Router();

router.post(
  "/create-category",
  [categoryValidations, Authorization.authorized],
  categoryController.create
);

router.get(
  "/categories/:page",
  Authorization.authorized,
  categoryController.getAllCategories
);

router.get(
  "/fetch-category/:id",
  Authorization.authorized,
  categoryController.fetchCategory
);

router.put(
  "/update-category/:id",
  Authorization.authorized,
  categoryController.updateCategory
);

router.delete(
  "/delete-category/:id",
  Authorization.authorized,
  categoryController.deleteCategory
);

router.get(
  "/allcategories",
  Authorization.authorized,
  categoryController.allCategories
);

router.get("/random-categories", categoryController.randomCategory);

module.exports = router;
