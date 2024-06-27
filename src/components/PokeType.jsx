import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Next from './Next2';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const typeColors = {
  normal: 'bg-gray-400',
  fighting: 'bg-red-700',
  flying: 'bg-blue-400',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-700',
  rock: 'bg-gray-600',
  bug: 'bg-green-600',
  ghost: 'bg-indigo-800',
  steel: 'bg-gray-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-500',
  ice: 'bg-blue-200',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  fairy: 'bg-pink-300',
  unknown: 'bg-gray-200',
  shadow: 'bg-purple-700',
};

const PokeType = () => {
  const [pokemon, setPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('normal');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemonByType = async () => {
      if (!selectedType) return;

      setLoading(true);
      try {
        console.log(`Fetching Pokémon of type: ${selectedType}`);
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const totalPokemon = response.data.pokemon.length;
        setTotalPages(Math.ceil(totalPokemon / itemsPerPage));

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pagePokemons = response.data.pokemon.slice(start, end);

        const detailedPokemon = await Promise.all(
          pagePokemons.map(async (p) => {
            const pokeDetails = await axios.get(p.pokemon.url);
            return pokeDetails.data;
          })
        );

        console.log('Fetched Pokémon:', detailedPokemon);

        setPokemon(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonByType();
  }, [selectedType, currentPage]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleFlip = (index) => {
    setFlippedCards(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 ">
        <Link to="/Pokemon"> 
          <button className="px-4 py-2 mt-24 text-red-600 dark:text-red-500 hover:bg-rose-300 hover:text-zinc-50 border-2 rounded-md">Go back</button>
        </Link>
        <div className="p-8">
          <div className="mb-4 mx-auto w-full max-w-[1000px] px-4">
            <div className="flex flex-wrap justify-center">
              {types.map(type => (
                <button
                  key={type.name}
                  className={`m-2 px-4 py-2 ${typeColors[type.name]} hover:bg-rose-700 text-white rounded-md`}
                  onClick={() => handleTypeSelect(type.name)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {pokemon.length === 0 ? (
                <div className="text-center text-xl text-rose-500 dark:text-red-500 font-bold mt-8">No Pokémon found for the selected type.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-4">
                  {pokemon.map((poke, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-xl relative transition-colors duration-300 hover:bg-gradient-to-b hover:from-red-400 hover:via-red-300 hover:to-zinc-200 dark:hover:from-red-300 dark:hover:via-red-200 dark:hover:to-zinc-200"
                    >
                      <button
                        className="absolute top-2 right-2 text-red-800 dark:text-red-500 rounded-full p-1"
                        onClick={() => handleFlip(index)}
                      >
                        <i className="fas fa-info-circle"></i>
                      </button>
                      {flippedCards[index] ? (
                        <div>
                          <div className="flex items-center">
                            <p className="text-xl font-bold capitalize text-slate-800 dark:text-red-500">{poke.name}</p>
                            <img
                              src={poke.sprites.other['official-artwork'].front_default}
                              alt={`${poke.name} sprite`}
                              className="w-10 h-10 ml-2"
                            />
                          </div>
                          <p className="text-sm text-black dark:text-red-500">Type: {poke.types.map(type => type.type.name).join(', ')}</p>
                          <p className="text-sm text-black dark:text-red-500">Moves: {poke.moves.map(move => move.move.name).slice(0, 5).join(', ')}</p>
                          <p className="text-sm text-black dark:text-red-500">HP: {poke.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                          <p className="text-sm text-black dark:text-red-500">Attack: {poke.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                          <p className="text-sm text-black dark:text-red-500">Defense: {poke.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                        </div>
                      ) : (
                        <div>
                          <Link to={`/pokemon/${poke.id}`} className="no-underline">
                            {poke.sprites.other['official-artwork'].front_default ? (
                              <img
                                src={poke.sprites.other['official-artwork'].front_default}
                                alt={poke.name}
                                className="w-full h-32 object-contain mb-2 transition-all duration-300 ease-in-out hover:h-48 hover:scale-105"
                              />
                            ) : (
                              <div className="h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-2">
                                <p>No official artwork available</p>
                              </div>
                            )}
                            <p className="text-xl font-bold capitalize text-rose-600 dark:text-red-500">{poke.name}</p>
                            <p className="text-sm text-rose-400 dark:text-red-500">#{poke.id}</p>
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <Next 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                totalPages={totalPages} 
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PokeType;
