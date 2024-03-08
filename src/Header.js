import React from 'react';
import TopBar from './TopBar';
import LogoHeader from './LogoHeader';

const Header = () => {
  return (
    <span className="fixed top-0 w-full z-50 bg-slate-100">
      <header>
        {/* Top Bar */}
        <LogoHeader />
        {/* Main Navigation Bar */}
        <nav className="bg-purple-600">
          {/* Navigation buttons */}
        </nav>
      </header>

      <TopBar />

    <div className="h-1 w-full bg-gradient-to-r from-yellow-500 to-red-500 shadow-md"></div>    
    </span>
  );
};

export default Header;