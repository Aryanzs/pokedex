import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Next from './Next';
import Spinner from './Spinner';

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
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

    const fetchSearchResults = async () => {
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

    if (searchResultsVisible) {
      fetchSearchResults();
    } else {
      fetchData();
    }
  }, [currentPage, searchResultsVisible, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 mt-24">
      <Navbar
        setSearchResultsVisible={setSearchResultsVisible}
        setPokemonData={setPokemonData}
        currentPage={currentPage}
        setLoading={setLoading}
        setCurrentPage={setCurrentPage}
        setSearchQuery={setSearchQuery}
      />

      <div className="p-8">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pokemonData.map((pokemon, index) => (
              <div key={index} className="bg-gray-300 rounded-lg p-4 shadow-xl relative transition-colors duration-300 hover:bg-gradient-to-b hover:from-red-500 hover:via-red-300 hover:to-zinc-200">
                <button
                  className="absolute top-2 right-2 text-gray-800 rounded-full p-1"
                  onClick={() => handleFlip(index)}
                >
                  <i className="fas fa-info-circle "></i>
                </button>
                {flippedCards[index] ? (
                  <div>
                    <div className="flex items-center">
                      <p className="text-xl font-bold capitalize text-slate-800">{pokemon.name}</p>
                      <img
                        src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}
                        alt={`${pokemon.name} sprite`}
                        className="w-10 h-10 ml-2"
                      />
                    </div>
                    <p className="text-sm text-black">Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p className="text-sm text-black">Moves: {pokemon.moves.map(move => move.move.name).slice(0, 5).join(', ')}</p>
                    <p className="text-sm text-black">Region: {pokemon.region}</p>
                    <p className="text-sm text-black">HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                    <p className="text-sm text-black">Attack: {pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                    <p className="text-sm text-black">Defense: {pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                  </div>
                ) : (
                  <div>
                    {pokemon.officialArtworkUrl ? (
                      <img
                        src={pokemon.officialArtworkUrl}
                        alt={pokemon.name}
                        className="w-full h-32 object-contain mb-2 transition-all duration-300 ease-in-out hover:h-48 hover:scale-105"
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center bg-gray-200 mb-2">
                        <p>No official artwork available</p>
                      </div>
                    )}
                    <p className="text-xl font-bold capitalize text-slate-800">{pokemon.name}</p>
                    <p className="text-sm text-gray-500">#{(currentPage - 1) * 20 + index + 1}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!searchResultsVisible && <Next currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
};

export default Pokemon;
