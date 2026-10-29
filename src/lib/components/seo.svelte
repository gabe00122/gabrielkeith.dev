<script lang="ts">
	import { page } from '$app/state';
	import {
		absoluteUrl,
		author,
		jsonLd,
		parsePostDate,
		siteDescription,
		siteOrigin,
		siteTitle
	} from '$lib/site';

	interface Props {
		title?: string;
		description?: string;
		type?: 'website' | 'article';
		/** Post date like '2026-07-21'; used for article metadata */
		published?: string;
	}

	let { title, description, type = 'website', published }: Props = $props();

	let fullTitle = $derived(title ? `${title} | ${siteTitle}` : siteTitle);
	// og-image.png is 400x400, so twitter's "summary" card fits it; "summary_large_image" wants ~2:1
	let imageUrl = absoluteUrl('/og-image.png');
	// Pathname only, against the production origin: drops query and hash
	let canonical = $derived(absoluteUrl(page.url.pathname));

	let publishedIso = $derived.by(() => {
		if (!published) return undefined;
		const date = parsePostDate(published);
		return isNaN(date.getTime()) ? undefined : date.toISOString();
	});

	let structuredData = $derived.by(() => {
		const person = { '@type': 'Person', name: author, url: `${siteOrigin}/` };

		if (type === 'article') {
			return {
				'@context': 'https://schema.org',
				'@type': 'BlogPosting',
				headline: title ?? siteTitle,
				description,
				datePublished: publishedIso,
				author: person,
				url: canonical,
				mainEntityOfPage: canonical,
				image: imageUrl
			};
		}

		if (page.route.id === '/') {
			return {
				'@context': 'https://schema.org',
				'@graph': [
					{
						'@type': 'WebSite',
						name: siteTitle,
						description: description ?? siteDescription,
						url: `${siteOrigin}/`,
						author: person
					},
					{ ...person, sameAs: ['https://github.com/gabe00122'] }
				]
			};
		}

		return undefined;
	});

	// Built as a string so the closing tag doesn't end this component's own script block
	let structuredDataTag = $derived(
		structuredData
			? `<script type="application/ld+json">${jsonLd(structuredData)}<` + `/script>`
			: ''
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<link rel="canonical" href={canonical} />
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title ?? siteTitle} />
	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="400" />
	<meta property="og:image:height" content="400" />
	<meta name="twitter:card" content="summary" />
	{#if type === 'article' && publishedIso}
		<meta property="article:published_time" content={publishedIso} />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html structuredDataTag}
</svelte:head>
