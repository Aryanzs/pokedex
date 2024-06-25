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
                return { id, name, imageUrl };
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

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <div className="region-filter">
          <Link to="/pokemon"> <button className="ml-5 px-4 py-2 mt-24  bg-red-500 hover:bg-rose-700 text-white rounded-md">Goback</button></Link>

          <div className="region-buttons flex mt-10 justify-center">

            {regions.map((region) => (
              <button
                key={region.id}
                className="ml-2 px-4 py-2 bg-red-500 hover:bg-rose-700 text-white rounded-md"
                onClick={() => handleRegionChange(region.id)}
              >
                {region.name}
              </button>
            ))}
          </div>

          <div className="pokemon-list mt-4">
            <h3 className="font-extrabold flex justify-center text-red-800 text-xl mb-2">{selectedRegion.toUpperCase()}</h3>
            <div className="grid grid-cols-5 gap-4">
              {currentPokemonList.length > 0 ? (
                currentPokemonList.map((pokemon, index) => (
                  <Link to={`/pokemon/${pokemon.id}`} key={index}>
                    <div className="bg-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center">
                      <img src={pokemon.imageUrl} alt={pokemon.name} className="h-32 w-32 mb-2" />
                      <p className="text-xl font-bold mb-2 capitalize text-red-500">{pokemon.name} (# {pokemon.id})</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center">No Pokémon found for this region.</p>
              )}
            </div>
            <Next currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
          <Footer/>

        </div>
      )}
      
    </>
  );
};

export default RegionFilter;
