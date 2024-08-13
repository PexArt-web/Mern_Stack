import { createContext, useReducer } from "react";
// to update automatically
export const WorkOutContext =  createContext()
 
export const workoutsReducer = (state, action) =>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
            case 'CREATE_WORKOUTS':
                return{
                    workouts: [action.payload, ...state.workouts]
                }
            case 'DELETE_WORKOUT':
                return {
                    workouts: state.workouts.filter((workout) => workout._id!== action.payload._id)
                }
            default:
                return state
    }       
}

export const WorkOutContextProvider =  ({children}) =>{
    const [ state, dispatch ] = useReducer(workoutsReducer,{
        workouts: null
    })

    return(
        <WorkOutContext.Provider value={{...state, dispatch}}>
        {children}
    </WorkOutContext.Provider>
    )
    
}