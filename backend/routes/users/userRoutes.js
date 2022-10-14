const express = require('express');
const router = express.Router();
const { registerValidations, loginValidations } = require("../../validations/userValidations");
const { register, login } = require("../../controllers/users/usersControllers");


router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);


module.exports = router;