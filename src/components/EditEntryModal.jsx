import { useState, useEffect } from 'react';
import { updateEntry, checkEntryExists } from '../utils/localStorage';

/**
 * Modal zum Bearbeiten eines bestehenden Eintrags
 */
function EditEntryModal({ entry, isOpen, onClose, onEntryUpdated }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    imageUrl: '',
    content: ''
  });
  
  const [error, setError] = useState('');

  // Fülle Form mit bestehenden Daten wenn Modal geöffnet wird
  useEffect(() => {
    if (entry && isOpen) {
      setFormData({
        title: entry.title,
        date: entry.date,
        imageUrl: entry.imageUrl,
        content: entry.content
      });
    }
  }, [entry, isOpen]);

  if (!isOpen || !entry) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Prüfe ob Datum geändert wurde und ob es bereits ein Eintrag für das neue Datum gibt
    if (formData.date !== entry.date && checkEntryExists(formData.date, entry.id)) {
      setError('An entry already exists for this date. Please choose a different date! 📅');
      return;
    }

    const updatedEntry = updateEntry(entry.id, formData);
    
    if (updatedEntry) {
      onEntryUpdated(updatedEntry);
      setError('');
    } else {
      setError('Failed to update entry. Please try again.');
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-1">✏️ Edit Entry</h2>
              <p className="text-purple-100">Update your moment</p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-start gap-3 animate-shake">
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div className="space-y-2">
            <label htmlFor="edit-title" className="block text-sm font-semibold text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="A wonderful day..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
            />
          </div>

          {/* Date Field */}
          <div className="space-y-2">
            <label htmlFor="edit-date" className="block text-sm font-semibold text-gray-700">
              Date *
            </label>
            <input
              type="date"
              id="edit-date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
            />
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <label htmlFor="edit-imageUrl" className="block text-sm font-semibold text-gray-700">
              Image URL *
            </label>
            <input
              type="url"
              id="edit-imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
            />
            {formData.imageUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border-2 border-gray-200">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <label htmlFor="edit-content" className="block text-sm font-semibold text-gray-700">
              Content *
            </label>
            <textarea
              id="edit-content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write about your day..."
              rows="6"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEntryModal;