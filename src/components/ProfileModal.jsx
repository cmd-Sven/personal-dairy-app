import React from "react";
import ProfileCard from "./ProfileCard";

function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1a1a3e] p-6 rounded-lg shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-[#ffcc99] font-bold text-xl hover:text-[#ff9c00] transition-colors z-10"
          onClick={onClose}
        >
          ×
        </button>

        <ProfileCard onClose={onClose} />
      </div>
    </div>
  );
}

export default ProfileModal;