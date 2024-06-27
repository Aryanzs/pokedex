import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Next from './Next';
import Spinner from './Spinner';
import Footer from './Footer';

const RegionFilter = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('kanto'); // Default selected region
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [loading, setLoading] = useState(true); // State for loading status
  const [flippedCards, setFlippedCards] = useState({});
  const pokemonPerPage = 20; // Number of Pokémon cards per page

  // Regions and corresponding generation IDs
  const regions = [
    { name: 'Kanto', id: 1 },    // Generation I
    { name: 'Johto', id: 2 },    // Generation II
    { name: 'Hoenn', id: 3 },    // Generation III
    { name: 'Sinnoh', id: 4 },   // Generation IV
    { name: 'Unova', id: 5 },    // Generation V
    { name: 'Kalos', id: 6 },    // Generation VI
    { name: 'Alola', id: 7 },    // Generation VII
    { name: 'Galar', id: 8 },    // Generation VIII
  ];

  // Function to fetch Pokémon by region (generation) with names and images
  const fetchPokemonByRegion = async (regionId) => {
    try {
      setLoading(true); // Set loading to true when starting data fetch
      const response = await axios.get(`https://pokeapi.co/api/v2/generation/${regionId}`);

      if (response.data && response.data.pokemon_species) {
        // Extract Pokémon names and fetch additional details (like image URLs)
        const pokemonDetails = await Promise.all(
          response.data.pokemon_species.map(async (pokemon) => {
            try {
              const pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
              const id = pokemonInfo.data.id;
              const name = pokemonInfo.data.name;
              const imageUrl = pokemonInfo.data.sprites.other['official-artwork'].front_default; // High-quality image URL

              // Return only if both name and image URL are available
              if (id && name && imageUrl) {
                return { id, name, imageUrl, types: pokemonInfo.data.types, stats: pokemonInfo.data.stats, moves: pokemonInfo.data.moves };
              } else {
                return null; // Handle cases where data is incomplete
              }
            } catch (error) {
              console.error('Error fetching Pokémon details:', error);
              return null; // Handle errors gracefully
            }
          })
        );

        // Filter out null values (optional, depending on your preference)
        const filteredPokemonDetails = pokemonDetails.filter(pokemon => pokemon !== null);

        setPokemonList(filteredPokemonDetails);
        setCurrentPage(1); // Reset to the first page when region changes
      } else {
        setPokemonList([]);
      }
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      setPokemonList([]); // Clear Pokémon list on error
    } finally {
      setLoading(false); // Set loading to false after data fetch completes
    }
  };

  // useEffect to fetch data for the initial region (Kanto by default)
  useEffect(() => {
    fetchPokemonByRegion(1); // Fetch Pokémon list for Kanto (Generation I) initially
  }, []); // Empty dependency array ensures it only runs once on component mount

  // Handle region change
  const handleRegionChange = (regionId) => {
    fetchPokemonByRegion(regionId);
    setSelectedRegion(regions.find((region) => region.id === regionId).name.toLowerCase());
  };

  // Calculate indices for the current page
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemonList = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handleFlip = (index) => {
    setFlippedCards(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    setTimeout(() => setLoading(false), 500); // Simulating loading time
  };

  return (
    <>
      <Navbar />
      <div className="region-filter min-h-screen bg-gray-100 dark:bg-gray-900  p-8">
        <Link to="/Pokemon"> 
          <button className=" px-4 py-2 mt-20 text-red-600 dark:text-red-400 hover:bg-rose-300 hover:text-zinc-50 dark:hover:text-zinc-50 border-2 rounded-md">Go back</button>
        </Link>

        <div className="region-buttons flex flex-wrap mt-10 justify-center">
          {regions.map((region) => (
            <button
              key={region.id}
              className="m-2 px-4 py-2 bg-red-500 dark:bg-red-700 hover:bg-rose-700 dark:hover:bg-rose-900 text-white rounded-md"
              onClick={() => handleRegionChange(region.id)}
            >
              {region.name}
            </button>
          ))}
        </div>

        {loading ? (
          <Spinner /> // Show spinner while loading
        ) : (
          <div className="pokemon-list mt-4">
            <h3 className="font-extrabold flex justify-center text-red-800 dark:text-red-500 text-xl mb-2">
              {selectedRegion.toUpperCase()}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-4">
              {currentPokemonList.length > 0 ? (
                currentPokemonList.map((pokemon, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 shadow-xl relative transition-colors duration-300 hover:bg-gradient-to-b hover:from-red-400 hover:via-red-300 hover:to-zinc-200 dark:hover:bg-gradient-to-b dark:hover:from-red-300 dark:hover:via-red-200 dark:hover:to-zinc-200"
                  >
                    <button
                      className="absolute top-2 right-2 text-red-800 dark:text-red-400 rounded-full p-1"
                      onClick={() => handleFlip(index)}
                    >
                      <i className="fas fa-info-circle"></i>
                    </button>
                    {flippedCards[index] ? (
                      <div>
                        <div className="flex items-center">
                          <p className="text-xl font-bold capitalize text-slate-800 dark:text-red-500">{pokemon.name}</p>
                          <img
                            src={pokemon.imageUrl}
                            alt={`${pokemon.name} sprite`}
                            className="w-10 h-10 ml-2"
                          />
                        </div>
                        <p className="text-sm text-black  dark:text-red-500">Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
                        <p className="text-sm text-black  dark:text-red-500">Moves: {pokemon.moves.map(move => move.move.name).slice(0, 5).join(', ')}</p>
                        <p className="text-sm text-black  dark:text-red-500">HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                        <p className="text-sm text-black  dark:text-red-500">Attack: {pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                        <p className="text-sm text-black  dark:text-red-500">Defense: {pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                      </div>
                    ) : (
                      <div>
                        <Link to={`/pokemon/${pokemon.id}`} className="no-underline">
                          {pokemon.imageUrl ? (
                            <img
                              src={pokemon.imageUrl}
                              alt={pokemon.name}
                              className="w-full h-32 object-contain mb-2 transition-all duration-300 ease-in-out hover:h-48 hover:scale-105"
                            />
                          ) : (
                            <div className="h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-2">
                              <p>No official artwork available</p>
                            </div>
                          )}
                          <p className="text-xl font-bold capitalize text-rose-600 dark:text-rose-400">{pokemon.name}</p>
                          <p className="text-sm text-rose-400 dark:text-rose-300">#{pokemon.id}</p>
                        </Link>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center dark:text-gray-300">No Pokémon found for this region.</p>
              )}
            </div>
            <Next currentPage={currentPage} setCurrentPage={handlePageChange} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RegionFilter;
