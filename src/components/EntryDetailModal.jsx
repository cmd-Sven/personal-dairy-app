// Modal für Detail-Ansicht

/**
 * FR014: Entry Detail Modal
 * Zeigt den vollständigen Eintrag an (Title, Date, Image, Content)
 */
function EntryDetailModal({ entry, isOpen, onClose }) {
  // Schließt Modal nur wenn isOpen true ist
  if (!isOpen || !entry) return null;

  /**
   * Formatiert das Datum in ein lesbares Format
   * z.B. "2024-03-15" → "March 15, 2024"
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  /**
   * Schließt Modal beim Klick auf Overlay (außerhalb des Modals)
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Modal Overlay - Klick außerhalb schließt Modal
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      {/* Modal Content - FR014: Zeigt alle Entry-Details */}
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header mit Datum */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-t-lg">
          <p className="text-sm opacity-90">{formatDate(entry.date)}</p>
          <h2 className="text-2xl font-bold mt-1">{entry.title}</h2>
        </div>

        {/* Image - FR014: Zeigt das vollständige Bild */}
        <div className="w-full h-64 md:h-96 bg-gray-200">
          <img 
            src={entry.imageUrl} 
            alt={entry.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
        </div>

        {/* Content - FR014: Zeigt den vollständigen Text */}
        <div className="p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>

          {/* Metadata - Zeigt wann der Eintrag erstellt wurde */}
          {entry.createdAt && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Created: {new Date(entry.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryDetailModal;