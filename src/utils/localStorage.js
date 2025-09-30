// Schlüssel für localStorage
const STORAGE_KEY = "diary_entries";

/**
 * Lädt alle Tagebuch-Einträge aus localStorage
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
  // Erstelle neuen Eintrag mit ID und Timestamp
  const newEntry = {
    ...entry,
    id: Date.now().toString(), // Eindeutige ID basierend auf Timestamp
    createdAt: new Date().toISOString(), // ISO-Format für Datum/Zeit
  };
  entries.push(newEntry);
  saveEntries(entries);
  return newEntry;
};

/**
 * Prüft ob bereits ein Eintrag für ein bestimmtes Datum existiert
 * @param {string} date - Datum im Format YYYY-MM-DD
 * @returns {boolean} true wenn Eintrag existiert, false wenn nicht
 */
export const checkEntryExists = (date) => {
  const entries = loadEntries();
  return entries.some((entry) => entry.date === date);
};
