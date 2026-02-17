import { NpcId } from './npc';

export interface DialogueNode {
  id: string;
  npcId: NpcId;
  text: string; // NPC's message
  choices: DialogueChoice[];
  requiresTrust?: number;
  requiresFlag?: string;
  requiresEvidence?: string;
  isEntry?: boolean; // starting node
  questGate?: number; // minimum quest number
}

export interface DialogueChoice {
  id: string;
  text: string; // Player's choice text
  nextNodeId: string | null; // null = end conversation
  trustChange?: number;
  setFlag?: string;
  collectEvidence?: string;
  requiresTrust?: number;
  requiresFlag?: string;
}

export interface DialogueTree {
  npcId: NpcId;
  nodes: DialogueNode[];
}

export interface ConversationMessage {
  id: string;
  fromPlayer: boolean;
  text: string;
  timestamp: number;
}

export interface ConversationState {
  messages: ConversationMessage[];
  currentNodeId: string | null;
  completed: boolean;
  unlockedNodes: string[];
}
