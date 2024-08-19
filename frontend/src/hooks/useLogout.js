import { useAuthContext } from "./useAuthContext"
import { useWorkOutContext  } from "./useWorkoutContext"
export const useLogout = () =>{
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkOutContext()
    const logout = () =>{
        // remove user from storage
        localStorage.removeItem('user')
        // window.location.href = '/login'

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS' , payload: null})
    }
    return {logout}  // return the logout function to the calling component  for usage  logout = useLogout()  in component
}