// /src/context/PokemonContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [doubleDamageFrom, setDoubleDamageFrom] = useState([]);
  const [halfDamageFrom, setHalfDamageFrom] = useState([]);
  const [doubleDamageTo, setDoubleDamageTo] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('blue');
  const [versionDescription, setVersionDescription] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPokemonData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      setPokemonData(response.data);
      setPokemonImage(response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default);
      const types = response.data.types.map((typeInfo) => typeInfo.type.name);
      setPokemonTypes(types);
      await fetchWeaknessesAndStrengths(types);
      await fetchRegion(response.data.id);
      await fetchDescription(response.data.species.url, selectedVersion);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeaknessesAndStrengths = async (types) => {
    try {
      const promises = types.map((type) => axios.get(`https://pokeapi.co/api/v2/type/${type}`));
      const responses = await Promise.all(promises);

      const doubleDamageFrom = new Set();
      const halfDamageFrom = new Set();
      const doubleDamageTo = new Set();

      responses.forEach((response) => {
        const damageRelations = response.data.damage_relations;
        damageRelations.double_damage_from.forEach((type) => doubleDamageFrom.add(type.name));
        damageRelations.half_damage_from.forEach((type) => halfDamageFrom.add(type.name));
        damageRelations.double_damage_to.forEach((type) => doubleDamageTo.add(type.name));
      });

      setDoubleDamageFrom(Array.from(doubleDamageFrom));
      setHalfDamageFrom(Array.from(halfDamageFrom));
      setDoubleDamageTo(Array.from(doubleDamageTo));
    } catch (error) {
      console.error('Error fetching weaknesses and strengths:', error);
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

  const fetchDescription = async (speciesUrl, version) => {
    try {
      const response = await axios.get(speciesUrl);
      const flavorTextEntries = response.data.flavor_text_entries;

      let versionEntry = flavorTextEntries.find(
        (entry) => entry.language.name === 'en' && entry.version.name === version
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

  useEffect(() => {
    if (pokemonData) {
      fetchDescription(pokemonData.species.url, selectedVersion);
    }
  }, [selectedVersion, pokemonData]);

  return (
    <PokemonContext.Provider
      value={{
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
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
