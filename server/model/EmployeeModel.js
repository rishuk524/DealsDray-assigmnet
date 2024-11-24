// models/Employee.js

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], required: true },
   image: { type: String, required: true }, // URL or file path to image
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
