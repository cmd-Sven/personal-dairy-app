import { useState, useEffect } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import {
  loadProfile,
  saveProfile as saveProfileToStorage,
  RACES,
  ATTRIBUTES,
} from "../utils/localStorage";

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "",
    birthDate: "",
    avatar: "",
    race: "",
    attributes: {
      leadership: 0,
      tactics: 0,
      logic: 0,
      empathy: 0,
      science: 0,
      engineering: 0,
      courage: 0,
      diplomacy: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedProfile = loadProfile();
    setProfile(loadedProfile);
    setIsLoading(false);
  }, []);

  const saveProfile = (newProfile) => {
    const success = saveProfileToStorage(newProfile);
    if (success) {
      setProfile(newProfile);
    }
    return success;
  };

  const getRaceData = () => {
    return profile.race ? RACES[profile.race] : null;
  };

  const getAttributeValue = (attributeId) => {
    return profile.attributes?.[attributeId] || 0;
  };

  const getFinalAttributeValue = (attributeId) => {
    const baseValue = getAttributeValue(attributeId);
    const race = getRaceData();
    if (!race) return baseValue;

    const bonus = race.bonuses[attributeId] || 0;
    return baseValue + bonus;
  };

  const hasHighAttribute = (attributeId, threshold = 5) => {
    return getFinalAttributeValue(attributeId) >= threshold;
  };

  const getRank = () => {
    const ranks = {
      vulcan: "Wissenschaftsoffizier",
      klingon: "Taktischer Offizier",
      human: "Captain",
      betazoid: "Schiffsberater",
      andorian: "Sicherheitschef",
      bajoran: "Erster Offizier",
      trill: "Chefwissenschaftler",
      romulan: "Geheimdienstoffizier",
    };
    return ranks[profile.race] || "Captain";
  };

  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "Guten Tag";
    if (hour < 12) timeGreeting = "Guten Morgen";
    else if (hour >= 18) timeGreeting = "Guten Abend";

    const name = profile.name || "Captain";
    const rank = getRank();

    return `${timeGreeting}, ${rank} ${name}`;
  };

  const value = {
    profile,
    setProfile,
    saveProfile,
    isLoading,
    getRaceData,
    getAttributeValue,
    getFinalAttributeValue,
    hasHighAttribute,
    getRank,
    getPersonalizedGreeting,
    RACES,
    ATTRIBUTES,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};