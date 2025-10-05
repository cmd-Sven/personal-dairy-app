import React from "react";

function Header({
  calculateStardate,
  profile,
  onProfileClick,
  onAddEntry,
  onSelfDestruct,
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-r from-[#0a0e27]/95 via-[#1a1a3e]/95 to-[#0a0e27]/95 border-b-4 border-[#ff9c00] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 bg-gradient-to-br from-[#ff9c00] to-[#cc6666] rounded-full flex items-center justify-center shadow-lg border-4 border-[#ffcc99] animate-pulse-slow">
              <img
                className="w-[50px]"
                src="https://www.freepnglogos.com/uploads/star-trek-png-logo/star-trek-into-darkness-starfleet-png-logo-10.png"
              ></img>

              <div className="absolute inset-0 rounded-full border-2 border-[#9999ff] animate-ping opacity-20"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-[#ff9c00] via-[#ffcc99] to-[#ff9c00] bg-clip-text text-transparent drop-shadow-lg">
                CAPTAIN'S LOG
              </h1>
              <p className="text-xs text-[#9999ff] font-medium tracking-widest uppercase">
                Sternenzeit {calculateStardate()} • Persöhnliches Logbuch
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Profilname + Avatar */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onProfileClick}
              title="Profil bearbeiten"
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#ffcc99] object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-[#ffcc99] bg-[#1a1a3e] flex items-center justify-center">
                  <span className="text-lg">🖖</span>
                </div>
              )}
              <span className="text-[#ffcc99] font-bold">
                {profile.name || "Captain"}
              </span>
            </div>

            {/* Add Entry Button */}
            <button
              onClick={onAddEntry}
              className="group relative px-6 py-2 bg-gradient-to-r from-[#ff9c00] to-[#cc6666] text-[#0a0e27] rounded-none font-bold text-lg tracking-wider shadow-2xl hover:shadow-[#ff9c00]/50 transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-[#ffcc99] lcars-corner overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                NEUER LOG
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent data-stream"></div>
            </button>

            {/* Selbstzerstörung Button */}
            <button
              onClick={onSelfDestruct}
              className="group relative px-6 py-2 bg-gradient-to-r from-[#ff9c00] to-[#cc6666] text-[#0a0e27] rounded-none font-bold text-lg tracking-wider shadow-2xl hover:shadow-[#ff9c00]/50 transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-[#ffcc99] lcars-corner overflow-hidden"
              title="Alle Daten löschen"
            >
              ⚠ SELBSTZERSTÖRUNG
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
