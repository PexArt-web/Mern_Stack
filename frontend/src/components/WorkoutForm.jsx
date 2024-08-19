import { useState } from "react"
import { useWorkOutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
  const { dispatch } = useWorkOutContext()
    const [title, setTitle] = useState('')
    const [load , setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, load, reps}
        if(!user){
        setError('You must be logged in')
        return
        }
      try {
        const response = await fetch('http://localhost:3000/api/workouts/',{
         method: 'POST',
         body : JSON.stringify(workout),
         headers: {
             "content-Type" : 'application/json',
             "Authorization" : `Bearer ${user.token}`
         }
 
        })
        const json = await response.json()
        if(!response.ok){
             setError(json.error, 'json error')
             setEmptyFields(json.emptyFields || [])
        }
        if(response.ok){
          console.log('Success new workout added' + json)
         setTitle('')   
         setLoad('')
         setReps('')
         setError(null)
         setEmptyFields([])
         
         dispatch({type:'CREATE_WORKOUTS', payload: json})
        }
      } catch (error) {
       setError('an error occurred while saving the workout to the server')
      }
    }
  return (
    <form className="create" onSubmit={handleSubmit}>
        <label htmlFor="title">WorkOut Title:</label>
        <input type="text" onChange={(e)=>{setTitle(e.target.value)}} name="title" value={title} className={emptyFields.includes('title') ? 'error' : ''}/>

        <label htmlFor="load">Load (in kg)</label>
        <input type="text" onChange={(e)=>{setLoad(e.target.value)}} name="load" value={load} className={emptyFields.includes('load') ? 'error' : ''}/>

        <label htmlFor="reps">Reps:</label>
        <input type="text" onChange={(e)=>{setReps(e.target.value)}} name="reps" value={reps} className={emptyFields.includes('reps') ? 'error' : ''}/>

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      
    </form>
  )
}

export default WorkoutForm
