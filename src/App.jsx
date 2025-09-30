import { useState, useEffect } from 'react';
import { loadEntries } from './utils/localStorage';
import AddEntryModal from './components/AddEntryModal';
import EntryDetailModal from './components/EntryDetailModal';

/**
 * Haupt-App Component für Personal Diary
 * Modernes Design mit Tailwind v4
 */
function App() {
  // FR005: State & Effects Management
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // FR012: Load entries on startup
  useEffect(() => {
    const loadedEntries = loadEntries();
    // FR011: Sort newest-first
    const sortedEntries = loadedEntries.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    setEntries(sortedEntries);
  }, []);

  const handleAddEntry = () => {
    setShowAddModal(true);
  };

  const handleEntryAdded = (newEntry) => {
    setEntries(prev => [newEntry, ...prev].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    ));
    setShowAddModal(false);
  };

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
                  onClick={() => handleCardClick(entry)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
                >
                  {/* FR013: Preview Image mit Overlay */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={entry.imageUrl}
                      alt={entry.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* FR013: Card Content */}
                  <div className="p-6">
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

      <EntryDetailModal 
        entry={selectedEntry}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
}

export default App;