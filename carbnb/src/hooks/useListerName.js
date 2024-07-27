// Custom React Hook for Fetching Lister's Name
//
// This custom hook, `useListerName`, is used to fetch and manage the state of a lister's name
// based on the provided `listerId`. It handles the following:
// - `listerName`: State to store the lister's first and last name.
// - `error`: State to store any error message encountered during the fetch operation.
// - `isLoading`: State to track the loading status of the fetch operation.
//
// The hook makes an API call to retrieve the lister's name, updates the state accordingly,
// and returns the lister's name, loading status, and any errors encountered.

import { useState, useEffect } from "react";

export const useListerName = (listerId) => {
  // State to store the lister's name (first and last).
  const [listerName, setListerName] = useState({ first: "", last: "" });

  // State to store any error message encountered during the fetch operation.
  const [error, setError] = useState(null);

  // State to track the loading status of the fetch operation.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the lister's name from the API.
    const fetchListerName = async () => {
      // Return early if no listerId is provided.
      if (!listerId) return;

      try {
        // Make an API request to fetch the lister's name.
        const response = await fetch(
          `http://localhost:4000/api/userRoutes/${listerId}`
        );

        // Throw an error if the response is not OK.
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the response JSON and set the lister's name state.
        const data = await response.json();
        setListerName({ first: data.first, last: data.last });
      } catch (error) {
        // Set the error state if an error is encountered.
        setError(error.message);
      } finally {
        // Set the loading state to false after the fetch operation is complete.
        setIsLoading(false);
      }
    };

    // Call the fetch function.
    fetchListerName();
  }, [listerId]);

  // Return the lister's name, loading status, and any error encountered.
  return { listerName, isLoading, error };
};
