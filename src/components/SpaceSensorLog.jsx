import { useState, useEffect } from "react";

const NASA_API_KEY = "50rAjQLzw4ECgc8F6Ol3IrW8nTbUO9FQxtegr1bJ";

export default function SpaceSensorLog() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuliere Ladefortschritt
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Lade NASA Bild nach 3 Sekunden
    const timer = setTimeout(() => {
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
        .then((res) => {
          if (!res.ok) throw new Error("Sensordaten nicht verfügbar");
          return res.json();
        })
        .then((data) => {
          setImageData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("NASA API Fehler:", err);
          setError(err);
          setLoading(false);
        });
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="relative p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md border-l-8 border-[#ff9c00] shadow-2xl rounded-md overflow-hidden min-h-[400px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-[#ff9c00] rounded-full animate-pulse"></div>
        <span className="text-xl font-black text-[#ff9c00] uppercase tracking-wider">
          Langstrecken-Sensoren
        </span>
      </div>

      {loading ? (
        // Ladebalken
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-full max-w-md mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#9999ff] text-sm font-bold uppercase tracking-wider">
                Sensorabtastung läuft...
              </span>
              <span className="text-[#ff9c00] text-sm font-bold">
                {progress}%
              </span>
            </div>

            {/* Ladebalken */}
            <div className="w-full h-6 bg-[#0a0e27]/80 border-2 border-[#9999ff]/50 rounded-none overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9999ff] to-[#ff9c00] transition-all duration-300 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Scan-Indikatoren */}
            <div className="flex gap-2 mt-4 justify-center">
              <div className="w-2 h-2 bg-[#9999ff] rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-[#9999ff] rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#9999ff] rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>

          <p className="text-[#9999ff]/60 text-sm uppercase tracking-wider animate-pulse">
            Analysiere Subraumanomalien...
          </p>
        </div>
      ) : error ? (
        // Fehleranzeige
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#cc6666]/20 rounded-full flex items-center justify-center border-2 border-[#cc6666]">
              <span className="text-3xl">⚠</span>
            </div>
            <p className="text-[#cc6666] font-bold uppercase">
              Sensoren ausgefallen
            </p>
            <p className="text-[#9999ff]/60 text-sm mt-2">
              Verbindung zur Sternflotte unterbrochen
            </p>
          </div>
        </div>
      ) : (
        // Bild anzeigen
        <>
          <div className="relative mb-4 rounded-md overflow-hidden border-2 border-[#ff9c00]/50">
            {imageData.media_type === "image" ? (
              <img
                src={imageData.url}
                alt={imageData.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-[#0a0e27] flex items-center justify-center">
                <p className="text-[#9999ff]">
                  Video-Inhalte werden nicht unterstützt
                </p>
              </div>
            )}

            {/* Scanner-Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#ff9c00]/50 to-transparent animate-scan"></div>
            </div>

            {/* Live-Indicator */}
            <div className="absolute top-3 right-3 px-3 py-1 bg-[#ff9c00] text-[#0a0e27] rounded-none text-xs font-black uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0a0e27] rounded-full animate-pulse"></div>
              LIVE SENSOR
            </div>
          </div>

          {/* Bildbeschreibung */}
          <div className="bg-[#0a0e27]/50 p-4 border-l-4 border-[#ff9c00]">
            <h3 className="text-[#ffcc99] font-bold text-sm uppercase tracking-wide mb-2">
              {imageData.title}
            </h3>
            <p className="text-[#9999ff] text-xs line-clamp-3">
              {imageData.explanation}
            </p>
          </div>

          {/* Datum */}
          <p className="text-[#6666cc] text-xs mt-3 text-right italic">
            Erfasst: {new Date(imageData.date).toLocaleDateString("de-DE")}
          </p>
        </>
      )}

      {/* Corner Indicators */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-[#ff9c00] rounded-full opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#ff9c00] rounded-full opacity-60"></div>
    </div>
  );
}
