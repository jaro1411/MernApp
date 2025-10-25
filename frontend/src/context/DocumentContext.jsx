import { createContext,useReducer } from "react";

export const DocumentContext = createContext()

export const documentReducer = (state,action) => {
    switch(action.type) {
        case 'SHOW_DOCUMENTS':
            return { documents: action.payload }
        case 'ADD_DOCUMENT':
            return { documents: [action.payload, ...state.documents] }
        case 'DELETE_DOCUMENT':
            return {
                documents: state.documents.filter((document) => document._id !== action.payload)
            }
        default:
            return state
    }
}

export const DocumentContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(documentReducer, {
        documents: []
    })

    return (
        <DocumentContext.Provider value={{...state,dispatch}}>
            {children}
        </DocumentContext.Provider>
    )
}