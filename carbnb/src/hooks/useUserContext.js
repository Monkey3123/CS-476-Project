import { userContext } from "../context/userContext";
import { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(userContext);

  if (!context) {
    throw Error("User Context ERROR");
  }
  return context;
};
