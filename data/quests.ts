import { Quest } from '@/types/game';

export const quests: Quest[] = [
  {
    id: 1,
    title: 'First Impressions',
    description: 'Get oriented on zuidhaven.social. Follow Noor\'s contacts to learn who she knew and build connections.',
    objectives: [
      { id: 'q1_follow', description: 'Follow 5 or more of Noor\'s contacts', checkFn: 'followed_5_contacts' },
    ],
    completionFlag: 'followed_5_contacts',
  },
  {
    id: 2,
    title: 'The Last Night',
    description: 'Reconstruct what happened the night Noor disappeared. Talk to witnesses who saw or heard something.',
    objectives: [
      { id: 'q2_bas', description: 'Learn about Thomas leaving the caf\u00e9 angry', checkFn: 'witness_bas' },
      { id: 'q2_jan', description: 'Learn about the silver car at the art centre', checkFn: 'witness_jan' },
      { id: 'q2_david', description: 'Learn about shouting at the art centre', checkFn: 'witness_david' },
      { id: 'q2_sophie', description: 'Learn what Sophie saw at her door', checkFn: 'witness_sophie' },
    ],
    completionFlag: 'night_timeline_complete',
  },
  {
    id: 3,
    title: 'The Locked Studio',
    description: 'Access Noor\'s studio and discover what she was working on. Follow the evidence trail.',
    objectives: [
      { id: 'q3_studio', description: 'Access Noor\'s studio at the art centre', checkFn: 'studio_accessed' },
      { id: 'q3_evidence', description: 'Collect enough evidence to confront someone', checkFn: 'evidence_sufficient' },
    ],
    completionFlag: 'ready_to_confront',
  },
  {
    id: 4,
    title: 'Confrontation',
    description: 'You have enough evidence. Choose who to confront and present your case.',
    objectives: [
      { id: 'q4_confront', description: 'Confront a suspect with your evidence', checkFn: 'confrontation_done' },
    ],
    completionFlag: 'confrontation_done',
  },
];
