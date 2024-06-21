import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from './Card';
import red from '../assets/red.png';
import blue from '../assets/blue.png';
import emerald from '../assets/green.png';
import gold from '../assets/gold.png';
import './Text.css';

const imageArray = [
  { name: 'red', src: red, alt: 'Red version' },
  { name: 'blue', src: blue, alt: 'Blue version' },
  { name: 'emerald', src: emerald, alt: 'Emerald version' },
  { name: 'gold', src: gold, alt: 'Gold version' },
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
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [doubleDamageFrom, setDoubleDamageFrom] = useState([]);
  const [halfDamageFrom, setHalfDamageFrom] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('blue');
  const [versionDescription, setVersionDescription] = useState('');
  const [sprite, setSprite] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);
  

  

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        setPokemonData(response.data);
        setSprite(response.data.sprites.versions['generation-v']['black-white'].animated.front_default || response.data.sprites.front_default);
        const types = response.data.types.map((typeInfo) => typeInfo.type.name);
        setPokemonTypes(types);
        await fetchWeaknesses(types);
        await fetchRegion(response.data.id);
        await fetchDescription(response.data.species.url);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  const fetchWeaknesses = async (types) => {
    try {
      const promises = types.map((type) => axios.get(`https://pokeapi.co/api/v2/type/${type}`));
      const responses = await Promise.all(promises);

      const doubleDamage = new Set();
      const halfDamage = new Set();

      responses.forEach((response) => {
        const damageRelations = response.data.damage_relations;
        damageRelations.double_damage_from.forEach((type) => doubleDamage.add(type.name));
        damageRelations.half_damage_from.forEach((type) => halfDamage.add(type.name));
      });

      setDoubleDamageFrom(Array.from(doubleDamage));
      setHalfDamageFrom(Array.from(halfDamage));
    } catch (error) {
      console.error('Error fetching weaknesses:', error);
    }
  };

  const fetchRegion = async (pokemonId) => {
    try {
      const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
      const generationUrl = speciesResponse.data.generation.url;
      const generationResponse = await axios.get(generationUrl);
      const regionName = generationResponse.data.main_region.name;
      setRegion(regionName.charAt(0).toUpperCase() + regionName.slice(1));
    } catch (error) {
      console.error('Error fetching region:', error);
      setRegion('Unknown');
    }
  };

  const fetchDescription = async (speciesUrl) => {
    try {
      const response = await axios.get(speciesUrl);
      const flavorTextEntries = response.data.flavor_text_entries;
      
      let versionEntry = flavorTextEntries.find(
        (entry) => entry.language.name === 'en' && entry.version.name === selectedVersion
      );
      
      if (!versionEntry) {
        versionEntry = flavorTextEntries.find(entry => entry.language.name === 'en');
      }
      
      if (versionEntry) {
        const cleanDescription = versionEntry.flavor_text
          .replace(/\n/g, ' ')
          .replace(/\f/g, ' ')
          .replace(/\u00ad/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        setVersionDescription(cleanDescription);
      } else {
        setVersionDescription('No description available for this Pokémon.');
      }
    } catch (error) {
      console.error('Error fetching species data:', error);
      setVersionDescription('Error loading Pokémon description. Please try again later.');
    }
  };

  const handleVersionClick = (version) => {
    setSelectedVersion(version);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>

    
    <div className="container mx-auto px-4 py-8">
     <a href='/' >
    <h1>home</h1>
    </a> 

      <h1 className="text-4xl font-bold text-center mb-8">
        {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
      </h1>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
        <div className="card">
            <div className="image-container relative">
              {sprite ? (
                <img src={sprite} alt="Animated Pokemon" className="rounded-t-lg " />
              ) : (
                <div>Loading sprite...</div>
              )}
              <div className="ring-animation absolute top-0 left-0"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Type</h2>
            <div className="flex flex-wrap gap-2">
              {pokemonTypes.map((type, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full ${typeColors[type.toLowerCase()]}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Region</h2>
            <p className="text-lg">{region}</p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <Card pokemonId={id} />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Weaknesses</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Double Damage From:</h3>
                <div className="flex flex-wrap gap-2">
                  {doubleDamageFrom.map((type) => (
                    <span key={type} className={`px-3 py-1 rounded-full text-sm ${typeColors[type.toLowerCase()]}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Half Damage From:</h3>
                <div className="flex flex-wrap gap-2">
                  {halfDamageFrom.map((type) => (
                    <span key={type} className={`px-3 py-1 rounded-full text-sm ${typeColors[type.toLowerCase()]}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PokeDetail;