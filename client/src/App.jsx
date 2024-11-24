import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './Components/Signup.jsx';
import LoginForm from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import CreateEmployeeForm from './Components/CreateEmployeeForm.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create-employee" element={<CreateEmployeeForm/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
