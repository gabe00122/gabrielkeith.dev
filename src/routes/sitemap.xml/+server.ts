import { resolve } from '$app/paths';
import { demos } from '$lib/demos';
import { getPosts } from '$lib/posts';
import { absoluteUrl, escapeXml, isoDay } from '$lib/site';

export const prerender = true;

export function GET() {
	const posts = getPosts();
	const latest = posts.length ? isoDay(posts[0].date) : undefined;

	const entries: { path: string; lastmod?: string }[] = [
		{ path: resolve('/'), lastmod: latest },
		{ path: resolve('/posts'), lastmod: latest },
		{ path: resolve('/demos') },
		{ path: resolve('/about') },
		...Object.values(demos).map((demo) => ({ path: resolve(demo.route) })),
		...posts.map((post) => ({
			path: resolve('/posts/[slug]', { slug: post.slug }),
			lastmod: isoDay(post.date)
		}))
	];

	const urls = entries
		.map(({ path, lastmod }) => {
			const mod = lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : '';
			return `
	<url>
		<loc>${escapeXml(absoluteUrl(path))}</loc>${mod}
	</url>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
