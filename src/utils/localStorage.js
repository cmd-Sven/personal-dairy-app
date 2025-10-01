// Schlüssel für localStorage
const STORAGE_KEY = "diary_entries";

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

  // Aktualisiere Eintrag, behalte aber ID und createdAt
  entries[index] = {
    ...entries[index],
    ...updatedData,
    id: entries[index].id, // ID nicht überschreiben
    createdAt: entries[index].createdAt, // createdAt nicht überschreiben
    updatedAt: new Date().toISOString(), // Timestamp für letzte Änderung
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
