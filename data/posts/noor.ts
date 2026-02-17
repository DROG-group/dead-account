import { Post } from '@/types/post';

export const noorPosts: Post[] = [
  // === OLDER POSTS (happy/settled) ===
  { id: 'noor-1', authorId: 'noor', content: 'Moved into the studio at the art centre today. Natural light all afternoon. This is where the real work begins.', day: -180, likes: 24, boosts: 3 },
  { id: 'noor-2', authorId: 'noor', content: 'Three years in Zuidhaven. I chose this place and I\'d choose it again.', day: -150, likes: 45, boosts: 8 },
  { id: 'noor-3', authorId: 'noor', content: 'My studio at night. This is where the real work happens. When it\'s just me and the paint and no one\'s watching.', day: -115, likes: 31, boosts: 5 },
  { id: 'noor-4', authorId: 'noor', content: 'New series coming together. Working title: "Undercurrent." Dark blues and greys. The sea at night. What moves beneath.', day: -90, likes: 28, boosts: 4 },
  { id: 'noor-5', authorId: 'noor', content: 'Coffee with @lisa_bakker. Some friendships are just easy. Like breathing.', day: -80, likes: 19, boosts: 1, mentions: ['lisa'] },
  { id: 'noor-6', authorId: 'noor', content: 'Teaching session with @mila_x03 today. She sees things I miss. That\'s how you know a student is becoming an artist.', day: -60, likes: 22, boosts: 2, mentions: ['mila'] },
  { id: 'noor-7', authorId: 'noor', content: 'Found some old files in the storage room while looking for frames. This building has layers.', day: -55, likes: 8, boosts: 0 },

  // === TRANSITION (growing anxiety) ===
  { id: 'noor-8', authorId: 'noor', content: 'Planning a joint exhibition with @david_chen for spring. "Surface Tension." His photographs, my paintings. Light meeting dark.', day: -42, likes: 34, boosts: 6, mentions: ['david'] },
  { id: 'noor-9', authorId: 'noor', content: 'Some documents you find by accident change everything.', day: -35, likes: 5, boosts: 0 },
  { id: 'noor-10', authorId: 'noor', content: 'Late night at the studio. The harbour lights through my window. This town is beautiful when it\'s quiet.', day: -30, likes: 18, boosts: 2 },
  { id: 'noor-11', authorId: 'noor', content: 'Working on something important. Can\'t share yet. But it matters.', day: -25, likes: 12, boosts: 1 },

  // === DELETED POSTS (removed by Thomas - revealed through Anouk) ===
  { id: 'noor-del-1', authorId: 'noor', content: 'Weird DM from an account I don\'t recognise. Blocked. Fourth one this month.', day: -19, isDeleted: true, evidenceId: 'deleted_posts', likes: 3 },
  { id: 'noor-del-2', authorId: 'noor', content: 'Meeting a friend for coffee later. Not at the usual place. Somewhere quieter.', day: -14, isDeleted: true, likes: 4 },
  { id: 'noor-del-3', authorId: 'noor', content: 'Locking up the studio and there\'s someone across the street just standing there. Third time this week.', day: -11, isDeleted: true, evidenceId: 'deleted_posts', likes: 2 },
  { id: 'noor-del-4', authorId: 'noor', content: 'To the person who keeps making new accounts to follow me: I see you. Please stop.', day: -7, isDeleted: true, evidenceId: 'deleted_posts', likes: 6 },
  { id: 'noor-del-5', authorId: 'noor', content: 'Does anyone else get that feeling someone walked past your window? Or is it just me.', day: -5, isDeleted: true, evidenceId: 'deleted_posts', likes: 4 },
  { id: 'noor-del-6', authorId: 'noor', content: 'Haven\'t slept properly in days.', day: -2, isDeleted: true, likes: 7 },

  // === FINAL POSTS ===
  { id: 'noor-12', authorId: 'noor', content: 'I think someone is watching me.', day: 0, timestamp: '21:17', likes: 2, boosts: 0 },

  // === BLACK SQUARE (posted by Thomas with Noor's phone) ===
  { id: 'noor-black', authorId: 'noor', content: '\u2b1b', day: 3, likes: 0, boosts: 0 },

  // === EPILOGUE POSTS ===
  { id: 'noor-ep-a', authorId: 'noor', content: 'I chose this place and I\'d choose it again. Thank you for not giving up.', day: 30, isEpilogue: true, epilogueEnding: 'a', likes: 89, boosts: 34 },
  { id: 'noor-ep-b', authorId: 'noor', content: 'I\'m back. I\'ll explain one day. Maybe.', day: 90, isEpilogue: true, epilogueEnding: 'b', likes: 42, boosts: 12 },
];
