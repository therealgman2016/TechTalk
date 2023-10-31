import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PokemonForm from '../PokemonForm/PokemonForm';
import data, { addCapturedPokemon, updatePokemonNickname, deleteCapturedPokemon } from '../../../data';

export default function UsersPokemon({ user }) {
  const { pokemonNickname } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  
  // Load captured Pokémon data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem('capturedPokemon');
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      setCapturedPokemon(parsedData);
    }
  }, []);

  useEffect(() => {
    // Search for the matching Pokémon in your local data
    const foundPokemon = data.find((p) => p.nickname === pokemonNickname);

    if (foundPokemon) {
      setPokemon(foundPokemon);
      
      // Ensure id is a valid number
      if (typeof foundPokemon.id === 'number') {
        handleChangeNickname(foundPokemon.id, pokemonNickname);
      }
    }
  }, [pokemonNickname]);

  const [capturedPokemon, setCapturedPokemon] = useState(data);

  const handleChangeNickname = (id, newNickname) => {
    if (typeof id !== 'number') {
      console.error(`Invalid id: ${id}`);
      return;
    }

    if (typeof newNickname !== 'string' || newNickname.trim() === '') {
      console.error(`Invalid nickname: ${newNickname}`);
      return;
    }

    setCapturedPokemon((prevCapturedPokemon) =>
      prevCapturedPokemon.map((p) =>
        p.id === id ? { ...p, nickname: newNickname } : p
      )
    );

    // Update the nickname in your data source (data.js)
    updatePokemonNickname(id, newNickname);

    // Save captured Pokémon data to local storage
    localStorage.setItem('capturedPokemon', JSON.stringify(capturedPokemon));
  };

  const handleRelease = (id) => {
    deleteCapturedPokemon(id);
    setCapturedPokemon(capturedPokemon.filter((p) => p.id !== id));

    // Save captured Pokémon data to local storage after deletion
    localStorage.setItem('capturedPokemon', JSON.stringify(capturedPokemon));
  };

  const handleSubmit = (event, id) => {
    event.preventDefault();
    // You can add your submission logic here if needed

    // Save captured Pokémon data to local storage after submitting
    localStorage.setItem('capturedPokemon', JSON.stringify(capturedPokemon));
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
            handleSubmit={(event) => handleSubmit(event, p.id)} // Pass the ID
            handleChange={(id, newNickname) => handleChangeNickname(id, newNickname)}
          />
          <button onClick={() => handleRelease(p.id)}>Release to wild</button>
        </div>
      ))}
    </div>
  );
}

//   return (
//     <div>
//       <h2>Users Pokemon</h2>
//       {capturedPokemon.map((p) => (
//         <div key={p.id}>
//           <p>{p.name}</p>
//           <p>{p.nickname}</p>
//             <PokemonForm
//                 pokemon={p}
//                 handleSubmit={handleSubmit}
//                 handleChange={(id, newNickname) => handleChangeNickname(id, newNickname)}
//             />

//           <button onClick={() => handleRelease(p.id)}>Release to wild</button>
//         </div>
//       ))}
//     </div>
//   );
// }