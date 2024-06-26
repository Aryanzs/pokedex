import React from 'react';
import logo from '../assets/logo1.png';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 bg-red-500 dark:bg-gray-900 right-0 backdrop-filter backdrop-blur-lg bg-opacity-20 shadow-md py-4 z-50">
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
            <a href='/Pokemon' className="hover:text-black dark:hover:text-red-500">Pokedex</a>
          </div>
        </div>

        <div className="flex space-x-4 text-lg font-bold text-red-500 gap-3">
          <Link to="/region" className="hover:text-red-600 dark:text-red-500">
            Regions
          </Link>
          <Link to="/type" className="hover:text-red-600 dark:text-red-500">
            Type
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
