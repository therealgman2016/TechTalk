export default function PokemonForm({ pokemon, handleSubmit, handleChange }) {
    return (
        <form autoComplete="off" onSubmit={handleSubmit} id={pokemon._id}>
            <input type="text" name="nickname" onChange={handleChange} required />
            <input type="submit" value="Add Nickname" />
        </form>
    )
}