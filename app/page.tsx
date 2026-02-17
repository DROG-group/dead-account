'use client';

import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/Button';
import { clearSave } from '@/engine/persistence';

export default function IntroPage() {
  const router = useRouter();
  const { state, dispatch } = useGame();

  const handleStart = () => {
    dispatch({ type: 'START_GAME' });
    router.push('/feed');
  };

  const handleContinue = () => {
    router.push('/feed');
  };

  const handleReset = () => {
    clearSave();
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center text-white text-3xl font-bold mb-6">
          Z
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-2">DEAD ACCOUNT</h1>
        <p className="text-text-muted text-sm mb-1">A social media investigation game</p>
        <p className="text-text-secondary text-xs mb-8">zuidhaven.social</p>

        <div className="bg-bg-surface border border-border rounded-lg p-6 mb-8 text-left">
          <p className="text-text-primary text-sm leading-relaxed mb-4">
            Artist <strong>Noor El Amrani</strong> has disappeared from the small Dutch coastal town of Zuidhaven.
            Three days later, a black square appeared on her Mastodon account.
          </p>
          <p className="text-text-primary text-sm leading-relaxed mb-4">
            She didn&apos;t post it.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Investigate the local social media timeline. Follow accounts, read posts,
            message witnesses, and collect evidence. Uncover what happened to Noor
            and decide who to confront.
          </p>
        </div>

        <div className="space-y-3">
          {state.gameStarted ? (
            <>
              <Button onClick={handleContinue} className="w-full">
                Continue Investigation
              </Button>
              <Button onClick={handleReset} variant="ghost" className="w-full">
                New Game
              </Button>
            </>
          ) : (
            <Button onClick={handleStart} className="w-full">
              Begin Investigation
            </Button>
          )}
        </div>

        <p className="text-text-muted text-xs mt-8">
          All characters and events are fictional. This is a game about social media investigation.
        </p>
      </div>
    </div>
  );
}
