import { Post } from '@/types/post';

export const governmentPosts: Post[] = [
  // === DE VRIES ===
  { id: 'devries-1', authorId: 'devries', content: 'Proud to announce the waterfront development plan. Bringing new energy to Zuidhaven! Progress for our community.', day: -120, likes: 15, boosts: 2 },
  { id: 'devries-2', authorId: 'devries', content: 'Budget review complete. Zuidhaven finances are solid. Good governance means making tough choices.', day: -60, likes: 8 },
  { id: 'devries-3', authorId: 'devries', content: 'Concerned to hear about the wellbeing of one of our community members. Full confidence in @gemeente_politie to handle matters appropriately.', day: 2, likes: 6, mentions: ['politie'] },
  { id: 'devries-4', authorId: 'devries', content: 'I want to address rumours circulating online. The waterfront development followed all proper procedures. I will not dignify conspiracy theories with a response. My lawyer has been informed.', day: 5, likes: 4, boosts: 1 },

  // === MAYOR ===
  { id: 'smit-1', authorId: 'smit', content: 'Zuidhaven is a community that looks after its own. In difficult times, we come together.', day: -30, likes: 12 },
  { id: 'smit-2', authorId: 'smit', content: 'I\'m aware of concerns about a missing community member. I have asked police for a full briefing.', day: 2, likes: 10 },

  // === POLITIE ===
  { id: 'politie-1', authorId: 'politie', content: 'Community alert: Local artist Noor El Amrani has not been in contact with family. Anyone with information please contact us. Reference: ZH-2024-0847.', day: 1, likes: 22, boosts: 15 },
  { id: 'politie-2', authorId: 'politie', content: 'UPDATE: Investigation into wellbeing of missing person continues. No indication of criminal activity at this time.', day: 3, likes: 8 },
  { id: 'politie-ep-a', authorId: 'politie', content: 'Arrest made in connection with stalking and harassment case. Investigation ongoing. Further details to follow.', day: 28, isEpilogue: true, epilogueEnding: 'a', likes: 45, boosts: 20 },

  // === VAN DIJK ===
  { id: 'vandijk-1', authorId: 'vandijk', content: 'Community policing means being present. Walking the streets, knowing the faces. Zuidhaven-Centrum is my beat.', day: -40, likes: 9 },
  { id: 'vandijk-2', authorId: 'vandijk', content: 'Sometimes the system moves slower than you\'d like. Doesn\'t mean you stop doing the work.', day: 4, likes: 11 },

  // === KUIPER ===
  { id: 'kuiper-1', authorId: 'kuiper', content: 'Opposition isn\'t obstruction. It\'s accountability. Someone has to ask the uncomfortable questions.', day: -50, likes: 7 },
  { id: 'kuiper-2', authorId: 'kuiper', content: 'Has anyone actually read the full agenda for last month\'s council meeting? Item 14b is worth a closer look.', day: -10, likes: 5, boosts: 2 },

  // === LOTTE (PUBLIC) ===
  { id: 'lotte-1', authorId: 'lotte', content: 'Another day, another stack of paperwork. Coffee helps. \u2615', day: -40, likes: 4 },
  { id: 'lotte-2', authorId: 'lotte', content: 'Sometimes I wonder what the point of procedures is if nobody reads the documents.', day: -30, likes: 3 },

  // === WILLEMSEN ===
  { id: 'willemsen-1', authorId: 'willemsen', content: 'Council meeting agenda published. Highlights: budget review, traffic calming measures, property disposals (14b), community grants.', day: -45, likes: 3 },
  { id: 'willemsen-2', authorId: 'willemsen', content: 'Minutes from last council meeting now available on gemeente website. All votes recorded.', day: -30, likes: 2 },
];
