import type { Post } from '$lib/types';
import { parsePostDate } from '$lib/site';

/** Published posts, newest first */
export function getPosts() {
	const posts: Post[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published) {
				posts.push(post);
			}
		}
	}

	// parsePostDate rather than new Date(): unpadded dates like '2024-5-30' would
	// otherwise parse as local time, or not at all outside V8
	return posts.sort(
		(first, second) => parsePostDate(second.date).getTime() - parsePostDate(first.date).getTime()
	);
}
