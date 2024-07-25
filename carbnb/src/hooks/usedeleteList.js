export const usedeleteList = () => {
  const deleteList = async (cid) => {
    const response = await fetch(
      "http://localhost:4000/api/carRoutes/deleteList",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cid }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      return "Failed to unlist car.";
    }
  };

  return { deleteList };
};
