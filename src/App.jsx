import React from 'react'
import Pokemon from './components/Pokemon'
import './styles.css'; // Adjust the path as per your project structure
import FeaturedPokemon from './components/FeaturedPokemon';


const App = () => {
  return (
    <>
    <Pokemon/>
    <FeaturedPokemon/>
    </>
  )
}

export default App