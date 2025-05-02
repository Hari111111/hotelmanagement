const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {register,login} = require("../controller/AuthController");
const {registerValidator,handleValidation} = require("../middleware/validator/registerValidator")
const router = express.Router();

router.post('/register',registerValidator,handleValidation,register)

router.post('/login',login)

module.exports = router;