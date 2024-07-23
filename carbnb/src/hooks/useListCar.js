import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useListCar = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useUserContext();

  const listCar = async (carDetails, carPhoto) => {
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.errors.map((err) => err.msg).join(", "));
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error listing car:", error);
      throw error;
    }
  };

  return { listCar };
};
