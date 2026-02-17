import { Post } from '@/types/post';

export const communityPosts: Post[] = [
  // === BAKKERIJ ===
  { id: 'bak-1', authorId: 'bakkerij', content: 'Fresh sourdough out of the oven! Tue-Sat, first come first served. \ud83c\udf5e', day: -30, likes: 12 },
  { id: 'bak-2', authorId: 'bakkerij', content: 'Opening a bit late today. Back by 8:00! Sorry for any inconvenience.', day: 1, timestamp: '07:45', likes: 4 },

  // === AHMED ===
  { id: 'ahmed-1', authorId: 'ahmed', content: '30 years cutting hair in Zuidhaven. This chair has heard more stories than any therapist. \u2702\ufe0f', day: -60, likes: 19, boosts: 2 },
  { id: 'ahmed-2', authorId: 'ahmed', content: 'Some people come in for a haircut. Some people come in because they need to talk. I know the difference.', day: -10, likes: 8 },

  // === WILLEM ===
  { id: 'willem-1', authorId: 'willem', content: 'Flu season reminder: wash hands, stay home if sick, get your vaccinations. Simple stuff.', day: -45, likes: 6 },

  // === CAFÉ ===
  { id: 'cafe-1', authorId: 'cafe', content: 'Friday night at \'t Morgenrood! Live music, cold beer, warm company. See you there! \ud83c\udfb5\ud83c\udf7a', day: -14, likes: 22, boosts: 3 },
  { id: 'cafe-2', authorId: 'cafe', content: 'Great atmosphere tonight! Full house for open mic. [Photo: crowded café interior. In the background, Thomas Groot and Hans de Vries visible at a corner table.]', day: -14, likes: 16, boosts: 1, isEvidence: true, evidenceId: 'cafe_photo' },
  { id: 'cafe-3', authorId: 'cafe', content: 'Another great night! Closing up now. Thanks to everyone who came out. \ud83d\ude4f', day: 0, timestamp: '22:30', likes: 8 },

  // === NINA ===
  { id: 'nina-1', authorId: 'nina', content: 'New arrivals this week! Come browse. A book finds its reader. \ud83d\udcda', day: -30, likes: 9 },
  { id: 'nina-2', authorId: 'nina', content: 'A friend asked me to hold a sealed envelope. Said "if someone asks with the right question, give it to them." Cryptic, but I trust him.', day: -10, likes: 5 },

  // === GERRIT ===
  { id: 'gerrit-1', authorId: 'gerrit', content: 'Early morning deliveries. The harbour at 5am. Some things never change.', day: -20, likes: 7 },
  { id: 'gerrit-2', authorId: 'gerrit', content: 'Didn\'t sleep well. Kept thinking about what I saw last night. A woman running past the shop, quarter to eleven. Running like she was scared, not like exercise.', day: 1, timestamp: '07:00', likes: 11, boosts: 2 },
  { id: 'gerrit-3', authorId: 'gerrit', content: 'Told the police what I saw. They wrote it down. Didn\'t seem very interested.', day: 2, likes: 14 },

  // === MARGRIET ===
  { id: 'margriet-1', authorId: 'margriet', content: 'Flowers for @noor_creates\' exhibition! Can\'t wait for Surface Tension. This town needs more art. \ud83c\udf3a', day: -35, likes: 13, mentions: ['noor'] },
  { id: 'margriet-2', authorId: 'margriet', content: 'Spring arrangements coming together beautifully. Tulips, hyacinths, and daffodils. \ud83c\udf37', day: -15, likes: 10 },

  // === JAN ===
  { id: 'jan-1', authorId: 'jan', content: 'Fixed a nice silver Golf owner\'s bike today. He doesn\'t seem like the cycling type. More of a gym guy. \ud83d\udeb2', day: -7, likes: 4 },
  { id: 'jan-2', authorId: 'jan', content: 'Working late. Someone\'s parked outside the art centre again. Silver Golf. Car park is around back, mate.', day: 0, timestamp: '22:15', likes: 3, isEvidence: true, evidenceId: 'silver_golf' },
];
