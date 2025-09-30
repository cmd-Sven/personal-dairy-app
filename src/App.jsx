import { useState, useEffect } from "react";
import { loadEntries } from "./utils/localStorage";

import AddEntryModal from "./components/AddEntryModal";
import EntryDetailModal from "./components/EntryDetailModal";
/**
 * Haupt-App Component für Personal Diary
 * Verwaltet alle Tagebuch-Einträge und Modals
 */
function App() {
  // FR005: State & Effects Management - React Hooks für UI State
  const [entries, setEntries] = useState([]); // Alle Tagebuch-Einträge
  const [showAddModal, setShowAddModal] = useState(false); // FR006: Add Entry Modal State
  const [showDetailModal, setShowDetailModal] = useState(false); // FR014: Entry Detail Modal State
  const [selectedEntry, setSelectedEntry] = useState(null); // Aktuell ausgewählter Eintrag für Detail-Ansicht

  // FR012: Load entries on startup
  // FR005: useEffect Hook für Side-Effects beim Component Mount
  useEffect(() => {
    const loadedEntries = loadEntries(); // Lade Einträge aus localStorage
    // FR011: Sort newest-first - Sortiere nach Datum absteigend
    const sortedEntries = loadedEntries.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setEntries(sortedEntries);
  }, []); // Leeres Dependency Array = nur beim ersten Laden ausführen

  /**
   * FR006: Öffnet das Modal zum Hinzufügen eines neuen Eintrags
   */
  const handleAddEntry = () => {
    setShowAddModal(true);
  };

  /**
   * Callback wenn neuer Eintrag hinzugefügt wurde
   * Aktualisiert die Liste und sortiert sie neu
   * FR011: Sortiert die Liste nach Hinzufügen neu (newest-first)
   * @param {Object} newEntry - Der neu hinzugefügte Eintrag
   */
  const handleEntryAdded = (newEntry) => {
    // Füge neuen Eintrag hinzu und sortiere Liste neu (newest-first)
    setEntries((prev) =>
      [newEntry, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setShowAddModal(false); // Schließe Modal nach Hinzufügen
  };

  /**
   * FR014: Öffnet Detail-Modal für einen Eintrag
   * @param {Object} entry - Der anzuzeigende Eintrag
   */
  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header mit Titel und Add Button */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-900">
            📔 My Personal Diary
          </h1>
          {/* FR006: Add Entry Button - Öffnet Modal zum Hinzufügen */}
          <button
            onClick={handleAddEntry}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            + Add Entry
          </button>
        </div>
      </header>

      {/* Main Content - Zeigt entweder leere Nachricht oder Einträge-Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {entries.length === 0 ? (
          // Leere State-Nachricht wenn keine Einträge vorhanden
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No entries yet. Start your diary journey! ✨
            </p>
          </div>
        ) : (
          // FR011: Homepage List - Grid mit allen Einträgen
          // FR013: Card Layout - Jeder Eintrag als Karte mit Preview Image, Date, Title
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => handleCardClick(entry)} // FR014: Klick öffnet Detail-Modal
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              >
                {/* FR013: Preview Image */}
                <div className="h-48 bg-gray-200">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* FR013: Date und Title */}
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{entry.date}</p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {entry.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FR006: Add Entry Modal Component */}
      {/* FR007: Form Fields (Title, Date, Image URL, Content) */}
      {/* FR009: One-Entry-Per-Day Check */}
      {/* FR010: Form Validation */}
      <AddEntryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onEntryAdded={handleEntryAdded}
      />

      {/* FR014: Entry Detail Modal */}
      <EntryDetailModal
        entry={selectedEntry}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
}

export default App;
