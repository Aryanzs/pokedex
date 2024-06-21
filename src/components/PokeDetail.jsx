import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Text.css';
import Card from './Card';
import red from '../assets/red.png';
import blue from '../assets/blue.png';
import emerald from '../assets/green.png';
import gold from '../assets/gold.png';

const imageArray = [      //to show the version of pokemon
  {
    name: 'red',
    src: red,
    alt: 'Description of image 1',
  },
  {
    name: 'blue',
    src: blue,
    alt: 'Description of image 2',
  },
  {
    name: 'emerald',
    src: emerald,
    alt: 'Description of image 3',
  },
  {
    name: 'gold',
    src: gold,
    alt: 'Description of image 3',
  },
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

const PokeDetail = () => {
  const [pokemonData, setPokemonData] = useState(null);   
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [doubleDamageFrom, setDoubleDamageFrom] = useState([]);
  const [halfDamageFrom, setHalfDamageFrom] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('blue');
  const [versionDescription, setVersionDescription] = useState('');
  const [pokemonId, setPokemonId] = useState(5); // Default pokemon id is added here. Have to change this so that it takes with the help of props
  const [sprite, setSprite] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        console.log('Pokemon data:', response.data);
        setPokemonData(response.data);

        // Set Pokémon Showdown animated sprite
        const spriteUrl = `https://play.pokemonshowdown.com/sprites/xyani/${response.data.name}.gif`;
        setSprite(spriteUrl);

        // Extract Pokémon type(s)
        const types = response.data.types.map((typeInfo) => typeInfo.type.name);
        setPokemonTypes(types);

        // Fetch weaknesses for each type
        const promises = types.map((type) =>
          axios.get(`https://pokeapi.co/api/v2/type/${type}`)
        );

        Promise.all(promises)
          .then((responses) => {
            const doubleDamage = new Set();
            const halfDamage = new Set();

            responses.forEach((response) => {
              const damageRelations = response.data.damage_relations;
              damageRelations.double_damage_from.forEach((type) =>
                doubleDamage.add(type.name)
              );
              damageRelations.half_damage_from.forEach((type) =>
                halfDamage.add(type.name)
              );
            });

            setDoubleDamageFrom(Array.from(doubleDamage));
            setHalfDamageFrom(Array.from(halfDamage));
          })
          .catch((error) => {
            console.error('Error fetching weaknesses:', error);
          });
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonData) {
      axios
        .get(pokemonData.species.url)
        .then((response) => {
          const flavorTextEntries = response.data.flavor_text_entries;
          const versionEntry = flavorTextEntries.find(
            (entry) =>
              entry.language.name === 'en' && entry.version.name === selectedVersion
          );
          setVersionDescription(
            versionEntry
              ? versionEntry.flavor_text
              : 'No description available for this version.'
          );
        })
        .catch((error) => {
          console.error('Error fetching species data:', error);
        });
    }
  }, [pokemonData, selectedVersion]);

  const handleVersionClick = (version) => {
    setSelectedVersion(version);
  };

  return (
    <div className="h-screen w-screen">
      {/* pokemon name display */}

      <h1 className="text-4xl font-bold flex justify-center items-center mt-10">
        {pokemonData
          ? pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
          : 'Loading...'}
      </h1>
      <div className="">
        <div className="flex justify-center text-center ">
          <div className="left-side">
            {/* animated image display */}

            <div className="card">
              <div className="image-container relative">
                {sprite ? (
                  <img src={sprite} alt="Animated Pokemon" className="rounded-t-lg" />
                ) : (
                  <div>Loading sprite...</div>
                )}
                <div className="ring-animation absolute top-0 left-0"></div>
              </div>
            </div>
              {/* weakness display */}

            <div className="weakness w-80">
              <h1 className="mt-10 font-bold text-lg">Weakness</h1>
              <h2 className="mt-5 font-bold text-md">Double Damage From:</h2>
              <div className="flex flex-wrap">
                {doubleDamageFrom.map((type) => (
                  <div key={type} className="relative inline-block m-1">
                    <button
                      className={`px-4 py-1 rounded ${typeColors[type.toLowerCase()]}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  </div>
                ))}
              </div>
              <h2 className="mt-5 font-bold text-md">Half Damage From:</h2>
              <div className="flex flex-wrap">
                {halfDamageFrom.map((type) => (
                  <div key={type} className="relative inline-block m-1">
                    <button
                      className={`px-4 py-1 rounded ${typeColors[type.toLowerCase()]}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
              {/* version and description based on version here display */}

          <div className="right-side w-[80vh] ml-10">
            <div className="description ml-10 mt-[90px] text-lg">
              {versionDescription || 'Loading...'}
            </div>
            <div className="version ml-10 flex">
              <h1 className="ml-5 mt-6">Version: </h1>
              <div className="ml-5 flex">
                {imageArray.map((image) => (
                  <div
                    key={image.name}
                    className={`relative cursor-pointer inline-block m-1 ${selectedVersion === image.name ? 'selected-version' : ''
                      }`}
                    onClick={() => handleVersionClick(image.name)}
                  >
                    <img className="h-8 w-9 mt-5" src={image.src} alt={image.alt} />
                    {selectedVersion === image.name && (
                      <div className="absolute bg-slate-200 z-10 w-48 p-2 mt-2 border cursor-pointer rounded shadow-lg">
                        {image.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* card in which addition details are present is called here */}

            <div className="ml-[50px] mt-14">
              <Card pokemonId={pokemonId} />
            </div>

            {/* Pokemon type here*/}

            <div className="type">
              <div className="type mt-10 font-bold text-lg flex justify-start ml-12">Type</div>
              <div className="flex flex-wrap ml-12">
                {pokemonTypes.map((type, index) => (
                  <button
                    key={index}
                    className={`px-4 py-1 mt-[10px] m-1 rounded ${typeColors[type.toLowerCase()]}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeDetail;
