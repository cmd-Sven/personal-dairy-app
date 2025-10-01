import React from "react";
import { getMoodById } from "../utils/moodHelper";

function EntryArchive({ entries, onCardClick, onEditClick, onDeleteClick }) {
  if (entries.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="mb-8 p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md rounded-none border-l-8 border-[#ff9c00] shadow-2xl">
        <h2 className="text-3xl font-black text-[#ffcc99] tracking-wider uppercase">
          Mission Log Archives
        </h2>
        <p className="text-[#9999ff] mt-2 font-medium">
          {entries.length} {entries.length === 1 ? "ENTRY" : "ENTRIES"} • DATABASE ACTIVE
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry) => {
          const mood = entry.mood ? getMoodById(entry.mood) : null;

          return (
            <article
              key={entry.id}
              className="group bg-gradient-to-br from-[#1a1a3e]/90 to-[#0a0e27]/90 backdrop-blur-sm rounded-none shadow-2xl hover:shadow-[#9999ff]/30 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2 border-2 border-[#9999ff]/30 hover:border-[#ff9c00] lcars-corner"
            >
              <div
                className="relative h-56 overflow-hidden bg-gradient-to-br from-[#2a5caa] to-[#1a1a3e]"
                onClick={() => onCardClick(entry)}
              >
                <img
                  src={entry.imageUrl}
                  alt={entry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60" />

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => onEditClick(entry, e)}
                    className="p-2 bg-[#9999ff]/90 hover:bg-[#9999ff] rounded-none shadow-lg transition-all hover:scale-110 border border-[#ffcc99]"
                    title="Edit entry"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => onDeleteClick(entry, e)}
                    className="p-2 bg-[#cc6666]/90 hover:bg-[#cc6666] rounded-none shadow-lg transition-all hover:scale-110 border border-[#ffcc99]"
                    title="Delete entry"
                  >
                    🗑
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6" onClick={() => onCardClick(entry)}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9c00] text-[#0a0e27] rounded-none text-sm font-bold mb-4 shadow-lg border-2 border-[#ffcc99]">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).toUpperCase()}
                </div>

                {mood && (
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${mood.color} text-[#0a0e27] rounded-none text-sm font-bold mb-4 shadow-lg border-2 ${mood.borderColor} ml-2`}
                  >
                    <span className="text-lg">{mood.icon}</span>
                    <span className="uppercase tracking-wide">"{mood.description}"</span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-[#ffcc99] mb-3 line-clamp-2 group-hover:text-[#ff9c00] transition-colors uppercase tracking-wide">
                  {entry.title}
                </h3>

                <p className="text-[#9999ff] text-sm line-clamp-3 mb-4 font-medium">
                  {entry.content}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default EntryArchive;
