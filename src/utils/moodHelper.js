/**
 * Star Trek Mood System Helper
 * Zentrale Definition aller Moods
 */

export const moods = {
  "vulcan-calm": {
    id: "vulcan-calm",
    icon: "🖖",
    label: "Vulkanische Ruhe",
    description: "Logik herrscht vor",
    tooltip: "Ausgeglichen und rational - der Verstand regiert über die Emotionen. Perfekt für analytische Aufgaben.",
    color: "from-[#9999ff] to-[#cc99cc]",
    borderColor: "border-[#9999ff]",
    bgColor: "bg-[#9999ff]",
  },
  "warp-speed": {
    id: "warp-speed",
    icon: "⚡",
    label: "Warp-Geschwindigkeit",
    description: "Energie!",
    tooltip: "Voller Energie und Tatendrang - bereit, Berge zu versetzen und Herausforderungen anzunehmen.",
    color: "from-[#ff9c00] to-[#ffcc99]",
    borderColor: "border-[#ff9c00]",
    bgColor: "bg-[#ff9c00]",
  },
  "red-alert": {
    id: "red-alert",
    icon: "🔴",
    label: "Roter Alarm",
    description: "Schilde hoch!",
    tooltip: "Gestresst und unter Druck - alle Systeme auf Verteidigung. Achtung ist geboten.",
    color: "from-[#cc6666] to-[#ff6666]",
    borderColor: "border-[#cc6666]",
    bgColor: "bg-[#cc6666]",
  },
  "neutral-zone": {
    id: "neutral-zone",
    icon: "😐",
    label: "Neutrale Zone",
    description: "Geht so...",
    tooltip: "Weder gut noch schlecht - eine Zone der Unentschlossenheit und des Wartens.",
    color: "from-[#666666] to-[#999999]",
    borderColor: "border-[#999999]",
    bgColor: "bg-[#999999]",
  },
  "coffee-replicator": {
    id: "coffee-replicator",
    icon: "☕",
    label: "Replikator-Pause",
    description: "Tee, Earl Grey, heiß",
    tooltip: "Entspannt und gemütlich - Zeit für eine wohlverdiente Pause und Erholung.",
    color: "from-[#cc99cc] to-[#ffccff]",
    borderColor: "border-[#cc99cc]",
    bgColor: "bg-[#cc99cc]",
  },
  "away-mission": {
    id: "away-mission",
    icon: "🚀",
    label: "Außenmission",
    description: "Beam mich hoch!",
    tooltip: "Abenteuerlustig und neugierig - bereit, neue Welten zu erkunden und Grenzen zu überschreiten.",
    color: "from-[#66ccff] to-[#99ffcc]",
    borderColor: "border-[#66ccff]",
    bgColor: "bg-[#66ccff]",
  },
  "subspace-signal": {
    id: "subspace-signal",
    icon: "📡",
    label: "Subraum-Signal",
    description: "Verbindung hergestellt",
    tooltip: "Sozial und kommunikativ - der perfekte Moment für tiefe Gespräche und zwischenmenschliche Verbindungen.",
    color: "from-[#66ff99] to-[#99ffcc]",
    borderColor: "border-[#66ff99]",
    bgColor: "bg-[#66ff99]",
  },
  "nebula-drift": {
    id: "nebula-drift",
    icon: "🌫️",
    label: "Nebel-Drift",
    description: "Navigation unklar",
    tooltip: "Nachdenklich und introspektiv - verloren in Gedanken wie ein Schiff im kosmischen Nebel. Zeit für Selbstreflexion.",
    color: "from-[#9966cc] to-[#cc99ff]",
    borderColor: "border-[#9966cc]",
    bgColor: "bg-[#9966cc]",
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