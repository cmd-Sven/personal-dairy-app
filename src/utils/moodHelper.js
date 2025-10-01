/**
 * Star Trek Mood System Helper
 * Zentrale Definition aller Moods
 */

export const moods = {
  "vulcan-calm": {
    id: "vulcan-calm",
    icon: "🖖",
    label: "Vulcan Calm",
    description: "Logic Prevails",
    color: "from-[#9999ff] to-[#cc99cc]",
    borderColor: "border-[#9999ff]",
    bgColor: "bg-[#9999ff]",
  },
  "warp-speed": {
    id: "warp-speed",
    icon: "⚡",
    label: "Warp Speed",
    description: "Engage!",
    color: "from-[#ff9c00] to-[#ffcc99]",
    borderColor: "border-[#ff9c00]",
    bgColor: "bg-[#ff9c00]",
  },
  "red-alert": {
    id: "red-alert",
    icon: "🔴",
    label: "Red Alert",
    description: "Shields Up!",
    color: "from-[#cc6666] to-[#ff6666]",
    borderColor: "border-[#cc6666]",
    bgColor: "bg-[#cc6666]",
  },
  "neutral-zone": {
    id: "neutral-zone",
    icon: "😐",
    label: "Neutral Zone",
    description: "Meh...",
    color: "from-[#666666] to-[#999999]",
    borderColor: "border-[#999999]",
    bgColor: "bg-[#999999]",
  },
  "coffee-replicator": {
    id: "coffee-replicator",
    icon: "☕",
    label: "Replicator Break",
    description: "Tea, Earl Grey, Hot",
    color: "from-[#cc99cc] to-[#ffccff]",
    borderColor: "border-[#cc99cc]",
    bgColor: "bg-[#cc99cc]",
  },
  "away-mission": {
    id: "away-mission",
    icon: "🚀",
    label: "Away Mission",
    description: "Beam Me Up!",
    color: "from-[#66ccff] to-[#99ffcc]",
    borderColor: "border-[#66ccff]",
    bgColor: "bg-[#66ccff]",
  },
};

/**
 * Holt Mood Daten anhand der ID
 * @param {string} moodId - Die Mood ID
 * @returns {Object} Mood Objekt
 */
export const getMoodById = (moodId) => {
  return moods[moodId] || null;
};

/**
 * Gibt alle Moods als Array zurück
 * @returns {Array} Array von Mood Objekten
 */
export const getAllMoods = () => {
  return Object.values(moods);
};
