const express = require("express");

const router = express.Router();

// Import Controllers
const userController = require("../controllers/user");

// Login Page
router.get("/login", userController.login);

// Register Page
router.get("/register", userController.register);

// Register Handler
router.post("/register", userController.handleRegister);

// Login Handler
router.post("/login", userController.handleLogin);

// Logout
router.get("/logout", userController.logout);

module.exports = router;
