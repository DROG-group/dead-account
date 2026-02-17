'use client';

import { use } from 'react';
import { GameShell } from '@/components/layout/GameShell';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { Feed } from '@/components/feed/Feed';
import { getNpcByHandle } from '@/data/npcs';
import { allPosts } from '@/data/posts/index';
import { useGame } from '@/contexts/GameContext';
import { getNpcPosts } from '@/engine/selectors';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const { state } = useGame();
  const npc = getNpcByHandle(handle);

  if (!npc) {
    return (
      <GameShell>
        <div className="p-8 text-center text-text-muted">
          <h2 className="text-lg font-bold mb-2">Account not found</h2>
          <p>@{handle} doesn&apos;t exist on this instance.</p>
          <Link href="/feed" className="text-accent text-sm mt-4 inline-block">Back to feed</Link>
        </div>
      </GameShell>
    );
  }

  const posts = getNpcPosts(state, allPosts, npc.id);

  return (
    <GameShell>
      <ProfileHeader npc={npc} postCount={posts.length} />
      <Feed posts={posts} emptyMessage={`No posts from @${npc.handle} visible yet.`} />
    </GameShell>
  );
}
