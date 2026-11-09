import { getPosts } from '$lib/posts.js';

export async function load() {
  const posts = getPosts().slice(0, 3);
	return { posts };
}
