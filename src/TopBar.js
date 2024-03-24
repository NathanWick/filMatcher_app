import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';



const TopBar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isOpen, setIsOpen] = useState(false);
  
    // Inside your component
    const navigate = useNavigate();

        const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="md:py-4">
      <nav className="container mx-auto flex items-center justify-center">
        {isMobile ? (
          <div onClick={toggleMenu} className="cursor-pointer fixed top-0 left-0 m-6">
            {/* Hamburger menu icon */}
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            {/* Menu items */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl">
                <a href="/home" className="block px-4 py-2 text-sm hover:bg-gray-200">Home</a>
                <a href="/ratings" className="block px-4 py-2 text-sm hover:bg-gray-200">Ratings</a>
                <a href="/matches" className="block px-4 py-2 text-sm hover:bg-gray-200">Matches</a>
                <a href="/about" className="block px-4 py-2 text-sm hover:bg-gray-200">About</a>
                <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-200">Profile</a>
                <a href="/logout" className="block px-4 py-2 text-sm hover:bg-gray-200" onClick={(e) => {
                  e.preventDefault();
                  // Delete the token from local storage
                  localStorage.removeItem('token');
                  navigate('/login');
                }}>Logout</a>
              </div>
            )}
          </div>
        ) : (
            <div className="flex items-center md:justify-center space-x-10">
              {/* Regular top bar */}
              <a href="/home" className="text-lg hover:bg-yellow-200 px-2 py-1 rounded-2xl">Home</a>
              <a href="/ratings" className="text-lg hover:bg-yellow-200 px-2 py-1 rounded-2xl">Ratings</a>
              <a href="/matches" className="text-lg hover:bg-yellow-200 px-2 py-1 rounded-2xl">Matches</a>
              <a href="/about" className="text-lg hover:bg-yellow-200 px-2 py-1 rounded-2xl">About</a>
              <a href="/profile" className="text-lg hover:bg-yellow-200 px-2 py-1 rounded-2xl">Profile</a>
              <a href="/logout" className="text-lg hover:bg-yellow-200 px-2 py-1 rounded-2xl">Logout</a>
            </div>
          )}
      </nav>
    </header>
  );
};

export default TopBar;