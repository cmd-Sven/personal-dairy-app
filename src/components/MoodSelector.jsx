import { getAllMoods } from "../utils/moodHelper";

function MoodSelector({ selectedMood, onMoodChange }) {
  const moods = getAllMoods();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-black text-[#ff9c00] uppercase tracking-widest">
        CAPTAIN-STATUS *
      </label>
      <div className="grid grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => onMoodChange(mood.id)}
            title={mood.tooltip}
            className={`
              relative px-3 py-3 rounded-none font-bold text-sm uppercase tracking-wide transition-all
              border-2 flex flex-col items-center gap-2 hover:scale-105
              ${
                selectedMood === mood.id
                  ? `bg-gradient-to-r ${mood.color} ${mood.borderColor} border-4 shadow-xl`
                  : `bg-[#0a0e27]/50 ${mood.borderColor} border-opacity-50 hover:border-opacity-100`
              }
            `}
          >
            <span className="text-2xl">{mood.icon}</span>
            <span className={`text-xs leading-tight text-center ${
              selectedMood === mood.id ? 'text-[#0a0e27]' : 'text-[#9999ff]'
            }`}>
              {mood.label}
            </span>
            {selectedMood === mood.id && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#66cc99] rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {selectedMood && (
        <p className="text-[#9999ff] text-sm italic mt-2">
          {moods.find(m => m.id === selectedMood)?.description}
        </p>
      )}
    </div>
  );
}

export default MoodSelector;