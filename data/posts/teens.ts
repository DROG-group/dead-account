import { Post } from '@/types/post';

export const teenPosts: Post[] = [
  // === MILA ===
  { id: 'mila-1', authorId: 'mila', content: '@noor_creates is the best teacher. Doesn\'t just show you technique \u2014 shows you how to see. \u2764\ufe0f', day: -14, likes: 8, mentions: ['noor'] },
  { id: 'mila-2', authorId: 'mila', content: 'Noor gave me something to hold onto. She seemed stressed. Hope she\'s okay. \ud83d\ude1f', day: -12, likes: 5 },
  { id: 'mila-3', authorId: 'mila', content: '@noor_creates please come back. We need you. I need you.', day: 1, likes: 14, boosts: 3, mentions: ['noor'] },
  { id: 'mila-4', authorId: 'mila', content: 'Don\'t believe that black square is from Noor. Not her aesthetic. Not her language. Someone else did this.', day: 3, likes: 17, boosts: 4 },

  // === JORDY ===
  { id: 'jordy-1', authorId: 'jordy', content: 'Midnight harbour sessions. Harbour tiles are perfect when dry. \ud83d\udeb4\u2728', day: -10, likes: 6 },
  { id: 'jordy-2', authorId: 'jordy', content: 'Skating past sophie j\'s building and some dude pulled up in a car, woman got in and drove off fast. Not my business but dramatic lol', day: 0, timestamp: '23:15', likes: 4 },
  { id: 'jordy-3', authorId: 'jordy', content: 'That @noor_creates thing... I might have seen something that night but idk if it\'s relevant. Should I go to police? They never take me serious lol', day: 3, likes: 8, mentions: ['noor'] },

  // === ANOUK ===
  { id: 'anouk-1', authorId: 'anouk', content: 'Screenshotting all @noor_creates posts to study her composition. She makes every image tell a story. Goals. \ud83d\udcf8', day: -30, likes: 7, mentions: ['noor'] },
  { id: 'anouk-2', authorId: 'anouk', content: 'I went back through my saved screenshots of @noor_creates posts and some are GONE from her account. Posts from the last few weeks \u2014 deleted. Who deletes someone else\'s posts?', day: 3, likes: 24, boosts: 7, mentions: ['noor'], isEvidence: true, evidenceId: 'deleted_posts' },

  // === BAS ===
  { id: 'bas-1', authorId: 'bas', content: 'Open mic at \'t Morgenrood tonight. Good vibes. \ud83c\udfb5', day: -7, likes: 5 },
  { id: 'bas-2', authorId: 'bas', content: 'Open mic at \'rood tonight, decent crowd. Thomas from the gym just stormed out looking mad. Didn\'t even finish his beer.', day: 0, timestamp: '22:15', likes: 6, isEvidence: true, evidenceId: 'thomas_cafe_angry' },

  // === EMMA ===
  { id: 'emma-1', authorId: 'emma', content: 'Walking home from dance practice and someone was standing across from the art centre just... watching. Walked faster. \ud83d\ude2c', day: -14, timestamp: '21:30', likes: 5, isEvidence: true, evidenceId: 'art_centre_watcher' },
  { id: 'emma-2', authorId: 'emma', content: 'Saw the watcher again tonight. Same spot. Crossed the street. Does anyone else find this creepy or just me?', day: -10, timestamp: '22:00', likes: 9, boosts: 1 },
];
