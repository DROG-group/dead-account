import { GameAction, EndingId, QuestId } from '@/types/game';
import { NpcId } from '@/types/npc';

export const startGame = (): GameAction => ({ type: 'START_GAME' });
export const resetGame = (): GameAction => ({ type: 'RESET_GAME' });

export const followNpc = (npcId: NpcId): GameAction => ({ type: 'FOLLOW_NPC', npcId });
export const unfollowNpc = (npcId: NpcId): GameAction => ({ type: 'UNFOLLOW_NPC', npcId });

export const likePost = (postId: string): GameAction => ({ type: 'LIKE_POST', postId });
export const unlikePost = (postId: string): GameAction => ({ type: 'UNLIKE_POST', postId });

export const collectEvidence = (evidenceId: string): GameAction => ({ type: 'COLLECT_EVIDENCE', evidenceId });
export const setFlag = (flag: string): GameAction => ({ type: 'SET_FLAG', flag });
export const changeTrust = (npcId: NpcId, amount: number): GameAction => ({ type: 'CHANGE_TRUST', npcId, amount });
export const advanceQuest = (questId: QuestId): GameAction => ({ type: 'ADVANCE_QUEST', questId });

export const sendMessage = (npcId: NpcId, message: string, choiceId: string): GameAction => ({
  type: 'SEND_MESSAGE', npcId, message, choiceId,
});
export const setConversationNode = (npcId: NpcId, nodeId: string | null): GameAction => ({
  type: 'SET_CONVERSATION_NODE', npcId, nodeId,
});

export const showStoryCard = (cardId: string): GameAction => ({ type: 'SHOW_STORY_CARD', cardId });
export const dismissStoryCard = (): GameAction => ({ type: 'DISMISS_STORY_CARD' });
export const reachEnding = (ending: EndingId): GameAction => ({ type: 'REACH_ENDING', ending });
export const viewDeletedPosts = (): GameAction => ({ type: 'VIEW_DELETED_POSTS' });
export const loadState = (state: import('@/types/game').GameState): GameAction => ({ type: 'LOAD_STATE', state });
