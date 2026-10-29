import { title, description, url } from '$lib/config';

export const author = 'Gabriel Keith';
export const siteTitle = title;
export const siteDescription = description;

/** Site origin with no trailing slash, e.g. https://gabrielkeith.dev */
export const siteOrigin = new URL(url).origin;

/** Absolute URL for a site path like /posts/memory */
export function absoluteUrl(path: string) {
	return new URL(path, siteOrigin).href;
}

/**
 * Parse a frontmatter date like '2026-07-21' or '2024-5-30' as UTC midnight.
 * new Date() treats the unpadded form as local time, so split it by hand.
 */
export function parsePostDate(date: string) {
	const [year, month, day] = date.split('-').map(Number);
	return new Date(Date.UTC(year, month - 1, day));
}

/** YYYY-MM-DD, for sitemap lastmod */
export function isoDay(date: string) {
	return parsePostDate(date).toISOString().slice(0, 10);
}

export function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/** JSON for an inline <script>; escapes < so content can't close the tag */
export function jsonLd(data: unknown) {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
