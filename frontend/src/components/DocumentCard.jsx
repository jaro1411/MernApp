import { useDocumentContext } from "../hooks/useDocumentContext"
import { useAuthContext } from '../hooks/useAuthContext'

export default function DocumentCard({ document}) {

    const { dispatch } = useDocumentContext()
    const { user } = useAuthContext()

    const handleDelete = async(e) => {

        const response = await fetch(`/api/documents/${document._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(response.ok) {
            dispatch({type: "DELETE_DOCUMENT", payload: json._id})
            console.log(json)
        }
     
    }

    return (
        <div className="document-card">
            <h4>{document.title}</h4>
            <p><strong>Genre: </strong>{document.genre}</p>
            <p><strong>Pages: </strong>{document.pages}</p>
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}