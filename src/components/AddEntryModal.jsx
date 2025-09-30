// Modal zum hinzufügen

import { useState } from 'react';
import { addEntry, checkEntryExists } from '../utils/localStorage';

/**
 * FR006: Add Entry Modal Component
 * FR007: Form Fields (Title, Date, Image URL, Content)
 * FR009: One-Entry-Per-Day Check
 * FR010: Form Validation
 */
function AddEntryModal({ isOpen, onClose, onEntryAdded }) {
  // Form State für alle Felder
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    imageUrl: '',
    content: ''
  });
  
  const [error, setError] = useState(''); // Fehlermeldungen anzeigen

  // Schließt Modal nur wenn isOpen true ist
  if (!isOpen) return null;

  /**
   * Aktualisiert Form-Daten bei Eingabe
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Lösche Fehler wenn User tippt
    if (error) setError('');
  };

  /**
   * FR010: Form Validation - Prüft ob alle Felder ausgefüllt sind
   */
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Please enter a title');
      return false;
    }
    if (!formData.date) {
      setError('Please select a date');
      return false;
    }
    if (!formData.imageUrl.trim()) {
      setError('Please enter an image URL');
      return false;
    }
    if (!formData.content.trim()) {
      setError('Please enter some content');
      return false;
    }
    return true;
  };

  /**
   * Verarbeitet Form-Submit
   * FR009: One-Entry-Per-Day Check
   * FR010: Form Validation
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FR010: Validiere alle Felder
    if (!validateForm()) {
      return;
    }

    // FR009: Prüfe ob bereits ein Eintrag für dieses Datum existiert
    if (checkEntryExists(formData.date)) {
      setError('An entry already exists for this date. Please come back tomorrow! 📅');
      return;
    }

    // Speichere Eintrag in localStorage
    const newEntry = addEntry(formData);
    
    // Informiere Parent Component über neuen Eintrag
    onEntryAdded(newEntry);
    
    // Setze Form zurück
    setFormData({
      title: '',
      date: '',
      imageUrl: '',
      content: ''
    });
    setError('');
  };

  /**
   * Schließt Modal und setzt Form zurück
   */
  const handleClose = () => {
    setFormData({
      title: '',
      date: '',
      imageUrl: '',
      content: ''
    });
    setError('');
    onClose();
  };

  return (
    // Modal Overlay - FR006: Modal wird über State gesteuert
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-2xl font-bold">✨ Add New Entry</h2>
        </div>

        {/* Form - FR007: Form Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Fehlermeldung */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* FR007: Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="A wonderful day..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* FR007: Date Field */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]} // Verhindert Zukunftsdaten
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* FR007: Image URL Field */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {formData.imageUrl && (
              <div className="mt-2">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* FR007: Content Field */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write about your day..."
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;