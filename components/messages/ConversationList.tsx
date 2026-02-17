'use client';

import Link from 'next/link';
import { npcs } from '@/data/npcs';
import { allDialogues } from '@/data/dialogues/index';
import { Avatar } from '@/components/ui/Avatar';
import { useGame } from '@/contexts/GameContext';

export function ConversationList() {
  const { state } = useGame();

  // Show NPCs that have dialogue trees and canDM
  const dmableNpcs = npcs.filter(npc => {
    if (!npc.canDM) return false;
    const hasDialogue = allDialogues.some(d => d.npcId === npc.id);
    // Show if they have a dialogue tree OR the player has already started a conversation
    return hasDialogue || state.conversations[npc.id];
  });

  return (
    <div>
      {dmableNpcs.map(npc => {
        const conv = state.conversations[npc.id];
        const hasMessages = conv && conv.messages.length > 0;
        return (
          <Link
            key={npc.id}
            href={`/messages/${npc.handle}`}
            className="flex items-center gap-3 px-4 py-3 border-b border-border hover:bg-bg-surface/50 transition-colors no-underline"
          >
            <Avatar name={npc.displayName} color={npc.color} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary text-sm">{npc.displayName}</span>
                {hasMessages && (
                  <span className="text-text-muted text-xs">
                    {conv.completed ? 'Completed' : 'Active'}
                  </span>
                )}
              </div>
              <div className="text-text-muted text-sm truncate">
                @{npc.handle}
                {!hasMessages && ' \u2014 Start a conversation'}
              </div>
            </div>
          </Link>
        );
      })}
      {dmableNpcs.length === 0 && (
        <div className="p-8 text-center text-text-muted">
          No conversations available yet. Follow some NPCs first!
        </div>
      )}
    </div>
  );
}
