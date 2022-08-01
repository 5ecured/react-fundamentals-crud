import React, { useState, useEffect } from 'react'
import AddPlayer from './components/AddPlayer'
import DisplayPlayers from './components/DisplayPlayers'
import FilteredPlayers from './components/FilteredPlayers'
import EditPlayer from './components/EditPlayer'
import './App.css'
import Services from './services/players'

const App = () => {
  const [allPlayersImportant, setAllPlayersImportant] = useState(false)
  const [showAll, setShowAll] = useState(true)
  const [filteredPlayer, setFilteredPlayer] = useState('')
  const [editing, setEditing] = useState(false)
  const [playerToEdit, setPlayerToEdit] = useState()
  const [players, setPlayers] = useState([])
  //   {
  //     id: 1, name: 'Cristiano Ronaldo', club: 'Manchester United', important: true
  //   },
  //   {
  //     id: 2, name: 'Lionel Messi', club: 'Paris Saint Germain', important: false
  //   },
  //   {
  //     id: 3, name: 'Didier Drogba', club: 'Chelsea', important: true
  //   },
  //   {
  //     id: 4, name: 'Robert Lewandowski', club: 'Barcelona', important: false
  //   },
  //   {
  //     id: 5, name: 'Toni Kroos', club: 'Real Madrid', important: true
  //   },
  // ]

  useEffect(() => {
    Services.getService().then(data => {
      setPlayers(data)
    })
  }, [])

  const addPlayer = async obj => {
    // obj.id = players.length + 1
    // setPlayers([...players, obj])

    const data = await Services.addService(obj)
    setPlayers(players.concat(data))
  }

  const deletePlayer = async id => {
    // setPlayers(players.filter(player => player._id !== id))
    setPlayers(players.filter(player => player._id !== id))
    await Services.deleteService(id)
  }

  const whichPlayerToEdit = playerObjectToEdit => {
    setEditing(true)
    setPlayerToEdit(playerObjectToEdit)
  }

  const editPlayer = async (id, updatedPlayer) => {
    // setPlayers(players.map(player => player.id === id ? updatedPlayer : player))
    // setEditing(false)
    const data = await Services.editService(id, updatedPlayer)
    setPlayers(players.map(player => player._id === id ? data : player))
    setEditing(false)
  }

  const toggle = async (playerId, obj) => {
    // let i = 0
    // const temp = [...players]

    // players.forEach((player, index) => {
    //   if (player.id === playerId) i = index
    // })

    // temp[i].important = !temp[i].important
    // setPlayers(temp)

    const data = await Services.toggleService(playerId, obj)
    setPlayers(players.map(player => player._id === playerId ? data : player))
  }

  const checkAllPlayersImportant = array => {
    let helper = 0

    array.forEach(player => {
      if (player.important) helper += 1
    })

    return helper
  }

  const toggleAll = async () => {
    let helper = checkAllPlayersImportant(players)

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

    if (helper === players.length) {
      setPlayers(allFalse)
      /* 
      setAllPlayersImportant is needed in Display and Filtered to display the text of the button, whether to say 
      'Make all players not important' or 'Make all players important'
      */
      setAllPlayersImportant(false)
    } else {
      setPlayers(allTrue)
      /* 
      setAllPlayersImportant is needed in Display and Filtered to display the text of the button, whether to say 
      'Make all players not important' or 'Make all players important'
      */
      setAllPlayersImportant(true)
    }

    await Services.toggleAllService()
  }

  let toShow = showAll ? players : players.filter(player => player.important)

  return (
    <div>
      <h1>Football database with real, working MongoDB database!</h1>
      <hr />
      <h2>Filter players</h2>
      <input
        placeholder='Filter players by name'
        onChange={e => setFilteredPlayer(e.target.value)}
        value={filteredPlayer}
      />
      <button onClick={() => setFilteredPlayer('')}>Clear filter</button>
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
      {
        filteredPlayer.length > 0 ? (
          <FilteredPlayers
            toShow={toShow}
            deletePlayer={deletePlayer}
            whichPlayerToEdit={whichPlayerToEdit}
            toggle={toggle}
            toggleAll={toggleAll}
            filteredPlayer={filteredPlayer}
            setShowAll={setShowAll}
            showAll={showAll}
            allPlayersImportant={allPlayersImportant}
          />
        ) : (
          <DisplayPlayers
            toShow={toShow}
            deletePlayer={deletePlayer}
            whichPlayerToEdit={whichPlayerToEdit}
            toggle={toggle}
            toggleAll={toggleAll}
            setShowAll={setShowAll}
            showAll={showAll}
            allPlayersImportant={allPlayersImportant}
          />
        )
      }
    </div>
  )
}

export default App