import { useState } from "react";

export default function PokemonForm({ pokemon, handleChange }) {
    const [newNickname, setNewNickname] = useState('');
  
    const handleInputChange = (event) => {
      setNewNickname(event.target.value);
    };
  
    const handleSubmit = () => {
      handleChange(pokemon.id, newNickname);
      setNewNickname(''); // Reset the input field after submission
    };
  
    return (
      <div>
        <input
          type="text"
          name="nickname"
          value={newNickname}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleSubmit}>Add Nickname</button>
      </div>
    );
  }
  