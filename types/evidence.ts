export type EvidenceCategory = 'stalking' | 'corruption' | 'physical';

export interface EvidenceItem {
  id: string;
  name: string;
  description: string;
  category: EvidenceCategory;
  source: string; // who/what provides it
  detail: string; // longer description shown on evidence board
}
