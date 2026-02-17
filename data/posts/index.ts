import { Post } from '@/types/post';
import { noorPosts } from './noor';
import { innerCirclePosts } from './inner-circle';
import { communityPosts } from './community';
import { teenPosts } from './teens';
import { governmentPosts } from './government';
import { otherPosts } from './other';

export const allPosts: Post[] = [
  ...noorPosts,
  ...innerCirclePosts,
  ...communityPosts,
  ...teenPosts,
  ...governmentPosts,
  ...otherPosts,
].sort((a, b) => b.day - a.day || (b.timestamp ?? '').localeCompare(a.timestamp ?? ''));
