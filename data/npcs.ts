import { Npc } from '@/types/npc';

export const npcs: Npc[] = [
  // === NOOR'S INNER CIRCLE ===
  { id: 'noor', handle: 'noor_creates', displayName: 'Noor El Amrani', bio: 'Artist. Painter. Zuidhaven. \u2728 Surface Tension exhibition coming soon.', role: 'Missing artist', age: 28, color: '#e0479e', group: 'inner_circle', canDM: false },
  { id: 'lisa', handle: 'lisa_bakker', displayName: 'Lisa Bakker', bio: 'Baker at Bakkerij Lisa. Best sourdough in Zuidhaven. Noor\'s best friend.', role: 'Baker / BFF', age: 27, color: '#f4a261', group: 'inner_circle', canDM: true },
  { id: 'thomas', handle: 'thomas_groot', displayName: 'Thomas Groot', bio: 'Personal trainer. No excuses. \ud83d\udcaa Zuidhaven Gym.', role: 'Gym instructor / Ex', age: 30, color: '#e63946', group: 'inner_circle', canDM: true },
  { id: 'sportief', handle: 'sportief_zh', displayName: 'Sportief ZH', bio: 'Fitness & healthy living in Zuidhaven', role: 'Alt account (Thomas)', color: '#c1121f', group: 'inner_circle', isAlt: true, altOf: 'thomas', canDM: false },
  { id: 'pim', handle: 'pim_veldkamp', displayName: 'Pim Veldkamp', bio: 'Journalist. Lokaal Nieuws Zuidhaven. Local journalism matters.', role: 'Journalist', age: 35, color: '#457b9d', group: 'inner_circle', canDM: true },
  { id: 'yara', handle: 'yara_el_amrani', displayName: 'Yara El Amrani', bio: 'Student. Noor\'s little sister. \ud83d\udcda', role: 'Student / Sister', age: 25, color: '#d36ba6', group: 'inner_circle', canDM: true },
  { id: 'david', handle: 'david_chen', displayName: 'David Chen', bio: 'Photographer. Studio at the Art Centre. Light is everything.', role: 'Photographer', age: 32, color: '#2a9d8f', group: 'inner_circle', canDM: true },
  { id: 'sophie', handle: 'sophie_janssen', displayName: 'Sophie Janssen', bio: 'Retired teacher. Noor\'s upstairs neighbour. 68 years young.', role: 'Retired teacher / Neighbour', age: 68, color: '#a8dadc', group: 'inner_circle', canDM: true },

  // === LOCAL GOVERNMENT & POWER ===
  { id: 'devries', handle: 'wethouder_devries', displayName: 'Hans de Vries', bio: 'Wethouder (Alderman) Ruimtelijke Ordening. Serving Zuidhaven since 2014.', role: 'Alderman', age: 55, color: '#264653', group: 'government', canDM: true },
  { id: 'smit', handle: 'burgemeester_smit', displayName: 'Kees Smit', bio: 'Burgemeester van Zuidhaven. For all residents.', role: 'Mayor', age: 60, color: '#1d3557', group: 'government', canDM: true },
  { id: 'politie', handle: 'gemeente_politie', displayName: 'Zuidhaven Politie', bio: 'Official account of Zuidhaven Police. For emergencies call 112.', role: 'Police (official)', color: '#3a5a8c', group: 'government', canDM: false },
  { id: 'vandijk', handle: 'agent_vandijk', displayName: 'Pieter van Dijk', bio: 'Wijkagent Zuidhaven-Centrum. Community policing.', role: 'Police officer', age: 42, color: '#4a7c9b', group: 'government', canDM: true },
  { id: 'kuiper', handle: 'raadslid_kuiper', displayName: 'Bram Kuiper', bio: 'Raadslid (Councillor). Opposition. Asking the hard questions.', role: 'Opposition councillor', age: 45, color: '#6b8f71', group: 'government', canDM: true },
  { id: 'lotte', handle: 'ambtenaar_dejong', displayName: 'Lotte de Jong', bio: 'Civil servant. Gemeente Zuidhaven. Procedures matter.', role: 'Civil servant', age: 40, color: '#7f8c8d', group: 'government', canDM: true },
  { id: 'willemsen', handle: 'griffier_willemsen', displayName: 'Jan Willemsen', bio: 'Griffier (Council Clerk). Publishing meeting minutes since 2005.', role: 'Council clerk', age: 50, color: '#5c6b73', group: 'government', canDM: false },

  // === DEVELOPER / BUSINESS ===
  { id: 'marco', handle: 'marco_vanbergen', displayName: 'Marco van Bergen', bio: 'CEO, Van Bergen Ontwikkeling. Building Zuidhaven\'s future.', role: 'Developer CEO', age: 48, color: '#d4a373', group: 'business', canDM: true },
  { id: 'vanbergen_bv', handle: 'vanbergen_bv', displayName: 'Van Bergen Ontwikkeling', bio: 'Premium development. Haven Nieuw Zuidhaven coming 2026.', role: 'Development company', color: '#c9a96e', group: 'business', canDM: false },
  { id: 'visser', handle: 'advocaat_visser', displayName: 'Gerard Visser', bio: 'Advocaat. Visser & Partners. Defamation is a serious matter.', role: 'Lawyer', age: 42, color: '#8b6914', group: 'business', canDM: true },
  { id: 'henk', handle: 'bouwvakker_henk', displayName: 'Henk Mulder', bio: 'Voorman bij Van Bergen. Building stuff. Beer on Friday.', role: 'Construction foreman', age: 35, color: '#b07d2e', group: 'business', canDM: true },

  // === LOCAL BUSINESS & COMMUNITY ===
  { id: 'bakkerij', handle: 'bakkerij_lisa', displayName: 'Bakkerij Lisa', bio: 'Artisan bakery. Open Tue-Sat 7:00-17:00. Best sourdough in town!', role: 'Bakery (business)', color: '#f4a261', group: 'community', canDM: false },
  { id: 'ahmed', handle: 'kapper_ahmed', displayName: 'Ahmed Yilmaz', bio: 'Kapper since 1994. Your barber knows everything. \u2702\ufe0f', role: 'Barber', age: 45, color: '#e07a5f', group: 'community', canDM: true },
  { id: 'willem', handle: 'apotheek_groen', displayName: 'Willem Groen', bio: 'Apotheker. Apotheek Zuidhaven. Your health, our care.', role: 'Pharmacist', age: 50, color: '#81b29a', group: 'community', canDM: true },
  { id: 'cafe', handle: 'cafe_tmorgenrood', displayName: "Caf\u00e9 't Morgenrood", bio: 'Your living room in Zuidhaven. Live music Fri & Sat.', role: 'Caf\u00e9', color: '#e9c46a', group: 'community', canDM: false },
  { id: 'nina', handle: 'boekhandel_nina', displayName: 'Nina Verhoeven', bio: 'Boekhandel De Brug. Books open worlds. \ud83d\udcda', role: 'Bookseller', age: 55, color: '#9c6644', group: 'community', canDM: true },
  { id: 'gerrit', handle: 'slager_pietersen', displayName: 'Gerrit Pietersen', bio: 'Slager. 30 years serving Zuidhaven. Early mornings, honest work.', role: 'Butcher', age: 60, color: '#bc4749', group: 'community', canDM: true },
  { id: 'margriet', handle: 'bloemen_margriet', displayName: 'Margriet Hoekstra', bio: 'Bloemen & meer. Event flowers. Organized Noor\'s exhibition!', role: 'Florist', age: 40, color: '#ff85a1', group: 'community', canDM: true },
  { id: 'jan', handle: 'fietsenmaker_jan', displayName: 'Jan de Wit', bio: 'Fietsenmaker. If it has two wheels, I fix it.', role: 'Bike mechanic', age: 35, color: '#577590', group: 'community', canDM: true },

  // === TEENS / YOUNG PEOPLE ===
  { id: 'mila', handle: 'mila_x03', displayName: 'Mila Jansen', bio: 'Art student. Learning from the best. @noor_creates is my mentor \u2764\ufe0f', role: 'Art student', age: 17, color: '#ff6b6b', group: 'teens', canDM: true },
  { id: 'jordy', handle: 'jordyyy', displayName: 'Jordy van Leeuwen', bio: 'Skater. Harbour tiles > skatepark. \ud83d\udeb4', role: 'Skateboarder', age: 16, color: '#4ecdc4', group: 'teens', canDM: true },
  { id: 'anouk', handle: 'anouk_drawings', displayName: 'Anouk Smeets', bio: 'Drawing every day. Screenshotting everything beautiful. 15.', role: 'Young artist', age: 15, color: '#ff9ff3', group: 'teens', canDM: true },
  { id: 'bas', handle: 'basss_music', displayName: 'Bas Dekker', bio: 'DJ / Producer. Open mic regular at \'t Morgenrood. \ud83c\udfb5', role: 'DJ', age: 18, color: '#48dbfb', group: 'teens', canDM: true },
  { id: 'emma', handle: 'emma_dansen', displayName: 'Emma Visser', bio: 'Ballet. Late practice walks home. Zuidhaven after dark is creepy.', role: 'Ballet student', age: 17, color: '#feca57', group: 'teens', canDM: true },

  // === MEDIA & COMMUNITY ===
  { id: 'lokaalnieuws', handle: 'lokaalnieuws_zh', displayName: 'Lokaal Nieuws Zuidhaven', bio: 'Local news for Zuidhaven and surroundings. Tips? DM us.', role: 'Local news', color: '#636e72', group: 'media', canDM: false },
  { id: 'weerstation', handle: 'weerstation_zh', displayName: 'Weerstation Zuidhaven', bio: 'Automated weather updates for Zuidhaven. \u2601\ufe0f', role: 'Weather station', color: '#74b9ff', group: 'media', canDM: false },
  { id: 'bieb', handle: 'bieb_zuidhaven', displayName: 'Bibliotheek Zuidhaven', bio: 'Your library. Books, events, community resources.', role: 'Library', color: '#a29bfe', group: 'media', canDM: false },
  { id: 'dorpsraad', handle: 'dorpsraad_zh', displayName: 'Dorpsraad Zuidhaven', bio: 'Community council. Your voice in local governance.', role: 'Community council', color: '#55a38e', group: 'media', canDM: false },

  // === SUSPICIOUS / OTHER ===
  { id: 'wakker', handle: 'wakker_nederland', displayName: 'Ruud Bakels', bio: 'TRUTH SEEKER. They don\'t want you to know. CONNECT THE DOTS. \ud83d\udd0d', role: 'Conspiracy theorist', age: 42, color: '#fdcb6e', group: 'suspicious', canDM: true },
  { id: 'anoniem', handle: 'anoniem_tipgever', displayName: 'Anonieme Tipgever', bio: 'Some things need to be said. Read between the lines.', role: 'Anonymous tipster (Lotte)', color: '#636e72', group: 'suspicious', canDM: true },
  { id: 'schaduwraad', handle: 'schaduwraad', displayName: 'De Schaduwraad', bio: 'The REAL council of Zuidhaven. (satire) \ud83e\udd21', role: 'Joke account (Jordy)', color: '#6c5ce7', group: 'suspicious', canDM: false },
  { id: 'dominee', handle: 'dominee_bakels', displayName: 'Ds. Herman Bakels', bio: 'Dominee, Protestantse Kerk Zuidhaven. All are welcome.', role: 'Pastor', age: 58, color: '#2d3436', group: 'suspicious', canDM: true },
];

export const npcMap: Record<string, Npc> = {};
for (const npc of npcs) {
  npcMap[npc.id] = npc;
}

export function getNpcByHandle(handle: string): Npc | undefined {
  return npcs.find(n => n.handle === handle);
}

export function getNpcById(id: string): Npc | undefined {
  return npcMap[id];
}
