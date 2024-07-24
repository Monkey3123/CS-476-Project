import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useListCar = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useUserContext();

  const listCar = async (carDetails, carPhoto) => {
    setIsLoading(true);
    setError(null);

    // Construct the data object
    const data = {
      ...carDetails,
      photo: carPhoto,
      listerid: user.id,
      booked: false, // Ensure this is a boolean
    };

    try {
      const response = await fetch("http://localhost:4000/api/carRoutes/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Send as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.errors.map((err) => err.msg).join(", "));
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error listing car:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { listCar, error, isLoading };
};
