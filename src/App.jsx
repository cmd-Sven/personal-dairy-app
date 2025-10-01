import { useState, useEffect } from "react";
import { loadEntries, deleteEntry } from "./utils/localStorage";
import Starfield from "./components/Starfield";
import CalendarWeekView from "./components/CalendarWeekView";
import AddEntryModal from "./components/AddEntryModal";
import EditEntryModal from "./components/EditEntryModal";
import EntryDetailModal from "./components/EntryDetailModal";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";

/**
 * Captain's Log - Star Trek Themed Personal Journal
 */
function App() {
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [prefilledDate, setPrefilledDate] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    entryId: null,
    entryTitle: "",
  });

  // Berechne Stardate (Star Trek inspiriert)
  const calculateStardate = () => {
    const now = new Date();
    const base = new Date("2323-01-01").getTime();
    const diff = now.getTime() - base;
    const stardate = ((diff / (1000 * 60 * 60 * 24 * 365.25)) * 1000).toFixed(
      1
    );
    return stardate;
  };

  useEffect(() => {
    const loadedEntries = loadEntries();
    const sortedEntries = loadedEntries.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setEntries(sortedEntries);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleAddEntry = (date = null) => {
    setPrefilledDate(date);
    setShowAddModal(true);
  };

  const handleEntryAdded = (newEntry) => {
    setEntries((prev) =>
      [newEntry, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setShowAddModal(false);
    setPrefilledDate(null);
    showToast("Log entry recorded successfully! 🚀", "success");
  };

  const handleEditClick = (entry, e) => {
    e.stopPropagation();
    setEditingEntry(entry);
    setShowEditModal(true);
    setShowDetailModal(false);
  };

  const handleEntryUpdated = (updatedEntry) => {
    setEntries((prev) =>
      prev
        .map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setShowEditModal(false);
    setEditingEntry(null);
    showToast("Log entry updated successfully! ✨", "success");
  };

  const handleDeleteClick = (entry, e) => {
    e.stopPropagation();
    setConfirmDialog({
      isOpen: true,
      entryId: entry.id,
      entryTitle: entry.title,
    });
  };

  const confirmDelete = () => {
    const success = deleteEntry(confirmDialog.entryId);

    if (success) {
      setEntries((prev) =>
        prev.filter((entry) => entry.id !== confirmDialog.entryId)
      );
      showToast("Log entry deleted from database! 🗑️", "success");
      setShowDetailModal(false);
    } else {
      showToast("Error: Unable to delete log entry", "error");
    }

    setConfirmDialog({ isOpen: false, entryId: null, entryTitle: "" });
  };

  const cancelDelete = () => {
    setConfirmDialog({ isOpen: false, entryId: null, entryTitle: "" });
  };

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Starfield Background */}
      <Starfield />

      {/* LCARS Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-r from-[#0a0e27]/95 via-[#1a1a3e]/95 to-[#0a0e27]/95 border-b-4 border-[#ff9c00] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 bg-gradient-to-br from-[#ff9c00] to-[#cc6666] rounded-full flex items-center justify-center shadow-lg border-4 border-[#ffcc99] animate-pulse-slow">
                <span className="text-3xl">🖖</span>
                <div className="absolute inset-0 rounded-full border-2 border-[#9999ff] animate-ping opacity-20"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-[#ff9c00] via-[#ffcc99] to-[#ff9c00] bg-clip-text text-transparent drop-shadow-lg">
                  CAPTAIN'S LOG
                </h1>
                <p className="text-xs text-[#9999ff] font-medium tracking-widest uppercase">
                  Stardate {calculateStardate()} • Personal Journal System
                </p>
              </div>
            </div>

            {/* Add Entry Button */}
            <button
              onClick={() => handleAddEntry()}
              className="group relative px-8 py-3 bg-gradient-to-r from-[#ff9c00] to-[#cc6666] text-[#0a0e27] rounded-none font-bold text-lg tracking-wider shadow-2xl hover:shadow-[#ff9c00]/50 transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-[#ffcc99] lcars-corner overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                NEW LOG ENTRY
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent data-stream"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Week View */}
        <CalendarWeekView
          entries={entries}
          onAddEntry={handleAddEntry}
          onCardClick={handleCardClick}
        />

        {/* All Entries */}
        {entries.length > 0 && (
          <div className="mt-16">
            <div className="mb-8 p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md rounded-none border-l-8 border-[#ff9c00] shadow-2xl">
              <h2 className="text-3xl font-black text-[#ffcc99] tracking-wider uppercase">
                Mission Log Archives
              </h2>
              <p className="text-[#9999ff] mt-2 font-medium">
                {entries.length} {entries.length === 1 ? "ENTRY" : "ENTRIES"}{" "}
                RECORDED • DATABASE ACTIVE
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="group bg-gradient-to-br from-[#1a1a3e]/90 to-[#0a0e27]/90 backdrop-blur-sm rounded-none shadow-2xl hover:shadow-[#9999ff]/30 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2 border-2 border-[#9999ff]/30 hover:border-[#ff9c00] lcars-corner"
                >
                  {/* Preview Image */}
                  <div
                    className="relative h-56 overflow-hidden bg-gradient-to-br from-[#2a5caa] to-[#1a1a3e]"
                    onClick={() => handleCardClick(entry)}
                  >
                    <img
                      src={entry.imageUrl}
                      alt={entry.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60" />

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => handleEditClick(entry, e)}
                        className="p-2 bg-[#9999ff]/90 hover:bg-[#9999ff] rounded-none shadow-lg transition-all hover:scale-110 border border-[#ffcc99]"
                        title="Edit entry"
                      >
                        <svg
                          className="w-5 h-5 text-[#0a0e27]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(entry, e)}
                        className="p-2 bg-[#cc6666]/90 hover:bg-[#cc6666] rounded-none shadow-lg transition-all hover:scale-110 border border-[#ffcc99]"
                        title="Delete entry"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Hologram Effect */}
                    <div className="absolute inset-0 pointer-events-none hologram opacity-10 bg-gradient-to-b from-[#9999ff] to-transparent mix-blend-overlay"></div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6" onClick={() => handleCardClick(entry)}>
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9c00] text-[#0a0e27] rounded-none text-sm font-bold mb-4 shadow-lg border-2 border-[#ffcc99]">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {new Date(entry.date)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        .toUpperCase()}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#ffcc99] mb-3 line-clamp-2 group-hover:text-[#ff9c00] transition-colors uppercase tracking-wide">
                      {entry.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-[#9999ff] text-sm line-clamp-3 mb-4 font-medium">
                      {entry.content}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center text-[#ff9c00] font-bold text-sm group-hover:gap-2 transition-all uppercase tracking-wider">
                      <span>ACCESS LOG</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <AddEntryModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setPrefilledDate(null);
        }}
        onEntryAdded={handleEntryAdded}
        prefilledDate={prefilledDate}
      />

      <EditEntryModal
        entry={editingEntry}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingEntry(null);
        }}
        onEntryUpdated={handleEntryUpdated}
      />

      <EntryDetailModal
        entry={selectedEntry}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Log Entry?"
        message={`Confirm deletion of log entry: "${confirmDialog.entryTitle}". This action cannot be undone.`}
        confirmText="DELETE"
        cancelText="CANCEL"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
}

export default App;
