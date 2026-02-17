'use client';

import { Post } from './Post';
import { Post as PostType } from '@/types/post';

interface FeedProps {
  posts: PostType[];
  emptyMessage?: string;
}

export function Feed({ posts, emptyMessage = 'No posts yet.' }: FeedProps) {
  if (posts.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
