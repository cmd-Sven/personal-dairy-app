/**
 * Confirmation Dialog - Star Trek Red Alert Style
 * Critical Action Confirmation Interface
 */
function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "CONFIRM",
  cancelText = "CANCEL",
  onConfirm,
  onCancel,
  type = "danger",
}) {
  if (!isOpen) return null;

  const colors = {
    danger: {
      gradient: "from-[#cc6666] to-[#ff6666]",
      border: "border-[#ff9999]",
      button: "from-[#cc6666] to-[#ff6666]",
      buttonBorder: "border-[#ffcccc]",
    },
    warning: {
      gradient: "from-[#ff9c00] to-[#ffcc99]",
      border: "border-[#ffcc99]",
      button: "from-[#ff9c00] to-[#ffcc99]",
      buttonBorder: "border-[#ffcc99]",
    },
    info: {
      gradient: "from-[#9999ff] to-[#cc99cc]",
      border: "border-[#ccccff]",
      button: "from-[#9999ff] to-[#cc99cc]",
      buttonBorder: "border-[#ccccff]",
    },
  };

  const currentColors = colors[type];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fadeIn">
      <div
        className="bg-gradient-to-br from-[#1a1a3e] to-[#0a0e27] rounded-none shadow-2xl max-w-lg w-full border-4 ${currentColors.border} animate-slideUp relative overflow-hidden"
        style={{
          borderColor:
            type === "danger"
              ? "#ff9999"
              : type === "warning"
              ? "#ffcc99"
              : "#ccccff",
        }}
      >
        {/* Alert Header */}
        <div
          className={`bg-gradient-to-r ${currentColors.gradient} text-${
            type === "danger" ? "white" : "[#0a0e27]"
          } px-8 py-6 border-b-4 relative overflow-hidden`}
          style={{
            borderColor:
              type === "danger"
                ? "#ff9999"
                : type === "warning"
                ? "#ffcc99"
                : "#ccccff",
          }}
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              {type === "danger" && (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 10 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {type === "warning" && (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {type === "info" && (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-3xl font-black uppercase tracking-wider">
              {title}
            </h3>
          </div>

          {/* Alert animation lines */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent data-stream"></div>
          {type === "danger" && (
            <>
              <div className="absolute top-0 left-0 w-full h-1 bg-white/30 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 animate-pulse"></div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <div
            className="mb-8 p-6 bg-[#0a0e27]/50 border-l-8 rounded-none backdrop-blur-sm"
            style={{
              borderColor:
                type === "danger"
                  ? "#cc6666"
                  : type === "warning"
                  ? "#ff9c00"
                  : "#9999ff",
            }}
          >
            <p className="text-[#ffcc99] text-xl leading-relaxed font-medium uppercase tracking-wide">
              {message}
            </p>
          </div>

          {/* Warning indicator */}
          {type === "danger" && (
            <div className="mb-6 flex items-center gap-3 text-[#cc6666]">
              <div className="w-3 h-3 bg-[#cc6666] rounded-full animate-pulse"></div>
              <span className="text-sm font-black uppercase tracking-widest">
                THIS ACTION CANNOT BE UNDONE
              </span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="px-8 pb-8 flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-8 py-4 border-4 border-[#9999ff]/50 text-[#9999ff] rounded-none font-black text-lg uppercase tracking-wider hover:bg-[#9999ff]/10 transition-all hover:border-[#9999ff] hover:scale-105"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-8 py-4 bg-gradient-to-r ${currentColors.button} rounded-none font-black text-lg uppercase tracking-wider shadow-2xl transition-all hover:scale-105 active:scale-95 border-4 relative overflow-hidden`}
            style={{
              borderColor:
                type === "danger"
                  ? "#ffcccc"
                  : type === "warning"
                  ? "#ffcc99"
                  : "#ccccff",
              color: type === "danger" ? "white" : "#0a0e27",
            }}
          >
            <span className="relative z-10">{confirmText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent data-stream"></div>
          </button>
        </div>

        {/* Corner indicators */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-[#ff9c00] rounded-full opacity-60"></div>
        <div className="absolute top-2 right-2 w-4 h-4 bg-[#9999ff] rounded-full opacity-60"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#9999ff] rounded-full opacity-60"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#ff9c00] rounded-full opacity-60"></div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
