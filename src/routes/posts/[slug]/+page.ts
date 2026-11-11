import { error } from '@sveltejs/kit';

// The neighbouring posts come from +page.server.ts; the post component can't be
// serialized, so it's loaded here.
export async function load({ params, data }) {
	const post = await import(`../../../posts/${params.slug}.md`).catch(() =>
		error(404, `Could not find ${params.slug}`)
	);

	// Every .md in src/posts is bundled for the browser by the import above, so
	// raw notes live in src/notes instead. A file without frontmatter isn't a post.
	if (!post.metadata) {
		error(404, `Could not find ${params.slug}`);
	}

	return {
		...data,
		content: post.default,
		meta: post.metadata
	};
}
