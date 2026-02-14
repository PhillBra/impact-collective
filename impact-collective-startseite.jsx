import { useState, useEffect, useRef } from "react";

const categories = [
  { id: "alle", label: "Alle" },
  { id: "ngos", label: "NGOs" },
  { id: "startups", label: "Startups" },
  { id: "vcs", label: "VCs" },
  { id: "personen", label: "Personen" },
  { id: "stiftungen", label: "Stiftungen" },
  { id: "familyoffices", label: "Family Offices" },
  { id: "unternehmen", label: "Unternehmen" },
  { id: "staat", label: "Staat" },
  { id: "verbaende", label: "Verbände" },
  { id: "infrastruktur", label: "Infrastruktur" },
  { id: "forschung", label: "Forschung" },
];

const categoryColors = {
  ngos: { bg: "#EC734D", light: "#FEF0EB", text: "#9C3A1A" },
  startups: { bg: "#67DE93", light: "#EDFBF2", text: "#1A6B38" },
  vcs: { bg: "#45B4C6", light: "#E8F6F9", text: "#1A6B7A" },
  personen: { bg: "#AC5CEF", light: "#F3EAFD", text: "#5E2A8A" },
  stiftungen: { bg: "#FEA179", light: "#FFF3ED", text: "#9C4A1A" },
  familyoffices: { bg: "#D4A843", light: "#FBF6E8", text: "#7A5F1A" },
  unternehmen: { bg: "#365F63", light: "#EBF0F0", text: "#1A3335" },
  staat: { bg: "#6B8FA3", light: "#EDF2F5", text: "#2E4F5E" },
  verbaende: { bg: "#5B8C5A", light: "#EDF5ED", text: "#2E4A2E" },
  infrastruktur: { bg: "#6CBDC6", light: "#EAF7F9", text: "#1A6B75" },
  forschung: { bg: "#7B8FD4", light: "#EDEFFA", text: "#2E3B6E" },
};

const actors = [
  { id: 1, name: "Viva con Agua", category: "ngos", tagline: "Sauberes Trinkwasser für alle Menschen weltweit", description: "Seit 2006 setzt sich Viva con Agua für den Zugang zu sauberem Trinkwasser ein – mit Kreativität, Musik und einer globalen Community. Was als Initiative des FC St. Pauli begann, ist heute eine internationale Bewegung mit Projekten in über 20 Ländern.", location: "Hamburg", founded: "2006", sdgs: ["6", "17"], website: "vivaconagua.org", image: "linear-gradient(135deg, #1a8fba 0%, #43c6ac 100%)" },
  { id: 2, name: "#ichbinhier", category: "ngos", tagline: "Digitale Zivilcourage gegen Hass im Netz", description: "39.000 Mitglieder engagieren sich täglich für respektvolle und sachliche Diskussionen in sozialen Medien. Sie solidarisieren sich mit Betroffenen und machen sichtbar: Solidarität im Netz wirkt.", location: "Berlin", founded: "2016", sdgs: ["16", "10"], website: "ichbinhier.eu", image: "linear-gradient(135deg, #EC734D 0%, #f5a07a 100%)" },
  { id: 3, name: "Teach First Deutschland", category: "ngos", tagline: "Bildungsgerechtigkeit durch exzellente Lehrkräfte", description: "Hochschulabsolvent*innen unterrichten als Fellows an Schulen in sozialen Brennpunkten und stärken die Chancengerechtigkeit im Bildungssystem.", location: "Berlin", founded: "2009", sdgs: ["4", "10"], website: "teachfirst.de", image: "linear-gradient(135deg, #e8425c 0%, #f09070 100%)" },
  { id: 4, name: "Sea-Watch", category: "ngos", tagline: "Zivile Seenotrettung im Mittelmeer", description: "Seit 2015 rettet Sea-Watch Menschen aus Seenot und dokumentiert Menschenrechtsverletzungen an den europäischen Außengrenzen.", location: "Berlin", founded: "2015", sdgs: ["16", "10", "3"], website: "sea-watch.org", image: "linear-gradient(135deg, #1e3a5f 0%, #3a7bd5 100%)" },
  { id: 5, name: "PHLAIR", category: "startups", tagline: "Direct Air Capture – CO₂ direkt aus der Luft filtern", description: "PHLAIR entwickelt Technologie zur direkten CO₂-Abscheidung aus der Atmosphäre. Die Pilotanlage in Ismaning filtert 10t CO₂ pro Jahr. Gefördert durch den European Innovation Council.", location: "Ismaning", founded: "2021", sdgs: ["13", "9"], website: "phlair.com", image: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)" },
  { id: 6, name: "Ecosia", category: "startups", tagline: "Die Suchmaschine, die Bäume pflanzt", description: "Über 200 Millionen gepflanzte Bäume durch Werbeeinnahmen aus Suchanfragen. Ecosia ist ein Social Business, das 100% der Gewinne für den Planeten einsetzt.", location: "Berlin", founded: "2009", sdgs: ["13", "15"], website: "ecosia.org", image: "linear-gradient(135deg, #27ae60 0%, #a8e063 100%)" },
  { id: 7, name: "Tomorrow Bank", category: "startups", tagline: "Nachhaltiges Banking für eine grüne Zukunft", description: "Jeder Euro auf dem Konto fließt in nachhaltige Projekte statt in fossile Industrien. Tomorrow macht nachhaltiges Banking einfach und transparent.", location: "Hamburg", founded: "2018", sdgs: ["13", "12"], website: "tomorrow.one", image: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" },
  { id: 8, name: "Einhorn", category: "startups", tagline: "Fairstainability – fair produzierte Hygieneprodukte", description: "Kondome und Periodenprodukte aus fair gehandeltem Kautschuk. 50% der Gewinne werden in soziale und nachhaltige Projekte reinvestiert.", location: "Berlin", founded: "2015", sdgs: ["12", "8", "5"], website: "einhorn.my", image: "linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)" },
  { id: 9, name: "Klim", category: "startups", tagline: "Regenerative Landwirtschaft skalieren", description: "Verbindet Landwirt*innen mit Unternehmen, die CO₂-Reduktion durch gesunde Böden finanzieren. Technologie für die Agrarwende.", location: "Berlin", founded: "2020", sdgs: ["13", "15", "2"], website: "klim.eco", image: "linear-gradient(135deg, #4a7c59 0%, #8cb369 100%)" },
  { id: 10, name: "World Fund", category: "vcs", tagline: "Europas größter Climate-Tech-VC", description: "Investiert in Startups, die zusammen 2 Gigatonnen CO₂ einsparen können. Fondsvolumen: 350 Mio. EUR. Setzt faktisch Marktstandards für investierbaren Climate Impact.", location: "Berlin", founded: "2021", sdgs: ["13", "9"], website: "worldfund.vc", image: "linear-gradient(135deg, #0c2340 0%, #1a5276 100%)" },
  { id: 11, name: "ANANDA Impact Ventures", category: "vcs", tagline: "Impact Venture Capital seit 2009", description: "Einer der Pioniere im europäischen Impact Investing mit Fokus auf Gesundheit, Bildung und Finanzinklusion. Über 40 Portfolio-Unternehmen.", location: "München", founded: "2009", sdgs: ["3", "4", "1"], website: "ananda.vc", image: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)" },
  { id: 12, name: "BonVenture", category: "vcs", tagline: "Social Venture Capital aus München", description: "Deutschlands erster Social Venture Capital Fonds. Investiert in Sozialunternehmen mit messbarer gesellschaftlicher Wirkung seit 2003.", location: "München", founded: "2003", sdgs: ["1", "10", "17"], website: "bonventure.de", image: "linear-gradient(135deg, #355C7D 0%, #6C5B7B 100%)" },
  { id: 13, name: "Andreas Rickert", category: "personen", tagline: "Macht Impact für etablierte Akteure anschlussfähig", description: "CEO von PHINEO und Vorstand der Deutsche Nachhaltigkeit AG. Bringt Konzerne, Stiftungen und Staat in Impact-Logiken.", location: "Berlin", role: "CEO, PHINEO gAG · Vorstand, Deutsche Nachhaltigkeit AG", image: "linear-gradient(135deg, #20383A 0%, #365F63 100%)" },
  { id: 14, name: "Verena Pausder", category: "personen", tagline: "Macht Impact mehrheitsfähig", description: "Vorsitzende Startup-Verband. Bringt Impact-Themen in Wirtschafts- und Standortpolitik – Sichtbarkeit weit über die Szene hinaus. Verbindet Startup, Politik und Gesellschaft.", location: "Berlin", role: "Vorsitzende, Startup-Verband", image: "linear-gradient(135deg, #6C3483 0%, #AF7AC5 100%)" },
  { id: 15, name: "Tim Schumacher", category: "personen", tagline: "Entscheidet, was skalierbarer Impact ist", description: "Gründer World Fund. Größter deutscher Climate-Impact-VC. Setzt Marktstandards für investierbaren Impact und verschiebt Impact Richtung Industrie & Tech.", location: "Berlin", role: "Gründer, World Fund", image: "linear-gradient(135deg, #1a5276 0%, #2e86c1 100%)" },
  { id: 16, name: "Christian Vollmann", category: "personen", tagline: "Bringt Impact aus der NGO-Ecke in die Wirtschaft", description: "Purpose Foundation & Serial Founder. Treibt Verantwortungseigentum und verbindet die Tech-Startup-Szene mit dem Purpose-Ansatz.", location: "Berlin", role: "Gründer, Purpose Foundation", image: "linear-gradient(135deg, #1e3a2b 0%, #3a7c5f 100%)" },
  { id: 17, name: "Markus Sauerhammer", category: "personen", tagline: "Definiert, was der Staat als Impact behandelt", description: "SEND e.V. Hat Social Entrepreneurship politisch sichtbar gemacht und prägt Förderprogramme und Definitionen. Zentral für Gesetzgebung & Förderlogiken.", location: "Berlin", role: "Vorstand, SEND e.V.", image: "linear-gradient(135deg, #4a235a 0%, #7d3c98 100%)" },
  { id: 18, name: "Bertelsmann Stiftung", category: "stiftungen", tagline: "Gesellschaftliche Teilhabe durch evidenzbasierte Reformarbeit", description: "Eine der größten operativen Stiftungen Europas. Finanziert u.a. IMMPACT und treibt soziale Innovation in den Bereichen Bildung, Gesundheit und Demokratie.", location: "Gütersloh", founded: "1977", sdgs: ["4", "16", "10"], website: "bertelsmann-stiftung.de", image: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)" },
  { id: 19, name: "BMW Foundation", category: "stiftungen", tagline: "Responsible Leadership weltweit fördern", description: "Vernetzt Führungspersönlichkeiten für nachhaltige Entwicklung und gesellschaftlichen Wandel. Globales Netzwerk von über 2.000 Responsible Leaders.", location: "München", founded: "1970", sdgs: ["17", "16"], website: "bmw-foundation.org", image: "linear-gradient(135deg, #1c2833 0%, #566573 100%)" },
  { id: 20, name: "Schöpflin Stiftung", category: "stiftungen", tagline: "Demokratie, Medien und soziale Innovation", description: "Fördert systemischen Wandel durch Investitionen in zivilgesellschaftliche Infrastruktur und unabhängige Medien.", location: "Lörrach", founded: "2001", sdgs: ["16", "11"], website: "schoepflin-stiftung.de", image: "linear-gradient(135deg, #1a472a 0%, #3d8b5f 100%)" },
  { id: 21, name: "Reimann Investors", category: "familyoffices", tagline: "Impact-orientiertes Investieren mit Langfristperspektive", description: "Family Office mit Fokus auf nachhaltige Investments und gesellschaftliche Wirkung. Verbindet Vermögenserhalt mit positivem Impact.", location: "München", founded: "2014", website: "reimanninvestors.com", image: "linear-gradient(135deg, #7d6608 0%, #b7950b 100%)" },
  { id: 22, name: "Wala Capital", category: "familyoffices", tagline: "Kapital als Hebel für systemischen Wandel", description: "Investiert in Frühphasen-Startups mit messbarem sozialem und ökologischem Impact. Mission-aligned investing.", location: "Berlin", founded: "2019", website: "wala.capital", image: "linear-gradient(135deg, #6e4b1e 0%, #b8860b 100%)" },
  { id: 23, name: "Vaude", category: "unternehmen", tagline: "Europas nachhaltigster Outdoor-Ausrüster", description: "Klimaneutraler Firmensitz, faire Lieferketten, Gemeinwohl-Bilanz. Beweist seit über 30 Jahren, dass Wirtschaft anders geht.", location: "Tettnang", founded: "1974", sdgs: ["12", "13", "8"], website: "vaude.com", image: "linear-gradient(135deg, #1a5632 0%, #45a049 100%)" },
  { id: 24, name: "GLS Bank", category: "unternehmen", tagline: "Die erste sozial-ökologische Universalbank", description: "Seit 1974 fließt jeder Kredit in nachhaltige Projekte – von Bio-Landwirtschaft bis erneuerbare Energien. Über 350.000 Kund*innen.", location: "Bochum", founded: "1974", sdgs: ["1", "13", "7"], website: "gls.de", image: "linear-gradient(135deg, #2e5b3e 0%, #5dab6a 100%)" },
  { id: 25, name: "BMWK", category: "staat", tagline: "Bundesministerium für Wirtschaft und Klimaschutz", description: "Fördert soziale Innovation und Impact-Ökosysteme durch Programme wie NaWi – Nachhaltig Wirken. Zentral für die politische Rahmensetzung.", location: "Berlin", website: "bmwk.de", image: "linear-gradient(135deg, #1a1a2e 0%, #3a3a5c 100%)" },
  { id: 26, name: "GIZ", category: "staat", tagline: "Internationale Zusammenarbeit für nachhaltige Entwicklung", description: "Setzt weltweit Projekte um, die wirtschaftliche, ökologische und soziale Entwicklung verbinden. Über 25.000 Mitarbeitende in 120 Ländern.", location: "Bonn / Eschborn", website: "giz.de", image: "linear-gradient(135deg, #1a4a5c 0%, #2d7d9a 100%)" },
  { id: 27, name: "PHINEO", category: "infrastruktur", tagline: "Für mehr Wirkung – Home of Impact", description: "Analyse- und Beratungshaus für gesellschaftliches Engagement. Kurator und Orchestrator des Impact-Ökosystems in Deutschland. Betreiber der Impact Collective Plattform.", location: "Berlin", founded: "2010", website: "phineo.org", image: "linear-gradient(135deg, #20383A 0%, #6CBDC6 100%)" },
  { id: 28, name: "ProjectTogether", category: "infrastruktur", tagline: "Brücken bauen zwischen Innovation und Verwaltung", description: "Verbindet zivilgesellschaftliche Innovation mit staatlichen Strukturen für systemischen Wandel. Bekannt durch den UpdateDeutschland-Hackathon.", location: "Berlin", founded: "2017", website: "projecttogether.org", image: "linear-gradient(135deg, #f39c12 0%, #e74c3c 100%)" },
  { id: 29, name: "SEND e.V.", category: "infrastruktur", tagline: "Das Netzwerk für Social Entrepreneurship in Deutschland", description: "Politische Interessenvertretung und Vernetzung von über 800 Sozialunternehmen. Zentrale Stimme für Social Entrepreneurship in der Politik.", location: "Berlin", founded: "2017", website: "send-ev.de", image: "linear-gradient(135deg, #2980b9 0%, #6dd5fa 100%)" },
  { id: 30, name: "Circular Republic", category: "infrastruktur", tagline: "Die Plattform für Kreislaufwirtschaft", description: "Initiative von UnternehmerTUM. Vernetzt Startups, Unternehmen und Forschung für zirkuläre Geschäftsmodelle und regenerative Wirtschaft.", location: "München", founded: "2021", website: "circular-republic.org", image: "linear-gradient(135deg, #00b894 0%, #00cec9 100%)" },
  { id: 31, name: "TU München – ERI", category: "forschung", tagline: "Entrepreneurship Research Institute", description: "Erforscht Social Entrepreneurship und Impact-Messung. Brücke zwischen Wissenschaft und Praxis. Entwickelt Methoden zur Wirkungsmessung.", location: "München", website: "tum.de", image: "linear-gradient(135deg, #0d47a1 0%, #42a5f5 100%)" },
  { id: 32, name: "CSI Heidelberg", category: "forschung", tagline: "Centre for Social Investment", description: "Eines der führenden Forschungszentren für soziale Investitionen und zivilgesellschaftliches Engagement in Europa. An der Universität Heidelberg.", location: "Heidelberg", website: "csi.uni-heidelberg.de", image: "linear-gradient(135deg, #b71c1c 0%, #e57373 100%)" },
  { id: 33, name: "Concular", category: "startups", tagline: "Kreislaufwirtschaft im Bauwesen – KI-gestütztes Material-Matching", description: "Digitale Plattform für zirkuläres Bauen. KI-basiertes Empfehlungssystem matcht Angebot und Nachfrage für Baumaterialien aus Rückbau.", location: "Berlin", founded: "2020", sdgs: ["12", "11", "13"], website: "concular.de", image: "linear-gradient(135deg, #1a3a2e 0%, #2d7a5f 100%)" },
  { id: 34, name: "Deutsche Nachhaltigkeit", category: "vcs", tagline: "Börsennotierter Impact Investor – Nachhaltigkeit trifft Kapitalmarkt", description: "Investiert als Ankerinvestor Eigenkapital in ausgewählte Nachhaltigkeitsunternehmen und macht sie kapitalmarktfähig. Begleitet Portfolio-Unternehmen strategisch von der Entwicklung marktreifer Geschäftsmodelle bis zur Integration in nachhaltige Wertschöpfungsketten.", location: "Frankfurt am Main", founded: "2019", sdgs: ["13", "9", "8", "17"], website: "deutsche-nachhaltigkeit.com", image: "linear-gradient(135deg, #0020A3 0%, #1a3a8a 60%, #0a2540 100%)" },
  { id: 36, name: "BNW", category: "verbaende", tagline: "Die Stimme der nachhaltigen Wirtschaft", description: "Bundesverband Nachhaltige Wirtschaft e.V. – ökologisch orientierter Unternehmensverband und politische Interessenvertretung für nachhaltige Wirtschaftspolitik. Über 660 Mitgliedsunternehmen.", location: "Berlin", founded: "1992", sdgs: ["8", "12", "13"], website: "bnw-bundesverband.de", image: "linear-gradient(135deg, #2e5b3e 0%, #5B8C5A 100%)" },
  { id: 37, name: "B.A.U.M. e.V.", category: "verbaende", tagline: "Europas größtes Netzwerk für nachhaltiges Wirtschaften", description: "Bundesdeutscher Arbeitskreis für Umweltbewusstes Management. Vernetzt seit 1984 rund 800 Unternehmen und bietet praxisnahen Wissensaustausch zu Nachhaltigkeit.", location: "Hamburg", founded: "1984", sdgs: ["12", "13", "8"], website: "baumev.de", image: "linear-gradient(135deg, #4a7c59 0%, #8cb369 100%)" },
  { id: 38, name: "Bundesinitiative Impact Investing", category: "verbaende", tagline: "Kapital für Wirkung – nachhaltig und regenerativ investieren", description: "Fördert Bildung, Wissen und Standards rund um Impact Investing in Deutschland. Über 110 Mitglieder. Deutsches National Advisory Board des Global Steering Group for Impact Investment.", location: "Berlin", founded: "2020", sdgs: ["1", "8", "10", "13"], website: "bundesinitiative-impact-investing.org", image: "linear-gradient(135deg, #1a3a5f 0%, #4a8ab5 100%)" },
  { id: 35, name: "AUAR", category: "startups", tagline: "KI-gesteuerte Roboter-Mikrofabriken für nachhaltiges Bauen", description: "Produziert nachhaltige Holzrahmenhäuser in unter 12 Stunden mit KI und Robotik. Expandiert von UK in die USA und nach Europa.", location: "Bristol / London", founded: "2020", sdgs: ["11", "13", "8"], website: "auar.io", image: "linear-gradient(135deg, #1a1a2e 0%, #2d4a7a 100%)" },
];

// Imagery for each actor – portraits for persons, thematic photos for organizations
const actorImages = {
  // NGOs
  1: "https://picsum.photos/seed/vivaconagua2/800/600",
  2: "https://picsum.photos/seed/ichbinhier7/800/600",
  3: "https://picsum.photos/seed/teachfirst5/800/600",
  4: "https://picsum.photos/seed/seawatch3/800/600",
  // Startups
  5: "https://picsum.photos/seed/phlair9/800/600",
  6: "https://picsum.photos/seed/ecosia4/800/600",
  7: "https://picsum.photos/seed/tomorrowbank/800/600",
  8: "https://picsum.photos/seed/einhorn8/800/600",
  9: "https://picsum.photos/seed/klim6/800/600",
  // VCs
  10: "https://picsum.photos/seed/worldfund2/800/600",
  11: "https://picsum.photos/seed/anandavc/800/600",
  12: "https://picsum.photos/seed/bonventure3/800/600",
  // Personen – professional headshots
  13: "https://i.pravatar.cc/400?img=11",
  14: "https://i.pravatar.cc/400?img=32",
  15: "https://i.pravatar.cc/400?img=12",
  16: "https://i.pravatar.cc/400?img=14",
  17: "https://i.pravatar.cc/400?img=15",
  // Stiftungen
  18: "https://picsum.photos/seed/bertelsmann5/800/600",
  19: "https://picsum.photos/seed/bmwfound/800/600",
  20: "https://picsum.photos/seed/schoepflin4/800/600",
  // Family Offices
  21: "https://picsum.photos/seed/reimann7/800/600",
  22: "https://picsum.photos/seed/walacap/800/600",
  // Unternehmen
  23: "https://picsum.photos/seed/vaude5/800/600",
  24: "https://picsum.photos/seed/glsbank3/800/600",
  // Staat
  25: "https://picsum.photos/seed/bmwk9/800/600",
  26: "https://picsum.photos/seed/giz7/800/600",
  // Infrastruktur
  27: "https://picsum.photos/seed/phineo8/800/600",
  28: "https://picsum.photos/seed/projecttogether2/800/600",
  29: "https://picsum.photos/seed/sendev/800/600",
  30: "https://utum-subdomains.transforms.svdcdn.com/production/images/circular-republic/Header/circular-republic-header-homepage-keyvisual-black-getty1213747572.jpg",
  // Forschung
  31: "https://picsum.photos/seed/tumeri/800/600",
  32: "https://picsum.photos/seed/csiheid/800/600",
  33: "https://picsum.photos/seed/concular3/800/600",
  34: "https://deutsche-nachhaltigkeit.com/assets/_768x458_crop_center-center_60_line/DN_Stage.jpg",
  35: null,
  36: "https://picsum.photos/seed/bnw7/800/600",
  37: "https://picsum.photos/seed/baumev4/800/600",
  38: "https://picsum.photos/seed/biii5/800/600",
};

const actorLogos = {
  34: "https://www.google.com/s2/favicons?domain=deutsche-nachhaltigkeit.com&sz=128",
  35: "https://www.google.com/s2/favicons?domain=auar.io&sz=128",
};

const getGridLayout = (index) => {
  const patterns = [
    { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", height: "h-72 md:h-full", large: true },
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", height: "h-56", large: false },
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", height: "h-56", large: false },
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", height: "h-56", large: false },
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", height: "h-56", large: false },
    { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", height: "h-72 md:h-full", large: true },
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", height: "h-56", large: false },
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", height: "h-56", large: false },
  ];
  return patterns[index % patterns.length];
};

function PhineaLogo({ color = "#20383A", size = 40 }) {
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 120 98" fill="none">
      <text x="0" y="38" fill={color} fontFamily="Georgia, 'Times New Roman', serif" fontSize="42" fontWeight="700" letterSpacing="5">PHI</text>
      <text x="0" y="86" fill={color} fontFamily="Georgia, 'Times New Roman', serif" fontSize="42" fontWeight="700" letterSpacing="5">NEO</text>
    </svg>
  );
}

function CategoryBadge({ category }) {
  const colors = categoryColors[category];
  const cat = categories.find((c) => c.id === category);
  return (
    <span
      style={{ backgroundColor: colors.light, color: colors.text, borderColor: colors.bg }}
      className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full border"
    >
      {cat?.label}
    </span>
  );
}

function ActorCard({ actor, layout, onClick }) {
  const isLarge = layout.large;
  const imageUrl = actorImages[actor.id];
  const isPerson = actor.category === "personen";
  return (
    <div
      onClick={() => onClick(actor)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${layout.colSpan} ${layout.rowSpan} ${layout.height}`}
    >
      {/* Gradient fallback */}
      <div className="absolute inset-0" style={{ background: actor.image }} />
      {/* Photo overlay */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={actor.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={isPerson ? { objectPosition: "center 15%" } : {}}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-6">
        <CategoryBadge category={actor.category} />
        <h3
          className={`text-white font-bold mt-3 leading-tight ${isLarge ? "text-2xl md:text-4xl" : "text-lg md:text-xl"}`}
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {actor.name}
        </h3>
        <p className={`text-white/85 mt-2 leading-relaxed ${isLarge ? "text-base" : "text-sm"}`}>
          {actor.tagline}
        </p>
        {isLarge && (
          <p className="text-white/60 mt-2 text-sm leading-relaxed hidden md:block line-clamp-2">
            {actor.description}
          </p>
        )}
        <div className="flex items-center mt-3 text-white/60 group-hover:text-white transition-colors">
          <span className="text-sm font-medium">Profil ansehen</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Extended profile data per actor
const profileExtras = {
  1: { highlights: ["Projekte in über 20 Ländern", "Über 4 Mio. Menschen erreicht", "2024: Erweiterung auf WASH-Programme"], impact: [{ num: "4 Mio.", label: "Menschen mit Trinkwasser" }, { num: "20+", label: "Länder weltweit" }, { num: "28.000+", label: "Aktive Supporter" }], quote: "Wasser ist ein Menschenrecht – und wir machen daraus eine Bewegung.", longDesc: "Was 2006 als Initiative rund um den FC St. Pauli begann, hat sich zu einer der bekanntesten deutschen NGOs entwickelt. Viva con Agua verbindet Kreativität, Musik und Sport mit dem Engagement für sauberes Trinkwasser. Die Organisation arbeitet mit lokalen Partnern zusammen, um WASH-Projekte (Water, Sanitation, Hygiene) in Ländern wie Äthiopien, Nepal und Uganda umzusetzen. Besonders ist der Community-Ansatz: Tausende Freiwillige organisieren Konzerte, Kunstausstellungen und Sportevents, deren Erlöse in Projekte fließen." },
  5: { highlights: ["EU Innovation Council gefördert", "Pilotanlage: 10t CO₂/Jahr", "Patentierte Membran-Technologie"], impact: [{ num: "10t", label: "CO₂ pro Jahr (Pilot)" }, { num: "2024", label: "EIC Förderung erhalten" }, { num: "15", label: "Ingenieur*innen im Team" }], quote: "Die Atmosphäre ist unsere Mine – wir holen den Kohlenstoff zurück.", longDesc: "PHLAIR hat eine neuartige Membran-Technologie entwickelt, die CO₂ energieeffizient direkt aus der Umgebungsluft filtern kann. Im Gegensatz zu bestehenden Direct Air Capture-Verfahren arbeitet das System bei niedrigeren Temperaturen und benötigt deutlich weniger Energie. Die Pilotanlage in Ismaning bei München demonstriert die Technologie im Realbetrieb. Das Team aus Chemiker*innen und Ingenieur*innen arbeitet an der Skalierung auf industrielle Kapazitäten. Ziel: eine Megatonnen-Anlage bis 2030." },
  6: { highlights: ["200+ Millionen Bäume gepflanzt", "100% der Gewinne für den Planeten", "20+ Mio. aktive Nutzer*innen"], impact: [{ num: "200 Mio.+", label: "Bäume gepflanzt" }, { num: "20 Mio.", label: "Aktive Nutzer*innen" }, { num: "100%", label: "Gewinne reinvestiert" }], quote: "Jede Suche ist ein Baum. Jeder Baum ist ein Statement.", longDesc: "Ecosia ist die Suchmaschine, die ihre Werbeeinnahmen in Aufforstungsprojekte weltweit investiert. Gegründet 2009 in Berlin, hat sich Ecosia als Social Business positioniert, das 100% seiner Gewinne für Klima- und Naturschutz einsetzt. Die Server laufen auf erneuerbarer Energie, die Finanzberichte werden monatlich veröffentlicht. Ecosia investiert mittlerweile nicht nur in Bäume, sondern auch direkt in erneuerbare Energien und nachhaltige Unternehmen." },
  10: { highlights: ["350 Mio. EUR Fondsvolumen", "2-Gigatonnen-Ziel für CO₂-Einsparung", "Portfolio: 15+ Climate-Tech-Startups"], impact: [{ num: "350 Mio.", label: "EUR Fondsvolumen" }, { num: "2 Gt", label: "CO₂-Einspar-Potenzial" }, { num: "15+", label: "Portfolio-Unternehmen" }], quote: "Wir investieren nur in Startups, die das Potenzial haben, mindestens 100 Megatonnen CO₂ einzusparen.", longDesc: "World Fund ist Europas größter Climate-Tech-Venture-Capital-Fonds und investiert ausschließlich in Startups mit massivem CO₂-Einsparungspotenzial. Jedes Investment wird mit dem proprietären Climate Performance Potential (CPP) bewertet – nur Startups mit dem Potenzial, mindestens 100 Megatonnen CO₂ einzusparen, kommen ins Portfolio. Gegründet von Tim Schumacher und Daria Saharova, setzt der Fonds neue Maßstäbe dafür, was investierbarer Climate Impact bedeutet." },
  13: { highlights: ["Gründer & CEO von PHINEO seit 2010", "Berater der Bundesregierung", "Autor: 'Richtig Gutes tun'"], impact: [{ num: "15+", label: "Jahre Impact-Arbeit" }, { num: "400+", label: "Analysierte NGOs" }, { num: "3", label: "Beratungsmandate Bund" }], quote: "Impact ist kein Nischenthema – es ist die Zukunft jeder ernsthaften Investition.", longDesc: "Andreas Rickert hat mit PHINEO eine Institution geschaffen, die das Thema Wirkungsorientierung in Deutschland maßgeblich geprägt hat. Als ehemaliger McKinsey-Berater und Weltbank-Mitarbeiter bringt er die Sprache der Wirtschaft in die Sozialwirtschaft – und umgekehrt. Unter seiner Führung hat PHINEO über 400 gemeinnützige Projekte analysiert, das Wirkt-Siegel als Qualitätsstandard etabliert und Unternehmen wie die Deutsche Bank, BASF und BMW bei ihrer Impact-Strategie beraten. Rickert sitzt in mehreren Beratungsgremien der Bundesregierung und ist Autor des Buchs 'Richtig Gutes tun'." },
  14: { highlights: ["Vorsitzende Startup-Verband", "Bestseller-Autorin", "Gründerin Fox & Sheep / Digitale Bildung"], impact: [{ num: "1", label: "Spiegel-Bestseller" }, { num: "400+", label: "Startups im Verband" }, { num: "3 Mio.+", label: "Kinder erreicht (Fox & Sheep)" }], quote: "Wir brauchen eine Wirtschaft, in der Impact kein Add-on ist, sondern der Kern.", longDesc: "Verena Pausder ist eine der sichtbarsten Stimmen an der Schnittstelle von Unternehmertum, Innovation und gesellschaftlicher Verantwortung. Als Vorsitzende des Startup-Verbands vertritt sie über 400 Startups politisch und setzt sich für bessere Rahmenbedingungen ein. Mit Fox & Sheep hat sie preisgekrönte Lern-Apps für Kinder entwickelt, die weltweit über 3 Millionen Mal heruntergeladen wurden. Ihr Bestseller 'Das Neue Land' ist ein Plädoyer für ein moderneres, digitaleres und gerechteres Deutschland. Pausder bringt Impact-Themen konsequent in wirtschafts- und standortpolitische Debatten ein." },
  18: { highlights: ["Eine der größten Stiftungen Europas", "Über 300 Projekte jährlich", "Finanziert u.a. IMMPACT"], impact: [{ num: "300+", label: "Projekte jährlich" }, { num: "70+", label: "Länder" }, { num: "380", label: "Mitarbeitende" }], quote: "Gesellschaftlicher Wandel braucht Evidenz, Dialog und den Mut zur Umsetzung.", longDesc: "Die Bertelsmann Stiftung gehört zu den größten operativen Stiftungen Europas und arbeitet an der Schnittstelle von Forschung und gesellschaftlicher Praxis. Ihre Themen reichen von Bildung und Demokratie über Gesundheit bis hin zu internationaler Verständigung. Im Kontext der Impact Collective Plattform ist die Stiftung besonders relevant als Finanziererin von IMMPACT, dem methodischen Baustein für Startup-Wirkungsprofile. Die Stiftung bringt nicht nur Mittel, sondern auch methodische Expertise und ein breites Netzwerk in das Ökosystem ein." },
  23: { highlights: ["Klimaneutraler Firmensitz seit 2012", "EMAS-zertifiziert", "Gemeinwohl-Bilanz seit 2016"], impact: [{ num: "2012", label: "Klimaneutral seit" }, { num: "90%", label: "Nachhaltige Produkte" }, { num: "1.800", label: "Mitarbeitende" }], quote: "Wirtschaft muss dem Menschen dienen – nicht umgekehrt.", longDesc: "Vaude ist der Beweis, dass ein mittelständisches Unternehmen gleichzeitig wirtschaftlich erfolgreich und konsequent nachhaltig sein kann. Am Firmensitz in Tettnang am Bodensee betreibt CEO Antje von Dewitz ein EMAS-zertifiziertes Umweltmanagementsystem, eine eigene Kinderbetreuung und eine Kantine mit regionalen Bio-Produkten. 90% der Produkte tragen das Green Shape Label für Umweltfreundlichkeit. Vaude erstellt seit 2016 eine Gemeinwohl-Bilanz und macht transparent, wie das Unternehmen zur Gesellschaft beiträgt." },
  34: { highlights: ["Börsennotierter deutscher Impact Investor (WKN: A3DW40)", "Wissenschaftsbasiertes Impact-Assessment mit THE SEVENTEEN Netzwerk", "Veranstalter des International Impact Forum (Frankfurt, Wien, Abu Dhabi)", "Vorstand: Ole Nixdorff (CEO) und Dr. Andreas Rickert (PHINEO)"], impact: [{ num: "4", label: "Portfolio-Unternehmen" }, { num: "25+", label: "Impact-Score Minimum" }, { num: "3", label: "Int. Impact Forum Standorte" }], quote: "Die Zukunft des Geldes ist Nachhaltigkeit.", longDesc: "Die DN Deutsche Nachhaltigkeit AG ist ein börsennotierter Impact Investor mit Sitz im Frankfurter Opernturm. Als Ankerinvestor beteiligt sich DN mit Eigenkapital an ausgewählten Nachhaltigkeitsunternehmen und begleitet sie strategisch auf dem Weg zur Kapitalmarktfähigkeit. Das Impact-Assessment basiert auf einer wissenschaftlichen Methodik, entwickelt mit dem THE SEVENTEEN Netzwerk und der CBS International Business School. Portfolio-Unternehmen wie Algene, Susmata, Eco Motion und Soapeya werden nicht nur finanziell, sondern auch bei der Entwicklung marktreifer Geschäftsmodelle unterstützt. Mit dem International Impact Forum bringt DN regelmäßig globale Leader aus Impact Investing und nachhaltiger Finanzierung zusammen.", video: { id: "3xIbycMaGi4", title: "Neue Deutsche Nachhaltigkeit – Der Podcast" } },
  27: { highlights: ["Betreiber der Impact Collective Plattform", "Über 400 analysierte NGOs", "Wirkt-Siegel als Qualitätsstandard"], impact: [{ num: "400+", label: "Geprüfte Organisationen" }, { num: "60+", label: "Mitarbeitende" }, { num: "15+", label: "Jahre Wirkungsanalyse" }], quote: "Für mehr Wirkung. Überall.", longDesc: "PHINEO ist das Analyse- und Beratungshaus für gesellschaftliches Engagement in Deutschland. Seit 2010 analysiert PHINEO gemeinnützige Projekte, vergibt das Wirkt-Siegel als Qualitätsnachweis und berät Unternehmen, Stiftungen und die öffentliche Hand bei ihrer Impact-Strategie. Mit der Impact Collective Plattform geht PHINEO den nächsten Schritt: von der Analyse einzelner Organisationen hin zur intelligenten Vernetzung des gesamten Impact-Ökosystems. PHINEO agiert dabei als neutraler Orchestrator – die Organisation kuratiert, verbindet und dokumentiert, setzt aber selbst keine Projekte um." },
};

// ─── KI-Matching Scenarios ───
const matchingScenarios = {
  climate: { keywords: ["climate", "klima", "co2", "funding", "invest", "projekte", "portfolio", "finanzierung", "energie", "carbon", "emission"], title: "Climate & Green Finance", results: [
    { id: 10, match: 95, reasons: ["Europas größter Climate-Tech-VC", "CPP-Methodik für CO₂-Impact"], exclusion: "Nur Series A+" },
    { id: 5, match: 88, reasons: ["Direct Air Capture Technologie", "EIC-gefördert"], exclusion: "Noch in Pilotphase" },
    { id: 9, match: 82, reasons: ["Regenerative Landwirtschaft", "CO₂-Zertifikate-Modell"], exclusion: "Fokus auf DACH-Region" },
  ]},
  bildung: { keywords: ["bildung", "education", "schule", "kinder", "ngo", "teach", "sozial", "jugend"], title: "Bildung & Soziales", results: [
    { id: 3, match: 92, reasons: ["Bildungsgerechtigkeit in Brennpunktschulen", "Fellow-Programm skaliert"], exclusion: "Nur Deutschland" },
    { id: 18, match: 87, reasons: ["Finanziert Bildungsinnovation", "IMMPACT-Methodik"], exclusion: "Lange Bewerbungszyklen" },
    { id: 1, match: 79, reasons: ["Community-Ansatz übertragbar", "WASH & Bildung verknüpft"], exclusion: "Fokus auf Trinkwasser" },
  ]},
  digital: { keywords: ["digital", "hass", "hate", "demokratie", "gesellschaft", "politik", "medien", "netz"], title: "Digitale Gesellschaft", results: [
    { id: 2, match: 91, reasons: ["39.000 aktive Mitglieder gegen Hass im Netz", "Skalierbare Methodik"], exclusion: "Ehrenamtlich basiert" },
    { id: 20, match: 85, reasons: ["Fördert Demokratie & Medien", "Systemischer Wandel-Ansatz"], exclusion: "Regional begrenzt" },
    { id: 14, match: 78, reasons: ["Sichtbarkeit für digitale Bildung", "Politische Vernetzung"], exclusion: "Person, keine Organisation" },
  ]},
  kreislauf: { keywords: ["kreislauf", "circular", "recycling", "bauen", "material", "abfall", "ressource"], title: "Kreislaufwirtschaft", results: [
    { id: 33, match: 94, reasons: ["KI-basiertes Material-Matching", "Zirkuläres Bauen"], exclusion: "Noch frühe Phase" },
    { id: 30, match: 88, reasons: ["Plattform für Kreislaufwirtschaft", "UnternehmerTUM-Netzwerk"], exclusion: "Fokus auf Vernetzung, nicht Invest" },
    { id: 23, match: 81, reasons: ["Gemeinwohl-Bilanz Vorreiter", "Nachhaltige Lieferketten"], exclusion: "Outdoor-Branche spezifisch" },
  ]},
};

function findMatchingScenario(query) {
  const q = query.toLowerCase();
  for (const [key, scenario] of Object.entries(matchingScenarios)) {
    if (scenario.keywords.some(kw => q.includes(kw))) return { key, ...scenario };
  }
  return { key: "climate", ...matchingScenarios.climate };
}

// ─── Funding Flow Data (Startup → Investor) ───
const fundingMatches = [
  { name: "Deutsche Nachhaltigkeit AG", match: 93, logo: "DN", color: "#0020A3", reasons: ["Ankerinvestor für Nachhaltigkeitsunternehmen", "Strategische Begleitung zur Kapitalmarktfähigkeit", "Impact-Assessment passt zu AUAR's Profil"], exclusion: "Fokus auf DACH – internationale Expansion ggf. nicht im Scope", contact: "Ole Nixdorff, CEO" },
  { name: "World Fund", match: 89, logo: "WF", color: "#0c2340", reasons: ["Europas größter Climate-Tech-VC", "AUAR's CO₂-Einsparung passt zum 2-Gt-Ziel", "Climate Performance Potential (CPP) Score hoch"], exclusion: "Investiert typischerweise ab Series A", contact: "Daria Saharova, Partner" },
  { name: "Reimann Investors", match: 82, logo: "RI", color: "#7d6608", reasons: ["Impact-orientiertes Family Office", "Langfristperspektive passt zu Hardware-Startup", "Erfahrung mit nachhaltigen Investments"], exclusion: "Kleineres Ticketvolumen als klassische VCs", contact: "Investor Relations Team" },
];

// ─── Investor Flow Data (Investor → Startup) ───
const investorMatches = [
  { name: "Concular", match: 94, logo: "CO", color: "#1a3a2e", tagline: "KI-gestütztes Material-Matching für zirkuläres Bauen", reasons: ["KI-basiertes Empfehlungssystem für Baumaterialien", "Direkte CO₂-Einsparung durch Wiederverwendung", "Wachsender Markt für zirkuläres Bauen"], exclusion: "Noch frühe Skalierungsphase", kiDetail: "Concular nutzt ein KI-basiertes Empfehlungssystem (entwickelt mit dem Green AI Hub), das Angebot und Nachfrage von Baumaterialien aus Rückbau automatisch matcht. Die KI analysiert Materialeigenschaften, Verfügbarkeit und Projektanforderungen." },
  { name: "AUAR", match: 87, logo: "AU", color: "#1a1a2e", tagline: "Roboter-Mikrofabriken für nachhaltiges Bauen", reasons: ["KI-gesteuerte Robotik für Holzrahmenbau", "12h Produktionszeit pro Haus", "Expansion nach Europa geplant"], exclusion: "Hauptsitz UK, noch keine DACH-Präsenz", kiDetail: "AUAR setzt KI für die Steuerung von Roboter-Mikrofabriken ein. Die Algorithmen optimieren Holzschnitt, minimieren Materialverschwendung und steuern die automatisierte Montage von Holzrahmenhäusern." },
  { name: "PHLAIR", match: 82, logo: "PH", color: "#2d3436", tagline: "Direct Air Capture – CO₂ aus der Luft filtern", reasons: ["Patentierte Membran-Technologie", "EIC-Förderung als Qualitätssignal", "Skalierungspotenzial Richtung Megatonnen"], exclusion: "Technologie noch in Pilotphase, hoher Kapitalbedarf", kiDetail: "PHLAIR nutzt KI-gestützte Prozesssteuerung für ihre Direct Air Capture Membran-Technologie. Machine Learning optimiert die Filtrationsprozesse und Energieeffizienz in Echtzeit." },
];

function ProfileView({ actor, onBack, onGoToMatching }) {
  const cat = categories.find((c) => c.id === actor.category);
  const colors = categoryColors[actor.category];
  const extras = profileExtras[actor.id] || {};
  const relatedActors = actors.filter((a) => a.id !== actor.id && (a.category === actor.category || (actor.sdgs && a.sdgs && a.sdgs.some((s) => actor.sdgs.includes(s))))).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFBFB" }}>
      <Header onBack={onBack} onGoHome={onBack} onGoToMatching={() => onGoToMatching && onGoToMatching()} />

      {/* Hero */}
      <div className="relative h-72 md:h-96" style={{ background: actor.image }}>
        {actorImages[actor.id] && (
          <img
            src={actorImages[actor.id]}
            alt={actor.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={actor.category === "personen" ? { objectPosition: "center 15%" } : {}}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto">
          <CategoryBadge category={actor.category} />
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {actor.name}
          </h1>
          <p className="text-xl text-white/80 mt-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {actor.tagline}
          </p>
        </div>
      </div>

      {/* Impact Numbers Bar */}
      {extras.impact && (
        <div className="border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
            <div className="grid grid-cols-3 gap-8">
              {extras.impact.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>{item.num}</div>
                  <div className="text-xs md:text-sm mt-1" style={{ color: "#6CBDC6" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {actor.category === "personen" ? "Über " + actor.name.split(" ")[0] : "Über " + actor.name}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "#20383A" }}>
                {extras.longDesc || actor.description}
              </p>
            </div>

            {/* Quote */}
            {extras.quote && (
              <blockquote className="border-l-4 pl-6 py-2" style={{ borderColor: "#45B4C6" }}>
                <p className="text-xl italic leading-relaxed" style={{ color: "#365F63", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  "{extras.quote}"
                </p>
                {actor.category === "personen" && (
                  <cite className="block mt-3 text-sm not-italic font-medium" style={{ color: "#6CBDC6" }}>— {actor.name}</cite>
                )}
              </blockquote>
            )}

            {/* Video embed */}
            {extras.video && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Video</h2>
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${extras.video.id}`} title={extras.video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ border: 0 }} />
                </div>
                <p className="text-sm mt-2" style={{ color: "#6CBDC6" }}>{extras.video.title}</p>
              </div>
            )}

            {/* Role for persons */}
            {actor.category === "personen" && (
              <div className="p-6 rounded-2xl" style={{ backgroundColor: "#F6F8F8" }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#6CBDC6" }}>Aktuelle Rolle</h3>
                <p className="text-lg font-medium" style={{ color: "#20383A" }}>{actor.role}</p>
              </div>
            )}

            {/* Highlights */}
            {extras.highlights && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Highlights</h2>
                <div className="space-y-3">
                  {extras.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: colors.bg }} />
                      <p className="text-base" style={{ color: "#20383A" }}>{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related on platform */}
            {relatedActors.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Im Netzwerk</h2>
                <p className="text-sm mb-4" style={{ color: "#6CBDC6" }}>Weitere Akteure auf der Impact Collective Plattform</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedActors.map((rel) => (
                    <div key={rel.id} onClick={() => { onBack(); setTimeout(() => {}, 100); }} className="rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all">
                      <div className="h-28 relative" style={{ background: rel.image }}>
                        {actorImages[rel.id] && (
                          <img src={actorImages[rel.id]} alt={rel.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <CategoryBadge category={rel.category} />
                          <p className="text-white font-bold text-sm mt-1">{rel.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info card */}
            <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#F6F8F8" }}>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#6CBDC6" }}>Kategorie</h4>
                <p className="font-medium" style={{ color: "#20383A" }}>{cat?.label}</p>
              </div>
              {actor.location && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#6CBDC6" }}>Standort</h4>
                  <p className="font-medium" style={{ color: "#20383A" }}>{actor.location}</p>
                </div>
              )}
              {actor.founded && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#6CBDC6" }}>Gegründet</h4>
                  <p className="font-medium" style={{ color: "#20383A" }}>{actor.founded}</p>
                </div>
              )}
              {actor.website && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#6CBDC6" }}>Website</h4>
                  <p className="font-medium" style={{ color: "#45B4C6" }}>{actor.website}</p>
                </div>
              )}
            </div>

            {/* SDGs */}
            {actor.sdgs && actor.sdgs.length > 0 && (
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#F6F8F8" }}>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#6CBDC6" }}>Nachhaltigkeitsziele (SDGs)</h4>
                <div className="flex flex-wrap gap-2">
                  {actor.sdgs.map((sdg) => (
                    <span key={sdg} className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: colors.bg }}>
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* KI Matching hint */}
            <div className="rounded-2xl p-6 border border-gray-100 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#45B4C6" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <h4 className="text-sm font-semibold" style={{ color: "#20383A" }}>KI-Matching</h4>
              </div>
              <p className="text-sm" style={{ color: "#6CBDC6" }}>Unsere KI hat <strong style={{ color: "#20383A" }}>12 potenzielle Matches</strong> für {actor.name} identifiziert.</p>
              <button onClick={() => onGoToMatching && onGoToMatching(actor.name)} className="mt-3 w-full py-2.5 rounded-full font-semibold text-xs transition-all hover:opacity-90 border" style={{ borderColor: "#45B4C6", color: "#45B4C6" }}>
                Matches ansehen →
              </button>
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: "#20383A" }}>
              <h3 className="text-lg font-bold" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Kontakt aufnehmen</h3>
              <p className="text-white/60 text-sm mt-2">Interesse an einer Zusammenarbeit? PHINEO stellt den Kontakt her.</p>
              <button className="mt-4 w-full py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>
                Kontakt anfragen →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70" style={{ color: "#45B4C6" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zur Übersicht
        </button>
      </div>

      <Footer />
    </div>
  );
}

// ─── KI-Matching View ───
function MatchingView({ onBack, onSelectActor, initialQuery }) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState(initialQuery ? "thinking" : "input"); // input | thinking | results
  const [scenario, setScenario] = useState(null);
  const [visibleCards, setVisibleCards] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      const s = findMatchingScenario(initialQuery);
      setScenario(s);
      setTimeout(() => {
        setPhase("results");
      }, 2500);
    }
  }, []);

  useEffect(() => {
    if (phase === "results" && scenario) {
      const timer = setInterval(() => {
        setVisibleCards(prev => {
          if (prev >= scenario.results.length) { clearInterval(timer); return prev; }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(timer);
    }
  }, [phase, scenario]);

  function handleSubmit(text) {
    const q = text || query;
    if (!q.trim()) return;
    setQuery(q);
    const s = findMatchingScenario(q);
    setScenario(s);
    setPhase("thinking");
    setVisibleCards(0);
    setTimeout(() => setPhase("results"), 2500);
  }

  const chips = ["Klimaschutz-Investments finden", "NGOs im Bildungsbereich", "Gegen Hass im Netz", "Kreislaufwirtschaft & Bauen"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFBFB" }}>
      <Header onBack={onBack} onGoHome={onBack} />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ backgroundColor: "#45B4C6", color: "#20383A" }}>KI-Matching</div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Wen suchst du?</h1>
          <p className="mt-3" style={{ color: "#6CBDC6" }}>Beschreibe, was du suchst – unsere KI findet die passenden Akteure.</p>
        </div>

        {/* Chat area */}
        <div className="space-y-4 mb-8">
          {/* User message */}
          {query && (phase === "thinking" || phase === "results") && (
            <div className="flex justify-end">
              <div className="max-w-md px-5 py-3 rounded-2xl rounded-br-md text-white text-sm" style={{ backgroundColor: "#20383A" }}>{query}</div>
            </div>
          )}

          {/* Thinking animation */}
          {phase === "thinking" && (
            <div className="flex justify-start">
              <div className="px-5 py-3 rounded-2xl rounded-bl-md bg-white border border-gray-200 flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: "#45B4C6", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
                <span className="ml-2 text-xs" style={{ color: "#6CBDC6" }}>Analysiere Ökosystem...</span>
              </div>
            </div>
          )}

          {/* Results */}
          {phase === "results" && scenario && (
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="max-w-md px-5 py-3 rounded-2xl rounded-bl-md bg-white border border-gray-200 text-sm" style={{ color: "#20383A" }}>
                  Ich habe <strong>{scenario.results.length} Matches</strong> im Bereich <strong>{scenario.title}</strong> gefunden:
                </div>
              </div>
              {scenario.results.map((result, i) => {
                const actor = actors.find(a => a.id === result.id);
                if (!actor || i >= visibleCards) return null;
                const colors = categoryColors[actor.category];
                return (
                  <div key={result.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm cursor-pointer hover:shadow-lg transition-all" style={{ animation: "fadeSlideUp 0.5s ease-out" }} onClick={() => onSelectActor(actor)}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <CategoryBadge category={actor.category} />
                        <h3 className="text-lg font-bold mt-2" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>{actor.name}</h3>
                        <p className="text-sm" style={{ color: "#6CBDC6" }}>{actor.tagline}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: "#67DE93" }}>{result.match}%</div>
                        <div className="text-xs" style={{ color: "#6CBDC6" }}>Match</div>
                      </div>
                    </div>
                    <div className="space-y-1 mb-3">
                      {result.reasons.map((r, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm" style={{ color: "#20383A" }}>
                          <span style={{ color: "#67DE93" }}>✓</span> {r}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: "#FEF3ED", color: "#9C4A1A" }}>⚠ {result.exclusion}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Input area */}
        {phase === "input" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {chips.map(chip => (
                <button key={chip} onClick={() => { setQuery(chip); handleSubmit(chip); }} className="px-4 py-2 rounded-full text-sm border border-gray-200 bg-white hover:border-gray-400 transition-all" style={{ color: "#20383A" }}>{chip}</button>
              ))}
            </div>
            <div className="flex gap-3">
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="z.B. Ich suche Climate-Tech Investments..." className="flex-1 px-5 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-gray-400" style={{ color: "#20383A" }} />
              <button onClick={() => handleSubmit()} className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#45B4C6" }}>Suchen</button>
            </div>
          </div>
        )}

        {phase === "results" && (
          <div className="text-center mt-8">
            <button onClick={() => { setPhase("input"); setQuery(""); setScenario(null); setVisibleCards(0); }} className="px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all hover:opacity-80" style={{ borderColor: "#45B4C6", color: "#45B4C6" }}>Neue Suche starten</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ─── Startup Funding Flow (Gilles / AUAR → Investors) ───
function FundingFlowView({ onBack }) {
  const [step, setStep] = useState(1); // 1-6
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    if (step === 5) {
      const timer = setInterval(() => {
        setVisibleCards(prev => { if (prev >= fundingMatches.length) { clearInterval(timer); return prev; } return prev + 1; });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [step]);

  const stepLabels = ["Login", "Profil", "Pitchdeck", "Suchkriterien", "Ergebnisse", "Intro"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFBFB" }}>
      <Header onBack={onBack} onGoHome={onBack} />
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 <= step ? "text-white" : "text-gray-400 border border-gray-200"}`} style={i + 1 <= step ? { backgroundColor: "#67DE93", color: "#20383A" } : {}}>
                {i + 1 <= step ? "✓" : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${i + 1 <= step ? "font-semibold" : "text-gray-400"}`} style={i + 1 <= step ? { color: "#20383A" } : {}}>{label}</span>
              {i < stepLabels.length - 1 && <div className="w-6 h-px mx-1" style={{ backgroundColor: i + 1 < step ? "#67DE93" : "#e5e7eb" }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Login */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Anmelden</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "#6CBDC6" }}>E-Mail</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm" style={{ color: "#20383A" }}>gilles@auar.com</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "#6CBDC6" }}>Passwort</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm" style={{ color: "#20383A" }}>••••••••</div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 mt-4" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>Einloggen →</button>
            </div>
          </div>
        )}

        {/* Step 2: AUAR Profile */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="h-40 relative" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d4a7a 100%)" }}>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>AUAR</h2>
                <p className="text-white/70 text-sm">KI-gesteuerte Roboter-Mikrofabriken für nachhaltiges Bauen</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="text-xl font-bold" style={{ color: "#20383A" }}>2020</div><div className="text-xs" style={{ color: "#6CBDC6" }}>Gegründet</div></div>
                <div><div className="text-xl font-bold" style={{ color: "#20383A" }}>Bristol</div><div className="text-xs" style={{ color: "#6CBDC6" }}>Standort</div></div>
                <div><div className="text-xl font-bold" style={{ color: "#20383A" }}>12h</div><div className="text-xs" style={{ color: "#6CBDC6" }}>Pro Haus</div></div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#20383A" }}>AUAR produziert nachhaltige Holzrahmenhäuser in unter 12 Stunden mit KI und Robotik. Gilles Retsin (CTO) treibt die Expansion von UK in die USA und nach Europa.</p>
              <button onClick={() => setStep(3)} className="w-full py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>Profil bestätigen – weiter →</button>
            </div>
          </div>
        )}

        {/* Step 3: Pitchdeck Upload */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#EDFBF2" }}>
              <svg className="w-8 h-8" fill="none" stroke="#67DE93" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Pitchdeck hochladen</h2>
            <p className="text-sm mb-6" style={{ color: "#6CBDC6" }}>Lade dein aktuelles Pitchdeck hoch – unsere KI analysiert es für bessere Matches.</p>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 mb-4 hover:border-gray-400 transition-colors cursor-pointer">
              <p className="text-sm text-gray-400">PDF, PPTX oder Google Slides Link</p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-green-50 text-sm text-green-700 mb-4">✓ AUAR_Pitchdeck_2026.pdf hochgeladen</div>
            <button onClick={() => setStep(4)} className="w-full py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>Weiter →</button>
          </div>
        )}

        {/* Step 4: Search Criteria */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Was suchst du?</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "#6CBDC6" }}>Finanzierungsart</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium" style={{ color: "#20383A" }}>Seed Funding</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "#6CBDC6" }}>Volumen</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium" style={{ color: "#20383A" }}>1.000.000 EUR</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "#6CBDC6" }}>Branche</label>
                <div className="flex flex-wrap gap-2">
                  {["CleanTech", "Construction", "Robotik", "KI"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "#EDFBF2", color: "#1A6B38" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(5)} className="w-full py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 mt-4" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>KI-Matching starten →</button>
            </div>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Deine Matches</h2>
              <p className="text-sm mt-1" style={{ color: "#6CBDC6" }}>Basierend auf Pitchdeck, Profil und Suchkriterien</p>
            </div>
            {fundingMatches.map((match, i) => (
              i < visibleCards && (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm" style={{ animation: "fadeSlideUp 0.5s ease-out" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: match.color }}>{match.logo}</div>
                      <div>
                        <h3 className="font-bold" style={{ color: "#20383A" }}>{match.name}</h3>
                        <p className="text-xs" style={{ color: "#6CBDC6" }}>Kontakt: {match.contact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: "#67DE93" }}>{match.match}%</div>
                      <div className="text-xs" style={{ color: "#6CBDC6" }}>Match</div>
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    {match.reasons.map((r, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm" style={{ color: "#20383A" }}><span style={{ color: "#67DE93" }}>✓</span> {r}</div>
                    ))}
                  </div>
                  <div className="text-xs px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: "#FEF3ED", color: "#9C4A1A" }}>⚠ {match.exclusion}</div>
                  <div className="mt-3">
                    <button onClick={() => setStep(6)} className="px-5 py-2 rounded-full text-xs font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>Intro anfragen →</button>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Step 6: Intro sent */}
        {step === 6 && (
          <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#EDFBF2" }}>
              <svg className="w-8 h-8" fill="none" stroke="#67DE93" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Intro angefragt!</h2>
            <p className="text-sm mb-6" style={{ color: "#6CBDC6" }}>Wir haben eine Anfrage an den Investor gesendet. Du erhältst eine E-Mail, sobald der Kontakt hergestellt ist.</p>
            <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-left mb-6" style={{ color: "#20383A" }}>
              <p className="font-semibold mb-1">Intro-Mail Vorschau:</p>
              <p className="text-xs text-gray-500 italic">"Sehr geehrte(r) Ole Nixdorff, über die Impact Collective Plattform möchte sich AUAR (Roboter-Mikrofabriken für nachhaltiges Bauen) vorstellen. Das KI-Matching zeigt eine 93%-Übereinstimmung mit Ihrem Investmentprofil..."</p>
            </div>
            <button onClick={onBack} className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90" style={{ backgroundColor: "#20383A", color: "white" }}>Zurück zur Übersicht</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ─── Investor Scouting Flow (Sarah Lindner / Grünwald Capital → Startups) ───
function InvestorFlowView({ onBack }) {
  const [step, setStep] = useState(1); // 1-5
  const [visibleCards, setVisibleCards] = useState(0);
  const [expandedKI, setExpandedKI] = useState(null);

  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => setStep(4), 2500);
      return () => clearTimeout(t);
    }
    if (step === 4) {
      const timer = setInterval(() => {
        setVisibleCards(prev => { if (prev >= investorMatches.length) { clearInterval(timer); return prev; } return prev + 1; });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [step]);

  const stepLabels = ["Login", "Suchkriterien", "Analyse", "Matches", "Intro"];
  const gold = "#D4A843";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFBFB" }}>
      <Header onBack={onBack} onGoHome={onBack} />
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 <= step ? "text-white" : "text-gray-400 border border-gray-200"}`} style={i + 1 <= step ? { backgroundColor: gold, color: "#20383A" } : {}}>
                {i + 1 <= step ? "✓" : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${i + 1 <= step ? "font-semibold" : "text-gray-400"}`} style={i + 1 <= step ? { color: "#20383A" } : {}}>{label}</span>
              {i < stepLabels.length - 1 && <div className="w-6 h-px mx-1" style={{ backgroundColor: i + 1 < step ? gold : "#e5e7eb" }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Login */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Willkommen zurück, Sarah.</h2>
            <p className="text-center mb-6" style={{ color: gold }}>Bereit für neue Entdeckungen?</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: gold }}>E-Mail</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm" style={{ color: "#20383A" }}>s.lindner@gruenwald-capital.de</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: gold }}>Passwort</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm" style={{ color: "#20383A" }}>••••••••</div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 mt-4" style={{ backgroundColor: gold, color: "#20383A" }}>Einloggen →</button>
            </div>
          </div>
        )}

        {/* Step 2: Search Criteria */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Wonach suchen Sie?</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: gold }}>Investmentphase</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium" style={{ color: "#20383A" }}>Seed / Pre-Seed</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: gold }}>Ticketgröße</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium" style={{ color: "#20383A" }}>250.000 – 1.000.000 EUR</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: gold }}>Themenfelder</label>
                <div className="flex flex-wrap gap-2">
                  {["KI / Artificial Intelligence", "Nachhaltigkeit", "CleanTech"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "#FBF6E8", color: "#7A5F1A" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: gold }}>Region</label>
                <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium" style={{ color: "#20383A" }}>DACH + UK</div>
              </div>
              <button onClick={() => setStep(3)} className="w-full py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 mt-4" style={{ backgroundColor: gold, color: "#20383A" }}>Startups finden →</button>
            </div>
          </div>
        )}

        {/* Step 3: Analysis animation */}
        {step === 3 && (
          <div className="text-center py-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: gold, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>KI analysiert Startups...</h2>
            <p className="text-sm" style={{ color: gold }}>Durchsuche Datenbank nach KI & Nachhaltigkeit Seed-Startups</p>
          </div>
        )}

        {/* Step 4: Matches */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Ihre Startup-Matches</h2>
              <p className="text-sm mt-1" style={{ color: gold }}>KI & Nachhaltigkeit · Seed · DACH + UK</p>
            </div>
            {investorMatches.map((match, i) => (
              i < visibleCards && (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm" style={{ animation: "fadeSlideUp 0.5s ease-out" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: match.color }}>{match.logo}</div>
                      <div>
                        <h3 className="font-bold" style={{ color: "#20383A" }}>{match.name}</h3>
                        <p className="text-xs" style={{ color: "#6CBDC6" }}>{match.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: gold }}>{match.match}%</div>
                      <div className="text-xs" style={{ color: "#6CBDC6" }}>Match</div>
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    {match.reasons.map((r, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm" style={{ color: "#20383A" }}><span style={{ color: gold }}>✓</span> {r}</div>
                    ))}
                  </div>
                  <div className="text-xs px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: "#FEF3ED", color: "#9C4A1A" }}>⚠ {match.exclusion}</div>

                  {/* Expandable KI detail */}
                  <div className="mt-3">
                    <button onClick={() => setExpandedKI(expandedKI === i ? null : i)} className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-70" style={{ color: gold }}>
                      {expandedKI === i ? "▼" : "▶"} Wie setzt {match.name} KI ein?
                    </button>
                    {expandedKI === i && (
                      <div className="mt-2 px-4 py-3 rounded-xl text-xs leading-relaxed" style={{ backgroundColor: "#FBF6E8", color: "#20383A" }}>{match.kiDetail}</div>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setStep(5)} className="px-5 py-2 rounded-full text-xs font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: gold, color: "#20383A" }}>Intro anfragen →</button>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Step 5: Intro sent */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#FBF6E8" }}>
              <svg className="w-8 h-8" fill="none" stroke={gold} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>Intro angefragt!</h2>
            <p className="text-sm mb-6" style={{ color: gold }}>Die Impact Collective Plattform stellt den Kontakt her. Sie erhalten eine E-Mail mit den nächsten Schritten.</p>
            <button onClick={onBack} className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90" style={{ backgroundColor: "#20383A", color: "white" }}>Zurück zur Übersicht</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Header({ onBack, onGoToMatching, onGoHome }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="#20383A" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="cursor-pointer" onClick={onGoHome}>
            <PhineaLogo size={48} />
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="cursor-pointer" onClick={onGoHome}>
            <span className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Impact{" "}
            </span>
            <span className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#45B4C6", fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Collective
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" onClick={(e) => { e.preventDefault(); onGoHome && onGoHome(); }} className="text-sm font-medium tracking-wide uppercase hover:opacity-70 transition-opacity" style={{ color: "#20383A" }}>Akteure</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onGoToMatching && onGoToMatching(); }} className="text-sm font-medium tracking-wide uppercase hover:opacity-70 transition-opacity" style={{ color: "#20383A" }}>Matching</a>
          <a href="#" className="text-sm font-medium tracking-wide uppercase hover:opacity-70 transition-opacity" style={{ color: "#20383A" }}>Events</a>
          <a href="#" className="text-sm font-medium tracking-wide uppercase hover:opacity-70 transition-opacity" style={{ color: "#20383A" }}>Über uns</a>
          <button className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#20383A" }}>
            Kontakt
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#20383A" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="flex items-center gap-4">
              <PhineaLogo color="#FFFFFF" size={48} />
              <div className="w-px h-10 bg-white/20" />
              <div>
                <span className="text-xl font-bold text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Impact </span>
                <span className="text-xl font-bold" style={{ color: "#45B4C6", fontFamily: "Georgia, 'Times New Roman', serif" }}>Collective</span>
              </div>
            </div>
            <p className="text-white/50 text-sm mt-4 max-w-sm">
              Zusammen erreichen wir mehr. Die Plattform für das Impact-Ökosystem in Deutschland.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#6CBDC6" }}>Plattform</h4>
              <div className="space-y-3">
                {["Akteure entdecken", "KI-Matching", "Events", "Impact Gipfel"].map(item => (
                  <a key={item} href="#" className="block text-sm text-white/60 hover:text-white transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#6CBDC6" }}>PHINEO</h4>
              <div className="space-y-3">
                {["Über PHINEO", "Spenden mit Impact", "IMMPACT", "Wirkt-Siegel"].map(item => (
                  <a key={item} href="#" className="block text-sm text-white/60 hover:text-white transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#6CBDC6" }}>Kontakt</h4>
              <div className="space-y-3">
                {["Newsletter", "Anfahrt & Kontakt", "Datenschutz", "Impressum"].map(item => (
                  <a key={item} href="#" className="block text-sm text-white/60 hover:text-white transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-xs">© 2026 PHINEO gAG. Alle Rechte vorbehalten.</p>
          <p className="text-white/40 text-xs mt-2 md:mt-0">Gefördert durch das BMWK im Rahmen von NaWi – Nachhaltig Wirken (ESF+)</p>
        </div>
      </div>
    </footer>
  );
}

export default function ImpactCollective() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const [selectedActor, setSelectedActor] = useState(null);
  const [currentView, setCurrentView] = useState("listing"); // listing | profile | matching | funding | investor
  const [matchingQuery, setMatchingQuery] = useState(null);

  const filteredActors = activeFilter === "alle" ? actors : actors.filter((a) => a.category === activeFilter);

  function goToMatching(query) { setMatchingQuery(query || null); setCurrentView("matching"); window.scrollTo(0, 0); }
  function goToProfile(actor) { setSelectedActor(actor); setCurrentView("profile"); window.scrollTo(0, 0); }
  function goToFunding() { setCurrentView("funding"); window.scrollTo(0, 0); }
  function goToInvestor() { setCurrentView("investor"); window.scrollTo(0, 0); }
  function goToListing() { setSelectedActor(null); setCurrentView("listing"); window.scrollTo(0, 0); }

  // Inject CSS animations
  useEffect(() => {
    if (!document.getElementById("ic-animations")) {
      const style = document.createElement("style");
      style.id = "ic-animations";
      style.textContent = `
        @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (currentView === "funding") return <FundingFlowView onBack={goToListing} />;
  if (currentView === "investor") return <InvestorFlowView onBack={goToListing} />;
  if (currentView === "matching") return <MatchingView onBack={goToListing} onSelectActor={goToProfile} initialQuery={matchingQuery} />;
  if (currentView === "profile" && selectedActor) return <ProfileView actor={selectedActor} onBack={goToListing} onGoToMatching={goToMatching} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFBFB" }}>
      <Header onGoHome={goToListing} onGoToMatching={() => goToMatching()} />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(170deg, #20383A 0%, #2a4a4d 40%, #365F63 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-5xl">
            {/* Brand Name - huge */}
            <div className="mb-8">
              <h1 className="leading-none">
                <span
                  className="block text-7xl md:text-9xl font-bold tracking-tight"
                  style={{ color: "#FFFFFF", fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Impact
                </span>
                <span
                  className="block text-7xl md:text-9xl font-bold tracking-tight -mt-2 md:-mt-4"
                  style={{ color: "#45B4C6", fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Collective.
                </span>
              </h1>
            </div>
            {/* Claims */}
            <div className="max-w-2xl">
              <p
                className="text-2xl md:text-3xl font-normal leading-snug"
                style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Zusammen erreichen wir mehr.
              </p>
              <p
                className="text-xl md:text-2xl mt-3 font-normal"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Wir bringen die Richtigen zusammen.
              </p>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-32 -top-16 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: "#45B4C6" }} />
        <div className="absolute right-20 bottom-0 w-64 h-64 rounded-full opacity-8" style={{ backgroundColor: "#67DE93" }} />
        <div className="absolute left-1/2 -bottom-20 w-80 h-80 rounded-full opacity-5" style={{ backgroundColor: "#FFFFFF" }} />
      </section>

      {/* Compact Stats */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm" style={{ color: "#6CBDC6" }}>
          <span><strong style={{ color: "#20383A" }}>456+</strong> NGOs</span>
          <span className="text-gray-300">·</span>
          <span><strong style={{ color: "#20383A" }}>120+</strong> Startups</span>
          <span className="text-gray-300">·</span>
          <span><strong style={{ color: "#20383A" }}>85</strong> Kapitalgeber</span>
          <span className="text-gray-300">·</span>
          <span><strong style={{ color: "#20383A" }}>32</strong> Persönlichkeiten</span>
          <span className="text-gray-300">·</span>
          <span><strong style={{ color: "#20383A" }}>11</strong> Kategorien</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            const colors = categoryColors[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive ? "text-white shadow-md" : "text-gray-600 bg-white border-gray-200 hover:border-gray-400"
                }`}
                style={isActive ? { backgroundColor: cat.id === "alle" ? "#20383A" : colors?.bg || "#20383A", borderColor: cat.id === "alle" ? "#20383A" : colors?.bg || "#20383A" } : {}}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Actor Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          {filteredActors.map((actor, index) => (
            <ActorCard key={actor.id} actor={actor} layout={getGridLayout(index)} onClick={goToProfile} />
          ))}
          {/* CTA Banner for Startup/Investor Flows */}
          {(activeFilter === "alle" || activeFilter === "vcs" || activeFilter === "familyoffices") && (
            <div className="md:col-span-3 rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #20383A 0%, #2a4a4d 50%, #1a5276 100%)" }}>
              <div className="p-8 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>KI-gestütztes Matching</h3>
                    <p className="text-white/60 mt-2 text-sm">Finde den perfekten Partner – intelligent, kuratiert, mit Begründung.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={goToFunding} className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>Du bist Startup & suchst Funding? →</button>
                    <button onClick={goToInvestor} className="px-6 py-3 rounded-full font-semibold text-sm border-2 border-white/30 text-white hover:border-white/60 transition-all whitespace-nowrap">Du bist Investor & scoutest Startups? →</button>
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: "#45B4C6" }} />
              <div className="absolute right-20 top-0 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: "#67DE93" }} />
            </div>
          )}
        </div>
      </section>

      {/* KI Matching Teaser */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl p-10 md:p-16 relative overflow-hidden" style={{ backgroundColor: "#20383A" }}>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6" style={{ backgroundColor: "#45B4C6", color: "#20383A" }}>
              KI-Matching
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Finde die richtigen Partner.
            </h2>
            <p className="text-lg text-white/75 mt-6 leading-relaxed">
              Unser KI-gestütztes Matching bringt Kapitalgeber und Impact-Organisationen zusammen – intelligent, kuratiert und mit Begründung, warum es passt.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button onClick={goToInvestor} className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: "#67DE93", color: "#20383A" }}>
                Ich suche Projekte →
              </button>
              <button onClick={goToFunding} className="px-6 py-3 rounded-full font-semibold text-sm border-2 border-white/30 text-white hover:border-white/60 transition-all">
                Ich suche Finanzierung →
              </button>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: "#45B4C6" }} />
          <div className="absolute right-20 top-10 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: "#67DE93" }} />
        </div>
      </section>

      {/* Events */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#20383A", fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-48 relative" style={{ background: "linear-gradient(135deg, #20383A 0%, #45B4C6 100%)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-sm font-semibold tracking-widest uppercase opacity-75">September 2026</div>
                  <div className="text-4xl font-bold mt-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Impact Gipfel</div>
                  <div className="text-sm mt-2 opacity-75">Berlin · 18.–20. September</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Triff 200 Impact-Startups und die Investoren, Stiftungen und Unternehmen, die mit ihnen die Zukunft bauen wollen.
              </p>
              <div className="flex items-center mt-4 text-sm font-medium group-hover:translate-x-1 transition-transform" style={{ color: "#45B4C6" }}>
                Mehr erfahren →
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-48 relative" style={{ background: "linear-gradient(135deg, #365F63 0%, #67DE93 100%)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-sm font-semibold tracking-widest uppercase opacity-75">Webinar-Reihe</div>
                  <div className="text-4xl font-bold mt-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Matching Sessions</div>
                  <div className="text-sm mt-2 opacity-75">Online · Monatlich</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Thematische Online-Events, bei denen KI-generierte Matches persönlich vorgestellt und besprochen werden.
              </p>
              <div className="flex items-center mt-4 text-sm font-medium group-hover:translate-x-1 transition-transform" style={{ color: "#45B4C6" }}>
                Alle Events ansehen →
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}