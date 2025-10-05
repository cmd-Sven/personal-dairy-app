import { useState, useEffect } from "react";

const PLANET_DATA = [
  {
    name: "Sigma Draconis VI",
    class: "M",
    gravity: "1.02",
    temp: 18,
    population: 4200000,
    distance: "18.2",
    atmosphere: "Stickstoff-Sauerstoff",
    status: "Bewohnt",
  },
  {
    name: "Rigel VII",
    class: "M",
    gravity: "0.98",
    temp: 22,
    population: 8900000,
    distance: "12.7",
    atmosphere: "Klasse-M Standard",
    status: "Föderationskolonie",
  },
  {
    name: "Delta Vega IV",
    class: "K",
    gravity: "0.87",
    temp: -5,
    population: 0,
    distance: "8.4",
    atmosphere: "Dünn, Atemgerät erforderlich",
    status: "Unbewohnt",
  },
  {
    name: "Vulcan",
    class: "M",
    gravity: "1.4",
    temp: 45,
    population: 6100000000,
    distance: "16.5",
    atmosphere: "Sauerstoff-reich, hoher CO2",
    status: "Heimatwelt",
  },
  {
    name: "Andoria",
    class: "M",
    gravity: "0.95",
    temp: -12,
    population: 4500000000,
    distance: "20.1",
    atmosphere: "Sauerstoff-Stickstoff",
    status: "Heimatwelt",
  },
  {
    name: "Risa",
    class: "M",
    gravity: "1.01",
    temp: 28,
    population: 12000000,
    distance: "14.8",
    atmosphere: "Tropisch, optimiert",
    status: "Urlaubsplanet",
  },
  {
    name: "Cardassia Prime",
    class: "M",
    gravity: "1.15",
    temp: 35,
    population: 8700000000,
    distance: "34.6",
    atmosphere: "Warm, trocken",
    status: "Cardassianische Union",
  },
  {
    name: "Kronos",
    class: "M",
    gravity: "1.25",
    temp: 15,
    population: 4200000000,
    distance: "22.9",
    atmosphere: "Standard, erhöhte Schwerkraft",
    status: "Klingonisches Reich",
  },
  {
    name: "Betazed",
    class: "M",
    gravity: "1.03",
    temp: 24,
    population: 5800000000,
    distance: "19.3",
    atmosphere: "Sauerstoff-reich",
    status: "Föderationsmitglied",
  },
  {
    name: "Ferenginar",
    class: "M",
    gravity: "0.91",
    temp: 32,
    population: 6200000000,
    distance: "28.7",
    atmosphere: "Feucht, hohe Niederschläge",
    status: "Ferengi-Allianz",
  },
];

export default function PlanetScanner() {
  const [planet, setPlanet] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    startScan();
  }, []);

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);

    // Simuliere Scan-Fortschritt
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    // Wähle zufälligen Planeten nach 1 Sekunde
    setTimeout(() => {
      const randomPlanet =
        PLANET_DATA[Math.floor(Math.random() * PLANET_DATA.length)];
      setPlanet(randomPlanet);
      setScanning(false);
    }, 1000);
  };

  const getClassColor = (planetClass) => {
    switch (planetClass) {
      case "M":
        return "text-[#66cc99]";
      case "K":
        return "text-[#9999ff]";
      case "L":
        return "text-[#ff9c00]";
      case "H":
        return "text-[#cc6666]";
      default:
        return "text-[#ffcc99]";
    }
  };

  return (
    <div className=" p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md border-l-8 border-[#66cccc] shadow-2xl rounded-md relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#66cccc] rounded-full animate-pulse"></div>
          <span className="text-lg font-black text-[#66cccc] uppercase tracking-wider">
            Planetarer Langstreckenscan
          </span>
        </div>
        <button
          onClick={startScan}
          disabled={scanning}
          className="px-4 py-1 bg-[#66cccc]/20 border border-[#66cccc] rounded-none text-xs text-[#66cccc] font-bold uppercase hover:bg-[#66cccc]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scanning ? "SCANNEN..." : "NEU SCANNEN"}
        </button>
      </div>

      {scanning ? (
        // Scan-Animation
        <div className="py-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9999ff] text-sm font-bold uppercase">
              Suche Planetare Signaturen...
            </span>
            <span className="text-[#66cccc] text-sm font-bold">
              {scanProgress}%
            </span>
          </div>

          <div className="w-full h-4 bg-[#0a0e27]/80 border-2 border-[#66cccc]/50 rounded-none overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#66cccc] to-[#9999ff] transition-all duration-200"
              style={{ width: `${scanProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-[#66cccc] rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-[#66cccc] rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#66cccc] rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      ) : planet ? (
        // Planetendaten
        <div>
          {/* Planet Name & Status */}
          <div className="mb-4 pb-4 border-b-2 border-[#66cccc]/30">
            <h3 className="text-2xl font-black text-[#ffcc99] mb-2 uppercase tracking-wide">
              {planet.name}
            </h3>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 bg-[#0a0e27]/80 border-2 border-[#66cccc]/50 rounded-none text-sm font-bold uppercase ${getClassColor(
                  planet.class
                )}`}
              >
                Klasse-{planet.class}
              </span>
              <span className="px-3 py-1 bg-[#0a0e27]/80 border-2 border-[#9999ff]/50 rounded-none text-sm text-[#9999ff] font-bold uppercase">
                {planet.status}
              </span>
            </div>
          </div>

          {/* Scan-Daten Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#0a0e27]/50 p-3 border-l-4 border-[#66cccc]">
              <p className="text-[#9999ff] text-xs uppercase mb-1">
                Entfernung
              </p>
              <p className="text-[#ffcc99] font-bold">
                {planet.distance} Lichtjahre
              </p>
            </div>
            <div className="bg-[#0a0e27]/50 p-3 border-l-4 border-[#66cccc]">
              <p className="text-[#9999ff] text-xs uppercase mb-1">
                Gravitation
              </p>
              <p className="text-[#ffcc99] font-bold">{planet.gravity}g</p>
            </div>
            <div className="bg-[#0a0e27]/50 p-3 border-l-4 border-[#66cccc]">
              <p className="text-[#9999ff] text-xs uppercase mb-1">
                Temperatur
              </p>
              <p className="text-[#ffcc99] font-bold">{planet.temp}°C</p>
            </div>
            <div className="bg-[#0a0e27]/50 p-3 border-l-4 border-[#66cccc]">
              <p className="text-[#9999ff] text-xs uppercase mb-1">
                Population
              </p>
              <p className="text-[#ffcc99] font-bold text-xs">
                {planet.population.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Atmosphäre */}
          <div className="bg-[#0a0e27]/50 p-3 border-l-4 border-[#66cccc]">
            <p className="text-[#9999ff] text-xs uppercase mb-1">Atmosphäre</p>
            <p className="text-[#ffcc99] text-sm">{planet.atmosphere}</p>
          </div>
        </div>
      ) : null}

      {/* Corner Indicators */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-[#66cccc] rounded-full opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#66cccc] rounded-full opacity-60"></div>

      {/* Scan-Line Effect */}
      {!scanning && planet && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#66cccc]/30 to-transparent animate-scan-slow"></div>
        </div>
      )}
    </div>
  );
}
