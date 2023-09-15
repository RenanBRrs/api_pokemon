// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './Components/PokemonList';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<PokemonList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
