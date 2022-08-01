import React, { useState } from 'react'

const AddPlayer = ({ addPlayer }) => {
    const initialPlayer = { id: null, name: '', club: '', important: false }
    const [newPlayer, setNewPlayer] = useState(initialPlayer)

    const handleChange = e => {
        const { name, value } = e.target
        setNewPlayer({ ...newPlayer, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!newPlayer.name || !newPlayer.club) return
        addPlayer(newPlayer)
        setNewPlayer(initialPlayer)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a player</h2>
            <input type='text' placeholder='Name' name='name' onChange={handleChange} value={newPlayer.name} />
            <input type='text' placeholder='Club' name='club' onChange={handleChange} value={newPlayer.club} />
            <button>Add player</button>
        </form>
    )
}

export default AddPlayer