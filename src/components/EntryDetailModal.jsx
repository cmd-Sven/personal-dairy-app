/**
 * Entry Detail Modal - Star Trek LCARS Style
 * Log Entry Full Display Interface
 */
function EntryDetailModal({ entry, isOpen, onClose, onEdit, onDelete }) {
  if (!isOpen || !entry) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toUpperCase();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div className="bg-gradient-to-br from-[#1a1a3e] to-[#0a0e27] rounded-none shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border-4 border-[#ff9c00] animate-slideUp">
        {/* Image Header */}
        <div className="relative h-80 md:h-96 bg-gradient-to-br from-[#2a5caa] to-[#1a1a3e] overflow-hidden border-b-4 border-[#ff9c00]">
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/800x600/2a5caa/ffcc99?text=VISUAL+DATA+UNAVAILABLE";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/50 to-transparent" />

          {/* Hologram Effect */}
          <div className="absolute inset-0 pointer-events-none hologram opacity-20 bg-gradient-to-b from-[#9999ff] to-transparent mix-blend-overlay"></div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={(e) => onEdit(entry, e)}
              className="p-4 bg-[#9999ff]/90 hover:bg-[#9999ff] rounded-none shadow-2xl transition-all hover:scale-110 active:scale-95 border-2 border-[#ccccff]"
              title="Modify log entry"
            >
              <svg
                className="w-7 h-7 text-[#0a0e27]"
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
              onClick={(e) => onDelete(entry, e)}
              className="p-4 bg-[#cc6666]/90 hover:bg-[#cc6666] rounded-none shadow-2xl transition-all hover:scale-110 active:scale-95 border-2 border-[#ffcccc]"
              title="Delete log entry"
            >
              <svg
                className="w-7 h-7 text-white"
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
            <button
              onClick={onClose}
              className="p-4 bg-[#ff9c00]/90 hover:bg-[#ff9c00] rounded-none shadow-2xl transition-all hover:scale-110 active:scale-95 border-2 border-[#ffcc99]"
              title="Close"
            >
              <svg
                className="w-7 h-7 text-[#0a0e27]"
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

          {/* Date Badge */}
          <div className="absolute bottom-6 left-6">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#ff9c00] backdrop-blur-sm rounded-none shadow-2xl border-4 border-[#ffcc99]">
              <svg
                className="w-6 h-6 text-[#0a0e27]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-black text-[#0a0e27] text-lg uppercase tracking-wider">
                {formatDate(entry.date)}
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-6 left-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0e27]/80 backdrop-blur-sm rounded-none border-2 border-[#9999ff]">
              <div className="w-3 h-3 bg-[#9999ff] rounded-full animate-pulse"></div>
              <span className="text-[#9999ff] text-xs font-black uppercase tracking-widest">
                ACTIVE LOG
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 md:p-12">
          {/* Title */}
          <div className="mb-8 pb-6 border-b-4 border-[#ff9c00]/30">
            <h2 className="text-5xl font-black text-[#ffcc99] leading-tight uppercase tracking-wide">
              {entry.title}
            </h2>
          </div>

          {/* Content Text */}
          <div className="mb-10">
            <div className="p-6 bg-[#0a0e27]/30 border-l-8 border-[#9999ff] rounded-none backdrop-blur-sm">
              <p className="text-[#ffcc99] text-xl leading-relaxed whitespace-pre-wrap font-medium">
                {entry.content}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-4 p-6 bg-gradient-to-r from-[#1a1a3e]/50 to-transparent border-l-4 border-[#ff9c00] rounded-none">
            {entry.createdAt && (
              <div className="flex items-center gap-3 text-[#9999ff]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-bold uppercase tracking-wide">
                  LOG CREATED:{" "}
                  {new Date(entry.createdAt)
                    .toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .toUpperCase()}
                </span>
              </div>
            )}
            {entry.updatedAt && (
              <div className="flex items-center gap-3 text-[#9999ff]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="font-bold uppercase tracking-wide">
                  LAST MODIFIED:{" "}
                  {new Date(entry.updatedAt)
                    .toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 text-[#ff9c00]">
              <div className="w-2 h-2 bg-[#ff9c00] rounded-full animate-pulse"></div>
              <span className="font-black uppercase tracking-widest text-sm">
                ENTRY ID: {entry.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryDetailModal;
