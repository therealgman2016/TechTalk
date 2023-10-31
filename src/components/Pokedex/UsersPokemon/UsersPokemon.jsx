import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PokemonForm from '../PokemonForm/PokemonForm';
import data, { addCapturedPokemon, updatePokemonNickname, deleteCapturedPokemon } from '../../../data';

export default function UsersPokemon({ user }) {
  const { pokemonNickname } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    // Search for the matching Pokémon in your local data
    const foundPokemon = data.find((p) => p.nickname === pokemonNickname);

    if (foundPokemon) {
      console.log('Found Pokemon:', foundPokemon); // Check if it contains the ID
      setPokemon(foundPokemon);
      
      // Ensure id is a valid number
      if (typeof foundPokemon.id === 'number') {
        handleChangeNickname(foundPokemon.id, pokemonNickname);
      }
    }
  }, [pokemonNickname]);

  const [capturedPokemon, setCapturedPokemon] = useState(data);

  const handleChangeNickname = (id, newNickname) => {
    // Validate that id is a number
    if (typeof id !== 'number') {
      console.error(`Invalid id: ${id}`);
      return; // Exit the function to prevent further execution
    }
    
    // Validate that nickname is a non-empty string
    if (typeof newNickname !== 'string' || newNickname.trim() === '') {
      console.error(`Invalid nickname: ${newNickname}`);
      return; // Exit the function to prevent further execution
    }

    // Update the nickname in the state
    setCapturedPokemon((prevCapturedPokemon) =>
      prevCapturedPokemon.map((p) =>
        p.id === id ? { ...p, nickname: newNickname } : p
      )
    );
    
    // Update the nickname in your data source (data.js)
    updatePokemonNickname(id, newNickname);

    console.log(`nickname: ${newNickname}, id: ${id}`);
  };

  const handleRelease = (id) => {
    deleteCapturedPokemon(id);
    setCapturedPokemon(capturedPokemon.filter((p) => p.id !== id));
  };
const handleSubmit = (event, id) => {
    event.preventDefault();
    // You can add your submission logic here if needed
  };

  return (
    <div>
      <h2>Users Pokemon</h2>
      {capturedPokemon.map((p) => (
        <div key={p.id}>
          <p>{p.name}</p>
          <p>{p.nickname}</p>
            <PokemonForm
                pokemon={p}
                handleSubmit={handleSubmit}
                handleChange={(id, newNickname) => handleChangeNickname(id, newNickname)}
            />

          <button onClick={() => handleRelease(p.id)}>Release to wild</button>
        </div>
      ))}
    </div>
  );
}