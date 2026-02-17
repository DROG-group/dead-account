import { GameState } from '@/types/game';
import { Post } from '@/types/post';
import { NpcId } from '@/types/npc';
import { DialogueNode, DialogueChoice } from '@/types/dialogue';

export function getVisiblePosts(state: GameState, allPosts: Post[]): Post[] {
  return allPosts.filter(post => {
    // Deleted posts only visible if player has viewed them via evidence
    if (post.isDeleted && !state.viewedDeletedPosts) return false;
    // Epilogue posts only for reached ending
    if (post.isEpilogue) {
      return post.epilogueEnding === state.endingReached;
    }
    // Quest-gated posts
    if (post.visibleAfterQuest && state.currentQuest < post.visibleAfterQuest) return false;
    // Flag-gated posts
    if (post.visibleAfterFlag && !state.questFlags[post.visibleAfterFlag]) return false;
    return true;
  });
}

export function getNpcPosts(state: GameState, allPosts: Post[], npcId: NpcId): Post[] {
  return getVisiblePosts(state, allPosts).filter(p => p.authorId === npcId);
}

export function getTrust(state: GameState, npcId: NpcId): number {
  return state.trust[npcId] || 0;
}

export function isFollowing(state: GameState, npcId: NpcId): boolean {
  return state.followedNpcs.includes(npcId);
}

export function hasEvidence(state: GameState, evidenceId: string): boolean {
  return state.collectedEvidence.includes(evidenceId);
}

export function hasFlag(state: GameState, flag: string): boolean {
  return !!state.questFlags[flag];
}

export function getAvailableChoices(
  state: GameState,
  node: DialogueNode
): DialogueChoice[] {
  return node.choices.filter(choice => {
    if (choice.requiresTrust !== undefined) {
      const trust = getTrust(state, node.npcId);
      if (trust < choice.requiresTrust) return false;
    }
    if (choice.requiresFlag && !hasFlag(state, choice.requiresFlag)) return false;
    return true;
  });
}

export function getAvailableNodes(
  state: GameState,
  nodes: DialogueNode[],
  npcId: NpcId
): DialogueNode[] {
  return nodes.filter(node => {
    if (node.npcId !== npcId) return false;
    if (node.requiresTrust !== undefined) {
      if (getTrust(state, npcId) < node.requiresTrust) return false;
    }
    if (node.requiresFlag && !hasFlag(state, node.requiresFlag)) return false;
    if (node.requiresEvidence && !hasEvidence(state, node.requiresEvidence)) return false;
    if (node.questGate && state.currentQuest < node.questGate) return false;
    return true;
  });
}

export function canCompleteQuest1(state: GameState): boolean {
  return state.counters.contactsFollowed >= 5;
}

export function canCompleteQuest2(state: GameState): boolean {
  return state.counters.nightWitnesses >= 4;
}

export function canCompleteQuest3(state: GameState): boolean {
  return !!state.questFlags['studio_accessed'] &&
    (state.counters.corruptionEvidence >= 3 || state.counters.stalkingEvidence >= 4);
}

export function canCompleteQuest4(state: GameState): boolean {
  return state.counters.stalkingEvidence >= 6 || state.counters.corruptionEvidence >= 5;
}

export function getStalkingComplete(state: GameState): boolean {
  return state.counters.stalkingEvidence >= 6;
}

export function getCorruptionComplete(state: GameState): boolean {
  return state.counters.corruptionEvidence >= 5;
}
