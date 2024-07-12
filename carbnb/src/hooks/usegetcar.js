import { useState, useEffect } from "react";

export const useFetchCar = (id) => {
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/carRoutes/${id}`
        );
        const json = await response.json();

        if (response.ok) {
          setCar(json);
          setIsLoading(false);
        } else {
          setError(json.message || "Failed to fetch car.");
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching the car.");
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  return { car, isLoading, error };
};
