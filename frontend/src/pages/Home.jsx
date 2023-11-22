import React from 'react'
import Header from '../components/Header';
import CreateNote from '../components/createNote';
import Notes from '../components/Notes';
import { useEffect } from "react"
import { useNoteContext } from "../hook/useNoteContext"

const Home = () => {

    const { notes, dispatch } = useNoteContext()

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('/api/note')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_NOTE', payload: json })
            }
        }

        fetchNotes()
    }, [dispatch])

    return (
        <div>
            <Header />
            <CreateNote />
            <div className="container">
                {notes && notes.map((note) => (
                    <Notes
                        key={note._id}
                        note={note}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;