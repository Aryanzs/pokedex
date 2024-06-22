import React, { useState } from 'react';
import { usePokemon } from '../context/HomeContext';
import axios from 'axios';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const { setPokemonData, setLoading } = usePokemon();

  const getRegion = async (url) => {
    try {
      const response = await axios(url);
      if (response.data.length > 0) {
        const locationArea = response.data[0].location_area.url;
        const locationResponse = await axios(locationArea);
        const regionUrl = locationResponse.data.location.url;
        const regionResponse = await axios(regionUrl);
        return regionResponse.data.region.name;
      }
      return 'Unknown';
    } catch (error) {
      console.error('Error fetching region:', error);
      return 'Unknown';
    }
  };

  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      const pokemonData = response.data;
      const officialArtworkUrl = pokemonData.sprites.other['official-artwork'].front_default;
      const region = await getRegion(pokemonData.location_area_encounters);

      setPokemonData([{
        ...pokemonData,
        officialArtworkUrl,
        region,
      }]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchSearchResults(inputValue.trim()); // Fetch search results
    setInputValue(''); // Clear input after search
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search Pokémon"
        className="px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
