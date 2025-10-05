import { useState, useEffect } from "react";

const QUOTE_STORAGE_KEY = "daily_quote";

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Prüfe ob bereits ein Zitat für heute gespeichert ist
    try {
      const storedData = localStorage.getItem(QUOTE_STORAGE_KEY);
      if (storedData) {
        const { date, quote: savedQuote } = JSON.parse(storedData);

        // Wenn das gespeicherte Zitat von heute ist, verwende es
        if (date === today) {
          console.log("Gespeichertes Zitat von heute verwendet");
          setQuote(savedQuote);
          setLoading(false);
          return; // Kein neues Zitat laden
        }
      }
    } catch (err) {
      console.error("Fehler beim Laden des gespeicherten Zitats:", err);
    }

    // Lade neues Zitat, wenn keins für heute gespeichert ist
    console.log("Star Trek Quotes: Fetch gestartet");
    fetch("/data/quotes.json")
      .then((res) => {
        console.log("Fetch Response:", res);
        if (!res.ok) throw new Error("Fehler beim Laden der Zitate");
        return res.json();
      })
      .then((quotes) => {
        console.log("Quotes geladen:", quotes);
        if (!Array.isArray(quotes) || quotes.length === 0) {
          throw new Error("Keine Zitate gefunden");
        }

        // Zufälliges Zitat auswählen
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        console.log("Random Quote ausgewählt:", random);

        // Speichere Zitat mit heutigem Datum
        try {
          localStorage.setItem(
            QUOTE_STORAGE_KEY,
            JSON.stringify({
              date: today,
              quote: random,
            })
          );
          console.log("Zitat für heute gespeichert");
        } catch (err) {
          console.error("Fehler beim Speichern des Zitats:", err);
        }

        setQuote(random);
        setLoading(false);
      })
      .catch((err) => {
        console.error("QuoteOfTheDay Fehler:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-8 text-[#9999ff]">Lädt Zitat…</p>;
  if (error)
    return (
      <p className="text-center mt-8 text-red-500">
        Zitat konnte nicht geladen werden.
      </p>
    );
  if (!quote) return null;

  return (
    <div className="max-w-3xl mx-auto mb-5 p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md border-l-8 border-[#ff9c00] shadow-2xl rounded-md">
      <span className="text-2xl text-[#9999ff]">Dein Zitat des Tages: </span>

      <p className="text-xl text-[#ffcc99] font-semibold italic">
        "{quote.zitat}"
      </p>
      {quote.sprecher && (
        <p className="text-right text-[#9999ff] font-medium mt-2">
          – {quote.sprecher}
        </p>
      )}
      {quote.quelle && (
        <p className="text-right text-[#6666cc] text-sm mt-1">
          [{quote.quelle}]
        </p>
      )}
    </div>
  );
}
