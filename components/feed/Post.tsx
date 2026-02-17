'use client';

import Link from 'next/link';
import { Post as PostType } from '@/types/post';
import { getNpcById } from '@/data/npcs';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useGame } from '@/contexts/GameContext';
import { formatTimestamp } from '@/lib/utils';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { state, dispatch } = useGame();
  const npc = getNpcById(post.authorId);
  if (!npc) return null;

  const isLiked = state.likedPosts.includes(post.id);

  const handleLike = () => {
    if (isLiked) {
      dispatch({ type: 'UNLIKE_POST', postId: post.id });
    } else {
      dispatch({ type: 'LIKE_POST', postId: post.id });
      // Liking a post with evidence auto-collects it
      if (post.isEvidence && post.evidenceId) {
        dispatch({ type: 'COLLECT_EVIDENCE', evidenceId: post.evidenceId });
      }
    }
  };

  return (
    <article className="border-b border-border px-4 py-3 hover:bg-bg-surface/50 transition-colors">
      <div className="flex gap-3">
        <Link href={`/profile/${npc.handle}`}>
          <Avatar name={npc.displayName} color={npc.color} suspended={npc.isSuspended} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${npc.handle}`} className="font-bold text-text-primary text-sm no-underline hover:underline">
              {npc.displayName}
            </Link>
            <Link href={`/profile/${npc.handle}`} className="text-text-muted text-sm no-underline">
              @{npc.handle}
            </Link>
            <span className="text-text-muted text-sm">&middot;</span>
            <span className="text-text-muted text-sm">{formatTimestamp(post.day, post.timestamp)}</span>
          </div>

          {post.isDeleted && (
            <Badge variant="danger">Deleted post (recovered)</Badge>
          )}

          <div className="mt-1 text-text-primary text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          {post.isEvidence && post.evidenceId && !state.collectedEvidence.includes(post.evidenceId) && (
            <div className="mt-2">
              <Badge variant="evidence">Contains evidence - Like to collect</Badge>
            </div>
          )}

          <div className="flex items-center gap-6 mt-2 text-text-muted">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors cursor-pointer bg-transparent border-none ${
                isLiked ? 'text-danger' : 'text-text-muted hover:text-danger'
              }`}
            >
              {isLiked ? '\u2764\ufe0f' : '\ud83e\ude75'} {(post.likes || 0) + (isLiked ? 1 : 0)}
            </button>
            {post.boosts !== undefined && (
              <span className="flex items-center gap-1 text-sm">
                \ud83d\udd01 {post.boosts}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
