'use client';

import { useGame } from '@/contexts/GameContext';
import { evidenceItems } from '@/data/evidence';
import { EvidenceCategory } from '@/types/evidence';
import { Badge } from '@/components/ui/Badge';

const categoryLabels: Record<EvidenceCategory, string> = {
  stalking: 'Stalking Evidence',
  corruption: 'Corruption Evidence',
  physical: 'Physical Evidence',
};

const categoryIcons: Record<EvidenceCategory, string> = {
  stalking: '\ud83d\udc41\ufe0f',
  corruption: '\ud83d\udcc4',
  physical: '\ud83d\udcf1',
};

export function EvidenceBoard() {
  const { state } = useGame();
  const collected = evidenceItems.filter(e => state.collectedEvidence.includes(e.id));

  const categories: EvidenceCategory[] = ['stalking', 'corruption', 'physical'];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary">Evidence Board</h1>
        <Badge variant="evidence">{collected.length}/{evidenceItems.length} collected</Badge>
      </div>

      {collected.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <div className="text-4xl mb-3">\ud83d\udccc</div>
          <p>No evidence collected yet.</p>
          <p className="text-sm mt-1">Like posts with evidence and talk to NPCs to collect clues.</p>
        </div>
      ) : (
        categories.map(cat => {
          const items = collected.filter(e => e.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <h2 className="text-sm font-bold text-text-secondary mb-3 flex items-center gap-2">
                <span>{categoryIcons[cat]}</span>
                {categoryLabels[cat]}
                <span className="text-text-muted">({items.length})</span>
              </h2>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {items.map(item => (
                  <div key={item.id} className="bg-bg-surface border border-border rounded-lg p-4">
                    <h3 className="font-bold text-text-primary text-sm">{item.name}</h3>
                    <p className="text-text-muted text-xs mt-1">Source: {item.source}</p>
                    <p className="text-text-secondary text-sm mt-2">{item.description}</p>
                    <details className="mt-2">
                      <summary className="text-accent text-xs cursor-pointer">Full details</summary>
                      <p className="text-text-secondary text-xs mt-1 leading-relaxed">{item.detail}</p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Uncollected hints */}
      {collected.length > 0 && collected.length < evidenceItems.length && (
        <div className="border-t border-border pt-4">
          <p className="text-text-muted text-sm">
            {evidenceItems.length - collected.length} more pieces of evidence to find.
            Keep investigating!
          </p>
        </div>
      )}
    </div>
  );
}
