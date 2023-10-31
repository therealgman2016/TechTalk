import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import pokemonData from '../../../data'


export default function IndexPage() {


    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        setPokemon(pokemonData)
    }, [])

    return (
        <>
        {pokemon.map(pokemon => (
            <div key={pokemon.name}>
                <Link to={`/${pokemon.name}`}>{pokemon.name}</Link>
            </div>
        ))}
        </>
    )
}