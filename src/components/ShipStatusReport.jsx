import { useState } from "react";

const STATUS_REPORTS = [
  {
    department: "Abteilung Sicherheit",
    location: "Upper Deck 5",
    report:
      "Tripples konnten gesichert und ordnungsgemäß in den Mülltransporter befördert werden. Keine weiteren Replikatorbefehle für 'flauschige Haustiere' erlaubt.",
    officer: "Lt. Cmdr. Jarek Thorne",
  },
  {
    department: "Abteilung Medizin",
    location: "MedBay, Deck 4",
    report:
      "Drei Crewmitglieder mit Koffeinvergiftung nach klingonischem Raktajino behandelt. Replicatorrezeptur angepasst.",
    officer: "Dr. Vela Sh'ren",
  },
  {
    department: "Technische Wartung",
    location: "Maschinenraum, Deck 7",
    report:
      "Warpkern einmal 'neu gestartet'. Laufzeitfehler im Plasmaflussdiagnoseskript. Alles wieder stabil.",
    officer: "Chief Petty Officer M'Kal Durn",
  },
  {
    department: "Wissenschaft",
    location: "Labor 3, Deck 6",
    report:
      "Testsubjekt (pflanzlich) hat Bewusstsein erlangt und verlangt nun diplomatische Anerkennung. Untersuchung läuft.",
    officer: "Lt. Myra Vonn",
  },
  {
    department: "Holodeck-Überwachung",
    location: "Holodeck 2, Deck 8",
    report:
      "Holoprogramm 'Shakespeare im Weltall' abgestürzt. Ursache: Überbeanspruchung durch Cmdr. Talens One-Man-Show.",
    officer: "Ensign Freya Kol",
  },
  {
    department: "Shuttlewartung",
    location: "Hangar Bay, Deck 2",
    report:
      "Shuttle Valkyrie startete kurzzeitig selbstständig. War jedoch nur der neue Autopilot im Testlauf. Keine Schäden.",
    officer: "Lt. Juno Reyes",
  },
  {
    department: "Astrometrie",
    location: "Observatorium, Deck 9",
    report:
      "Ungewöhnliche Gravitationswellen registriert. Wahrscheinlich nur Lt. Kreel, der wieder mit seinem Bass geübt hat.",
    officer: "Ens. T'Pora",
  },
  {
    department: "Bordküche",
    location: "Kombüse, Deck 3",
    report:
      "Chefkoch hat aus Versehen ein Gericht gekocht, das Gefühle auslöst. Gericht vorerst aus dem Menü genommen.",
    officer: "Chefkoch Rondo 'Hot Pan' Maris",
  },
  {
    department: "Kommunikation",
    location: "Brücke, Deck 1",
    report:
      "Unerwünschte Übertragung einer fremden Karaoke-Show empfangen. War nicht abzustellen. Crew nun Fan.",
    officer: "Lt. Sarin Deln",
  },
  {
    department: "Hydroponik",
    location: "Gartenbereich, Deck 6",
    report:
      "Tomatenpflanzen zeigen aggressive Tendenzen. Untersuchung läuft. Sicherheitsabstand empfohlen.",
    officer: "Lt. Cmdr. Lira Chen",
  },
  {
    department: "Transporterraum",
    location: "Transporterraum 1, Deck 3",
    report:
      "Crewmitglied kam mit zwei linken Schuhen zurück. Logik der Materie-Rematrix noch unklar.",
    officer: "Chief Transporter Officer Zek D'vorr",
  },
  {
    department: "Quartiermeister",
    location: "Lagerraum C, Deck 4",
    report:
      "Nach 17 Monaten ist die Lieferung von Vulkanischer Seife angekommen. Quartier von Lt. Surok wieder betretbar.",
    officer: "Lieutenant Mira Gant",
  },
  {
    department: "Freizeitkoordination",
    location: "Lounge, Deck 2",
    report:
      "Pokerturnier endete in diplomatischem Zwischenfall. Andorianer protestieren gegen menschliche Mimik.",
    officer: "Ensign Thelvar Idris",
  },
  {
    department: "Holodeck-Wartung",
    location: "Holodeck 1, Deck 8",
    report:
      "Programm 'Entspannung am Strand' wurde durch 'Romulanische Invasion' ersetzt. Ursache noch unbekannt.",
    officer: "Lt. Jax Connors",
  },
  {
    department: "Maschinenkontrolle",
    location: "Jefferies-Röhren, Deck 5",
    report:
      "Lt. Grobnar hat sich erneut im Wartungsschacht verirrt. Snacks werden abgeworfen bis Bergung erfolgt.",
    officer: "Chief Eng. Silah Vrenn",
  },
  {
    department: "Schiffsbibliothek",
    location: "Informationszentrum, Deck 3",
    report:
      "Lt. Kelso hat 312 Holo-Romane ausgeliehen. System glaubt nun, er sei ein Bibliotheks-Android.",
    officer: "Archivarin T'Naya",
  },
  {
    department: "Krankenstation",
    location: "MedBay 2, Deck 4",
    report:
      "Ferengi-Handelsvertreter mit 'plötzlicher Gewissensbildung' eingeliefert. Zustand kritisch.",
    officer: "Dr. Juna Takare",
  },
  {
    department: "Replikatorversorgung",
    location: "Versorgungszentrale, Deck 3",
    report:
      "Sämtliche Replikatoren produzierten heute nur noch Bananen. Fehlerquelle: Programmierstreich von Ensign Luvak.",
    officer: "Lt. Remi Davos",
  },
  {
    department: "Brücke",
    location: "Kommandozentrum, Deck 1",
    report:
      "Sessel des Captains leicht quietschend. Techniker wurde gerufen. Vorschlag: Waffenschmierung.",
    officer: "Lt. Cmdr. Vorel Thax",
  },
  {
    department: "Sanitäreinheit",
    location: "Deck 7, Sektion C",
    report:
      "Gravitationsausfall führte zu spontaner Dusch-Akrobatik. Keine Verletzten, aber viel Gelächter.",
    officer: "Maintenance Officer Drix Holan",
  },
  {
    department: "Moraloffizier",
    location: "Crew Lounge, Deck 3",
    report:
      "Spontanes Tanz-Event mit klingonischer Musik löste Muskelkater-Epidemie aus.",
    officer: "Lt. Jada Norr",
  },
  {
    department: "Notfallausbildung",
    location: "Holodeck 3, Deck 8",
    report:
      "Sicherheitsübung 'Borg-Invasion' eskalierte. Crew nun traumatisiert – und bestens vorbereitet.",
    officer: "Lt. Cmdr. Odan Prell",
  },
  {
    department: "Schiffsführung",
    location: "Konferenzraum, Deck 1",
    report:
      "Holo-Beamer streute während des Briefings Werbung für Plomeek-Suppe ein. Untersuchung läuft.",
    officer: "Cmdr. Nilo Drex",
  },
  {
    department: "Wissenschaft",
    location: "Xenolabor, Deck 6",
    report:
      "Mini-Wurmloch im Kaffeemaschinenfilter entdeckt. Versuche zur Zeitreise beginnen morgen.",
    officer: "Dr. T'Lara",
  },
  {
    department: "Bordkantine",
    location: "Deck 3",
    report:
      "Tagesgericht wurde versehentlich mit Gagh verwechselt. Mindestens fünf neue Fans klingonischer Küche.",
    officer: "Chefkoch Rondo 'Hot Pan' Maris",
  },
  {
    department: "Shuttlekontrolle",
    location: "Deck 2, Hangarsektion A",
    report:
      "Shuttle Nova verweigerte Start. Grund: Künstliche Intelligenz hatte 'schlechten Tag'.",
    officer: "Lt. Rina Cole",
  },
  {
    department: "Energiemanagement",
    location: "Reaktorraum, Deck 5",
    report:
      "Zusätzliche Energie durch zufällige Subraumresonanz – oder technisches Wunder. Nutzung läuft.",
    officer: "Engineer Velar Norrin",
  },
  {
    department: "Sicherheitsabteilung",
    location: "Brig, Deck 4",
    report:
      "Ein Crewmitglied hat sich freiwillig eingesperrt 'um mal Ruhe zu haben'. Psychologische Nachbetreuung folgt.",
    officer: "Lt. Koro Thar",
  },
  {
    department: "Schiffsarzt",
    location: "MedBay 1, Deck 4",
    report:
      "Lt. Cmdr. Hollen hat sich wieder selbst diagnostiziert – und lag wie immer falsch. Keine Gefahr.",
    officer: "Dr. Vela Sh'ren",
  },
  {
    department: "Bordwartung",
    location: "Außenhülle, Deck 0 (Exo-Arbeit)",
    report:
      "Lt. Peks hat seinen Schraubenschlüssel im All verloren. Bewegungsverfolgung läuft.",
    officer: "Chief Hull Engineer Murt Dek",
  },
];

export default function ShipStatusReport() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextReport = () => {
    setCurrentIndex((prev) => (prev + 1) % STATUS_REPORTS.length);
  };

  const currentReport = STATUS_REPORTS[currentIndex];

  return (
    <div className="max-w-3xl mx-auto  p-6 bg-gradient-to-r from-[#1a1a3e]/80 to-[#0a0e27]/80 backdrop-blur-md border-l-8 border-[#9999ff] shadow-2xl rounded-md relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#9999ff] rounded-full animate-pulse"></div>
          <span className="text-xl font-black text-[#9999ff] uppercase tracking-wider">
            Schiffsstatus-Bericht
          </span>
        </div>
        <span className="text-sm text-[#6666cc] font-medium">
          {currentIndex + 1} / {STATUS_REPORTS.length}
        </span>
      </div>

      {/* Department & Location */}
      <div className="mb-4">
        <div className="inline-block px-4 py-2 bg-[#9999ff]/20 border-2 border-[#9999ff]/50 rounded-none mb-2">
          <span className="text-[#ffcc99] font-bold uppercase tracking-wide">
            {currentReport.department}
          </span>
        </div>
        <p className="text-[#6666cc] text-sm font-medium">
          📍 {currentReport.location}
        </p>
      </div>

      {/* Report Content */}
      <div className="bg-[#0a0e27]/50 p-4 border-l-4 border-[#9999ff] mb-4">
        <p className="text-[#ffcc99] text-base leading-relaxed">
          {currentReport.report}
        </p>
      </div>

      {/* Officer Signature */}
      <div className="flex items-center justify-between">
        <p className="text-[#9999ff] text-sm font-medium italic">
          — {currentReport.officer}
        </p>

        {/* Next Report Button */}
        <button
          onClick={handleNextReport}
          className="px-6 py-2 bg-gradient-to-r from-[#9999ff] to-[#cc99cc] text-[#0a0e27] rounded-none font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-[#9999ff]/50 transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-[#ccccff]"
        >
          Nächster Bericht →
        </button>
      </div>

      {/* Corner Indicators */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-[#9999ff] rounded-full opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#9999ff] rounded-full opacity-60"></div>
    </div>
  );
}
