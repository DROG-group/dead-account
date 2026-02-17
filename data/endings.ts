import { Ending } from '@/types/game';

export const endings: Ending[] = [
  {
    id: 'a',
    title: 'The Stalker',
    subtitle: 'Justice served. Noor comes home.',
    description: 'You confronted Thomas with irrefutable evidence of stalking. Officer Van Dijk reopened the case and arrested Thomas. Noor\'s phone was recovered, containing photos of corruption documents. Pim published the full story in the national press.',
    outcome: [
      'Thomas Groot arrested for stalking and harassment.',
      '@sportief_zh and Thomas\'s accounts suspended.',
      'Noor\'s phone recovered with document photos and deletion log.',
      'Pim Veldkamp publishes corruption story in national newspaper.',
      'Hans de Vries resigns; land deal referred to provincial authorities.',
      'Marco van Bergen\'s project suspended pending investigation.',
      'Noor El Amrani returns to Zuidhaven.',
    ],
  },
  {
    id: 'b',
    title: 'The Politician',
    subtitle: 'Corruption exposed. But the stalker walks free.',
    description: 'You exposed the land deal corruption, forcing De Vries to resign. But without enough evidence against Thomas, the stalking was never investigated. Noor returned after three months, changed the locks, and stopped posting after dark.',
    outcome: [
      'Hans de Vries resigns "to spend time with family."',
      'Marco van Bergen\'s project suspended pending audit.',
      'Community demands full investigation of land dealings.',
      'Thomas Groot never investigated \u2014 still lives in Zuidhaven.',
      'Noor returns cautiously after 3 months.',
      'She changes locks and stops posting after dark.',
    ],
  },
  {
    id: 'c',
    title: 'The Developer',
    subtitle: 'Nothing sticks. Noor stays in hiding.',
    description: 'You accused Marco van Bergen, but his lawyer shut down the accusation immediately. Without a direct connection between Marco and Noor\'s disappearance, the evidence collapsed. De Vries stayed in office, Thomas was never caught, and Noor remained in hiding.',
    outcome: [
      'Gerard Visser threatens defamation suit \u2014 accusation collapses.',
      'Hans de Vries stays in office; project continues.',
      'Thomas Groot never investigated.',
      'Noor stays in hiding in Rotterdam.',
      'Six months later: @sportief_zh creates new account following Yara.',
      'The truth stays buried.',
    ],
  },
];
