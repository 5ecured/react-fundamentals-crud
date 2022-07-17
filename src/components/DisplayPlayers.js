import React from 'react'

const DisplayPlayers = ({ players, deletePlayer, whichPlayerToEdit}) => {
    let display = players.map(player => {
        return (
            <p key={player.id}>
                {player.id}{' '}{player.name}{' '}{player.club}
                <button onClick={() => whichPlayerToEdit(player)}>Edit</button>
                <button onClick={() => deletePlayer(player.id)}>Delete</button>
            </p>
        )
    })


    if (players.length > 0) {
        return (
            <>
                <h2>List of players:</h2>
                {display}
            </>
        )
    } else {
        return (
            <>
                <h2>No player. Start adding some</h2>
            </>
        )
    }

}

export default DisplayPlayers