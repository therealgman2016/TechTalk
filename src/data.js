let pokemonData = [
  { id: 1, name: 'Pikachu', type: 'Electric', nickname: '' },
  { id: 2, name: 'Bulbasaur', type: 'Grass', nickname: '' },
  // Add more Pokémon entries as needed
];

export const addCapturedPokemon = (pokemon) => {
  // Validate that id is a number, convert it if needed
  if (typeof pokemon.id !== 'number') {
    console.error(`Invalid id (data.js): ${pokemon.id}`);
    return; // Exit the function to prevent further execution
  }

  // Add a captured Pokémon to the local array
  pokemonData.push(pokemon);
};


export const updatePokemonNickname = (id, nickname) => {
  // Update the nickname of a Pokémon in the local array
  const pokemon = pokemonData.find((p) => p.id === id);
  if (pokemon) {
    pokemon.nickname = nickname;
  }
};

export const deleteCapturedPokemon = (id) => {
  // Delete a captured Pokémon from the local array
  pokemonData = pokemonData.filter((p) => p.id !== id);
};

export default pokemonData;
