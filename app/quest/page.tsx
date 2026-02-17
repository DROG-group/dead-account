'use client';

import { GameShell } from '@/components/layout/GameShell';
import { QuestLog } from '@/components/quest/QuestLog';

export default function QuestPage() {
  return (
    <GameShell>
      <QuestLog />
    </GameShell>
  );
}
