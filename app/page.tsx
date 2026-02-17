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

        {/* Story Setup */}
        <div className="bg-bg-surface border border-border rounded-lg p-6 mb-6 text-left">
          <p className="text-text-primary text-sm leading-relaxed mb-4">
            Artist <strong>Noor El Amrani</strong> has disappeared from the small Dutch coastal town of Zuidhaven.
            Three days later, a black square appeared on her Mastodon account.
          </p>
          <p className="text-text-primary text-sm leading-relaxed mb-4">
            She didn&apos;t post it.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            You&apos;ve just joined <strong>zuidhaven.social</strong>, the town&apos;s Mastodon instance.
            Everyone&apos;s talking about Noor. Scroll the timeline, read what people are saying,
            and figure out what really happened.
          </p>
        </div>

        {/* How to Play */}
        <div className="bg-bg-surface border border-border rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-text-primary text-sm mb-3 flex items-center gap-2">
            <span className="text-accent">?</span> How to Play
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">1.</span>
              <span className="text-text-secondary">
                <strong className="text-text-primary">Read the timeline.</strong> Posts are sorted newest-first.
                Pay attention to dates, mentions, and details. Some posts contain evidence &mdash;
                <strong className="text-evidence"> like them</strong> to collect it.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">2.</span>
              <span className="text-text-secondary">
                <strong className="text-text-primary">Follow people.</strong> Click on any name to visit
                their profile page. Hit <strong>Follow</strong> to build trust with them. Start with
                Noor&apos;s friends and neighbours.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">3.</span>
              <span className="text-text-secondary">
                <strong className="text-text-primary">Send direct messages.</strong> Go to <strong>Messages</strong> to
                talk privately with NPCs. They&apos;ll reveal more as they trust you. Choose your
                dialogue options carefully &mdash; some unlock new information and evidence.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">4.</span>
              <span className="text-text-secondary">
                <strong className="text-text-primary">Track your progress.</strong> Check the <strong>Evidence</strong> board
                to see what you&apos;ve found, and the <strong>Quest Log</strong> for your current objectives.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold shrink-0">5.</span>
              <span className="text-text-secondary">
                <strong className="text-text-primary">Piece it together.</strong> There are two mysteries
                intertwined: <em>why</em> Noor disappeared, and <em>what</em> she found. The ending
                depends on who you confront and what evidence you bring.
              </span>
            </li>
          </ul>
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
