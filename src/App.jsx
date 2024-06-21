import React from 'react'
import Pokemon from './components/Pokemon'
import './styles.css'; // Adjust the path as per your project structure
import FeaturedPokemon from './components/FeaturedPokemon';
import PokeDetail from './components/PokeDetail';


const App = () => {
  return (
    <>
    {/* <Pokemon/>
    <FeaturedPokemon/> */}
    <PokeDetail/>
    </>
  )
}

export default App