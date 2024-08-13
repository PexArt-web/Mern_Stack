import { WorkOutContext } from "../context/workOutContext";
import { useContext } from "react";

export const useWorkOutContext = () =>{
    const context = useContext(WorkOutContext)  
    if(!context){
        throw Error('useworkoutcontext must be used inside a WorkoutsContextProvider ')
    }
    return context
}