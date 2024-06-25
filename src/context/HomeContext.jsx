import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const HomeContext = createContext();

export const usePokemon = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}`);
      const pokemonUrls = result.data.results.map(pokemon => pokemon.url);
      const pokemonDetails = await Promise.all(
        pokemonUrls.map(async url => {
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
            return null; // Return null for failed requests
          }
        })
      );
      // Filter out null values from failed requests
      const filteredPokemonDetails = pokemonDetails.filter(pokemon => pokemon !== null);
      setPokemonData(filteredPokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <HomeContext.Provider
      value={{
        pokemonData,
        currentPage,
        loading,
        flippedCards,
        setPokemonData,
        setLoading,
        setCurrentPage,
        handleFlip,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
