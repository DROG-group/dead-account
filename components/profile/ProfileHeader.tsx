'use client';

import { useRouter } from 'next/navigation';
import { Npc } from '@/types/npc';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useGame } from '@/contexts/GameContext';

interface ProfileHeaderProps {
  npc: Npc;
  postCount: number;
}

export function ProfileHeader({ npc, postCount }: ProfileHeaderProps) {
  const router = useRouter();
  const { state, dispatch } = useGame();
  const isFollowing = state.followedNpcs.includes(npc.id);
  const trust = state.trust[npc.id] || 0;

  const handleFollow = () => {
    if (isFollowing) {
      dispatch({ type: 'UNFOLLOW_NPC', npcId: npc.id });
    } else {
      dispatch({ type: 'FOLLOW_NPC', npcId: npc.id });
    }
  };

  return (
    <div className="border-b border-border">
      {/* Banner */}
      <div className="h-32 md:h-40" style={{ background: `linear-gradient(135deg, ${npc.color}40, ${npc.color}15)` }} />

      <div className="px-4 pb-4">
        <div className="flex justify-between items-end -mt-10 mb-3">
          <div className="border-4 border-bg-primary rounded-full">
            <Avatar name={npc.displayName} color={npc.color} size="lg" suspended={npc.isSuspended} />
          </div>
          <div className="flex gap-2">
            {npc.canDM && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/messages/${npc.handle}`)}
              >
                Message
              </Button>
            )}
            <Button
              variant={isFollowing ? 'outline' : 'primary'}
              size="sm"
              onClick={handleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        </div>

        <h1 className="font-bold text-xl text-text-primary">{npc.displayName}</h1>
        <div className="text-text-muted text-sm">@{npc.handle}</div>

        <p className="mt-2 text-text-primary text-sm">{npc.bio}</p>

        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <Badge>{npc.role}</Badge>
          {npc.age && <span className="text-text-muted text-xs">{npc.age} years old</span>}
          {npc.isAlt && <Badge variant="danger">Alt account</Badge>}
          {npc.isSuspended && <Badge variant="danger">Suspended</Badge>}
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
          <span><strong className="text-text-primary">{postCount}</strong> posts</span>
          {trust > 0 && (
            <span>Trust: <strong className="text-accent">{trust}</strong>/100</span>
          )}
        </div>
      </div>
    </div>
  );
}
