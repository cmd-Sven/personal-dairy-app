import { useState, useEffect } from 'react';
import { loadEntries, deleteEntry } from './utils/localStorage';
import AddEntryModal from './components/AddEntryModal';
import EditEntryModal from './components/EditEntryModal';
import EntryDetailModal from './components/EntryDetailModal';
import Toast from './components/Toast';
import ConfirmDialog from './components/ConfirmDialog';

/**
 * Haupt-App Component für Personal Diary
 * Mit Delete, Edit und Toast Notifications
 */
function App() {
  // FR005: State & Effects Management
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  
  // Toast State
  const [toast, setToast] = useState(null);
  
  // Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    entryId: null,
    entryTitle: ''
  });

  // FR012: Load entries on startup
  useEffect(() => {
    const loadedEntries = loadEntries();
    // FR011: Sort newest-first
    const sortedEntries = loadedEntries.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    setEntries(sortedEntries);
  }, []);

  /**
   * Zeigt eine Toast Notification an
   */
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  /**
   * Schließt die Toast Notification
   */
  const closeToast = () => {
    setToast(null);
  };

  /**
   * FR006: Öffnet das Modal zum Hinzufügen eines neuen Eintrags
   */
  const handleAddEntry = () => {
    setShowAddModal(true);
  };

  /**
   * Callback wenn neuer Eintrag hinzugefügt wurde
   */
  const handleEntryAdded = (newEntry) => {
    setEntries(prev => [newEntry, ...prev].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    ));
    setShowAddModal(false);
    showToast('Entry added successfully! 🎉', 'success');
  };

  /**
   * Öffnet Edit Modal für einen Eintrag
   */
  const handleEditClick = (entry, e) => {
    e.stopPropagation(); // Verhindert dass Detail Modal auch öffnet
    setEditingEntry(entry);
    setShowEditModal(true);
    setShowDetailModal(false); // Schließe Detail Modal falls offen
  };

  /**
   * Callback wenn Eintrag aktualisiert wurde
   */
  const handleEntryUpdated = (updatedEntry) => {
    setEntries(prev => 
      prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    setShowEditModal(false);
    setEditingEntry(null);
    showToast('Entry updated successfully! ✏️', 'success');
  };

  /**
   * Öffnet Confirm Dialog zum Löschen
   */
  const handleDeleteClick = (entry, e) => {
    e.stopPropagation(); // Verhindert dass Detail Modal auch öffnet
    setConfirmDialog({
      isOpen: true,
      entryId: entry.id,
      entryTitle: entry.title
    });
  };

  /**
   * Bestätigt und führt das Löschen aus
   */
  const confirmDelete = () => {
    const success = deleteEntry(confirmDialog.entryId);
    
    if (success) {
      setEntries(prev => prev.filter(entry => entry.id !== confirmDialog.entryId));
      showToast('Entry deleted successfully! 🗑️', 'success');
      setShowDetailModal(false); // Schließe Detail Modal falls offen
    } else {
      showToast('Failed to delete entry. Please try again.', 'error');
    }
    
    setConfirmDialog({ isOpen: false, entryId: null, entryTitle: '' });
  };

  /**
   * Bricht das Löschen ab
   */
  const cancelDelete = () => {
    setConfirmDialog({ isOpen: false, entryId: null, entryTitle: '' });
  };

  /**
   * FR014: Öffnet Detail-Modal für einen Eintrag
   */
  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header mit Glassmorphism */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📔</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  My Personal Diary
                </h1>
                <p className="text-xs text-gray-500">Capture your moments</p>
              </div>
            </div>

            {/* FR006: Add Entry Button */}
            <button
              onClick={handleAddEntry}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Entry
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {entries.length === 0 ? (
          // Empty State mit modernem Design
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <span className="text-5xl">✨</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Diary!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Start documenting your life's journey. Create your first diary entry and capture your precious moments.
            </p>
            <button
              onClick={handleAddEntry}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Create First Entry 🚀
            </button>
          </div>
        ) : (
          // FR011, FR013: Modern Card Grid
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Entries</h2>
              <p className="text-gray-600 mt-1">{entries.length} {entries.length === 1 ? 'entry' : 'entries'} recorded</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map(entry => (
                <article
                  key={entry.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
                >
                  {/* FR013: Preview Image mit Overlay */}
                  <div 
                    className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                    onClick={() => handleCardClick(entry)}
                  >
                    <img
                      src={entry.imageUrl}
                      alt={entry.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Action Buttons Overlay */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => handleEditClick(entry, e)}
                        className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-all hover:scale-110"
                        title="Edit entry"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(entry, e)}
                        className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-all hover:scale-110"
                        title="Delete entry"
                      >
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* FR013: Card Content */}
                  <div className="p-6" onClick={() => handleCardClick(entry)}>
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {entry.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {entry.content}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Read more</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
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
        onClose={() => setShowAddModal(false)}
        onEntryAdded={handleEntryAdded}
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

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Entry?"
        message={`Are you sure you want to delete "${confirmDialog.entryTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}

export default App;