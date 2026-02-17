'use client';

import { EndingId } from '@/types/game';
import { endings } from '@/data/endings';
import { allPosts } from '@/data/posts/index';
import { Feed } from '@/components/feed/Feed';
import { Button } from '@/components/ui/Button';
import { useGame } from '@/contexts/GameContext';
import { clearSave } from '@/engine/persistence';

interface EndingScreenProps {
  endingId: EndingId;
}

export function EndingScreen({ endingId }: EndingScreenProps) {
  const { dispatch } = useGame();
  const ending = endings.find(e => e.id === endingId);
  if (!ending) return null;

  const epiloguePosts = allPosts.filter(p => p.isEpilogue && p.epilogueEnding === endingId);

  const handleNewGame = () => {
    clearSave();
    dispatch({ type: 'RESET_GAME' });
  };

  const colors = {
    a: 'text-success border-success/30 bg-success/5',
    b: 'text-warning border-warning/30 bg-warning/5',
    c: 'text-danger border-danger/30 bg-danger/5',
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-2xl mx-auto p-6">
        {/* Ending Card */}
        <div className={`border rounded-lg p-8 text-center mb-8 ${colors[endingId]}`}>
          <div className="text-sm font-medium uppercase tracking-wider mb-2">
            Ending {endingId.toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold mb-2">{ending.title}</h1>
          <p className="text-lg opacity-80">{ending.subtitle}</p>
        </div>

        <div className="bg-bg-surface rounded-lg p-6 mb-8 border border-border">
          <p className="text-text-secondary leading-relaxed">{ending.description}</p>
          <ul className="mt-4 space-y-2">
            {ending.outcome.map((item, i) => (
              <li key={i} className="text-text-primary text-sm flex items-start gap-2">
                <span className="text-text-muted mt-0.5">\u2022</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Epilogue Feed */}
        {epiloguePosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-primary mb-4 px-4">
              {endingId === 'a' ? 'Weeks later on zuidhaven.social...' :
               endingId === 'b' ? 'Months later...' : 'Six months later...'}
            </h2>
            <div className="border border-border rounded-lg overflow-hidden">
              <Feed posts={epiloguePosts} />
            </div>
          </div>
        )}

        <div className="text-center">
          <Button onClick={handleNewGame} variant="outline">
            New Game
          </Button>
        </div>
      </div>
    </div>
  );
}
