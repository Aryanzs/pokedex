import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../context/HomeContext';
import Navbar from './Navbar';
import Next from './Next';
import Spinner from './Spinner';
import Search from './Search';
import Footer from './Footer';

const Pokemon = () => {
  const {
    pokemonData,
    currentPage,
    loading,
    flippedCards,
    handleFlip,
    setCurrentPage,
  } = usePokemon();

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 mt-20">
        <Navbar />
        <div className="p-8">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex">
                <Link to="/">
                  <div className="px-4 py-2 text-red-600 hover:bg-rose-300 hover:text-zinc-50 border-2 rounded-md">
                    Go back
                  </div>
                </Link>
                <Search />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-4 gap-4">
                {pokemonData.map((pokemon, index) => (
                  <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-xl relative transition-colors duration-300 hover:bg-gradient-to-b hover:from-red-400 hover:via-red-300 hover:to-zinc-200 dark:hover:from-red-300 dark:hover:via-red-200 dark:hover:to-zinc-200 ">
                    <button
                      className="absolute top-2 right-2 text-red-800 rounded-full p-1"
                      onClick={() => handleFlip(index)}
                    >
                      <i className="fas fa-info-circle"></i>
                    </button>
                    {flippedCards[index] ? (
                      <div>
                        <div className="flex items-center">
                          <p className="text-xl font-bold capitalize text-slate-800 dark:text-red-500">{pokemon.name}</p>
                          <img
                            src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}
                            alt={`${pokemon.name} sprite`}
                            className="w-10 h-10 ml-2"
                          />
                        </div>
                        <p className="text-sm text-black dark:text-red-500">Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
                        <p className="text-sm text-black dark:text-red-500">Moves: {pokemon.moves.map(move => move.move.name).slice(0, 5).join(', ')}</p>
                        <p className="text-sm text-black dark:text-red-500">Region: {pokemon.region}</p>
                        <p className="text-sm text-black dark:text-red-500">HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                        <p className="text-sm text-black dark:text-red-500">Attack: {pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                        <p className="text-sm text-black dark:text-red-500">Defense: {pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                      </div>
                    ) : (
                      <div>
                        <Link to={`/pokemon/${pokemon.id}`} className="no-underline">
                          {pokemon.officialArtworkUrl ? (
                            <img
                              src={pokemon.officialArtworkUrl}
                              alt={pokemon.name}
                              className="w-full h-32 object-contain mb-2 transition-all duration-300 ease-in-out hover:h-48 hover:scale-105"
                            />
                          ) : (
                            <div className="h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-2">
                              <p>No official artwork available</p>
                            </div>
                          )}
                          <p className="text-xl font-bold capitalize text-rose-600 dark:text-red-500">{pokemon.name}</p>
                          <p className="text-sm text-rose-400 dark:text-red-500">#{(currentPage - 1) * 20 + index + 1}</p>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Next currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pokemon;
