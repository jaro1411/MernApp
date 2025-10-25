import { useEffect } from "react"
import DocumentCard from "../components/DocumentCard"
import DocumentForm from "../components/DocumentForm"
import { useDocumentContext } from "../hooks/useDocumentContext"
import { useAuthContext } from '../hooks/useAuthContext'

export default function Home() {

    const {documents, dispatch} = useDocumentContext()
    const { user } = useAuthContext()

    useEffect(() => {

        const fetchDocuments = async() => {
            const response = await fetch('/api/documents', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
            dispatch({type: "SHOW_DOCUMENTS", payload: json})
        }
        }

        if(user) {
            fetchDocuments()
        }
        
    }, [dispatch, user])

    return(
        <div className="home">
            <div className="documents">
                {documents && documents.map((document) => (
                    <DocumentCard key={document._id} document={document} />
                ))}
            </div>
            <DocumentForm />
        </div>        
    )
}