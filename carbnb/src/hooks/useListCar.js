import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useListCar = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useUserContext();

  const listCar = async (carDetails, carPhoto, lat, lng) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    for (const key in carDetails) {
      formData.append(key, carDetails[key]);
    }
    formData.append("photo", carPhoto);
    const listerid = user.id;
    formData.append("listerid", listerid);
    const value = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:4000/api/carRoutes/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      const json = await response.json();

      if (response.ok) {
        setIsLoading(false);
        return json;
      } else {
        setIsLoading(false);
        setError(json.message || "Failed to list car.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred while listing the car.");
    }
  };

  return { listCar, isLoading, error };
};
