import { GameState, QuestId } from '@/types/game';
import {
  canCompleteQuest1,
  canCompleteQuest2,
  canCompleteQuest3,
  canCompleteQuest4,
  getStalkingComplete,
  getCorruptionComplete,
} from './selectors';

export function checkQuestProgression(state: GameState): GameState {
  let newState = { ...state };

  // Quest 1 → 2
  if (newState.currentQuest === 1 && canCompleteQuest1(newState)) {
    if (newState.questFlags['followed_5_contacts']) {
      newState = {
        ...newState,
        currentQuest: 2 as QuestId,
        activeStoryCard: newState.seenStoryCards.includes('quest2_start') ? null : 'quest2_start',
        seenStoryCards: [...new Set([...newState.seenStoryCards, 'quest2_start'])],
      };
    }
  }

  // Quest 2 → 3
  if (newState.currentQuest === 2 && canCompleteQuest2(newState)) {
    if (newState.questFlags['night_timeline_complete']) {
      newState = {
        ...newState,
        currentQuest: 3 as QuestId,
        activeStoryCard: newState.seenStoryCards.includes('quest3_start') ? null : 'quest3_start',
        seenStoryCards: [...new Set([...newState.seenStoryCards, 'quest3_start'])],
      };
    }
  }

  // Quest 3 → 4
  if (newState.currentQuest === 3 && canCompleteQuest3(newState)) {
    if (newState.questFlags['corruption_evidence_complete'] || newState.questFlags['stalking_evidence_building']) {
      newState = {
        ...newState,
        currentQuest: 4 as QuestId,
        activeStoryCard: newState.seenStoryCards.includes('quest4_start') ? null : 'quest4_start',
        seenStoryCards: [...new Set([...newState.seenStoryCards, 'quest4_start'])],
      };
    }
  }

  return newState;
}

export function determineEnding(state: GameState, confrontTarget: string): 'a' | 'b' | 'c' {
  if (confrontTarget === 'thomas' && getStalkingComplete(state)) {
    return 'a'; // Best ending - stalker caught
  }
  if (confrontTarget === 'devries' && getCorruptionComplete(state)) {
    return 'b'; // Bittersweet - corruption exposed but stalker free
  }
  return 'c'; // Failed - accused Marco, nothing sticks
}
