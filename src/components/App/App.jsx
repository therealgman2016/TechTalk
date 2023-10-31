import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../../utilities/user-services'
import AuthPage from '../Auth/AuthPage/AuthPage'
import NavBar from '../NavBar/NavBar'
import IndexPage from '../Pokedex/IndexPage/IndexPage'
import ShowPage from '../Pokedex/ShowPage/ShowPage'
import UsersPokemon from '../Pokedex/UsersPokemon/UsersPokemon'


function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main>
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/:pokemonName' element={<ShowPage user={user} />} />
            <Route path='/usersPokemon' element={<UsersPokemon user={user} />} />
          </Routes>
        </> :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
