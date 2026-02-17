'use client';

import { GameShell } from '@/components/layout/GameShell';
import { EvidenceBoard } from '@/components/evidence/EvidenceBoard';

export default function EvidencePage() {
  return (
    <GameShell>
      <EvidenceBoard />
    </GameShell>
  );
}
