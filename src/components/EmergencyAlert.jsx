import { useState, useEffect } from "react";

const EMERGENCY_EVENTS = [
  {
    id: "warp-core",
    title: "⚠ KRITISCH: WARP-KERN ÜBERLASTET",
    message: "Warp-Kern-Überlastung erkannt! Temperatur bei 150%! Wählen Sie sofort eine Maßnahme!",
    countdown: 15,
    options: [
      {
        id: "eject",
        label: "WARP-KERN ABSTOßEN",
        icon: "🚀",
        success: true,
        result: "Warp-Kern erfolgreich abgestoßen. Hauptenergie auf Impulstriebwerke umgeleitet. Schiff sicher.",
      },
      {
        id: "coolant",
        label: "NOTFALL-KÜHLMITTEL",
        icon: "❄️",
        success: true,
        result: "Kühlsystem stabilisiert. Warp-Kern bei 85% Leistung. Situation unter Kontrolle.",
      },
      {
        id: "ignore",
        label: "WARNUNG IGNORIEREN",
        icon: "⏸️",
        success: false,
        consequence: "warp-explosion",
        result: "KATASTROPHALE EXPLOSION! Alle Systeme ausgefallen. Alle Logbuch-Einträge verloren!",
      },
    ],
    color: "from-[#cc6666] to-[#ff6666]",
    border: "border-[#ff9999]",
  },
  {
    id: "borg-attack",
    title: "⚠ WARNUNG: BORG-KUBUS ERKANNT",
    message: "Borg-Schiff auf Abfangkurs! Sie beginnen mit der Assimilation!",
    countdown: 12,
    options: [
      {
        id: "shields",
        label: "SCHILDE MAXIMIEREN",
        icon: "🛡️",
        success: true,
        result: "Schilde halten! Borg-Schneidstrahlen abgewehrt. Fluchtvektor berechnet.",
      },
      {
        id: "modulate",
        label: "SCHILD-MODULATION",
        icon: "⚡",
        success: true,
        result: "Schild-Frequenz rotiert. Borg können nicht adaptieren. Erfolgreiche Verteidigung!",
      },
      {
        id: "negotiate",
        label: "VERHANDELN",
        icon: "📡",
        success: false,
        consequence: "borg-assimilation",
        result: "Widerstand ist zwecklos. Ihr werdet assimiliert. BORG-MODUS AKTIVIERT.",
      },
    ],
    color: "from-[#66cc66] to-[#44aa44]",
    border: "border-[#88ff88]",
  },
  {
    id: "hull-breach",
    title: "⚠ ALARM: HÜLLENBRUCH DECK 7",
    message: "Massive Dekompression! Atmosphäre entweicht mit kritischer Rate!",
    countdown: 10,
    options: [
      {
        id: "bulkheads",
        label: "NOTFALLSCHOTTE",
        icon: "🚪",
        success: true,
        result: "Notfallschotten geschlossen. Sektion isoliert. Alle Crewmitglieder evakuiert.",
      },
      {
        id: "forcefield",
        label: "KRAFTFELD AKTIVIEREN",
        icon: "🔷",
        success: true,
        result: "Strukturelles Integritätsfeld aktiviert. Bruch versiegelt. Reparaturen laufen.",
      },
      {
        id: "manual",
        label: "MANUELL REPARIEREN",
        icon: "🔧",
        success: false,
        consequence: "crew-loss",
        result: "Zu langsam! 3 Crewmitglieder ins All gesogen. Moral der Crew gesunken.",
      },
    ],
    color: "from-[#cc6666] to-[#ff6666]",
    border: "border-[#ff9999]",
  },
  {
    id: "temporal-anomaly",
    title: "⚠ ANOMALIE: ZEITLICHE STÖRUNG",
    message: "Temporale Verzerrung erkannt! Die Zeitlinie beginnt zu kollabieren!",
    countdown: 13,
    options: [
      {
        id: "chronoton",
        label: "CHRONOTON-PULSE",
        icon: "⚡",
        success: true,
        result: "Chronoton-Pulse stabilisiert die Zeitlinie. Normalität wiederhergestellt.",
      },
      {
        id: "reverse",
        label: "POLARITÄT UMKEHREN",
        icon: "🔄",
        success: true,
        result: "Deflektorschüssel neu kalibriert. Temporale Anomalie neutralisiert.",
      },
      {
        id: "enter",
        label: "ANOMALIE BETRETEN",
        icon: "🌀",
        success: false,
        consequence: "time-shift",
        result: "Durch die Zeit geschleudert! Alle Daten aus der Zukunft/Vergangenheit vermischt!",
      },
    ],
    color: "from-[#9999ff] to-[#cc99cc]",
    border: "border-[#ccccff]",
  },
];

export default function EmergencyAlert({ onConsequence }) {
  const [alert, setAlert] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const triggerAlert = () => {
      const randomEvent = EMERGENCY_EVENTS[Math.floor(Math.random() * EMERGENCY_EVENTS.length)];
      setAlert(randomEvent);
      setCountdown(randomEvent.countdown);
      setResolved(false);
      setSelectedOption(null);
    };

    const firstAlert = setTimeout(triggerAlert, 30000);
    const intervalId = setInterval(() => {
      const randomDelay = Math.random() * 180000 + 120000;
      setTimeout(triggerAlert, randomDelay);
    }, 300000);

    return () => {
      clearTimeout(firstAlert);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (alert && !resolved && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0 && !resolved && alert) {
      // Zeit abgelaufen - wähle automatisch die schlechteste Option
      const failOption = alert.options.find(opt => !opt.success);
      if (failOption) {
        handleChoice(failOption);
      }
    }
  }, [alert, countdown, resolved]);

  const handleChoice = (option) => {
    setSelectedOption(option);
    setResolved(true);

    if (!option.success && option.consequence) {
      // Warte 3 Sekunden, dann führe Konsequenz aus
      setTimeout(() => {
        onConsequence(option.consequence);
        setAlert(null);
      }, 3000);
    } else {
      // Erfolg - schließe nach 3 Sekunden
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative max-w-3xl w-full mx-4 bg-gradient-to-br from-[#1a1a3e] to-[#0a0e27] border-4 ${alert.border} rounded-none shadow-2xl overflow-hidden`}
      >
        {/* Alert Header */}
        <div className={`bg-gradient-to-r ${alert.color} p-6 relative overflow-hidden ${!resolved && 'animate-pulse'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-4xl animate-bounce">
              🚨
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-2">
                {alert.title}
              </h2>
              <p className="text-white/90 text-base md:text-lg font-bold">
                {alert.message}
              </p>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-1 bg-white/50"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/50"></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {!resolved ? (
            <>
              {/* Countdown */}
              <div className="mb-6 text-center">
                <div className="inline-block px-6 py-3 bg-[#0a0e27]/80 border-4 border-[#cc6666] rounded-none">
                  <p className="text-[#9999ff] text-xs md:text-sm uppercase mb-1">Zeit verbleibend</p>
                  <p className={`text-4xl md:text-6xl font-black tabular-nums ${countdown <= 5 ? 'text-[#cc6666] animate-pulse' : 'text-[#ff9c00]'}`}>
                    {countdown}s
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <p className="text-[#ffcc99] text-center font-bold uppercase tracking-wider mb-4">
                  Wählen Sie eine Maßnahme:
                </p>
                
                {alert.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleChoice(option)}
                    className={`w-full py-4 px-6 bg-gradient-to-r ${
                      option.success 
                        ? 'from-[#66cc99] to-[#44aa77] hover:from-[#77dd99] hover:to-[#55bb88]' 
                        : 'from-[#cc6666] to-[#aa4444] hover:from-[#dd7777] hover:to-[#bb5555]'
                    } text-white rounded-none font-black text-lg md:text-xl uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all border-2 ${
                      option.success ? 'border-[#88ffaa]' : 'border-[#ff8888]'
                    } relative overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span className="text-2xl md:text-3xl">{option.icon}</span>
                      <span className="text-sm md:text-lg">{option.label}</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
              </div>

              <p className="text-center text-[#cc6666] text-xs md:text-sm font-black uppercase mt-4 animate-pulse">
                ⚠ Entscheidung erforderlich - Konsequenzen sind real! ⚠
              </p>
            </>
          ) : (
            // Result Screen
            <div className="text-center py-8">
              <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-4 ${
                selectedOption.success 
                  ? 'bg-[#66cc99]/20 border-[#66cc99]' 
                  : 'bg-[#cc6666]/20 border-[#cc6666]'
              }`}>
                <span className="text-5xl md:text-6xl">{selectedOption.success ? '✓' : '✗'}</span>
              </div>
              <h3 className={`text-xl md:text-2xl font-black uppercase mb-4 ${
                selectedOption.success ? 'text-[#66cc99]' : 'text-[#cc6666]'
              }`}>
                {selectedOption.success ? 'ERFOLGREICH GELÖST' : 'MISSION FEHLGESCHLAGEN'}
              </h3>
              <p className="text-[#9999ff] text-base md:text-lg px-4">
                {selectedOption.result}
              </p>
              {!selectedOption.success && (
                <p className="text-[#cc6666] text-sm font-bold uppercase mt-4 animate-pulse">
                  Konsequenzen werden angewendet...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Corner Indicators */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-[#cc6666] rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-4 w-4 h-4 bg-[#cc6666] rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-[#cc6666] rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-[#cc6666] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}