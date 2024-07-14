import { useState, useEffect } from "react";

export const useFetchCars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:4000/api/carRoutes/getcar"
        );
        const json = await response.json();

        if (response.ok) {
          setCars(json);
          setIsLoading(false);
        } else {
          setError(json.message || "Failed to fetch cars.");
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching cars.");
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, isLoading, error };
};