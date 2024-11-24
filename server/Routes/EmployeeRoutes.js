const express = require('express');
const multer = require('multer');
const path = require('path');
const employeeController = require('../controller/EmployeeController');

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// **Route to get all employees** (specific route before dynamic ones)
router.get('/get-all-employees', employeeController.getAllEmployees);

// **Create Employee**
router.post('/create-employee', upload.single('image'), employeeController.createEmployee);

// **Update Employee**
router.put('/:id', upload.single('image'), employeeController.updateEmployee);

// **Get Employee by ID**
router.get('/:id', employeeController.getEmployeeById);

module.exports = router;
