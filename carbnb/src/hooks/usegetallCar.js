import { useState, useEffect } from "react";

export const useFetchCars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); 

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

  // Sorting cars whenever the cars array or sortOrder changes
  useEffect(() => {
    if (cars.length > 0) {
      const sortedCars = [...cars].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.dailyRate - b.dailyRate;
        } else {
          return b.dailyRate - a.dailyRate;
        }
      });
      setCars(sortedCars);
    }
  }, [cars, sortOrder]);

  return { cars, isLoading, error, setSortOrder };
};
