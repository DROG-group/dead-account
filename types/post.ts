import { NpcId } from './npc';

export interface Post {
  id: string;
  authorId: NpcId;
  content: string;
  day: number; // negative = before disappearance, 0 = night of, positive = after
  timestamp?: string; // e.g. "22:15"
  isDeleted?: boolean; // deleted by Thomas
  isEvidence?: boolean; // triggers evidence collection
  evidenceId?: string;
  replyTo?: string; // post id
  mentions?: NpcId[];
  likes?: number;
  boosts?: number;
  visibleAfterQuest?: number; // 1-4
  visibleAfterFlag?: string;
  isEpilogue?: boolean;
  epilogueEnding?: 'a' | 'b' | 'c';
}
