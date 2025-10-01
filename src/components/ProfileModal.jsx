import React from "react";
import ProfileCard from "./ProfileCard";

function ProfileModal({ isOpen, onClose, profile, setProfile }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#1a1a3e] p-6 rounded-lg shadow-2xl max-w-md w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-[#ffcc99] font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <ProfileCard profile={profile} setProfile={setProfile} />
      </div>
    </div>
  );
}

export default ProfileModal;
