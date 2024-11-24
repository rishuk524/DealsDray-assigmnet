import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // State to hold employee data
  const [searchKeyword, setSearchKeyword] = useState(''); // State for search input
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch employee data from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employees/get-all-employees'); // Replace with your backend URL
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle search filter
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employee List</h1>
      
      {/* Search bar and Create Employee button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mobile No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Designation</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Gender</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Courses</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Create Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="border-b">
                <td className="px-4 py-2">
                <img
  src={`http://localhost:3000/uploads/${employee.uploads}`} // Access image from the backend
  alt={employee.name}
  className="w-10 h-10 rounded-full"
/>
                </td>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.mobile}</td>
                <td className="px-4 py-2">{employee.designation}</td>
                <td className="px-4 py-2">{employee.gender}</td>
                <td className="px-4 py-2">{employee.courses}</td>
                <td className="px-4 py-2">{employee.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEmployees.length === 0 && (
          <div className="text-center p-4">No employees found.</div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
