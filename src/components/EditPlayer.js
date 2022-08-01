import React, { useState, useEffect } from 'react'

const EditPlayer = ({ playerToEdit, editPlayer, setEditing }) => {
  const [playerObj, setUpdatedPlayer] = useState(playerToEdit)

  useEffect(() => {
    setUpdatedPlayer(playerToEdit)
  }, [playerToEdit])

  const handleChange = e => {
    const { name, value } = e.target
    setUpdatedPlayer({ ...playerObj, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!playerObj.name || !playerObj.club) return
    editPlayer(playerObj._id, playerObj)
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit a player</h2>
      <input type='text' name='name' value={playerObj.name} placeholder='Name' onChange={handleChange} />
      <input type='text' name='club' value={playerObj.club} placeholder='Club' onChange={handleChange} />
      <button>Edit</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  )
}

export default EditPlayer