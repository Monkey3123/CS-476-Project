import { useUserContext } from "./useUserContext";

export const useBooked = () => {
  const { user } = useUserContext();
  const booked = async (cid) => {
    const rid = user.id;
    const response = await fetch("http://localhost:4000/api/carRoutes/booked", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cid, rid }),
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      return "Failed to list car.";
    }
  };

  return { booked };
};
