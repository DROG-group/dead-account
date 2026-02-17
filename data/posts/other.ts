import { Post } from '@/types/post';

export const otherPosts: Post[] = [
  // === MARCO ===
  { id: 'marco-1', authorId: 'marco', content: 'Zuidhaven waterfront will transform this town. Vision becomes reality. Proud of the team at Van Bergen Ontwikkeling.', day: -100, likes: 10 },
  { id: 'marco-2', authorId: 'marco', content: 'My thoughts are with @noor_creates. Hope she\'s found safe and well.', day: 4, likes: 5, mentions: ['noor'] },

  // === VAN BERGEN BV ===
  { id: 'vb-1', authorId: 'vanbergen_bv', content: 'Van Bergen Ontwikkeling announces acquisition of waterfront development rights. Haven Nieuw Zuidhaven \u2014 luxury marina living.', day: -110, likes: 7 },
  { id: 'vb-2', authorId: 'vanbergen_bv', content: '[Architect rendering: modern waterfront development with luxury apartments and marina berths.] Haven Nieuw Zuidhaven \u2014 coming 2026.', day: -90, likes: 12, boosts: 2 },
  { id: 'vb-3', authorId: 'vanbergen_bv', content: 'Now hiring: Project managers, site engineers, and marketing staff for Haven Nieuw Zuidhaven. Apply at vanbergen.nl/careers', day: -60, likes: 4 },

  // === VISSER (LAWYER) ===
  { id: 'visser-1', authorId: 'visser', content: 'Reminder: defamation is a serious matter under Dutch law. Spreading unverified claims online has consequences.', day: -20, likes: 3 },

  // === HENK ===
  { id: 'henk-1', authorId: 'henk', content: 'Another week on site. Hard graft but the waterfront project is looking good. Beer o\'clock soon. \ud83c\udf7a', day: -15, likes: 5 },
  { id: 'henk-2', authorId: 'henk', content: 'Friday beers with the lads. Thomas is good company when he\'s not brooding about his ex. \ud83d\ude02', day: -8, likes: 3 },

  // === WAKKER NEDERLAND ===
  { id: 'wakker-1', authorId: 'wakker', content: 'Waterfront sold for PENNIES. Council is in bed with developers. FOLLOW THE MONEY. \ud83d\udd0d', day: -70, likes: 2, boosts: 1 },
  { id: 'wakker-2', authorId: 'wakker', content: 'De Vries and Marco van Bergen \u2014 same university (Delft \'93). Same golf club. Same deals. COINCIDENCE? I think NOT.', day: -50, likes: 3, isEvidence: true, evidenceId: 'university_connection' },
  { id: 'wakker-3', authorId: 'wakker', content: 'WHY IS NO ONE TALKING ABOUT THIS? \u20ac2.8M market value. Sold for \u20ac1.6M. WHERE DID THE \u20ac1.2M GO??? CONNECT. THE. DOTS.', day: -30, likes: 4, boosts: 2, isEvidence: true, evidenceId: 'valuation_discrepancy' },
  { id: 'wakker-4', authorId: 'wakker', content: 'What was Noor working on? What did she FIND? This is all connected. The shadow council doesn\'t want you to know.', day: -10, likes: 2 },
  { id: 'wakker-5', authorId: 'wakker', content: 'Black square is a WARNING. Noor knew too much. "They" silenced her. Wake up, Zuidhaven.', day: 3, likes: 3, boosts: 1 },

  // === ANONIEM TIPGEVER ===
  { id: 'anon-1', authorId: 'anoniem', content: 'Not everything sold by the gemeente goes for a fair price.', day: -80, likes: 1 },
  { id: 'anon-2', authorId: 'anoniem', content: 'Agenda item 14b. Read it carefully. Ask yourself: who benefits?', day: -60, likes: 2 },
  { id: 'anon-3', authorId: 'anoniem', content: 'When the buyer and the seller go to the same gym, golf course, and university... coincidence or pattern?', day: -45, likes: 3, isEvidence: true, evidenceId: 'golf_club' },
  { id: 'anon-4', authorId: 'anoniem', content: 'The valuation was commissioned by the buyer\'s recommended firm. Let that sink in.', day: -30, likes: 2, isEvidence: true, evidenceId: 'veritas_vastgoed' },
  { id: 'anon-5', authorId: 'anoniem', content: 'Can\'t say more. Said too much already. But the documents exist. Someone will find them.', day: -14, likes: 4, boosts: 1 },

  // === SCHADUWRAAD ===
  { id: 'schad-1', authorId: 'schaduwraad', content: 'OFFICIAL DECREE from the Shadow Council: All citizens must eat Lisa\'s sourdough or face exile. \ud83c\udf5e\ud83d\udc51', day: -25, likes: 14, boosts: 3 },
  { id: 'schad-2', authorId: 'schaduwraad', content: 'Breaking: Shadow Council votes 3-0 to rename Zuidhaven to "Zuiddorp." Motion carried. \ud83e\udd21', day: -5, likes: 8 },

  // === DOMINEE ===
  { id: 'dom-1', authorId: 'dominee', content: 'Had a difficult pastoral conversation today. Some people carry pain and direct it at others instead of facing it.', day: -7, timestamp: '20:00', likes: 7 },
  { id: 'dom-2', authorId: 'dominee', content: 'In times of uncertainty, resist the urge to accuse without evidence. But also: ask yourself who is hurting. There is always more than one story.', day: 3, likes: 12, boosts: 2 },

  // === LOKAAL NIEUWS ===
  { id: 'ln-1', authorId: 'lokaalnieuws', content: 'Council agenda published for next meeting. Full text available at lokaalnieuws.zh. Items include budget review, traffic, property disposals.', day: -45, likes: 4 },
  { id: 'ln-2', authorId: 'lokaalnieuws', content: 'LOCAL: Artist Noor El Amrani (28) reported missing by family. Police say "no indication of criminal activity at this time." Anyone with information contact Zuidhaven Politie.', day: 1, likes: 18, boosts: 9 },
  { id: 'ln-3', authorId: 'lokaalnieuws', content: 'UPDATE: Police maintain no evidence of foul play in El Amrani case. Family calls for more thorough investigation.', day: 4, likes: 12, boosts: 5 },

  // === WEERSTATION ===
  { id: 'weer-1', authorId: 'weerstation', content: 'Zuidhaven 22:00 \u2014 Clear skies, 8\u00b0C, wind NW 15 km/h. Visibility: excellent.', day: 0, timestamp: '22:00', likes: 1 },

  // === BIEB ===
  { id: 'bieb-1', authorId: 'bieb', content: 'Community resources: If you or someone you know is experiencing domestic violence or stalking, help is available. Veilig Thuis: 0800-2000.', day: -60, likes: 6, boosts: 3 },
  { id: 'bieb-2', authorId: 'bieb', content: 'New books this week! Graphic novels, Dutch literature, and a wonderful children\'s section update. Come visit!', day: -20, likes: 5 },

  // === DORPSRAAD ===
  { id: 'dorps-1', authorId: 'dorpsraad', content: 'Community survey results: 72% of respondents OPPOSED the current waterfront marina development plan. Full report available.', day: -150, likes: 14, boosts: 6, isEvidence: true, evidenceId: 'community_survey' },

  // === SPORTIEF ===
  { id: 'sport-1', authorId: 'sportief', content: 'Healthy living starts with small steps. \ud83d\udcaa #fitness #Zuidhaven', day: -120, likes: 1 },
  { id: 'sport-2', authorId: 'sportief', content: 'Morning runs along the harbour \u2014 best way to start the day!', day: -90, likes: 0 },
  { id: 'sport-3', authorId: 'sportief', content: 'Stay consistent, stay strong. \ud83d\udc4a', day: -60, likes: 0 },
];
