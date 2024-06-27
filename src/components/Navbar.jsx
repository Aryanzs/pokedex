import React, { useState } from 'react';
import logo from '../assets/logo1.png';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 bg-red-500 dark:bg-gray-700 right-0 dark:backdrop-filter backdrop-filter dark:backdrop-blur-lg backdrop-blur-lg dark:bg-opacity-20 bg-opacity-20  shadow-md dark:shadow-md py-4 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to='/'>
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 rounded-full shadow-lg hover:animate-move-left-right"
            />
          </Link>
          <div className="text-2xl font-bold text-red-500">
            <a href='/Pokemon' className="hover:text-black dark:hover:text-red-500">Pokedex</a>          
          </div>
        </div>

        <div className="hidden md:flex space-x-4 text-lg font-bold text-red-500 gap-3">
          <Link to="/region" className="hover:text-red-600 dark:text-red-500">
            Regions
          </Link>
          <Link to="/type" className="hover:text-red-600 dark:text-red-500">
            Type
          </Link>
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-red-500 dark:text-red-500">
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-red-500 dark:bg-gray-900 text-red-200 dark:text-red-500 px-4 py-2 space-y-2">
          <Link to="/region" className="block hover:text-red-600 dark:hover:text-red-500">
            Regions
          </Link>
          <hr className="border-red-300 dark:border-gray-700" />
          <Link to="/type" className="block hover:text-red-600 dark:hover:text-red-500">
            Type
          </Link>
          <hr className="border-red-300 dark:border-gray-700" />
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
