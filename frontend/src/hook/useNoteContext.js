import { NoteContext } from "../context/NoteContext"
import { useContext } from "react"

export const useNoteContext = () => {
    const context = useContext(NoteContext)

    if (!context) {
        throw Error("useNotecontext must be used inside an NoteContextProvider")
    }

    return context
}