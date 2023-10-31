import { useEffect, useState } from "react"
import { getUserPokemon, updateNickname } from "../../../../utilities/pokemon-api"
import PokemonForm from "../PokemonForm/PokemonForm"


export default function UsersPokemon({ user }) {
    const [pokemon, setPokemon] = useState([])
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        async function getPokemon() {
            const pokemon = await getUserPokemon(user)
            setPokemon(pokemon)
        }
        getPokemon()
    }, [])

    function handleChange(event) {
        setNickname(event.target.value)
    }

    async function handleSumbit(event, id) {
        event.preventDefault();
        const updateData = { nickname };
        const updatedPokemon = await updateNickname(id, updateData);
        const updatedPokemonList = pokemon.map((p) =>
          p._id === updatedPokemon._id ? updatedPokemon : p
        );
        setPokemon(updatedPokemonList);
      }

    return (
        <>
            <h2>Users Pokemon</h2>
            {pokemon.map((p) => (
                <div key={p._id}>
                    <p>{p.name}</p>
                    <PokemonForm pokemon={p} handleChange={handleChange} />
                    <button onClick={(e) => handleSumbit(e, p._id)}>Add Nickname</button>
                </div>
                ))}
        </>
    )
}