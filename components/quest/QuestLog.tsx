'use client';

import { useGame } from '@/contexts/GameContext';
import { quests } from '@/data/quests';
import { Badge } from '@/components/ui/Badge';

export function QuestLog() {
  const { state } = useGame();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold text-text-primary">Quest Log</h1>

      {quests.map(quest => {
        const isCurrent = state.currentQuest === quest.id;
        const isComplete = state.currentQuest > quest.id;
        const isLocked = state.currentQuest < quest.id;

        return (
          <div
            key={quest.id}
            className={`bg-bg-surface border rounded-lg p-4 ${
              isCurrent ? 'border-accent' : 'border-border'
            } ${isLocked ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">
                {isComplete ? '\u2705' : isCurrent ? '\ud83d\udccd' : '\ud83d\udd12'}
              </span>
              <h2 className="font-bold text-text-primary">
                Quest {quest.id}: {quest.title}
              </h2>
              {isCurrent && <Badge variant="quest">Active</Badge>}
              {isComplete && <Badge>Complete</Badge>}
            </div>

            <p className="text-text-secondary text-sm mb-3">{quest.description}</p>

            {!isLocked && (
              <div className="space-y-2">
                {quest.objectives.map(obj => {
                  const done = !!state.questFlags[obj.checkFn];
                  return (
                    <div key={obj.id} className="flex items-center gap-2 text-sm">
                      <span className={done ? 'text-success' : 'text-text-muted'}>
                        {done ? '\u2611' : '\u2610'}
                      </span>
                      <span className={done ? 'text-text-secondary line-through' : 'text-text-primary'}>
                        {obj.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Confrontation hint when at Quest 4 */}
      {state.currentQuest === 4 && (
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
          <h3 className="font-bold text-accent text-sm">Ready to Confront</h3>
          <p className="text-text-secondary text-sm mt-1">
            You have enough evidence. Go to Messages and confront a suspect:
          </p>
          <ul className="text-text-secondary text-sm mt-2 space-y-1">
            {state.counters.stalkingEvidence >= 6 && (
              <li>• <strong>Thomas Groot</strong> - Present stalking evidence (Best outcome)</li>
            )}
            {state.counters.corruptionEvidence >= 5 && (
              <li>• <strong>Hans de Vries</strong> - Present corruption evidence</li>
            )}
            <li className="text-text-muted">\u2022 Marco van Bergen - Accuse the developer (risky)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
