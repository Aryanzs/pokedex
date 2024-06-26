import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import Card from './Card';
import red from '../assets/red-removebg.png';
import blue from '../assets/blue-removebg.png';
import emerald from '../assets/green-removebg.png';
import gold from '../assets/gold-removebg.png';
import { Evolution } from './Evolution';
import Navbar from './Navbar';
import Footer from './Footer';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import '../components/Text.css'


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

const regionColors = {
  kanto: 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
  johto: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
  hoenn: 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
  sinnoh: 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
  unova: 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
  kalos: 'bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200',
  alola: 'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200',
  galar: 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <div className="w-full min-h-screen  bg-slate-50 dark:bg-gray-900 pt-24">
            <Link to="/Pokemon">
              <button className="px-4 py-2 text-red-600 dark:text-white hover:bg-rose-300 dark:hover:bg-rose-900 hover:text-zinc-50 border-2 rounded-md">
                Go back
              </button>
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold text-rose-600 dark:text-rose-500 text-center mb-8 pt-8 pb-6">
              <i>{pokemonData?.name.charAt(0).toUpperCase() + pokemonData?.name.slice(1)}</i>
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="image-container flex justify-center">
                    <img src={pokemonImage} alt={pokemonData?.name} className="w-64 h-64 md:w-80 md:h-80 object-contain" />
                  </div>
                  <div className="mt-6 flex flex-col items-center">
                    <h2 className="text-xl text-rose-400 dark:text-rose-500 font-bold mb-2">Type and Region:</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      <div className="flex items-center">
                        <span className="font-semibold mr-1 text-rose-800 dark:text-rose-300">Type:</span>
                        {pokemonTypes.map((type) => (
                          <span key={type} className={`px-3 py-1 ml-2 rounded-lg shadow text-sm ${typeColors[type.toLowerCase()]}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-1 text-rose-800 dark:text-rose-300">Region:</span>
                        <span className={`px-3 py-1 rounded-lg shadow text-sm ${regionColors[region.toLowerCase()]}`}>
                          {region.charAt(0).toUpperCase() + region.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Evolution pokemonId={id} />
              </div>

              {/* Right Column */}
              <div className="space-y-1">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <p className="text-lg mb-4 text-rose-800 dark:text-rose-300">{versionDescription}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-semibold text-rose-400 dark:text-rose-500">Version:</span>
                    <div className="flex flex-wrap gap-2">
                      {imageArray.map((image) => (
                        <button
                          key={image.name}
                          className={`p-1 rounded-full ${selectedVersion === image.name ? 'ring-2 ring-rose-700 dark:ring-rose-500' : ''}`}
                          onClick={() => handleVersionClick(image.name)}
                        >
                          <img className="h-8 w-8 md:h-10 md:w-10" src={image.src} alt={image.alt} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <h2 className="text-2xl text-rose-400 dark:text-rose-500 font-bold mb-4">Details</h2>
                  <Card pokemonId={id} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 dark:shadow-lg dark:hover:shadow-xl shadow-lg hover:shadow-xl dark:transition-shadow transition-shadow">
                    <h2 className="text-2xl text-rose-400 dark:text-rose-500 font-bold mb-4">Weaknesses</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-rose-800 dark:text-rose-300">Double Damage From:</h3>
                        <div className="flex flex-wrap gap-2">
                          {doubleDamageFrom.length > 0 ? (
                            doubleDamageFrom.map((type) => (
                              <span key={type} className={`px-2 py-1 rounded-lg shadow text-sm ${typeColors[type.toLowerCase()]}`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </span>
                            ))
                          ) : (
                            <p className="text-rose-300 dark:text-rose-700">No notable weaknesses.</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-rose-800 dark:text-rose-300">Half Damage From:</h3>
                        <div className="flex flex-wrap gap-2">
                          {halfDamageFrom.length > 0 ? (
                            halfDamageFrom.map((type) => (
                              <span key={type} className={`px-2 py-1 rounded-lg shadow text-sm ${typeColors[type.toLowerCase()]}`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </span>
                            ))
                          ) : (
                            <p className="text-rose-300 dark:text-rose-700">No notable resistances.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl text-rose-400 dark:text-rose-500 font-bold mb-4">Strengths</h2>
                    <div>
                      <h3 className="font-semibold mb-2 text-rose-800 dark:text-rose-300">Double Damage To:</h3>
                      <div className="flex flex-wrap gap-2">
                        {doubleDamageTo.length > 0 ? (
                          doubleDamageTo.map((type) => (
                            <span key={type} className={`px-2 py-1 rounded-lg shadow text-sm ${typeColors[type.toLowerCase()]}`}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-300">No notable strengths.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default PokeDetail;
