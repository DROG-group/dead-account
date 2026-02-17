import { NpcId } from './npc';
import { ConversationState } from './dialogue';

export type QuestId = 1 | 2 | 3 | 4;
export type EndingId = 'a' | 'b' | 'c';

export interface GameCounters {
  contactsFollowed: number;
  nightWitnesses: number;
  stalkingEvidence: number;
  corruptionEvidence: number;
  evidenceTotal: number;
}

export interface GameState {
  gameStarted: boolean;
  endingReached: EndingId | null;
  trust: Record<NpcId, number>;
  currentQuest: QuestId;
  questFlags: Record<string, boolean>;
  counters: GameCounters;
  followedNpcs: NpcId[];
  likedPosts: string[];
  collectedEvidence: string[];
  conversations: Record<NpcId, ConversationState>;
  activeStoryCard: string | null;
  seenStoryCards: string[];
  viewedDeletedPosts: boolean;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'FOLLOW_NPC'; npcId: NpcId }
  | { type: 'UNFOLLOW_NPC'; npcId: NpcId }
  | { type: 'LIKE_POST'; postId: string }
  | { type: 'UNLIKE_POST'; postId: string }
  | { type: 'COLLECT_EVIDENCE'; evidenceId: string }
  | { type: 'SET_FLAG'; flag: string }
  | { type: 'CHANGE_TRUST'; npcId: NpcId; amount: number }
  | { type: 'ADVANCE_QUEST'; questId: QuestId }
  | { type: 'SEND_MESSAGE'; npcId: NpcId; message: string; choiceId: string }
  | { type: 'SET_CONVERSATION_NODE'; npcId: NpcId; nodeId: string | null }
  | { type: 'SHOW_STORY_CARD'; cardId: string }
  | { type: 'DISMISS_STORY_CARD' }
  | { type: 'REACH_ENDING'; ending: EndingId }
  | { type: 'VIEW_DELETED_POSTS' }
  | { type: 'LOAD_STATE'; state: GameState };

export interface Quest {
  id: QuestId;
  title: string;
  description: string;
  objectives: QuestObjective[];
  completionFlag: string;
}

export interface QuestObjective {
  id: string;
  description: string;
  checkFn: string; // name of condition function to check
}

export interface Ending {
  id: EndingId;
  title: string;
  subtitle: string;
  description: string;
  outcome: string[];
}
