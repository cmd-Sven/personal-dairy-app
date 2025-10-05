import { useState, useEffect } from "react";
import { getMoodById } from "../utils/moodHelper";

/**
 * Wochenkalender-Ansicht - Star Trek LCARS Style
 * Mission Log Schedule Display mit Mood Indicators
 */
function CalendarWeekView({ entries, onAddEntry, onCardClick }) {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    generateWeekDays();
  }, [entries]);

  const generateWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();

    const monday = new Date(today);
    const diff = currentDay === 0 ? -6 : 1 - currentDay;
    monday.setDate(today.getDate() + diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const dateString = date.toISOString().split("T")[0];
      const entry = entries.find((e) => e.date === dateString);
      const isToday = dateString === today.toISOString().split("T")[0];

      days.push({
        date: dateString,
        dayName: date
          .toLocaleDateString("de-DE", { weekday: "short" })
          .toUpperCase(),
        dayNumber: date.getDate(),
        monthName: date
          .toLocaleDateString("de-DE", { month: "short" })
          .toUpperCase(),
        isToday,
        entry,
      });
    }

    setWeekDays(days);
  };

  const isFutureDay = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(dateString);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
  };

  return (
    <div className="mb-16">
      {/* Week Header */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md rounded-none border-l-8 border-[#ff9c00] shadow-2xl lcars-corner">
        <h2 className="text-3xl font-black text-[#ffcc99] tracking-wider uppercase mb-2">
          Wöchentlicher Missionsplan
        </h2>
        <p className="text-[#9999ff] font-medium tracking-wide">
          {weekDays[0]?.dayNumber}. {weekDays[0]?.monthName} -{" "}
          {weekDays[6]?.dayNumber}. {weekDays[6]?.monthName} • AKTUELLE WOCHE
        </p>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const mood = day.entry?.mood ? getMoodById(day.entry.mood) : null;

          return (
            <div
              key={day.date}
              className={`relative group rounded-none overflow-hidden transition-all duration-300 ${
                day.isToday
                  ? "ring-4 ring-[#ff9c00] ring-offset-4 ring-offset-[#0a0e27] shadow-2xl shadow-[#ff9c00]/50"
                  : "shadow-xl hover:shadow-2xl hover:shadow-[#9999ff]/30"
              }`}
            >
              {/* Card */}
              <div
                onClick={() => day.entry && onCardClick(day.entry)}
                className={`
                  relative h-64 cursor-pointer transition-all duration-300 border-2
                  ${
                    day.entry
                      ? "bg-gradient-to-br from-[#1a1a3e]/90 to-[#0a0e27]/90 border-[#9999ff]/50"
                      : "bg-gradient-to-br from-[#0a0e27]/70 to-[#1a1a3e]/70 border-[#9999ff]/20"
                  }
                  ${
                    day.isToday && !day.entry ? "border-[#ff9c00] border-4" : ""
                  }
                  ${
                    !day.entry && !isFutureDay(day.date) && !day.isToday
                      ? "border-[#cc6666]/40 hover:border-[#cc6666]"
                      : ""
                  }
                  ${day.entry ? "hover:scale-105 hover:border-[#ff9c00]" : ""}
                `}
              >
                {/* Day Header */}
                <div
                  className={`p-4 border-b-4 ${
                    day.isToday
                      ? "bg-gradient-to-r from-[#ff9c00] to-[#cc6666] border-[#ffcc99] text-[#0a0e27]"
                      : day.entry
                      ? "bg-[#1a1a3e]/80 border-[#9999ff]/30 text-[#ffcc99]"
                      : "bg-[#0a0e27]/60 border-[#9999ff]/20 text-[#9999ff]"
                  }`}
                >
                  <p className="text-xs font-black tracking-widest mb-1">
                    {day.dayName}
                  </p>
                  <p
                    className={`text-3xl font-black ${
                      day.isToday ? "text-[#0a0e27]" : "text-[#ff9c00]"
                    }`}
                  >
                    {day.dayNumber}
                  </p>
                </div>

                {/* Card Content */}
                <div className="p-4 h-[calc(100%-112px)] flex flex-col relative">
                  {day.entry ? (
                    // Entry exists
                    <>
                      <div className="flex-1 mb-3">
                        <div className="relative mb-3 rounded-none overflow-hidden border-2 border-[#9999ff]/50">
                          <img
                            src={day.entry.imageUrl}
                            alt={day.entry.title}
                            className="w-full h-16 object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] to-transparent opacity-50"></div>

                          {/* Mood Icon Overlay auf Bild */}
                          {mood && (
                            <div className="absolute top-1 right-1 w-8 h-8 bg-[#0a0e27]/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-[#ff9c00] shadow-lg">
                              <span className="text-lg">{mood.icon}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-[#ffcc99] line-clamp-2 uppercase tracking-wide leading-tight">
                          {day.entry.title}
                        </h3>
                      </div>
                      <div className="flex items-center text-[#ff9c00] text-xs font-black uppercase tracking-wider mt-auto">
                        <span>ZUGRIFF</span>
                        <svg
                          className="w-3 h-3 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    // No entry - show empty state
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 mb-3 bg-[#9999ff]/10 rounded-full flex items-center justify-center border-2 border-[#9999ff]/30">
                        <svg
                          className="w-8 h-8 text-[#9999ff]/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-[#9999ff]/60 uppercase tracking-wider">
                        KEIN EINTRAG
                      </p>
                    </div>
                  )}

                  {/* Hologram scan line */}
                  {day.entry && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#9999ff]/30 to-transparent animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Add Entry Button - für alle Tage ohne Eintrag (außer Zukunft) */}
                {!day.entry && !isFutureDay(day.date) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddEntry(day.date);
                    }}
                    className={`absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r ${
                      day.isToday
                        ? "from-[#ff9c00] to-[#cc6666] animate-pulse-slow"
                        : "from-[#cc6666] to-[#9999ff]"
                    } text-[#0a0e27] rounded-full shadow-2xl hover:shadow-[#ff9c00]/80 transition-all duration-200 hover:scale-125 active:scale-95 flex items-center justify-center group-hover:ring-4 group-hover:ring-[#ff9c00]/50 border-2 border-[#ffcc99]`}
                    title={
                      day.isToday
                        ? "Heutigen Log aufzeichnen"
                        : "Fehlenden Log-Eintrag hinzufügen"
                    }
                  >
                    <svg
                      className="w-7 h-7"
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
                  </button>
                )}

                {/* Today Badge */}
                {day.isToday && (
                  <div className="absolute top-20 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff9c00] text-[#0a0e27] rounded-none text-xs font-black shadow-lg border-2 border-[#ffcc99] uppercase tracking-wider animate-pulse">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      HEUTE
                    </span>
                  </div>
                )}

                {/* LCARS Corner indicator */}
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#9999ff] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#ff9c00] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarWeekView;