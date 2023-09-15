// src/components/PokemonList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const pokemonList = [];

    const fetchPokemonData = async () => {
      for (let i = offset + 1; i <= offset + limit; i++) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`,
          );
          const pokemon = response.data;

          pokemonList.push({
            name: pokemon.name,
            image: pokemon.sprites.front_default,
          });
        } catch (error) {
          console.error('Erro ao buscar os Pokémon:', error);
        }
      }

      setPokemonData(pokemonList);
    };

    fetchPokemonData();
  }, [page]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <input
        type='text'
        placeholder='Digite o nome do Pokémon'
        value={searchValue}
        onChange={handleSearchChange}
        className='input-search'
      />
      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={index}>
            <img src={pokemon.image} alt={pokemon.name} />
            {pokemon.name}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Página Anterior
        </button>
        <button onClick={nextPage}>Próxima Página</button>
      </div>
    </div>
  );
};

export default PokemonList;
