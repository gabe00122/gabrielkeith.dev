import { getPosts } from '$lib/posts.js';

export async function load() {
	const posts = getPosts();
	return { posts };
}
