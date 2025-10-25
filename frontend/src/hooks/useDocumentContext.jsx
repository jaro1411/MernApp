import { useContext } from "react";
import { DocumentContext } from "../context/DocumentContext";

export const useDocumentContext = () => {

    const context = useContext(DocumentContext)

    if(!context) {
        throw new Error('useDocumentContext must be used within the DocumentContextProvider')
    }

    return context
}