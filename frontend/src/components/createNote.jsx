import React, { useState } from 'react'
import { useNoteContext } from "../hook/useNoteContext"

const CreateNote = () => {

    const { dispatch } = useNoteContext()
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)

    const handleSublit = async (e) => {
        e.preventDefault()

        const note = { author, content }

        const response = await fetch('/api/note', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        } if (response.ok) {
            setAuthor('')
            setContent('')
            setError(null)
            console.log("New note added", json);
            dispatch({ type: 'CREATE_NOTE', payload: json })
        }
    }

    return (
        <form className='create' onSubmit={handleSublit}>
            <label htmlFor="author">Author</label>
            <input onChange={(e) => setAuthor(e.target.value)} name='author' type="text" value={author} />

            <label htmlFor="content">Content</label>
            <input onChange={(e) => setContent(e.target.value)} name='content' type="text" value={content} />
            <button>Submit</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default CreateNote;