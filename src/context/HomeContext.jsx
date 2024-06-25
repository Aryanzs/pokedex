import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const HomeContext = createContext();

export const usePokemon = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [filter, setFilter] = useState('none');

  const itemsPerPage = 20;

  const handleFlip = (index) => {
    setFlippedCards(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

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

  const fetchAllPokemon = async () => {
    setLoading(true);
    try {
      const allPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
      const allPokemonUrls = allPokemonResponse.data.results.map(pokemon => pokemon.url);
      const allPokemonDetails = await Promise.all(
        allPokemonUrls.map(async url => {
          try {
            const response = await axios.get(url);
            const pokemonData = response.data;
            const officialArtworkUrl = pokemonData.sprites.other['official-artwork'].front_default;
            const region = await getRegion(pokemonData.location_area_encounters);

            return {
              ...pokemonData,
              officialArtworkUrl,
              region,
            };
          } catch (error) {
            console.error('Error fetching Pokemon details:', error);
            return null;
          }
        })
      );
      const validPokemonDetails = allPokemonDetails.filter(pokemon => pokemon !== null);
      setPokemonData(validPokemonDetails);
      applyFilterAndPaginate(validPokemonDetails, filter, currentPage);
    } catch (error) {
      console.error('Error fetching all Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilterAndPaginate = (data, filter, page) => {
    const sortedData = applyFilter(data, filter);
    const paginatedData = sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    setFilteredPokemonData(paginatedData);
  };

  const applyFilter = (data, filter) => {
    switch (filter) {
      case 'lowest':
        return data.slice().sort((a, b) => a.id - b.id);
      case 'greatest':
        return data.slice().sort((a, b) => b.id - a.id);
      case 'a-z':
        return data.slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return data.slice().sort((a, b) => b.name.localeCompare(a.name));
      default:
        return data;
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    applyFilterAndPaginate(pokemonData, filter, currentPage);
  }, [filter, currentPage, pokemonData]);

  return (
    <HomeContext.Provider
      value={{
        pokemonData: filteredPokemonData,
        currentPage,
        loading,
        flippedCards,
        setPokemonData,
        setLoading,
        setCurrentPage,
        handleFlip,
        setFilter,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
