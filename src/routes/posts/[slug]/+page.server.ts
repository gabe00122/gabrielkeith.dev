import { getPosts } from '$lib/posts';

export function load({ params }) {
	const posts = getPosts();

	// Newest first, so the newer neighbour sits just before this post. Unpublished
	// posts aren't in the list and get no neighbours.
	const index = posts.findIndex((p) => p.slug === params.slug);

	return {
		newer: index > 0 ? posts[index - 1] : undefined,
		older: index >= 0 ? posts[index + 1] : undefined
	};
}
