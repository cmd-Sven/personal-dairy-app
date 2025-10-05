import { useState, useEffect } from "react";
import {
  loadEntries,
  deleteEntry,
  loadProfile,
  clearAllData,
} from "./utils/localStorage";

import Starfield from "./components/Starfield";
import CalendarWeekView from "./components/CalendarWeekView";
import AddEntryModal from "./components/AddEntryModal";
import EditEntryModal from "./components/EditEntryModal";
import EntryDetailModal from "./components/EntryDetailModal";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";
import QuoteOfTheDay from "./components/QuoteOfTheDay";
import ShipStatusReport from "./components/ShipStatusReport";
import SpaceSensorLog from "./components/SpaceSensorLog";
import PlanetScanner from "./components/PlanetScanner";
// import EmergencyAlert from "./components/EmergencyAlert";

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
    isSelfDestruct: false,
  });

  // Profil State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    birthDate: "",
    avatar: "",
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

  // Einträge UND Profil laden
  useEffect(() => {
    // Lade Profil aus localStorage
    const loadedProfile = loadProfile();
    setProfile(loadedProfile);

    // Lade Einträge
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
      isSelfDestruct: false,
    });
  };

  // Selbstzerstörung Handler
  const handleSelfDestruct = () => {
    setConfirmDialog({
      isOpen: true,
      entryId: "self-destruct",
      entryTitle: "ALLE DATEN",
      isSelfDestruct: true,
    });
  };

  const confirmDelete = () => {
    // Prüfe ob es die Selbstzerstörung ist
    if (confirmDialog.isSelfDestruct) {
      const success = clearAllData();
      if (success) {
        // Setze alle States zurück
        setEntries([]);
        setProfile({ name: "", birthDate: "", avatar: "" });
        showToast(
          "SELBSTZERSTÖRUNG ABGESCHLOSSEN - ALLE DATEN GELÖSCHT",
          "error"
        );
        setConfirmDialog({
          isOpen: false,
          entryId: null,
          entryTitle: "",
          isSelfDestruct: false,
        });
        // Optional: Seite neu laden nach kurzer Verzögerung
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showToast("Error: Selbstzerstörung fehlgeschlagen", "error");
      }
    } else {
      // Normales Löschen eines einzelnen Eintrags
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
      setConfirmDialog({
        isOpen: false,
        entryId: null,
        entryTitle: "",
        isSelfDestruct: false,
      });
    }
  };

  const cancelDelete = () =>
    setConfirmDialog({
      isOpen: false,
      entryId: null,
      entryTitle: "",
      isSelfDestruct: false,
    });

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
        onSelfDestruct={handleSelfDestruct}
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
        <QuoteOfTheDay />
        <CalendarWeekView
          entries={entries}
          onAddEntry={handleAddEntry}
          onCardClick={handleCardClick}
        />
        <div className="flex flex-col gap-8 mt-6 mb-12">
          {/* === REIHE 1 === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Report */}
            <ShipStatusReport />

            {/* Raumschiff-Bild - Hologramm-Übertragung */}
            <div className="relative p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md border-l-8 border-[#9999ff] shadow-2xl rounded-md overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#9999ff] rounded-full animate-pulse"></div>
                <span className="text-xl font-black text-[#9999ff] uppercase tracking-wider">
                  Schiffs-Hologramm
                </span>
              </div>

              {/* Hologramm Container */}
              <div className="relative">
                <img
                  src="/images/ship_map.jpg"
                  alt="Föderationsraumschiff"
                  className="w-full object-contain rounded-md opacity-90"
                />

                {/* Hologramm-Scan-Linien */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#9999ff]/50 to-transparent animate-scan"></div>
                  <div
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#9999ff]/30 to-transparent animate-scan-slow"
                    style={{ top: "30%" }}
                  ></div>
                </div>

                {/* Hologramm-Grid-Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNTMsIDE1MywgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

                {/* Flickering Hologram Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#9999ff]/5 to-transparent mix-blend-overlay animate-flicker pointer-events-none"></div>
              </div>

              {/* Status Indicators */}
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 bg-[#9999ff]/20 border border-[#9999ff]/50 rounded-none text-xs text-[#9999ff] font-bold uppercase">
                  LIVE TRANSMISSION
                </span>
                <span className="px-3 py-1 bg-[#9999ff]/20 border border-[#9999ff]/50 rounded-none text-xs text-[#9999ff] font-bold uppercase">
                  DECK OVERVIEW
                </span>
              </div>

              {/* Corner Indicators */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-[#9999ff] rounded-full opacity-60"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#9999ff] rounded-full opacity-60"></div>
            </div>
          </div>

          {/* === REIHE 2 === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlanetScanner />
            <SpaceSensorLog />
          </div>
        </div>

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
        title={
          confirmDialog.isSelfDestruct
            ? "⚠ SELBSTZERSTÖRUNGSSEQUENZ ⚠"
            : "Delete Log Entry?"
        }
        message={
          confirmDialog.isSelfDestruct
            ? "WARNUNG: Alle Logbuch-Einträge und Profildaten werden permanent gelöscht. Diese Aktion kann NICHT rückgängig gemacht werden!"
            : `Confirm deletion of log entry: "${confirmDialog.entryTitle}". This action cannot be undone.`
        }
        confirmText={
          confirmDialog.isSelfDestruct ? "BESTÄTIGEN & LÖSCHEN" : "DELETE"
        }
        cancelText="CANCEL"
        type="gefahr"
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
