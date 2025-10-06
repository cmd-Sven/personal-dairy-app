import { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";

export default function ProfileCard() {
  const { profile, saveProfile, RACES, ATTRIBUTES } = useProfile();
  
  const [step, setStep] = useState(1);
  const [localProfile, setLocalProfile] = useState({
    name: "",
    birthDate: "",
    avatar: "",
    race: "",
    attributes: {
      leadership: 0,
      tactics: 0,
      logic: 0,
      empathy: 0,
      science: 0,
      engineering: 0,
      courage: 0,
      diplomacy: 0,
    },
  });

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
      if (profile.race) setStep(3);
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

  const handleRaceSelect = (raceId) => {
    setLocalProfile((prev) => ({ ...prev, race: raceId }));
    setStep(3);
  };

  const handleAttributeChange = (attrId, value) => {
    const selectedRace = RACES[localProfile.race];
    const maxBase = 6;
    const bonus = selectedRace.bonuses[attrId] || 0;
    const maxWithBonus = maxBase + (bonus > 0 ? bonus : 0);
    
    const newValue = Math.max(0, Math.min(maxWithBonus, parseInt(value) || 0));
    
    setLocalProfile((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attrId]: newValue,
      },
    }));
  };

  const getTotalPoints = () => {
    return Object.values(localProfile.attributes).reduce((sum, val) => sum + val, 0);
  };

  const getMaxPoints = () => {
    return localProfile.race ? RACES[localProfile.race].maxPoints : 0;
  };

  const getFinalAttributeValue = (attrId) => {
    const baseValue = localProfile.attributes[attrId] || 0;
    if (!localProfile.race) return baseValue;
    
    const race = RACES[localProfile.race];
    const bonus = race.bonuses[attrId] || 0;
    return baseValue + bonus;
  };

  const handleSave = () => {
    const success = saveProfile(localProfile);
    if (success) {
      alert("Profil erfolgreich gespeichert!");
       setTimeout(() => {
      window.location.reload();
    }, 500);
    } else {
      alert("Fehler beim Speichern des Profils!");
    }
  };

  const canSave = () => {
    return (
      localProfile.name &&
      localProfile.race &&
      getTotalPoints() === getMaxPoints()
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Indicator */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-none ${
              step >= s ? "bg-[#ff9c00]" : "bg-[#9999ff]/20"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Basis-Informationen */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-black text-[#ffcc99] uppercase tracking-wider">
            Basis-Informationen
          </h3>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
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
            <label className="cursor-pointer px-4 py-2 bg-[#9999ff]/20 border border-[#9999ff] rounded-none text-sm text-[#9999ff] font-bold uppercase hover:bg-[#9999ff]/30 transition">
              Bild hochladen
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#9999ff] uppercase">
              Captain Name *
            </label>
            <input
              type="text"
              name="name"
              value={localProfile.name}
              onChange={handleChange}
              placeholder="Captain Name"
              className="w-full px-4 py-3 rounded border-2 border-[#ffcc99] bg-[#0a0e27] text-[#ffcc99] font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#ff9c00]"
            />
          </div>

          {/* Geburtsdatum */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#9999ff] uppercase">
              Geburtsdatum
            </label>
            <input
              type="date"
              name="birthDate"
              value={localProfile.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded border-2 border-[#ffcc99] bg-[#0a0e27] text-[#ffcc99] text-center focus:outline-none focus:ring-2 focus:ring-[#ff9c00]"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!localProfile.name}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#ff9c00] to-[#cc6666] text-[#0a0e27] font-bold rounded shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            Weiter zur Rassenwahl
          </button>
        </div>
      )}

      {/* Step 2: Rassenwahl */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-black text-[#ffcc99] uppercase tracking-wider">
            Rasse wählen
          </h3>

          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
            {Object.values(RACES).map((race) => (
              <button
                key={race.id}
                onClick={() => handleRaceSelect(race.id)}
                className={`p-4 text-left border-2 rounded-none transition-all hover:scale-102 ${
                  localProfile.race === race.id
                    ? "border-[#ff9c00] bg-[#ff9c00]/20"
                    : "border-[#9999ff]/50 bg-[#0a0e27]/50 hover:border-[#9999ff]"
                }`}
              >
                <h4 className="text-lg font-bold text-[#ffcc99] mb-1">
                  {race.name}
                </h4>
                <p className="text-sm text-[#9999ff] mb-2">{race.description}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-[#66cc99]/20 border border-[#66cc99] rounded text-[#66cc99]">
                    {race.maxPoints} Punkte
                  </span>
                  {Object.keys(race.bonuses).length > 0 && (
                    <span className="px-2 py-1 bg-[#9999ff]/20 border border-[#9999ff] rounded text-[#9999ff]">
                      Bonus: {Object.entries(race.bonuses).map(([k, v]) => `${ATTRIBUTES[k].name} +${v}`).join(", ")}
                    </span>
                  )}
                  {Object.keys(race.penalties).length > 0 && (
                    <span className="px-2 py-1 bg-[#cc6666]/20 border border-[#cc6666] rounded text-[#cc6666]">
                      Malus: {Object.entries(race.penalties).map(([k, v]) => `${ATTRIBUTES[k].name} ${v}`).join(", ")}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full px-6 py-2 border-2 border-[#9999ff] text-[#9999ff] font-bold rounded hover:bg-[#9999ff]/10 transition uppercase"
          >
            Zurück
          </button>
        </div>
      )}

      {/* Step 3: Attribute */}
      {step === 3 && localProfile.race && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-[#ffcc99] uppercase">
              Attribute verteilen
            </h3>
            <div className="text-right">
              <p className="text-sm text-[#9999ff]">Verteilt</p>
              <p className={`text-2xl font-black ${getTotalPoints() === getMaxPoints() ? 'text-[#66cc99]' : 'text-[#ff9c00]'}`}>
                {getTotalPoints()} / {getMaxPoints()}
              </p>
            </div>
          </div>

          <div className="bg-[#0a0e27]/50 p-3 border-l-4 border-[#9999ff] rounded-none">
            <p className="text-sm text-[#9999ff]">
              <strong>{RACES[localProfile.race].name}</strong>: {RACES[localProfile.race].description}
            </p>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {Object.values(ATTRIBUTES).map((attr) => {
              const race = RACES[localProfile.race];
              const bonus = race.bonuses[attr.id] || 0;
              const penalty = race.penalties[attr.id] || 0;
              const baseValue = localProfile.attributes[attr.id];
              const finalValue = getFinalAttributeValue(attr.id);
              const maxBase = 6;
              const maxWithBonus = maxBase + (bonus > 0 ? bonus : 0);

              return (
                <div key={attr.id} className="p-3 bg-[#0a0e27]/30 border border-[#9999ff]/30 rounded-none">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#ffcc99]">{attr.name}</h4>
                      <p className="text-xs text-[#9999ff]/70">{attr.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#ff9c00]">
                        {finalValue}
                        {bonus !== 0 && (
                          <span className="text-sm text-[#66cc99] ml-1">
                            (+{bonus})
                          </span>
                        )}
                        {penalty !== 0 && (
                          <span className="text-sm text-[#cc6666] ml-1">
                            ({penalty})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxWithBonus}
                    value={baseValue}
                    onChange={(e) => handleAttributeChange(attr.id, e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#9999ff]/60 mt-1">
                    <span>0</span>
                    <span>{maxWithBonus}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 px-6 py-3 border-2 border-[#9999ff] text-[#9999ff] font-bold rounded hover:bg-[#9999ff]/10 transition uppercase"
            >
              Zurück
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff9c00] to-[#cc6666] text-[#0a0e27] font-bold rounded shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              Profil Speichern
            </button>
          </div>
        </div>
      )}
    </div>
  );
}