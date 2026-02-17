'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { GameState, GameAction } from '@/types/game';
import { gameReducer, initialState } from '@/engine/reducer';
import { saveGame, loadGame } from '@/engine/persistence';
import { checkQuestProgression } from '@/engine/conditions';

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, rawDispatch] = useReducer(gameReducer, initialState);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadGame();
    if (saved) {
      rawDispatch({ type: 'LOAD_STATE', state: saved });
    }
  }, []);

  // Wrapped dispatch that checks quest progression and saves
  const dispatch = useCallback((action: GameAction) => {
    rawDispatch(action);
  }, []);

  // Save and check quest progression after every state change
  useEffect(() => {
    if (!state.gameStarted) return;
    saveGame(state);

    // Check if quest should progress
    const progressed = checkQuestProgression(state);
    if (progressed.currentQuest !== state.currentQuest || progressed.activeStoryCard !== state.activeStoryCard) {
      rawDispatch({ type: 'LOAD_STATE', state: progressed });
    }
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
