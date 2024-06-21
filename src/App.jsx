import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Pokemon from './components/Pokemon'
import './styles.css'; // Adjust the path as per your project structure
import FeaturedPokemon from './components/FeaturedPokemon';
import PokeDetail from './components/PokeDetail';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Pokemon />
            <FeaturedPokemon />
          </>
        } />
        <Route path="/pokemon/:id" element={<PokeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;