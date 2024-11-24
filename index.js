const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const routes = require("./server/Routes/authRoutes.js");
const employeeRoutes = require("./server/Routes/EmployeeRoutes.js");
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files


// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api', routes);
app.use("/api/employees", employeeRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
