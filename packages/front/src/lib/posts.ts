import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'> | CollectionEntry<'zenn'>;

/**
 * Combines local articles and Zenn articles, and returns them in descending
 * order of createdAt (for RSS; no filtering by published).
 */
export async function getAllPosts(): Promise<PostEntry[]> {
  const [posts, zenn] = await Promise.all([getCollection('posts'), getCollection('zenn')]);
  return [...posts, ...zenn].sort(
    (a, b) => new Date(b.data.createat ?? 0).getTime() - new Date(a.data.createat ?? 0).getTime(),
  );
}

/**
 * Published articles only (for home/post list).
 */
export async function getPublishedPosts(): Promise<PostEntry[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.published);
}
