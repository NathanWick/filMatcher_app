import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import Matches from './Matches';
import Ratings from './Ratings';
import About from './About';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/logout" element={<Navigate to="/login" />} />
        {/* Other routes go here */}
      </Routes>
    </Router>
  );
}

export default App;