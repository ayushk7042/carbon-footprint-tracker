import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  // Navigation Links
  const navLinks = (
    <>
      <Link to="/" className="text-gray-700 hover:text-green-500">Home</Link>
      <a href="#about" className="text-gray-700 hover:text-green-500">About</a>
      <Link to="/calculator" className="text-gray-700 hover:text-green-500">Emission Calculator</Link>
      <Link to="/plants" className="text-gray-700 hover:text-green-500">Top CO₂ Plants</Link>
      <Link to="/greenhouse-gases" className="text-gray-700 hover:text-green-500">Global Warming</Link>

      {user ? (
        <>
          <span className="text-green-600 font-medium">Welcome, {user.name}</span>
          <Link to="/dashboard" className="text-gray-700 hover:text-green-500">Dashboard</Link>
          <button
            onClick={handleLogout}
            className="text-red-600 border border-red-500 px-4 py-1 rounded-md hover:bg-red-100"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-green-600 border border-green-500 px-4 py-1 rounded-md hover:text-green-700">Login</Link>
          <Link to="/signup" className="text-white bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md">Sign Up</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-5 flex justify-between items-center border-b border-gray-200 relative h-24">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Leaf className="h-6 w-6 text-green-500" />
        <Link to="/" className="text-2xl font-bold text-green-600">EcoTrack</Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-semibold items-center">
        {navLinks}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-20">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
