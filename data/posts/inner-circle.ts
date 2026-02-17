import { Post } from '@/types/post';

export const innerCirclePosts: Post[] = [
  // === LISA ===
  { id: 'lisa-1', authorId: 'lisa', content: 'Worried about @noor_creates. She\'s not herself lately. Called twice, no answer.', day: -6, likes: 5, mentions: ['noor'] },
  { id: 'lisa-2', authorId: 'lisa', content: 'Opening a bit late this morning. Sorry! Rough night.', day: 1, timestamp: '08:30', likes: 3 },
  { id: 'lisa-3', authorId: 'lisa', content: 'If anyone has seen or heard from @noor_creates please DM me. Not like her to go quiet.', day: 1, likes: 12, boosts: 8, mentions: ['noor'] },
  { id: 'lisa-4', authorId: 'lisa', content: 'That black square. I don\'t understand. Noor what is happening.', day: 3, likes: 15, mentions: ['noor'] },
  { id: 'lisa-ep-a', authorId: 'lisa', content: 'SHE\'S BACK. I\'M CRYING. I\'m closing the bakery early, don\'t care. \ud83e\udee3\u2764\ufe0f', day: 30, isEpilogue: true, epilogueEnding: 'a', likes: 67, boosts: 15 },

  // === THOMAS ===
  { id: 'thomas-1', authorId: 'thomas', content: 'Morning run along the harbour. 6km, easy pace. No excuses. \ud83d\udcaa', day: -40, likes: 8 },
  { id: 'thomas-2', authorId: 'thomas', content: 'Client hit a new PB today. That\'s what it\'s about. Progress.', day: -30, likes: 6 },
  { id: 'thomas-3', authorId: 'thomas', content: 'Funny how people change. You think you know someone...', day: -35, likes: 3 },
  { id: 'thomas-4', authorId: 'thomas', content: 'Loyalty means everything. If you can\'t be loyal, what are you?', day: -25, likes: 4 },
  { id: 'thomas-5', authorId: 'thomas', content: 'Can\'t sleep. Some things get under your skin and stay there.', day: -15, likes: 2 },
  { id: 'thomas-6', authorId: 'thomas', content: 'Trust is earned. And once it\'s broken, it\'s broken.', day: -8, likes: 5 },
  { id: 'thomas-7', authorId: 'thomas', content: 'Sometimes you have to take things into your own hands.', day: -3, likes: 3 },
  { id: 'thomas-8', authorId: 'thomas', content: 'Has anyone heard from @noor_creates? Getting worried...', day: 1, likes: 9, mentions: ['noor'] },
  { id: 'thomas-9', authorId: 'thomas', content: 'Went to the police today to help with the @noor_creates situation. Doing what I can.', day: 2, likes: 7, mentions: ['noor'] },
  { id: 'thomas-10', authorId: 'thomas', content: 'People deal with things differently. Sometimes you need space. I understand that.', day: 5, likes: 4 },

  // === PIM ===
  { id: 'pim-1', authorId: 'pim', content: 'Working on something for the next edition. Local journalism matters.', day: -60, likes: 11, boosts: 2 },
  { id: 'pim-2', authorId: 'pim', content: 'Public records are public for a reason. Always check the source documents.', day: -30, likes: 8, boosts: 3 },
  { id: 'pim-3', authorId: 'pim', content: 'Interesting council agenda this week. Item 14b deserves more attention than it\'s getting.', day: -14, likes: 6, boosts: 1, isEvidence: true, evidenceId: 'agenda_14b' },
  { id: 'pim-4', authorId: 'pim', content: 'Some stories take time. Get it right, not fast.', day: -5, likes: 14, boosts: 4 },
  { id: 'pim-5', authorId: 'pim', content: 'I don\'t have information to share about @noor_creates. Directed all inquiries to @gemeente_politie.', day: 2, likes: 3, mentions: ['noor', 'politie'] },
  { id: 'pim-6', authorId: 'pim', content: 'I am not "part of the story." I report stories. Stop DMing me conspiracy theories.', day: 5, likes: 7 },
  { id: 'pim-ep-a', authorId: 'pim', content: 'Story published. National edition. The truth matters. Always has, always will.', day: 30, isEpilogue: true, epilogueEnding: 'a', likes: 56, boosts: 28 },

  // === YARA ===
  { id: 'yara-1', authorId: 'yara', content: 'Study break. Missing my sister. @noor_creates when are you visiting?', day: -20, likes: 6, mentions: ['noor'] },
  { id: 'yara-2', authorId: 'yara', content: 'If anyone knows where my sister is please reach out. This isn\'t like her. I\'m scared.', day: 1, likes: 18, boosts: 11, mentions: ['noor'] },
  { id: 'yara-3', authorId: 'yara', content: 'I know she\'s alive. I just know it. But something is very wrong.', day: 3, likes: 14 },
  { id: 'yara-ep-a', authorId: 'yara', content: 'My sister is home. Thank you. You know who you are. \u2764\ufe0f', day: 30, isEpilogue: true, epilogueEnding: 'a', likes: 52, boosts: 14 },

  // === DAVID ===
  { id: 'david-1', authorId: 'david', content: 'Planning joint exhibition with @noor_creates for spring. Surface Tension. His photographs, my paintings.', day: -42, likes: 15, boosts: 3, mentions: ['noor'] },
  { id: 'david-2', authorId: 'david', content: 'Late night at the studio. The art centre is different after dark. Every creak sounds deliberate.', day: -1, likes: 4 },
  { id: 'david-3', authorId: 'david', content: '@noor_creates hasn\'t been at the studio. Her light was off all night. Door locked from outside.', day: 1, likes: 7, mentions: ['noor'] },
  { id: 'david-4', authorId: 'david', content: 'I don\'t want to say things I can\'t take back. But something happened and people should ask harder questions.', day: 3, likes: 21, boosts: 5 },

  // === SOPHIE ===
  { id: 'sophie-1', authorId: 'sophie', content: 'Made apple cake. Brought a slice to the young woman downstairs. She works too hard, eats too little.', day: -50, likes: 23, boosts: 1 },
  { id: 'sophie-2', authorId: 'sophie', content: 'Young people have harder lives than we think. Listen to them.', day: -7, likes: 11 },
  { id: 'sophie-3', authorId: 'sophie', content: 'I have spoken to the police about my neighbour. That is all I will say on the matter.', day: 1, likes: 9 },
  { id: 'sophie-4', authorId: 'sophie', content: 'That image on Noor\'s account. Someone posted that. Noor would never post something so empty. She is an artist. Every image means something. Someone else did this.', day: 3, likes: 28, boosts: 9 },
];
