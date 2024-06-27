import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RarrowIcon from '../assets/Arrow_Right_Square-512.png'; // Replace with actual path to your uploaded image
import LarrowIcon from '../assets/Arrow_Left_Square-512.png'; // Replace with actual path to your uploaded image
import { Link } from 'react-router-dom';
import Spinner from './Spinner';  // Import the Spinner component
import charizard from '../assets/images/charizard.gif'
import Footer from './Footer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './FeaturedPokemon.css';

const pokemonCategories = {
  starter: {
    title: "Starter Pokémon",
    urls: [
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
    ]
  },
  legendary: {
    title: "Legendary Pokémon",
    urls: [
      'https://pokeapi.co/api/v2/pokemon/144/', // Articuno
      'https://pokeapi.co/api/v2/pokemon/145/', // Zapdos
      'https://pokeapi.co/api/v2/pokemon/146/', // Moltres
      'https://pokeapi.co/api/v2/pokemon/150/', // Mewtwo
      'https://pokeapi.co/api/v2/pokemon/243/', // Raikou
      'https://pokeapi.co/api/v2/pokemon/244/', // Entei
      'https://pokeapi.co/api/v2/pokemon/245/', // Suicune
      'https://pokeapi.co/api/v2/pokemon/249/', // Lugia
      'https://pokeapi.co/api/v2/pokemon/250/', // Ho-Oh
      'https://pokeapi.co/api/v2/pokemon/380/', // Latias
      'https://pokeapi.co/api/v2/pokemon/381/', // Latios
      'https://pokeapi.co/api/v2/pokemon/382/', // Kyogre
      'https://pokeapi.co/api/v2/pokemon/383/', // Groudon
      'https://pokeapi.co/api/v2/pokemon/384/', // Rayquaza
      'https://pokeapi.co/api/v2/pokemon/486/', // Regigigas
      'https://pokeapi.co/api/v2/pokemon/487/', // Giratina
      'https://pokeapi.co/api/v2/pokemon/638/', // Cobalion
      'https://pokeapi.co/api/v2/pokemon/639/', // Terrakion
      'https://pokeapi.co/api/v2/pokemon/640/', // Virizion
      'https://pokeapi.co/api/v2/pokemon/641/', // Tornadus
      'https://pokeapi.co/api/v2/pokemon/642/', // Thundurus
      'https://pokeapi.co/api/v2/pokemon/643/', // Reshiram
      'https://pokeapi.co/api/v2/pokemon/644/', // Zekrom
      'https://pokeapi.co/api/v2/pokemon/645/', // Landorus
      'https://pokeapi.co/api/v2/pokemon/646/', // Kyurem
      'https://pokeapi.co/api/v2/pokemon/716/', // Xerneas
      'https://pokeapi.co/api/v2/pokemon/717/', // Yveltal
      'https://pokeapi.co/api/v2/pokemon/718/', // Zygarde
      'https://pokeapi.co/api/v2/pokemon/777/', // Togekiss
      'https://pokeapi.co/api/v2/pokemon/785/', // Tapu Koko
      'https://pokeapi.co/api/v2/pokemon/786/', // Tapu Lele
      'https://pokeapi.co/api/v2/pokemon/787/', // Tapu Bulu
      'https://pokeapi.co/api/v2/pokemon/788/', // Tapu Fini
      'https://pokeapi.co/api/v2/pokemon/800/', // Necrozma
      'https://pokeapi.co/api/v2/pokemon/888/', // Zacian
      'https://pokeapi.co/api/v2/pokemon/889/', // Zamazenta
      'https://pokeapi.co/api/v2/pokemon/890/', // Eternatus
    ]
  },
  mythical: {
    title: "Mythical Pokémon",
    urls: [
      'https://pokeapi.co/api/v2/pokemon/151/', // Mew
      'https://pokeapi.co/api/v2/pokemon/251/', // Celebi
      'https://pokeapi.co/api/v2/pokemon/385/', // Jirachi
      'https://pokeapi.co/api/v2/pokemon/386/', // Deoxys
      'https://pokeapi.co/api/v2/pokemon/489/', // Phione
      'https://pokeapi.co/api/v2/pokemon/490/', // Manaphy
      'https://pokeapi.co/api/v2/pokemon/491/', // Darkrai
      'https://pokeapi.co/api/v2/pokemon/492/', // Shaymin
      'https://pokeapi.co/api/v2/pokemon/493/', // Arceus
      'https://pokeapi.co/api/v2/pokemon/494/', // Victini
      'https://pokeapi.co/api/v2/pokemon/638/', // Cobalion
      'https://pokeapi.co/api/v2/pokemon/639/', // Terrakion
      'https://pokeapi.co/api/v2/pokemon/640/', // Virizion
      'https://pokeapi.co/api/v2/pokemon/647/', // Keldeo
      'https://pokeapi.co/api/v2/pokemon/648/', // Meloetta
      'https://pokeapi.co/api/v2/pokemon/649/', // Genesect
      'https://pokeapi.co/api/v2/pokemon/721/', // Volcanion
      'https://pokeapi.co/api/v2/pokemon/801/', // Magearna
      'https://pokeapi.co/api/v2/pokemon/802/', // Marshadow
      'https://pokeapi.co/api/v2/pokemon/807/', // Zeraora
      'https://pokeapi.co/api/v2/pokemon/808/', // Meltan
      'https://pokeapi.co/api/v2/pokemon/809/', // Melmetal
      'https://pokeapi.co/api/v2/pokemon/897/', // Zarude
      'https://pokeapi.co/api/v2/pokemon/898/', // Regieleki
      'https://pokeapi.co/api/v2/pokemon/899/', // Regidrago
    ]
  },
  pseudo: {
    title: "Pseudo-Legendary Pokémon",
    urls: [
      'https://pokeapi.co/api/v2/pokemon/149/', // Dragonite
      'https://pokeapi.co/api/v2/pokemon/248/', // Tyranitar
      'https://pokeapi.co/api/v2/pokemon/373/', // Salamence
      'https://pokeapi.co/api/v2/pokemon/376/', // Metagross
      'https://pokeapi.co/api/v2/pokemon/445/', // Garchomp
      'https://pokeapi.co/api/v2/pokemon/635/', // Hydreigon
      'https://pokeapi.co/api/v2/pokemon/706/', // Goodra
      'https://pokeapi.co/api/v2/pokemon/784/', // Kommo-o
    ]
  },
  eeveelutions: {
    title: "Eevee Evolutions",
    urls: [
      'https://pokeapi.co/api/v2/pokemon/133/', // Eevee
      'https://pokeapi.co/api/v2/pokemon/134/', // Vaporeon
      'https://pokeapi.co/api/v2/pokemon/135/', // Jolteon
      'https://pokeapi.co/api/v2/pokemon/136/', // Flareon
      'https://pokeapi.co/api/v2/pokemon/196/', // Espeon
      'https://pokeapi.co/api/v2/pokemon/197/', // Umbreon
      'https://pokeapi.co/api/v2/pokemon/470/', // Leafeon
      'https://pokeapi.co/api/v2/pokemon/471/', // Glaceon
      'https://pokeapi.co/api/v2/pokemon/700/', // Sylveon
    ]
  }
};

const typeColors = {
  normal: 'bg-gray-400 text-black',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-black',
  grass: 'bg-green-500 text-white',
  ice: 'bg-blue-200 text-black',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-yellow-600 text-white',
  flying: 'bg-indigo-300 text-black',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-green-600 text-white',
  rock: 'bg-yellow-700 text-white',
  ghost: 'bg-purple-700 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-700 text-white',
  steel: 'bg-gray-400 text-black',
  fairy: 'bg-pink-300 text-black',
};
const FeaturedPokemon = () => {
  const [featuredPokemon, setFeaturedPokemon] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('starter');
  const [isLoading, setIsLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState('right');

  const fetchPokemonDetails = async (urls) => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails(pokemonCategories[selectedCategory].urls);
  }, [selectedCategory]);

  const handlePrevClick = () => {
    setSlideDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredPokemon.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setSlideDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex === featuredPokemon.length - 1 ? 0 : prevIndex + 1));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentIndex(0);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const displayedPokemon = [
    featuredPokemon[(currentIndex - 2 + featuredPokemon.length) % featuredPokemon.length],
    featuredPokemon[(currentIndex - 1 + featuredPokemon.length) % featuredPokemon.length],
    featuredPokemon[currentIndex],
    featuredPokemon[(currentIndex + 1) % featuredPokemon.length],
    featuredPokemon[(currentIndex + 2) % featuredPokemon.length],
  ];

  return (
    <>
      <div className="relative bg-gray-800 py-8 px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-white">{pokemonCategories[selectedCategory].title}</h2>
          <select
            className="bg-[#ebf1ff] text-gray-800 px-4 py-2 rounded mt-2 md:mt-0"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {Object.keys(pokemonCategories).map((category) => (
              <option key={category} value={category}>
                {pokemonCategories[category].title}
              </option>
            ))}
          </select>
        </div>
        <div className="pokemon-slider relative group">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handlePrevClick}
          >
            <img src={LarrowIcon} alt="Previous" className="w-9 h-9" />
          </button>
          <TransitionGroup className="pokemon-slider-inner">
            {displayedPokemon.map((pokemon, index) => (
              <CSSTransition
                key={`${pokemon.id}-${index}`}
                classNames={`slide-${slideDirection}`}
                timeout={500}
              >
                <div className="pokemon-card">
                  <Link
                    to={`/pokemon/${pokemon.id}`}
                    className="block bg-gray-700 text-white rounded-lg p-4 shadow-xl m-2 no-underline"
                  >
                    <div className="w-full">
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
                        <div className="flex justify-center flex-wrap">
                          {pokemon.types.map((type, i) => (
                            <span
                              key={i}
                              className={`px-4 py-1 m-1 rounded ${typeColors[type.type.name]}`}
                            >
                              {type.type.name}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm mt-2">
                          Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleNextClick}
          >
            <img src={RarrowIcon} alt="Next" className="w-9 h-9" />
          </button>
        </div>
      </div>
      <div className="flex justify-center py-1.5">
        <div className="flex flex-col md:flex-row items-center">
          <Link to="/Pokemon">
            <button className="relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-rose-300 group-hover:from-red-500 group-hover:to-rose-300 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-600 hover:shadow-lg">
              <span className="relative px-5 py-2.5 transition-all text-rose-600 hover:text-rose-100 ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
                Explore More Pokemon
              </span>
            </button>
          </Link>
          <div className="w-32 h-32 mt-4 md:mt-0 md:ml-4">
            <img src={charizard} alt="Pokemon Charizard GIF" className="w-full h-full object-contain"/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeaturedPokemon;