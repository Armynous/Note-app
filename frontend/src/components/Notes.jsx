import React from 'react'
import { useNoteContext } from "../hook/useNoteContext"

const Notes = ({ note }) => {

    const { dispatch } = useNoteContext()

    const handleClick = async () => {
        const response = await fetch('/api/note/' + note._id, {
            method: 'DELETE'
        })

        console.log("hi");

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_NOTE', payload: json })
        }
    }

    return (
        <div>
            <div className="note">
                <h2>{note.author}</h2>
                <p>{note.content}</p>
                <span onClick={handleClick}>Delete</span>
            </div>
        </div>
    )
}

export default Notes;