import { useState } from "react"
import { useDocumentContext } from "../hooks/useDocumentContext"
import { useAuthContext } from '../hooks/useAuthContext'

export default function DocumentForm() {

    const [title,setTitle] = useState('')
    const [genre,setGenre] = useState('')
    const [pages,setPages] = useState('')
    const [error,setError] = useState(null)
    const { dispatch } = useDocumentContext()
    const { user } = useAuthContext()

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!user) {
            setError('Please log in')
            return
        }
        
        const response = await fetch('/api/documents', {
            method: "POST",            
            body: JSON.stringify({title, genre, pages}),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }

        if(response.ok) {
            setTitle('')
            setGenre('')
            setPages('')
            setError(null)
            console.log('document created successfully')
            dispatch({type: "ADD_DOCUMENT", payload: json})
        }
    }

    return (
        <form action="" className="form" onSubmit={handleSubmit}>
            <h4>Add document</h4>
            <label>Book title:</label>
            <input
             type="text"
             onChange={(e) => setTitle(e.target.value)}
             value={title}
              />

            <label>Genre:</label>
            <input
             type="text"
             onChange={(e) => setGenre(e.target.value)}
             value={genre}
              />

            <label>Pages:</label>
            <input
             type="Number"
             onChange={(e) => setPages(e.target.value)}
             value={pages}
              />

              <button>Add book</button>
              {error && <div className="error">{error}</div>}
        </form>
    )
}