import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../context/HomeContext';
import Navbar from './Navbar';
import Next from './Next';
import Spinner from './Spinner';
import Search from './Search';


const Pokemon = () => {
  const {
    pokemonData,
    currentPage,
    loading,
    flippedCards,
    handleFlip,
    setCurrentPage, // Make sure to include setCurrentPage here
  } = usePokemon();

  return (
    <div className="min-h-screen bg-gray-100 mt-24">

      <div className="p-8">
        {loading ? (
          <Spinner />
        ) : (
        <>
        <Search/>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-4 gap-4">
            {pokemonData.map((pokemon, index) => (
              <div key={index} className="bg-gray-300 rounded-lg p-4 shadow-xl relative transition-colors duration-300 hover:bg-gradient-to-b hover:from-red-500 hover:via-red-300 hover:to-zinc-200">
                <button
                  className="absolute top-2 right-2 text-gray-800 rounded-full p-1"
                  onClick={() => handleFlip(index)}
                >
                  <i className="fas fa-info-circle"></i>
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
                    <Link to={`/pokemon/${pokemon.id}`} className="no-underline">
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
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          </>
        )}

        <Next currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      
    </div>
  );
};

export default Pokemon;
