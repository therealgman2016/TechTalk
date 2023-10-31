import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteCapturedPokemon } from '../../../data';
import { createPokemon } from '../../../../utilities/pokemon-api';
import pokemonData from '../../../data';

export default function ShowPage({ user }) {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Search for the matching Pokémon in your local data
    const foundPokemon = pokemonData.find((pokemon) => pokemon.name === pokemonName);

    if (foundPokemon) {
      setPokemon(foundPokemon);
    }
  }, [pokemonName]);

  async function capturePokemon() {
    const pokemonToAdd = { name: pokemon.name, owner: user._id };
    await createPokemon(pokemonToAdd);
    navigate('/usersPokemon');
  }

  async function deleteCapturedPokemon() {
    // Replace 'pokemon.id' with a unique identifier for the captured Pokemon
    const identifier = pokemon.id; // Change this to the appropriate identifier
    deleteCapturedPokemon(identifier);
    navigate('/usersPokemon');
  }

  return (
    <>
      <h2>Show Page</h2>
      <h3>{pokemon.name}</h3>
      <h3>{pokemon.nickname}</h3>
      <button onClick={capturePokemon}>Capture Pokemon</button>
      <button onClick={deleteCapturedPokemon}>Delete Captured Pokemon</button>
    </>
  );
}
