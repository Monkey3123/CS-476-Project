import { useState, useEffect } from "react";

export const useListerName = (listerId) => {
  const [listerName, setListerName] = useState({ first: "", last: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListerName = async () => {
      if (!listerId) return;
      try {
        const response = await fetch(
          `http://localhost:4000/api/userRoutes/${listerId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setListerName({ first: data.first, last: data.last });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListerName();
  }, [listerId]);

  return { listerName, isLoading, error };
};
