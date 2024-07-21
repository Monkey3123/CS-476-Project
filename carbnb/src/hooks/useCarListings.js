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
      const listerid = user.id;
      try {
        const response = await fetch(
          "http://localhost:4000/api/carRoutes/getlisterCars",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listerid }),
          }
        );
        const json = await response.json();

        if (response.status == 404) {
          throw new Error(`No Listed Cars`);
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

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
