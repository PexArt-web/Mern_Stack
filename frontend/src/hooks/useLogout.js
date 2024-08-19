import { useAuthContext } from "./useAuthContext"
export const useLogout = () =>{
    const { dispatch } = useAuthContext()
    const logout = () =>{
        // remove user from storage
        localStorage.removeItem('user')
        // window.location.href = '/login'

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
    }
    return {logout}  // return the logout function to the calling component  for usage  logout = useLogout()  in component
}