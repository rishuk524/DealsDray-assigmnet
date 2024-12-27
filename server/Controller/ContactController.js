const Contact = require("../models/ContactModels");

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, qualification, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !qualification) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const newContact = new Contact({ fullName, email, phone, qualification, message });
    const savedContact = await newContact.save();

    res.status(201).json({ message: "Contact submitted successfully", data: savedContact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// Get all contacts
const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json({ data: contacts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  


module.exports = { createContact, getAllContacts };
