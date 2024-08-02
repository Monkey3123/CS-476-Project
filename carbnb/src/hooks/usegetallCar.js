//
//Custom React Hook: useFetchCars
//
//This custom hook manages the state and side effects for fetching and sorting car data.
//It provides the following functionalities:
// - Fetches car data from a given API endpoint on component mount.
// - Handles loading state and error management.
// - Allows sorting of cars based on their daily rate, either in ascending or descending order.
//
//Returns:
// - `cars`: The list of fetched and sorted cars.
// - `isLoading`: Boolean indicating if data is still being fetched.
// - `error`: Any error message encountered during data fetching.
// - `setSortOrder`: Function to set the sort order for the cars.
//
import { useState, useEffect } from "react";

export const useFetchCars = (lat, lng) => {
  const [cars, setCars] = useState([]); // Stores the list of cars
  const [error, setError] = useState(null); // Stores any error message
  const [isLoading, setIsLoading] = useState(true); // Indicates if data is loading
  const [sortOrder, setSortOrder] = useState("asc"); // Determines the sort order for cars

  useEffect(() => {
    // Function to fetch car data from API
    const fetchCars = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear previous errors

      try {
        const response = await fetch(
          "http://localhost:4000/api/carRoutes/getcarbylocation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lat, lng }), // Include lat and lng in the request body
          }
        );
        const json = await response.json();

        if (response.ok) {
          setCars(json); // Update car data
          setIsLoading(false); // Set loading state to false
        } else {
          setError(json.message || "Failed to fetch cars."); // Set error message
          setIsLoading(false); // Set loading state to false
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching cars."); // Set error message
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchCars(); // Fetch car data on component mount
  }, [lat, lng]); // Include lat and lng as dependencies

  // Sorting cars whenever the cars array or sortOrder changes
  useEffect(() => {
    if (cars.length > 0) {
      const sortedCars = [...cars].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.dailyRate - b.dailyRate; // Ascending order
        } else {
          return b.dailyRate - a.dailyRate; // Descending order
        }
      });
      setCars(sortedCars); // Update the sorted cars list
    }
  }, [cars, sortOrder]);

  // Return state variables and setter function
  return { cars, isLoading, error, setSortOrder };
};
