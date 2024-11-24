import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEmployeeForm = () => {
  const { id } = useParams(); // Get employee ID from the URL for editing (if available)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  const [designations, setDesignations] = useState([]); // Dynamic Designations
  const [courses, setCourses] = useState([]); // Dynamic Courses
  const [genders, setGenders] = useState([]); // Dynamic Gender options

  // Fetch options dynamically (e.g., from an API or predefined)
  useEffect(() => {
    const fetchDynamicData = () => {
      setDesignations(["HR", "Manager", "Sales"]); // Example designations
      setCourses(["MCA", "BCA", "BSC"]); // Example courses
      setGenders(["Male", "Female"]); // Example genders
    };

    fetchDynamicData();
  }, []);

  // Fetch employee data if editing
  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/employees/${id}`);
          setFormData({
            name: response.data.name || "",
            email: response.data.email || "",
            mobile: response.data.mobile || "",
            designation: response.data.designation || "",
            gender: response.data.gender || "",
            courses: response.data.courses || [],
            image: response.data.image || null,
          });
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };

      fetchEmployeeData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      const updatedCourses = checked
        ? [...formData.courses, value]
        : formData.courses.filter((course) => course !== value);
      setFormData({ ...formData, courses: updatedCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.designation ||
      !formData.gender ||
      formData.courses.length === 0 ||
      !formData.image
    ) {
      alert("Please fill out all fields, select at least one course, and upload an image.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "courses") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    const url = id
      ? `http://localhost:3000/api/employees/${id}` // Update employee URL
      : `http://localhost:3000/api/employees/create-employee`; // Create employee URL

    try {
      const response = await axios({
        method: id ? "PUT" : "POST", // PUT for update, POST for create
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" }, // Handle file uploads
      });

      if (response.status === 200 || response.status === 201) {
        alert(id ? "Employee updated successfully" : "Employee created successfully");
        navigate("/dashboard"); // Navigate to the dashboard on success
      } else {
        alert("Failed to submit employee data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 max-w-lg mx-auto bg-gray-100 shadow-md rounded"
    >
      <h2 className="text-lg font-bold text-center">{id ? "Edit Employee" : "Create Employee"}</h2>

      {/* Name */}
      <div>
        <label className="block font-medium" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Mobile */}
      <div>
        <label className="block font-medium" htmlFor="mobile">
          Mobile No
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Enter your mobile number"
          required
        />
      </div>

      {/* Designation (Dynamic Dropdown) */}
      <div>
        <label className="block font-medium" htmlFor="designation">
          Designation
        </label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Designation</option>
          {designations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>

      {/* Gender (Dynamic Radio Buttons) */}
      <div>
        <label className="block font-medium">Gender</label>
        <div className="flex gap-4">
          {genders.map((gender, index) => (
            <label key={index}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleChange}
                required
              />
              {gender}
            </label>
          ))}
        </div>
      </div>

      {/* Courses (Dynamic Checkboxes) */}
      <div>
        <label className="block font-medium">Course</label>
        <div className="flex flex-wrap gap-4">
          {courses.map((course, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="courses"
                value={course}
                checked={formData.courses.includes(course)}
                onChange={handleChange}
              />
              {course}
            </label>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block font-medium" htmlFor="image">
          Image Upload
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
        {id ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default CreateEmployeeForm;
