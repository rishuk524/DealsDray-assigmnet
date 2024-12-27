const express = require("express");
const { login, register } = require("../Controller/AdminController");

const authenticate = require("../Middleware/authMiddleware");
const { getAllContacts } = require("../Controller/ContactController");
const router = express.Router();

// Admin authentication routes
router.post("/login", login); // Login route
router.post("/register", register); 

// Protected routes
router.get("/get-all-contacts",authenticate,  getAllContacts); // Fetch all contacts (requires admin token)

module.exports = router;
