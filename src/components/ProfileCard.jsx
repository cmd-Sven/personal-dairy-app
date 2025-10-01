import React, { useState, useEffect } from "react";

export default function ProfileCard({ profile, setProfile }) {
  const [localProfile, setLocalProfile] = useState({
    name: "",
    birthDate: "",
    avatar: "",
  });

  // Initialisiere lokal mit bestehendem Profil
  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(localProfile);
  };

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Avatar */}
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#ffcc99] shadow-lg">
        {localProfile.avatar ? (
          <img
            src={localProfile.avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a3e] flex items-center justify-center text-2xl text-[#ffcc99]">
            🖖
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="text-sm text-[#9999ff]"
      />

      {/* Name */}
      <input
        type="text"
        name="name"
        value={localProfile.name}
        onChange={handleChange}
        placeholder="Profilname"
        className="w-64 px-3 py-2 rounded border border-[#ffcc99] bg-[#0a0e27] text-[#ffcc99] font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#ff9c00]"
      />

      {/* Geburtsdatum */}
      <input
        type="date"
        name="birthDate"
        value={localProfile.birthDate}
        onChange={handleChange}
        className="w-64 px-3 py-2 rounded border border-[#ffcc99] bg-[#0a0e27] text-[#ffcc99] text-center focus:outline-none focus:ring-2 focus:ring-[#ff9c00]"
      />

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-2 px-6 py-2 bg-gradient-to-r from-[#ff9c00] to-[#cc6666] text-[#0a0e27] font-bold rounded shadow-lg hover:scale-105 transition-transform"
      >
        Speichern
      </button>
    </div>
  );
}
