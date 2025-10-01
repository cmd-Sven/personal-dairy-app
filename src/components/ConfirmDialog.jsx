/**
 * Confirmation Dialog für wichtige Aktionen (z.B. Löschen)
 */
function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "danger",
}) {
  if (!isOpen) return null;

  const colors = {
    danger: "from-red-600 to-pink-600",
    warning: "from-yellow-600 to-orange-600",
    info: "from-blue-600 to-indigo-600",
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-t-2xl`}
        >
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-lg">{message}</p>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 bg-gradient-to-r ${colors[type]} text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
