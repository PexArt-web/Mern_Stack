import { useWorkOutContext } from "../hooks/useWorkoutContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import {useAuthContext } from '../hooks/useAuthContext'


const WorkoutDetails = ({ title, load, reps, createdAt, _id }) => {
  const { dispatch } = useWorkOutContext() ;
  const { user } = useAuthContext() // This line is added to use the dispatch function from the context.
  const httpUrl = `http://localhost:3000/api/workouts/${_id}`;
  const handleClick = async ()=>{
    if(!user){
      return
    }
    try {
      const response = await fetch(httpUrl,{
        method: 'DELETE',
        headers : {
          "Authorization": `Bearer ${user.token}`
        }
      })
      const json  = await response.json()
      if (response.ok){
        dispatch({type: 'DELETE_WORKOUT', payload: json})
      }
      console.log(json);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (<div>
        <div className="workout-details">
            <h4>{title}</h4>
            <p><strong>Load (kg):</strong>{load}</p>
            <p><strong>Reps:</strong>{reps}</p>
            <p>{formatDistanceToNow(new Date(createdAt), {addSuffix: true })}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
  </div>);
};

export default WorkoutDetails;
