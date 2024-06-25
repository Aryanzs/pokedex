import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import axios from 'axios';

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
const COLORS_TOP = ["#660000", "rgb(199,140,48)", "rgb(176,72,72)", "#DD335C"];

export const Evolution = ({ pokemonId }) => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [evolutionData, setEvolutionData] = useState([]);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        const chainResponse = await axios.get(evolutionChainUrl);
        const chain = chainResponse.data.chain;

        const evoData = [];
        let current = chain;

        do {
          const speciesUrl = current.species.url;
          const speciesInfo = await axios.get(speciesUrl);
          const pokemonId = speciesInfo.data.id;

          const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          const pokemonData = pokemonResponse.data;

          const pokemonTypes = pokemonData.types.map(type => type.type.name);

          const sprite = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default || pokemonData.sprites.front_default;

          evoData.push({
            name: pokemonData.name,
            id: pokemonId,
            sprite: sprite,
            types: pokemonTypes,
          });

          current = current.evolves_to[0];
        } while (current && current.hasOwnProperty('evolves_to'));

        setEvolutionData(evoData);
      } catch (error) {
        console.error('Error fetching evolution data:', error);
      }
    };

    fetchEvolutionData();
  }, [pokemonId]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const StarsComponent = () => {
    const starsRef = useRef();

    useFrame(() => {
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.001; // Adjust the speed as needed
      }
    });

    return <Stars ref={starsRef} radius={50} count={120} factor={4} fade speed={2} />;
  };

  return (
    <>
      <h1 className="text-4xl font-bold flex text-rose-400  py-8 justify-center">Evolution</h1>

      <motion.section
        className="relative overflow-hidden  px-4 text-gray-200"
      >
        <div className="flex justify-center items-center mb-24 relative">
          <div className="relative flex flex-wrap justify-center gap-8  bg-gray-700 h-auto p-6 rounded-lg z-10 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Canvas className="w-full h-full">
                <StarsComponent />
              </Canvas>
            </div>
            {evolutionData.map((pokemon, index) => (
              <div key={index} className="text-center ml-4 mr-4 mb-4 text-white relative z-10">
                <img
                  className="w-32 h-32 mt-8 rounded-full border-2 bg-slate-900 border-white mx-auto"
                  src={pokemon.sprite}
                  alt={pokemon.name}
                />
                <h3 className="mt-4 capitalize">{pokemon.name} <span className="text-gray-400">#{pokemon.id.toString().padStart(4, '0')}</span></h3>
                <div className="flex justify-center mt-2 space-x-2">
                  {pokemon.types.map((type, typeIndex) => (
                    <span key={typeIndex} className={`px-4 py-2 rounded-full shadow-2xl ${typeColors[type.toLowerCase()]}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};
