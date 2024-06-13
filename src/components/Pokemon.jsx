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



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}`);
      const pokemonUrls = result.data.results.map(pokemon => pokemon.url);
      const pokemonDetails = await Promise.all(
        pokemonUrls.map(async url => {
          const response = await axios(url);
          const pokemonData = response.data;
          const officialArtworkUrl = pokemonData.sprites.other['official-artwork'].front_default;

          return {
            ...pokemonData,
            officialArtworkUrl,

          };
        })
      );
      setPokemonData(pokemonDetails);
      setLoading(false);
    };
    if (!searchResultsVisible) {
      fetchData();
    }
  }, [currentPage, searchResultsVisible]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        setSearchResultsVisible={setSearchResultsVisible}
        setPokemonData={setPokemonData}
        currentPage={currentPage}
        setLoading={setLoading}
      />
      <div className="p-8">
        {loading ? (
          <Spinner />
        ) : (
          !searchResultsVisible && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pokemonData.map((pokemon, index) => (
                <div key={index}   className="bg-gray-300 rounded-lg p-4 shadow-xl transition-colors duration-300 hover:bg-gradient-to-b hover:from-red-500 hover:via-red-300 hover:to-zinc-200"
>
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
              ))}
            </div>
          )
        )}
        {!searchResultsVisible && <Next currentPage={currentPage} setCurrentPage={setCurrentPage} setData={setPokemonData} />}
      </div>
    </div>
  );
};

export default Pokemon;
