'use client';

import { GameShell } from '@/components/layout/GameShell';
import { ConversationList } from '@/components/messages/ConversationList';

export default function MessagesPage() {
  return (
    <GameShell>
      <div className="border-b border-border px-4 py-3">
        <h1 className="font-bold text-text-primary text-lg">Direct Messages</h1>
        <p className="text-text-muted text-xs mt-0.5">Private conversations with NPCs</p>
      </div>
      <ConversationList />
    </GameShell>
  );
}
