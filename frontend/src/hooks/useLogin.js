import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/user/login",{
        method: "Post",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email , password})
      });

      const json = await response.json()
      if (!response.ok){
        setIsLoading(false);
        setError(json.error)
      }
      if(response.ok){
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(json) )
        alert('logged in successfully')

        // update auth context
        dispatch({type: 'LOGIN', payload: json})
        setIsLoading(false)
      }
    } catch (error) {
       throw Error(error)
    }
  };
  return { login, isLoading, error}
};
