import { useAuthContext } from "./useAuthContext"
import { useDocumentContext } from "./useDocumentContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: documentDispatch } = useDocumentContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        documentDispatch({type: 'SHOW_DOCUMENTS', payload: null})

    }

    return { logout }

}