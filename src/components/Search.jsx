import React, { useState, useEffect } from 'react';
import { usePokemon } from '../context/HomeContext';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './Search.css'; // Import your CSS file

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const { setPokemonData, setLoading } = usePokemon();

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const names = response.data.results.map(pokemon => pokemon.name);
        setPokemonNames(names);
      } catch (error) {
        console.error('Error fetching Pokémon names:', error);
      }
    };

    fetchPokemonNames();
  }, []);

  const getRegion = async (url) => {
    try {
      const response = await axios(url);
      if (response.data.length > 0) {
        const locationArea = response.data[0].location_area.url;
        const locationResponse = await axios(locationArea);
        const regionUrl = locationResponse.data.location.url;
        const regionResponse = await axios(regionUrl);
        return regionResponse.data.region.name;
      }
      return 'Unknown';
    } catch (error) {
      console.error('Error fetching region:', error);
      return 'Unknown';
    }
  };

  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      const pokemonData = response.data;
      const officialArtworkUrl = pokemonData.sprites.other['official-artwork'].front_default;
      const region = await getRegion(pokemonData.location_area_encounters);

      setPokemonData([{
        ...pokemonData,
        officialArtworkUrl,
        region,
      }]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSearchResults(inputValue.trim());
    setInputValue('');
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const filteredSuggestions = inputLength === 0 ? [] : pokemonNames.filter(pokemon =>
      pokemon.toLowerCase().slice(0, inputLength) === inputValue
    );
    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-item">
      {suggestion}
    </div>
  );

  const inputProps = {
    placeholder: 'Search Pokémon',
    value: inputValue,
    onChange: (e, { newValue }) => setInputValue(newValue)
  };

  const theme = {
    container: 'autosuggest-container',
    input: 'autosuggest-input',
    suggestionsContainer: 'autosuggest-suggestions-container',
    suggestionsList: 'autosuggest-suggestions-list',
    suggestion: 'autosuggest-suggestion'
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center search-form">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-red-500 hover:bg-rose-700 text-white rounded-md search-button"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
