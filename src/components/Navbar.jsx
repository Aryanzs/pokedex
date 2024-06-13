import React from 'react';
import logo from '../assets/logo1.png';
import Search from './Search';

const Navbar = ({ setSearchResultsVisible, setPokemonData, currentPage, setLoading }) => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-14 shadow-lg hover:animate-move-left-right"
          />
          <div className="text-2xl font-bold">Pokedex</div>
        </div>
        <div className="flex space-x-4">
          <Search
            setSearchResultsVisible={setSearchResultsVisible}
            setPokemonData={setPokemonData}
            currentPage={currentPage}
            setLoading={setLoading}
          />
          <a href="#regions" className="text-gray-700 hover:text-gray-900">
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
