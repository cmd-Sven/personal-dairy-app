// Schlüssel für localStorage
const STORAGE_KEY = "diary_entries";
const PROFILE_KEY = "captain_profile";

// Rassen-Definitionen
export const RACES = {
  human: {
    id: "human",
    name: "Mensch",
    maxPoints: 20,
    bonuses: {},
    penalties: {},
    description:
      "Ausgeglichen in allen Bereichen, ohne Boni oder Mali. Ideal für Einsteiger.",
  },
  vulcan: {
    id: "vulcan",
    name: "Vulkanier",
    maxPoints: 24,
    bonuses: { logic: 1, science: 1 },
    penalties: { empathy: -2 },
    description: "Rational, logisch, aber emotional distanziert.",
  },
  betazoid: {
    id: "betazoid",
    name: "Betazoide",
    maxPoints: 22,
    bonuses: { empathy: 2 },
    penalties: { logic: -1 },
    description: "Empathisch und intuitiv, aber weniger analytisch.",
  },
  andorian: {
    id: "andorian",
    name: "Andorianer",
    maxPoints: 23,
    bonuses: { tactics: 1, courage: 1 },
    penalties: { diplomacy: -1 },
    description: "Kriegerisches Volk mit starkem Ehrgefühl.",
  },
  bajoran: {
    id: "bajoran",
    name: "Bajoraner",
    maxPoints: 21,
    bonuses: { empathy: 1, leadership: 1 },
    penalties: { science: -1 },
    description: "Spirituell, mit starkem Glauben und Gemeinschaftssinn.",
  },
  klingon: {
    id: "klingon",
    name: "Klingone",
    maxPoints: 23,
    bonuses: { courage: 2 },
    penalties: { diplomacy: -2 },
    description: "Ehre und Kampfgeist stehen über allem.",
  },
  trill: {
    id: "trill",
    name: "Trill (symbiontisch)",
    maxPoints: 24,
    bonuses: { science: 1, diplomacy: 1 },
    penalties: { courage: -1 },
    description:
      "Durch Erfahrungen vergangener Wirte sehr gebildet, aber konfliktscheu.",
  },
  romulan: {
    id: "romulan",
    name: "Romulaner",
    maxPoints: 23,
    bonuses: { tactics: 1, logic: 1 },
    penalties: { empathy: -1 },
    description: "Geheimniskrämerisch, strategisch denkend, aber misstrauisch.",
  },
};

// Attribut-Definitionen
export const ATTRIBUTES = {
  leadership: {
    id: "leadership",
    name: "Führungskraft",
    description: "Fähigkeit, Crew zu inspirieren und zu leiten",
  },
  tactics: {
    id: "tactics",
    name: "Taktik",
    description: "Strategisches Denken und Reaktionsfähigkeit im Gefecht",
  },
  logic: {
    id: "logic",
    name: "Logik",
    description: "Analytische und rationale Entscheidungsfindung",
  },
  empathy: {
    id: "empathy",
    name: "Empathie",
    description: "Fähigkeit, Emotionen und Bedürfnisse anderer zu verstehen",
  },
  science: {
    id: "science",
    name: "Wissenschaft",
    description: "Verständnis wissenschaftlicher Zusammenhänge",
  },
  engineering: {
    id: "engineering",
    name: "Ingenieurskunst",
    description: "Technisches Know-how und Reparaturgeschick",
  },
  courage: {
    id: "courage",
    name: "Mut",
    description:
      "Risikobereitschaft und Standhaftigkeit in Gefahrensituationen",
  },
  diplomacy: {
    id: "diplomacy",
    name: "Diplomatie",
    description: "Verhandlungsgeschick und interkulturelle Kommunikation",
  },
};

// Basis-Profil-Struktur
export const getEmptyProfile = () => ({
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

/**
 * Lädt alle Tagebuch-Einträge aus localStorage
 * FR008: LocalStorage Persistence
 * FR012: Load Entries on Startup
 * @returns {Array} Array von Tagebuch-Einträgen
 */
export const loadEntries = () => {
  try {
    const entries = localStorage.getItem(STORAGE_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error("Error loading entries:", error);
    return [];
  }
};

/**
 * Speichert alle Einträge in localStorage
 * FR008: LocalStorage Persistence
 * @param {Array} entries - Array von Einträgen zum Speichern
 * @returns {boolean} true bei Erfolg, false bei Fehler
 */
export const saveEntries = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error("Error saving entries:", error);
    return false;
  }
};

/**
 * Fügt einen neuen Eintrag hinzu
 * Generiert automatisch ID und Timestamp
 * @param {Object} entry - Neuer Eintrag (title, date, imageUrl, content)
 * @returns {Object} Der gespeicherte Eintrag mit ID und createdAt
 */
export const addEntry = (entry) => {
  const entries = loadEntries();
  const newEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  entries.push(newEntry);
  saveEntries(entries);
  return newEntry;
};

/**
 * Aktualisiert einen bestehenden Eintrag
 * @param {string} id - ID des zu aktualisierenden Eintrags
 * @param {Object} updatedData - Neue Daten für den Eintrag
 * @returns {Object|null} Der aktualisierte Eintrag oder null bei Fehler
 */
export const updateEntry = (id, updatedData) => {
  const entries = loadEntries();
  const index = entries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    console.error("Entry not found:", id);
    return null;
  }

  entries[index] = {
    ...entries[index],
    ...updatedData,
    id: entries[index].id,
    createdAt: entries[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  saveEntries(entries);
  return entries[index];
};

/**
 * Löscht einen Eintrag
 * @param {string} id - ID des zu löschenden Eintrags
 * @returns {boolean} true bei Erfolg, false bei Fehler
 */
export const deleteEntry = (id) => {
  const entries = loadEntries();
  const filteredEntries = entries.filter((entry) => entry.id !== id);

  if (filteredEntries.length === entries.length) {
    console.error("Entry not found:", id);
    return false;
  }

  saveEntries(filteredEntries);
  return true;
};

/**
 * Prüft ob bereits ein Eintrag für ein bestimmtes Datum existiert
 * FR009: One-Entry-Per-Day Check
 * @param {string} date - Datum im Format YYYY-MM-DD
 * @param {string} excludeId - Optional: ID eines Eintrags der ignoriert werden soll (für Edit)
 * @returns {boolean} true wenn Eintrag existiert, false wenn nicht
 */
export const checkEntryExists = (date, excludeId = null) => {
  const entries = loadEntries();
  return entries.some((entry) => entry.date === date && entry.id !== excludeId);
};

/**
 * Lädt das Captain-Profil aus localStorage
 * @returns {Object} Profil-Objekt mit name, birthDate, avatar, race, attributes
 */
export const loadProfile = () => {
  try {
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : getEmptyProfile();
  } catch (error) {
    console.error("Error loading profile:", error);
    return getEmptyProfile();
  }
};

/**
 * Speichert das Captain-Profil in localStorage
 * @param {Object} profile - Profil-Objekt (name, birthDate, avatar, race, attributes)
 * @returns {boolean} true bei Erfolg, false bei Fehler
 */
export const saveProfile = (profile) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error("Error saving profile:", error);
    return false;
  }
};

/**
 * Löscht ALLE Daten aus dem localStorage (Einträge + Profil)
 * Selbstzerstörungssequenz - kompletter Reset
 * @returns {boolean} true bei Erfolg
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem("dailyQuote");
    return true;
  } catch (error) {
    console.error("Error clearing all data:", error);
    return false;
  }
};