'use client';

import { use } from 'react';
import { GameShell } from '@/components/layout/GameShell';
import { Conversation } from '@/components/messages/Conversation';
import { getNpcByHandle } from '@/data/npcs';
import Link from 'next/link';

export default function MessagePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const npc = getNpcByHandle(handle);

  if (!npc) {
    return (
      <GameShell>
        <div className="p-8 text-center text-text-muted">
          <h2 className="text-lg font-bold mb-2">User not found</h2>
          <Link href="/messages" className="text-accent text-sm">Back to messages</Link>
        </div>
      </GameShell>
    );
  }

  return (
    <GameShell>
      <Conversation npc={npc} />
    </GameShell>
  );
}
