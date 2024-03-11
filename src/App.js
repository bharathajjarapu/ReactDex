import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [limit] = useState(150);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPokemons();
  }, [limit, offset]);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonData = await Promise.all(
        response.data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData]);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`);
      const pokemonData = await Promise.all(
        response.data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
      );

      const filtered = pokemonData.filter((pokemon) => pokemon.name.includes(query));
      setPokemons(filtered);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeDialog = () => {
    setSelectedPokemon(null);
  };

  const showMorePokemons = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <div className="search-container">
          <input
            type="text"
            placeholder="Searching Pokemon..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button onClick={toggleDarkMode} className="mode-toggle">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <main>
        {pokemons.length === 0 ? (
          <p className="no-results">No Pokemon found.</p>
        ) : (
          <div className="pokemon-list">
            {pokemons.map((pokemon, index) => (
              <div
                key={pokemon.id}
                className="pokemon-card"
                onClick={() => handlePokemonClick(pokemon)}
              >
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        )}
        <button className="show-more-button" onClick={showMorePokemons}>
          Show More
        </button>
      </main>
      {selectedPokemon && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-content">
              <PokemonDetails pokemon={selectedPokemon} />
            </div>
            <button className="close-button" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const PokemonDetails = ({ pokemon }) => {
  return (
    <div className="pokemon-details">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      <div className="details-container">
        <div className="detail-item">
          <span>Height</span>
          <div className="detail-value">{pokemon.height / 10} m</div>
        </div>
        <div className="detail-item">
          <span>Weight</span>
          <div className="detail-value">{pokemon.weight / 10} kg</div>
        </div>
      </div>
      <h4>Abilities</h4>
      <div className="abilities-container">
        {pokemon.abilities.map((ability, index) => (
          <div key={index} className="ability-item">
            {ability.ability.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;