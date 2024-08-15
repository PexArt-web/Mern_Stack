import { useEffect } from "react";
import { useWorkOutContext } from "../hooks/useWorkoutContext"
// componet
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkOutContext()
  useEffect(() => {
    const fetchworkouts = async () => {
      const httpUrl = "http://localhost:3000/api/workouts";
      try {
        const response = await fetch(httpUrl);
        const json = await response.json();
        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS', payload: json});
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchworkouts();
  }, [dispatch]);
  

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails key= {workout._id} {...workout}/>)}
      </div>
      <WorkoutForm/>
    </div> 
  );
};

export default Home;
