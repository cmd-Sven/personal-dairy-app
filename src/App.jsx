import { useState, useEffect } from "react";
import { loadEntries, deleteEntry } from "./utils/localStorage";

import Starfield from "./components/Starfield";
import CalendarWeekView from "./components/CalendarWeekView";
import AddEntryModal from "./components/AddEntryModal";
import EditEntryModal from "./components/EditEntryModal";
import EntryDetailModal from "./components/EntryDetailModal";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";
import QuoteOfTheDay from "./components/QuoteOfTheDay";

import Header from "./components/Header";
import ProfileModal from "./components/ProfileModal";
import EntryArchive from "./components/EntryArchive";

function App() {
  // Einträge State
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [prefilledDate, setPrefilledDate] = useState(null);

  // Feedback & Dialogs
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    entryId: null,
    entryTitle: "",
  });

  // Profil State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "Captain",
    birthDate: "",
    avatar: "/default-avatar.png", // Standardbild im public-Ordner
  });

  // Sternenzeit berechnen
  const calculateStardate = () => {
    const now = new Date();
    const base = new Date("2323-01-01").getTime();
    const diff = now.getTime() - base;
    const stardate = ((diff / (1000 * 60 * 60 * 24 * 365.25)) * 1000).toFixed(
      1
    );
    return stardate;
  };

  // Einträge laden
  useEffect(() => {
    const loadedEntries = loadEntries();
    const sortedEntries = loadedEntries.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setEntries(sortedEntries);
  }, []);

  // Toast-Handler
  const showToast = (message, type = "success") => setToast({ message, type });
  const closeToast = () => setToast(null);

  // Entry Handler
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
    showToast("Log-Eintrag aufgezeichnet! 🚀");
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
    showToast("Log-Eintrag aktualisiert! ✨");
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
      showToast("Log-Eintrag gelöscht! 🗑️");
      setShowDetailModal(false);
    } else {
      showToast("Error: Eintrag kann nicht gelöscht werden", "error");
    }
    setConfirmDialog({ isOpen: false, entryId: null, entryTitle: "" });
  };

  const cancelDelete = () =>
    setConfirmDialog({ isOpen: false, entryId: null, entryTitle: "" });

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen relative">
      <Starfield />

      {/* Header */}
      <Header
        calculateStardate={calculateStardate}
        profile={profile}
        onProfileClick={() => setShowProfileModal(true)}
        onAddEntry={() => handleAddEntry()}
      />

      {/* Profil Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        setProfile={setProfile}
      />

      {/* Main */}
      <main className="max-w-[1400px] mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-6 mt-6 mb-12">
          <QuoteOfTheDay />
        </div>

        <CalendarWeekView
          entries={entries}
          onAddEntry={handleAddEntry}
          onCardClick={handleCardClick}
        />

        <EntryArchive
          entries={entries}
          onCardClick={handleCardClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
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
