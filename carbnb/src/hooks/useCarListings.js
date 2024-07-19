import { useState, useEffect } from "react";
import { useUserContext } from "./useUserContext"; // Assuming you have a UserContext to get the current user

export const useFetchListerCars = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext(); // Get the current user

  useEffect(() => {
    const fetchListerCars = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/carRoutes/getlisterCars?listerid=${user.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setListings(json);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching cars.");
        setIsLoading(false);
      }
    };

    if (user) {
      fetchListerCars();
    }
  }, [user]);

  return { listings, isLoading, error };
};
