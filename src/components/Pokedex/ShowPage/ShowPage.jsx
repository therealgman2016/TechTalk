import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import pokemonData from "../../../data"
import { createPokemon } from '../../../../utilities/pokemon-api'

export default function ShowPage({ user }) {
    const { pokemonName } = useParams()
    const [pokemon, setPokemon] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
    // Search for the matching Pokémon in your local data
        const foundPokemon = pokemonData.find(poke => poke.name === pokemonName);

        if (foundPokemon) {
            setPokemon(foundPokemon);
        }
    }, [pokemonName]);

    async function capturePokemon() {
        const pokemonToAdd = { name: pokemon.name, owner: user._id }
        await createPokemon(pokemonToAdd)
        navigate('/usersPokemon')
    }
    
    return (
        <>
        <h2>Show Page</h2>
        <h3>{pokemon.name}</h3>
        <button onClick={capturePokemon}>Capture Pokemon</button>
        </>
    )
}