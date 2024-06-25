import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Pokemon from './components/Pokemon'
import './styles.css'; // Adjust the path as per your project structure
import PokeDetail from './components/PokeDetail';
import PokemonProvider from './context/PokemonContext';
import { HomeProvider } from './context/HomeContext';
import Home from './components/Home';


const App = () => {
  return (
    <HomeProvider>
    <PokemonProvider>

    <Router>

      <Routes>
        <Route path="/" element={
          <>
          <Home/>
            {/* <Pokemon />*/}
          </>
        } />
        <Route path="/pokemon/:id" element={<PokeDetail />} />
        <Route path="/pokemon" element={<Pokemon/>} />

      </Routes>
    </Router>
    </PokemonProvider>
    </HomeProvider>
  );
};

export default App;