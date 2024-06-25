import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Next from './Next';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const typeColors = {
  grass: 'bg-green-500 text-white', fire: 'bg-red-500 text-white', water: 'bg-blue-500 text-white',
  bug: 'bg-green-800 text-white', normal: 'bg-gray-400 text-black', poison: 'bg-purple-500 text-white',
  electric: 'bg-yellow-500 text-black', ground: 'bg-yellow-700 text-white', fairy: 'bg-pink-500 text-white',
  fighting: 'bg-red-800 text-white', psychic: 'bg-pink-700 text-white', rock: 'bg-gray-700 text-white',
  ghost: 'bg-purple-700 text-white', ice: 'bg-blue-300 text-black', dragon: 'bg-red-300 text-white',
  dark: 'bg-gray-800 text-white', steel: 'bg-gray-500 text-white', flying: 'bg-blue-200 text-black',
};

const PokeType = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true); // Set loading to true when starting data fetch
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1202');
        const results = await Promise.all(response.data.results.map(async (poke) => {
          const pokeDetails = await axios.get(poke.url);
          return pokeDetails.data;
        }));
        setPokemon(results);
        setFilteredPokemon(results);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch completes
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
      }
    };

    fetchPokemon();
    fetchTypes();
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredPokemon(pokemon.filter(poke => poke.types.some(type => type.type.name === selectedType)));
      setCurrentPage(1); // Reset to first page on type change
    } else {
      setFilteredPokemon(pokemon);
    }
  }, [selectedType, pokemon]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <div className="p-4 py-32">
               <Link to="/pokemon"> <button className="ml-5 px-4 py-2 mt-5 bg-red-500 hover:bg-rose-700 text-white rounded-md">Goback</button></Link>

          <div className="mb-4 ml-60 w-[1000px]">
            {types.map(type => (
              <button
                key={type.name}
                className={`ml-5 px-4 py-2 mt-5 ${typeColors[type.name]} hover:bg-rose-700 text-white rounded-md`}
                onClick={() => setSelectedType(type.name)}
              >
                {type.name}
              </button>
            ))}
          </div>
          {currentPokemon.length === 0 ? (
            <div className="text-center text-xl text-rose-500 font-bold mt-8">No Pokémon found for the selected type.</div>
          ) : (
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5 mt-8 gap-4">
              {currentPokemon.map(poke => (
                <Link key={poke.id} to={`/pokemon/${poke.id}`} className="text-rose-500  hover:text-rose-600">
                  <div className="border rounded-md p-4 flex bg-gray-200 flex-col items-center">
                    <img
                      src={poke.sprites.other['official-artwork'].front_default}
                      alt={poke.name}
                      className="h-48 w-48 object-contain mb-2"
                    />
                                        <h3 className="text-xl font-bold mb-2 capitalize">{poke.name} (# {poke.id})</h3>

                  </div>
                </Link>
              ))}
            </div>
          )}
          <Next currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default PokeType;
