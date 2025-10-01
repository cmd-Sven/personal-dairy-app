import { useState, useEffect } from "react";

export default function ProfileCard() {
  const [profile, setProfile] = useState({
    name: "",
    birthDate: "",
    avatarBase64: "", // Base64 statt URL
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, avatarBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profil gespeichert!");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 border-l-8 border-[#ff9c00] shadow-2xl rounded-md w-full max-w-sm mx-auto">
      {/* Avatar */}
      <img
        src={
          profile.avatarBase64 ||
          "https://via.placeholder.com/120x120.png?text=Avatar"
        }
        alt="Avatar"
        className="w-28 h-28 rounded-full border-4 border-[#ffcc99] shadow-lg mb-4 object-cover"
      />

      {/* Avatar Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="mb-4 text-sm text-[#9999ff]"
      />

      {/* Profilname */}
      <input
        type="text"
        name="name"
        placeholder="Profilname"
        value={profile.name}
        onChange={handleChange}
        className="w-64 mb-2 px-3 py-2 rounded-md border border-[#9999ff] text-[#0a0e27] bg-[#ffcc99]/20 focus:outline-none focus:ring-2 focus:ring-[#ffcc99]"
      />

      {/* Geburtsdatum */}
      <input
        type="date"
        name="birthDate"
        value={profile.birthDate}
        onChange={handleChange}
        className="w-64 mb-4 px-3 py-2 rounded-md border border-[#9999ff] text-[#0a0e27] bg-[#ffcc99]/20 focus:outline-none focus:ring-2 focus:ring-[#ffcc99]"
      />

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-gradient-to-r from-[#ff9c00] to-[#cc6666] text-[#0a0e27] font-bold rounded-md shadow-lg hover:scale-105 transition-transform"
      >
        Profil speichern
      </button>
    </div>
  );
}
