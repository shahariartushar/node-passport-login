const express = require("express");

const router = express.Router();

// User Model
const User = require("../models/User");

// Import Controllers
const userController = require('../controllers/user');

// Login Page
router.get("/login", userController.login);

// Register Page
router.get("/register", userController.register);

// Register Handle
router.post("/register", userController.handleRegister);

module.exports = router;
