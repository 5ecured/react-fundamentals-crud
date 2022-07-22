import React, { useState } from 'react'
import AddPlayer from './components/AddPlayer'
import DisplayPlayers from './components/DisplayPlayers'
import EditPlayer from './components/EditPlayer'
import './App.css'

const App = () => {
  const [editing, setEditing] = useState(false)
  const [playerToEdit, setPlayerToEdit] = useState()
  const [players, setPlayers] = useState([
    {
      id: 1, name: 'Cristiano Ronaldo', club: 'Manchester United', important: true
    },
    {
      id: 2, name: 'Lionel Messi', club: 'Paris Saint Germain', important: false
    },
    {
      id: 3, name: 'Didier Drogba', club: 'Chelsea', important: true
    },
    {
      id: 4, name: 'Robert Lewandowski', club: 'Barcelona', important: false
    },
    {
      id: 5, name: 'Toni Kroos', club: 'Real Madrid', important: true
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

  const toggle = playerId => {
    let i = 0
    const temp = [...players]

    players.forEach((player, index) => {
      if (player.id === playerId) i = index
    })

    temp[i].important = !temp[i].important
    setPlayers(temp)
  }

  const toggleAll = () => {
    let allTrue = players.map(player => {
      return {
        id: player.id,
        name: player.name,
        club: player.club,
        important: true
      }
    })

    let allFalse = players.map(player => {
      return {
        id: player.id,
        name: player.name,
        club: player.club,
        important: false
      }
    })

    let helper = 0

    players.forEach(player => {
      if (player.important === true) helper += 1
    })

    if (helper === players.length) {
      setPlayers(allFalse)
    } else {
      setPlayers(allTrue)
    }
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
      <DisplayPlayers
        players={players}
        deletePlayer={deletePlayer}
        whichPlayerToEdit={whichPlayerToEdit}
        toggle={toggle}
        toggleAll={toggleAll}
      />
    </div>
  )
}

export default App