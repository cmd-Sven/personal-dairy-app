import { useState, useEffect } from 'react';

/**
 * Wochenkalender-Ansicht
 * Zeigt die aktuelle Woche mit Montag bis Sonntag
 * Der aktuelle Tag ist hervorgehoben
 */
function CalendarWeekView({ entries, onAddEntry, onCardClick }) {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    generateWeekDays();
  }, [entries]);

  /**
   * Generiert die Tage der aktuellen Woche (Mo-So)
   */
  const generateWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sonntag, 1 = Montag, ...
    
    // Berechne Montag der aktuellen Woche
    const monday = new Date(today);
    const diff = currentDay === 0 ? -6 : 1 - currentDay; // Wenn Sonntag, dann -6 Tage
    monday.setDate(today.getDate() + diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const entry = entries.find(e => e.date === dateString);
      const isToday = dateString === today.toISOString().split('T')[0];

      days.push({
        date: dateString,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('en-US', { month: 'short' }),
        isToday,
        entry
      });
    }

    setWeekDays(days);
  };

  return (
    <div className="mb-12">
      {/* Week Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">This Week</h2>
        <p className="text-gray-600">
          {weekDays[0]?.monthName} {weekDays[0]?.dayNumber} - {weekDays[6]?.monthName} {weekDays[6]?.dayNumber}
        </p>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div
            key={day.date}
            className={`relative group rounded-2xl overflow-hidden transition-all duration-300 ${
              day.isToday
                ? 'ring-4 ring-indigo-500 ring-offset-2 shadow-xl'
                : 'shadow-md hover:shadow-xl'
            }`}
          >
            {/* Card */}
            <div
              onClick={() => day.entry && onCardClick(day.entry)}
              className={`
                relative h-48 cursor-pointer transition-all duration-300
                ${day.entry ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'}
                ${day.isToday && !day.entry ? 'bg-gradient-to-br from-indigo-50 to-purple-50' : ''}
                ${day.entry ? 'hover:scale-105' : ''}
              `}
            >
              {/* Day Header */}
              <div
                className={`p-3 border-b ${
                  day.isToday
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : day.entry
                    ? 'bg-gray-50 text-gray-700'
                    : 'bg-white text-gray-600'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide">
                  {day.dayName}
                </p>
                <p className={`text-2xl font-bold ${day.isToday ? 'text-white' : 'text-gray-900'}`}>
                  {day.dayNumber}
                </p>
              </div>

              {/* Card Content */}
              <div className="p-3 h-[calc(100%-80px)] flex flex-col">
                {day.entry ? (
                  // Entry exists
                  <>
                    <div className="flex-1 mb-2">
                      <img
                        src={day.entry.imageUrl}
                        alt={day.entry.title}
                        className="w-full h-16 object-cover rounded-lg mb-2"
                      />
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {day.entry.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-indigo-600 text-xs font-medium">
                      <span>View</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </>
                ) : (
                  // No entry - show empty state
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-xs font-medium">No entry</p>
                  </div>
                )}
              </div>

              {/* Add Entry Button - nur für heutigen Tag ohne Eintrag */}
              {day.isToday && !day.entry && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddEntry(day.date);
                  }}
                  className="absolute bottom-3 right-3 w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center group-hover:ring-4 group-hover:ring-indigo-300"
                  title="Add entry for today"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              )}

              {/* Today Badge */}
              {day.isToday && (
                <div className="absolute top-16 left-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Today
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarWeekView;