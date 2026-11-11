import { resolve } from '$app/paths';
import { getPosts } from '$lib/posts';
import {
	absoluteUrl,
	author,
	escapeXml,
	parsePostDate,
	siteDescription,
	siteOrigin,
	siteTitle
} from '$lib/site';

export const prerender = true;

export function GET() {
	const posts = getPosts();
	const feedUrl = absoluteUrl(resolve('/rss.xml'));

	const items = posts
		.map((post) => {
			const link = absoluteUrl(resolve('/posts/[slug]', { slug: post.slug }));
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${escapeXml(link)}</link>
			<guid isPermaLink="true">${escapeXml(link)}</guid>
			<pubDate>${parsePostDate(post.date).toUTCString()}</pubDate>
			<dc:creator>${escapeXml(author)}</dc:creator>
			<description>${escapeXml(post.description)}</description>
		</item>`;
		})
		.join('');

	// The newest post's date, so the feed only changes when the posts do
	const lastBuild = posts.length
		? `\n\t\t<lastBuildDate>${parsePostDate(posts[0].date).toUTCString()}</lastBuildDate>`
		: '';

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>${escapeXml(siteTitle)}</title>
		<link>${escapeXml(`${siteOrigin}/`)}</link>
		<description>${escapeXml(siteDescription)}</description>
		<language>en</language>${lastBuild}
		<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	});
}
