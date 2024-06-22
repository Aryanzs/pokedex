import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import Card from './Card';
import red from '../assets/red.png';
import blue from '../assets/blue.png';
import emerald from '../assets/green.png';
import gold from '../assets/gold.png';
import './Text.css';
import { Evolution } from './Evolution';


const imageArray = [
  { name: 'red', src: red, alt: 'Red version' },
  { name: 'blue', src: blue, alt: 'Blue version' },
  { name: 'emerald', src: emerald, alt: 'Emerald version' },
  { name: 'gold', src: gold, alt: 'Gold version' },
];

const typeColors = {
  grass: 'bg-green-500 text-white', fire: 'bg-red-500 text-white', water: 'bg-blue-500 text-white',
  bug: 'bg-green-800 text-white', normal: 'bg-gray-400 text-black', poison: 'bg-purple-500 text-white',
  electric: 'bg-yellow-500 text-black', ground: 'bg-yellow-700 text-white', fairy: 'bg-pink-500 text-white',
  fighting: 'bg-red-800 text-white', psychic: 'bg-pink-700 text-white', rock: 'bg-gray-700 text-white',
  ghost: 'bg-purple-700 text-white', ice: 'bg-blue-300 text-black', dragon: 'bg-red-300 text-white',
  dark: 'bg-gray-800 text-white', steel: 'bg-gray-500 text-white', flying: 'bg-blue-200 text-black',
};

const PokeDetail = () => {
  const { id } = useParams();
  const {
    pokemonData,
    pokemonTypes,
    doubleDamageFrom,
    halfDamageFrom,
    doubleDamageTo,
    selectedVersion,
    versionDescription,
    pokemonImage,
    region,
    loading,
    fetchPokemonData,
    handleVersionClick,
  } = useContext(PokemonContext);

  useEffect(() => {
    fetchPokemonData(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-24 px-4 py-8 bg-slate-50">
      <h1 className="text-6xl font-bold text-center mb-8">
       <i>{pokemonData?.name.charAt(0).toUpperCase() + pokemonData?.name.slice(1)}</i> 
      </h1>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Column */}
        <div className="bg-white rounded-lg p-6 flex flex-col items-center w-90 mb-8">
          <div className="card mb-4 lg:-mt-[10px]  -mr-32 lg:ml-14">
            <div className="image-container">
              <img src={pokemonImage} alt={pokemonData?.name} className=" " />
            </div>
          </div>
          <div className="flex lg:ml-32">
          <h1 className="text-2xl font-bold">Type:</h1>
          <div className="flex justify-center gap-2 mb-4">
            {pokemonTypes.map((type) => (
              <span key={type} className={`px-3 ml-1 py-1 rounded-lg shadow ${typeColors[type.toLowerCase()]}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
         
          <div className="flex justify-center gap-2">
            <h2 className="text-2xl font-bold lg:ml-7">Region:</h2>
            <span className="text-xl">{region}</span>
          </div>
        </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 mb-4">
            <p className="text-lg mb-4">{versionDescription}</p>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Version:</span>
              <div className="flex space-x-2">
                {imageArray.map((image) => (
                  <button
                    key={image.name}
                    className={`p-1 rounded-full ${selectedVersion === image.name ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => handleVersionClick(image.name)}
                  >
                    <img className="h-8 w-8" src={image.src} alt={image.alt} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <Card pokemonId={id} />
          </div>

          <div className="lg:flex lg:space-x-4">
            <div className="bg-white rounded-lg p-6 hover:shadow-xl hover:bg-slate-200 mb-4 lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Weaknesses</h2>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold mb-2">Double Damage From:</h3>
                  <div className="flex flex-wrap gap-2">
                    {doubleDamageFrom.length > 0 ? (
                      doubleDamageFrom.map((type) => (
                        <span key={type} className={`px-3 py-1 rounded-lg shadow ${typeColors[type.toLowerCase()]}`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No notable weaknesses.</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Half Damage From:</h3>
                  <div className="flex flex-wrap gap-2">
                    {halfDamageFrom.length > 0 ? (
                      halfDamageFrom.map((type) => (
                        <span key={type} className={`px-3 py-1 rounded-lg shadow ${typeColors[type.toLowerCase()]}`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No notable resistances.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 hover:shadow-xl hover:bg-slate-200  lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Strengths</h2>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold mb-2">Double Damage To:</h3>
                  <div className="flex flex-wrap gap-2">
                    {doubleDamageTo.length > 0 ? (
                      doubleDamageTo.map((type) => (
                        <span key={type} className={`px-3 py-1 rounded-lg shadow ${typeColors[type.toLowerCase()]}`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No notable strengths.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Evolution pokemonId={id}/>
    </div>
  );
};

export default PokeDetail;
