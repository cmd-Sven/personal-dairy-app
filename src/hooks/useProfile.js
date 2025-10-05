import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfile muss innerhalb von ProfileProvider verwendet werden"
    );
  }
  return context;
};