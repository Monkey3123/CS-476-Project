export const useUnbooked = () => {
  const Unbooked = async (cid) => {
    const response = await fetch(
      "http://localhost:4000/api/carRoutes/Unbooked",
      {
        method: "Put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cid }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      return "Failed to unbook car.";
    }
  };

  return { Unbooked };
};
