import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RarrowIcon from '../assets/Arrow_Right_Square-512.png'; // Replace with actual path to your uploaded image
import LarrowIcon from '../assets/Arrow_Left_Square-512.png'; // Replace with actual path to your uploaded image


const starterPokemonUrls = [
  'https://pokeapi.co/api/v2/pokemon/1/',  // Bulbasaur
  'https://pokeapi.co/api/v2/pokemon/4/',  // Charmander
  'https://pokeapi.co/api/v2/pokemon/7/',  // Squirtle
  'https://pokeapi.co/api/v2/pokemon/152/',  // Chikorita
  'https://pokeapi.co/api/v2/pokemon/155/',  // Cyndaquil
  'https://pokeapi.co/api/v2/pokemon/158/',  // Totodile
  'https://pokeapi.co/api/v2/pokemon/252/',  // Treecko
  'https://pokeapi.co/api/v2/pokemon/255/',  // Torchic
  'https://pokeapi.co/api/v2/pokemon/258/',  // Mudkip
  'https://pokeapi.co/api/v2/pokemon/387/',  // Turtwig
  'https://pokeapi.co/api/v2/pokemon/390/',  // Chimchar
  'https://pokeapi.co/api/v2/pokemon/393/',  // Piplup
  'https://pokeapi.co/api/v2/pokemon/495/',  // Snivy
  'https://pokeapi.co/api/v2/pokemon/498/',  // Tepig
  'https://pokeapi.co/api/v2/pokemon/501/',  // Oshawott
  'https://pokeapi.co/api/v2/pokemon/650/',  // Chespin
  'https://pokeapi.co/api/v2/pokemon/653/',  // Fennekin
  'https://pokeapi.co/api/v2/pokemon/656/',  // Froakie
  'https://pokeapi.co/api/v2/pokemon/722/',  // Rowlet
  'https://pokeapi.co/api/v2/pokemon/725/',  // Litten
  'https://pokeapi.co/api/v2/pokemon/728/',  // Popplio
  'https://pokeapi.co/api/v2/pokemon/810/',  // Grookey
  'https://pokeapi.co/api/v2/pokemon/813/',  // Scorbunny
  'https://pokeapi.co/api/v2/pokemon/816/',  // Sobble
];

const typeColors = {
  grass: 'bg-green-500 text-white',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  bug: 'bg-green-800 text-white',
  normal: 'bg-gray-400 text-black',
  poison: 'bg-purple-500 text-white',
  electric: 'bg-yellow-500 text-black',
  ground: 'bg-yellow-700 text-white',
  fairy: 'bg-pink-500 text-white',
  fighting: 'bg-red-800 text-white',
  psychic: 'bg-pink-700 text-white',
  rock: 'bg-gray-700 text-white',
  ghost: 'bg-purple-700 text-white',
  ice: 'bg-blue-300 text-black',
  dragon: 'bg-red-300 text-white',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-gray-500 text-white',
  flying: 'bg-blue-200 text-black',
};


const FeaturedPokemon = () => {
  const [featuredPokemon, setFeaturedPokemon] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchPokemonDetails = async (urls) => {
    const pokemonDetails = await Promise.all(
      urls.map(async (url) => {
        const response = await axios(url);
        const pokemonData = response.data;
        const officialArtworkUrl = pokemonData.sprites.other['official-artwork'].front_default;
        return {
          ...pokemonData,
          officialArtworkUrl,
        };
      })
    );
    setFeaturedPokemon(pokemonDetails);
  };

  useEffect(() => {
    fetchPokemonDetails(starterPokemonUrls);
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredPokemon.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === featuredPokemon.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative bg-gray-800 py-8">
      <h2 className="text-3xl font-bold text-white mb-4 px-8">Starter Pokémon`s</h2>
      <div className="relative group">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handlePrevClick}
        >
          <img src={LarrowIcon} alt="Previous" className="w-9 h-9 " />
        </button>
        <div className="overflow-hidden px-8">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}
          >
            {featuredPokemon.map((pokemon, index) => (
              <div
                key={index}
                className="min-w-[16.67%] flex-shrink-0 flex items-center justify-center bg-gray-700 text-white rounded-lg p-4 shadow-xl m-2"
              >
                {pokemon.officialArtworkUrl ? (
                  <img
                    src={pokemon.officialArtworkUrl}
                    alt={pokemon.name}
                    className="w-full h-64 object-contain mb-2"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-600 mb-2">
                    <p>No official artwork available</p>
                  </div>
                )}
                  <div className="text-center">
                  <p className="text-xl font-bold capitalize">{pokemon.name}</p>
                  <p className="text-sm">Type:</p>
                  <div className="flex justify-center">
                    {pokemon.types.map((type, i) => (
                      <span
                        key={i}
                        className={`px-4 py-1 m-1 rounded ${typeColors[type.type.name]}`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm mt-2">Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleNextClick}
        >
          <img src={RarrowIcon} alt="Next" className="w-9 h-9" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedPokemon;