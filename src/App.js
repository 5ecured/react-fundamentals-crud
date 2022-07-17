import React, { useState } from 'react'
import AddPlayer from './components/AddPlayer'
import DisplayPlayers from './components/DisplayPlayers'
import EditPlayer from './components/EditPlayer'

const App = () => {
  const [editing, setEditing] = useState(false)
  const [playerToEdit, setPlayerToEdit] = useState()
  const [players, setPlayers] = useState([
    {
      id: 1, name: 'Cristiano Ronaldo', club: 'Manchester United'
    },
    {
      id: 2, name: 'Lionel Messi', club: 'Paris Saint Germain'
    },
    {
      id: 3, name: 'Didier Drogba', club: 'Chelsea'
    },
    {
      id: 4, name: 'Robert Lewandowski', club: 'Barcelona'
    },
    {
      id: 5, name: 'Toni Kroos', club: 'Real Madrid'
    },
  ])

  const addPlayer = obj => {
    obj.id = players.length + 1
    setPlayers([...players, obj])
  }

  const deletePlayer = id => {
    setPlayers(players.filter(player => player.id !== id))
  }

  const whichPlayerToEdit = playerObjectToEdit => {
    setEditing(true)
    setPlayerToEdit(playerObjectToEdit)
  }

  const editPlayer = (id, updatedPlayer) => {
    setPlayers(players.map(player => player.id === id ? updatedPlayer : player))
    setEditing(false)
  }

  return (
    <div>
      <h1>Football database</h1>
      <hr />
      {
        editing ?
          (
            <EditPlayer
              playerToEdit={playerToEdit}
              editPlayer={editPlayer}
              setEditing={setEditing}
            />
          )
          :
          (
            <AddPlayer
              addPlayer={addPlayer}
            />
          )
      }
      <DisplayPlayers players={players} deletePlayer={deletePlayer} whichPlayerToEdit={whichPlayerToEdit} />
    </div>
  )
}

export default App