import { getAllMoods } from '../utils/moodHelper';

/**
 * Mood Selector - Star Trek Style
 * Captain's Emotional Status Indicator
 */
function MoodSelector({ selectedMood, onMoodChange }) {
  const moods = getAllMoods();

  return (
    <div className="space-y-4">
      <label className="block text-sm font-black text-[#ff9c00] uppercase tracking-widest">
        CAPTAIN'S MOOD STATUS *
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => onMoodChange(mood.id)}
            className={`
              relative p-4 rounded-none border-4 transition-all duration-200
              ${selectedMood === mood.id 
                ? `bg-gradient-to-br ${mood.color} ${mood.borderColor} scale-105 shadow-2xl` 
                : 'bg-[#0a0e27]/50 border-[#9999ff]/30 hover:border-[#9999ff] hover:scale-105'
              }
            `}
          >
            {/* Icon */}
            <div className="text-5xl mb-2 text-center animate-pulse-slow">
              {mood.icon}
            </div>
            
            {/* Label */}
            <div className="text-center">
              <p className={`text-xs font-black uppercase tracking-wider mb-1 ${
                selectedMood === mood.id ? 'text-[#0a0e27]' : 'text-[#ffcc99]'
              }`}>
                {mood.label}
              </p>
              <p className={`text-xs font-bold italic ${
                selectedMood === mood.id ? 'text-[#0a0e27]/80' : 'text-[#9999ff]'
              }`}>
                "{mood.description}"
              </p>
            </div>

            {/* Selected Indicator */}
            {selectedMood === mood.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#0a0e27] rounded-full flex items-center justify-center border-2 border-current animate-pulse">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Corner dots */}
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-current rounded-full opacity-50"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-current rounded-full opacity-50"></div>
          </button>
        ))}
      </div>

      {/* Selected Mood Display */}
      {selectedMood && (
        <div className="mt-4 p-4 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-sm border-l-4 border-[#ff9c00] rounded-none">
          <p className="text-[#9999ff] text-sm font-bold uppercase tracking-wide">
            STATUS: {moods.find(m => m.id === selectedMood)?.label.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}

export default MoodSelector;