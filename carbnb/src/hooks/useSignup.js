import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();

  const signup = async (first, last, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      "http://localhost:4000/api/userRoutes/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first, last, email, password }),
      }
    );
    const json = await response.json();

    if (response.status === 200) {
      setIsLoading(false);
      setError(null);
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      return true;
    } else {
      setIsLoading(false);
      setError(json.error);
      return false;
    }
  };

  return { signup, isLoading, error };
};
