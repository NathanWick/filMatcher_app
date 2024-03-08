import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import LogoHeader from './LogoHeader';

function CreateAccount() {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    monthOfBirth: '',
    yearOfBirth: '',
    race: '',
    gender: 'other', // Default to 'other', matching the SQL table default
    username: '',
    country: '',
    profilePicture: '',
    bio: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateInputs = () => {
    const { monthOfBirth, yearOfBirth, email, password, confirmPassword } = userDetails;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidMonth = monthOfBirth.length === 2 && monthOfBirth > 0 && monthOfBirth <= 12;
    const isValidYear = yearOfBirth.length === 4 && yearOfBirth > 1900 && yearOfBirth <= new Date().getFullYear();
    const passwordsMatch = password === confirmPassword;
    // Further validations can be added here
    return isValidEmail && isValidMonth && isValidYear && passwordsMatch;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      axios.post('https://filmatcher.com/api/create_account', userDetails)
        .then(response => {
          // Handle success response
          console.log(response.data);
          navigate('/login');
        })
        .catch(error => {
          // Handle error
          console.error("There was an error creating the account:", error);
        });
    } else {
      alert("Please check your inputs and try again.");
    }
  };

  return (
    <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '/popcorn_img.webp'})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh',
        overflow: 'auto'
    }}
      className="flex items-center justify-center"
    >
      <form
        className="m-5 p-10 bg-white bg-opacity-95 rounded-lg shadow-md max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <LogoHeader />

        <input
          type="text"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <input
          type="text"
          name="firstName"
          value={userDetails.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <input
          type="text"
          name="lastName"
          value={userDetails.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <input
          type="password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <input
          type="password"
          name="confirmPassword"
          value={userDetails.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <input
          type="text"
          name="monthOfBirth"
          value={userDetails.monthOfBirth}
          onChange={handleChange}
          placeholder="Month of Birth (MM)"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <input
          type="text"
          name="yearOfBirth"
          value={userDetails.yearOfBirth}
          onChange={handleChange}
          placeholder="Year of Birth (YYYY)"
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        />
        <select
            name="race"
            value={userDetails.race}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md border-gray-300"
        >
            <option value="">Select Race</option>
            <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
            <option value="Asian">Asian</option>
            <option value="Black or African American">Black or African American</option>
            <option value="Hispanic or Latino">Hispanic or Latino</option>
            <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
            <option value="White">White</option>
            <option value="Other">Other</option>
        </select>
        <select
          name="gender"
          value={userDetails.gender}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          name="country"
          value={userDetails.country}
          onChange={handleChange}
          className="w-full p-2 mt-1 border rounded-md border-gray-300"
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          {/* Add more country options as needed */}
        </select>
        <input
          type="submit"
          value="Create Account"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md cursor-pointer"
        />
      </form>
    </div>
  );
}

export default CreateAccount;