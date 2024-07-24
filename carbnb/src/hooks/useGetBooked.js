import { useState, useEffect } from "react";
import { useUserContext } from "./useUserContext"; // Assuming you have a UserContext to get the current user

export const useFetchBookedCars = () => {
  const [Bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext(); // Get the current user

  useEffect(() => {
    const fetchBookedCars = async () => {
      setIsLoading(true);
      setError(null);
      const rid = user.id;
      console.log(JSON.stringify({ rid }));
      try {
        const response = await fetch(
          "http://localhost:4000/api/carRoutes/getBookedCars",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rid }),
          }
        );
        const json = await response.json();

        if (response.status === 404) {
          throw new Error(`No Booked Cars`);
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setBookings(json);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching cars.");
        setIsLoading(false);
      }
    };

    if (user) {
      fetchBookedCars();
    }
  }, [user]);

  return { Bookings, isLoading, error };
};
