import React from 'react'

const DisplayPlayers = ({ players, deletePlayer, whichPlayerToEdit, toggle }) => {
    let display = players.map(player => {
        return (
            <tr>
                <td key={player.id}>
                    {player.id}
                </td>
                <td>
                    {
                        player.important ?
                            <span style={{ fontWeight: 'bolder' }}>{player.name}</span>
                            :
                            <span>{player.name}</span>
                    }
                </td>
                <td>
                    {
                        player.important ?
                            <span style={{ fontWeight: 'bolder' }}>{player.club}</span>
                            :
                            <span>{player.club}</span>
                    }
                </td>
                <td>
                    <button onClick={() => toggle(player.id)}>{player.important ? 'Make not important' : 'Make important'}</button>
                </td>
                <td>
                    <button onClick={() => whichPlayerToEdit(player)}>Edit</button>
                </td>
                <td>
                    <button onClick={() => deletePlayer(player.id)}>Delete</button>
                </td>
            </tr>
        )
    })


    if (players.length > 0) {
        return (
            <>
                <h2>List of players:</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>CLUB</th>
                        <th>IMPORTANT</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                    {display}
                </table>
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