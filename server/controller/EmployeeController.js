const Employee = require('../model/EmployeeModel');
const mongoose = require('mongoose');

// **Create Employee**
const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses, } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : null // Get the file path for image upload

    if (!name || !email || !mobile || !designation || !gender || !courses || !image) {
      return res.status(400).json({ message: "Please fill in all fields, including image upload." });
    }

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      image
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// **Get Employee by ID**
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// **Get All Employees**
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log('Fetched employees:', employees); // Log the fetched employees for debugging
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// **Update Employee**
const updateEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const image = req.file ? req.file.path : req.body.image; // If new image is uploaded, use it, otherwise use the old one

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update employee data
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.courses = JSON.parse(courses) || employee.courses;
    employee.image = image || employee.image;

    await employee.save();
    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  getAllEmployees
};
