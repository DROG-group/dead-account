import { GameState, GameAction } from '@/types/game';
import { clamp } from '@/lib/utils';
import { evidenceItems } from '@/data/evidence';

export const initialState: GameState = {
  gameStarted: false,
  endingReached: null,
  trust: {},
  currentQuest: 1,
  questFlags: {},
  counters: {
    contactsFollowed: 0,
    nightWitnesses: 0,
    stalkingEvidence: 0,
    corruptionEvidence: 0,
    evidenceTotal: 0,
  },
  followedNpcs: [],
  likedPosts: [],
  collectedEvidence: [],
  conversations: {},
  activeStoryCard: null,
  seenStoryCards: [],
  viewedDeletedPosts: false,
};

function recountEvidence(state: GameState): GameState {
  const stalking = state.collectedEvidence.filter(id => {
    const item = evidenceItems.find(e => e.id === id);
    return item?.category === 'stalking';
  }).length;
  const corruption = state.collectedEvidence.filter(id => {
    const item = evidenceItems.find(e => e.id === id);
    return item?.category === 'corruption';
  }).length;
  return {
    ...state,
    counters: {
      ...state.counters,
      stalkingEvidence: stalking,
      corruptionEvidence: corruption,
      evidenceTotal: state.collectedEvidence.length,
    },
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, gameStarted: true };

    case 'RESET_GAME':
      return { ...initialState };

    case 'FOLLOW_NPC': {
      if (state.followedNpcs.includes(action.npcId)) return state;
      const followed = [...state.followedNpcs, action.npcId];
      const newTrust = { ...state.trust };
      newTrust[action.npcId] = clamp((newTrust[action.npcId] || 0) + 5, 0, 100);
      const newState = {
        ...state,
        followedNpcs: followed,
        trust: newTrust,
        counters: { ...state.counters, contactsFollowed: followed.length },
      };
      // Check quest 1 completion
      if (followed.length >= 5 && !state.questFlags['followed_5_contacts']) {
        return {
          ...newState,
          questFlags: { ...newState.questFlags, followed_5_contacts: true },
        };
      }
      return newState;
    }

    case 'UNFOLLOW_NPC': {
      const followed = state.followedNpcs.filter(id => id !== action.npcId);
      return {
        ...state,
        followedNpcs: followed,
        counters: { ...state.counters, contactsFollowed: followed.length },
      };
    }

    case 'LIKE_POST': {
      if (state.likedPosts.includes(action.postId)) return state;
      return {
        ...state,
        likedPosts: [...state.likedPosts, action.postId],
      };
    }

    case 'UNLIKE_POST':
      return {
        ...state,
        likedPosts: state.likedPosts.filter(id => id !== action.postId),
      };

    case 'COLLECT_EVIDENCE': {
      if (state.collectedEvidence.includes(action.evidenceId)) return state;
      const newState = {
        ...state,
        collectedEvidence: [...state.collectedEvidence, action.evidenceId],
      };
      return recountEvidence(newState);
    }

    case 'SET_FLAG':
      return {
        ...state,
        questFlags: { ...state.questFlags, [action.flag]: true },
      };

    case 'CHANGE_TRUST': {
      const current = state.trust[action.npcId] || 0;
      return {
        ...state,
        trust: {
          ...state.trust,
          [action.npcId]: clamp(current + action.amount, 0, 100),
        },
      };
    }

    case 'ADVANCE_QUEST':
      return {
        ...state,
        currentQuest: action.questId,
      };

    case 'SEND_MESSAGE': {
      const conv = state.conversations[action.npcId] || {
        messages: [],
        currentNodeId: null,
        completed: false,
        unlockedNodes: [],
      };
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.npcId]: {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: `msg-${Date.now()}`,
                fromPlayer: true,
                text: action.message,
                timestamp: Date.now(),
              },
            ],
          },
        },
      };
    }

    case 'SET_CONVERSATION_NODE': {
      const conv = state.conversations[action.npcId] || {
        messages: [],
        currentNodeId: null,
        completed: false,
        unlockedNodes: [],
      };
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.npcId]: {
            ...conv,
            currentNodeId: action.nodeId,
            completed: action.nodeId === null && conv.messages.length > 0,
          },
        },
      };
    }

    case 'SHOW_STORY_CARD':
      return {
        ...state,
        activeStoryCard: action.cardId,
        seenStoryCards: state.seenStoryCards.includes(action.cardId)
          ? state.seenStoryCards
          : [...state.seenStoryCards, action.cardId],
      };

    case 'DISMISS_STORY_CARD':
      return { ...state, activeStoryCard: null };

    case 'REACH_ENDING':
      return { ...state, endingReached: action.ending };

    case 'VIEW_DELETED_POSTS':
      return { ...state, viewedDeletedPosts: true };

    case 'LOAD_STATE':
      return { ...action.state };

    default:
      return state;
  }
}
