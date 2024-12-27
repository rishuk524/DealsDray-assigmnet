const express = require("express");
const { createContact } = require("../Controller/ContactController");

const router = express.Router();

// @route   POST /api/contact
// @desc    Create a new contact
router.post("/create", createContact);


// // Protected routes
// router.get("/get-all-contacts", authenticate, getAllContacts); // Fetch all contacts (requires admin token)


module.exports = router;
