import React from 'react';
import logo from '../assets/logo1.png';


const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 bg-red-500 right-0 backdrop-filter backdrop-blur-lg bg-opacity-20 shadow-md py-4 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <a href='/'>
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 rounded-full shadow-lg hover:animate-move-left-right"
            />
          </a>
          <div className="text-2xl font-bold text-red-500">
            <a href='/' className="hover:text-black">Pokedex</a>
          </div>
        </div>

        {/* Search Component */}

        <div className="flex space-x-4 justify-end">
          <a href="#regions" className="text-red-500 hover:text-red-600">
            Regions
          </a>
          <a href="#about" className="text-gray-700 hover:text-gray-900">
            About Us
          </a>
          <a href="#games" className="text-gray-700 hover:text-gray-900">
            Games
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
