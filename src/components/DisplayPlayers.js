import React, { useState, useEffect } from 'react'

const DisplayPlayers = ({ toShow, deletePlayer, whichPlayerToEdit, toggle, toggleAll, setShowAll, showAll, allPlayersImportant }) => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)

    useEffect(() => {
        setNumberOfPlayers(toShow.length)
    }, [toShow.length])



    let display = toShow.map(player => {
        return (
            <tr key={player.id} style={{ backgroundColor: player.important ? 'lightgreen' : '' }}>
                {/* <td>
                    {player.id}
                </td> */}
                <td>
                    {player.name}
                </td>
                <td>
                    {player.club}
                </td>
                <td>
                    <button onClick={() => toggle(player._id, player)}>{player.important ? 'Make not important' : 'Make important'}</button>
                </td>
                <td>
                    <button onClick={() => whichPlayerToEdit(player)}>Edit</button>
                </td>
                <td>
                    <button onClick={() => deletePlayer(player._id)}>Delete</button>
                </td>
            </tr>
        )
    })


    if (toShow.length > 0) {
        return (
            <>
                <h2>List of players ({numberOfPlayers})</h2>
                <button onClick={toggleAll}>
                    {allPlayersImportant ? 'Make all players not important' : 'Make all players important'} 
                </button>
                <br />
                <br />
                <br />
                <br />
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show important players' : 'Show all players'}
                </button>
                <br />
                <br />
                <span style={{ fontWeight: 'bolder' }}>
                    {`Currently showing ${showAll ? 'all' : 'important'} players`}
                </span>
                <br />
                <br />
                <br />
                <table>
                    <tr>
                        {/* <th>ID</th> */}
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
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show important players' : 'Show all players'}
                </button>
                <span style={{ fontWeight: 'bolder' }}>
                    {`Currently showing ${showAll ? 'all' : 'important'} players`}
                </span>
            </>
        )
    }

}

export default DisplayPlayers