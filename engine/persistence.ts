import { GameState } from '@/types/game';

const STORAGE_KEY = 'dead-account-save';

export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

export function loadGame(): GameState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // corrupted save
  }
  return null;
}

export function clearSave(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
