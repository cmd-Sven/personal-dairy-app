import { useState, useEffect } from "react";
import { updateEntry, checkEntryExists } from "../utils/localStorage";
import MoodSelector from "./MoodSelector"; 

function EditEntryModal({ entry, isOpen, onClose, onEntryUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    imageUrl: "",
    content: "",
    mood: "", 
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (entry && isOpen) {
      setFormData({
        title: entry.title,
        date: entry.date,
        imageUrl: entry.imageUrl,
        content: entry.content,
        mood: entry.mood || "", // NEU
      });
    }
  }, [entry, isOpen]);

  if (!isOpen || !entry) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  //  Mood Change Handler
  const handleMoodChange = (moodId) => {
    setFormData((prev) => ({
      ...prev,
      mood: moodId,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("ERROR: Log entry title required");
      return false;
    }
    if (!formData.date) {
      setError("ERROR: Stardate selection required");
      return false;
    }
    if (!formData.imageUrl.trim()) {
      setError("ERROR: Visual data link required");
      return false;
    }
    if (!formData.content.trim()) {
      setError("ERROR: Log entry content required");
      return false;
    }
    if (!formData.mood) {
      setError("ERROR: Captain's mood status required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (
      formData.date !== entry.date &&
      checkEntryExists(formData.date, entry.id)
    ) {
      setError(
        "ALERT: Log entry already exists for this stardate. Database conflict detected."
      );
      return;
    }

    const updatedEntry = updateEntry(entry.id, formData);

    if (updatedEntry) {
      onEntryUpdated(updatedEntry);
      setError("");
    } else {
      setError("SYSTEM ERROR: Failed to update log entry. Please retry.");
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#1a1a3e] to-[#0a0e27] rounded-none shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-4 border-[#9999ff] animate-slideUp">
        {/* Header - bleibt gleich */}
        <div className="bg-gradient-to-r from-[#9999ff] to-[#cc99cc] text-[#0a0e27] px-8 py-6 border-b-4 border-[#ccccff] relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-4xl font-black tracking-wider mb-1 uppercase">
                MODIFY LOG ENTRY
              </h2>
              <p className="text-sm font-bold tracking-widest uppercase opacity-80">
                DATABASE UPDATE • EDITING MODE ACTIVE
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-12 h-12 rounded-full bg-[#0a0e27]/80 hover:bg-[#0a0e27] transition-colors flex items-center justify-center border-2 border-[#ccccff] hover:scale-110"
            >
              <svg
                className="w-7 h-7 text-[#9999ff]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent data-stream"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Error Alert - bleibt gleich */}
          {error && (
            <div className="bg-[#cc6666]/20 border-l-8 border-[#cc6666] text-[#ffcc99] p-5 rounded-none flex items-start gap-4 animate-shake backdrop-blur-sm border-2 border-[#cc6666]/50">
              <svg
                className="w-8 h-8 flex-shrink-0 mt-0.5 text-[#cc6666]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="font-bold text-lg uppercase tracking-wide">
                {error}
              </span>
            </div>
          )}

          {/* Title Field - bleibt gleich */}
          <div className="space-y-3">
            <label
              htmlFor="edit-title"
              className="block text-sm font-black text-[#9999ff] uppercase tracking-widest"
            >
              LOG ENTRY TITLE *
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter mission log title..."
              className="w-full px-5 py-4 bg-[#0a0e27]/50 border-2 border-[#9999ff]/50 rounded-none focus:border-[#9999ff] focus:ring-4 focus:ring-[#9999ff]/30 transition-all outline-none text-[#ffcc99] font-bold text-lg placeholder:text-[#9999ff]/40 backdrop-blur-sm"
            />
          </div>

          {/* Date Field - bleibt gleich */}
          <div className="space-y-3">
            <label
              htmlFor="edit-date"
              className="block text-sm font-black text-[#9999ff] uppercase tracking-widest"
            >
              STARDATE *
            </label>
            <input
              type="date"
              id="edit-date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-5 py-4 bg-[#0a0e27]/50 border-2 border-[#9999ff]/50 rounded-none focus:border-[#9999ff] focus:ring-4 focus:ring-[#9999ff]/30 transition-all outline-none text-[#ffcc99] font-bold text-lg backdrop-blur-sm"
            />
          </div>

          {/* NEU: Mood Selector */}
          <MoodSelector
            selectedMood={formData.mood}
            onMoodChange={handleMoodChange}
          />

          {/* Image URL Field - bleibt gleich */}
          <div className="space-y-3">
            <label
              htmlFor="edit-imageUrl"
              className="block text-sm font-black text-[#9999ff] uppercase tracking-widest"
            >
              VISUAL DATA LINK *
            </label>
            <input
              type="url"
              id="edit-imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://image-database.starfleet/visual.jpg"
              className="w-full px-5 py-4 bg-[#0a0e27]/50 border-2 border-[#9999ff]/50 rounded-none focus:border-[#9999ff] focus:ring-4 focus:ring-[#9999ff]/30 transition-all outline-none text-[#ffcc99] font-bold text-lg placeholder:text-[#9999ff]/40 backdrop-blur-sm"
            />
            {formData.imageUrl && (
              <div className="mt-4 rounded-none overflow-hidden border-4 border-[#9999ff]/50 relative">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-56 object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#9999ff] text-[#0a0e27] text-xs font-black uppercase tracking-wider border-2 border-[#ccccff]">
                  PREVIEW
                </div>
              </div>
            )}
          </div>

          {/* Content Field - bleibt gleich */}
          <div className="space-y-3">
            <label
              htmlFor="edit-content"
              className="block text-sm font-black text-[#9999ff] uppercase tracking-widest"
            >
              LOG ENTRY CONTENT *
            </label>
            <textarea
              id="edit-content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Captain's Log: Stardate... Begin recording..."
              rows="7"
              className="w-full px-5 py-4 bg-[#0a0e27]/50 border-2 border-[#9999ff]/50 rounded-none focus:border-[#9999ff] focus:ring-4 focus:ring-[#9999ff]/30 transition-all outline-none resize-none text-[#ffcc99] font-medium text-lg leading-relaxed placeholder:text-[#9999ff]/40 backdrop-blur-sm"
            />
          </div>

          {/* Buttons - bleibt gleich */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-8 py-4 border-4 border-[#9999ff]/50 text-[#9999ff] rounded-none font-black text-lg uppercase tracking-wider hover:bg-[#9999ff]/10 transition-all hover:border-[#9999ff] hover:scale-105"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-[#9999ff] to-[#cc99cc] text-[#0a0e27] rounded-none font-black text-lg uppercase tracking-wider shadow-2xl hover:shadow-[#9999ff]/80 transition-all hover:scale-105 active:scale-95 border-4 border-[#ccccff] relative overflow-hidden"
            >
              <span className="relative z-10">UPDATE LOG</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent data-stream"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEntryModal;
