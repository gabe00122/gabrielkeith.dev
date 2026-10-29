<script lang="ts">
	import { isoDate } from '$lib/utils';
	import Seo from '$lib/components/seo.svelte';
	import PostNav from '$lib/components/postNav.svelte';
	import { resolve } from '$app/paths';
	import { demos, repoLabel } from '$lib/demos';
	import type { Post } from '$lib/types';

	let { data } = $props();

	let meta = $derived(data.meta as Post);
	let demo = $derived(meta.demo ? demos[meta.demo] : undefined);

	type TocItem = { id: string; text: string; level: 2 | 3 };

	let proseEl: HTMLElement | undefined = $state();
	let tocItems: TocItem[] = $state([]);
	// Until the headings are read, the inline contents is left to CSS (see below)
	let tocScanned = $state(false);
	let activeId = $state('');
	let minutes = $state(0);

	function headingLabel(heading: Element): string {
		const clone = heading.cloneNode(true) as HTMLElement;
		// The autolink anchor is empty, and KaTeX duplicates its text across the
		// MathML annotation and the aria-hidden HTML render — drop all three.
		clone.querySelectorAll('a, .katex-html, annotation').forEach((el) => el.remove());
		return clone.textContent?.replace(/\s+/g, ' ').trim() ?? '';
	}

	$effect(() => {
		if (!data.content || !proseEl) {
			return;
		}
		const items = Array.from(proseEl.querySelectorAll<HTMLElement>('h2[id], h3[id]')).map((h) => ({
			id: h.id,
			text: headingLabel(h),
			level: h.tagName === 'H2' ? (2 as const) : (3 as const)
		}));
		tocItems = items;
		tocScanned = true;
		const words = proseEl.textContent?.trim().split(/\s+/).length ?? 0;
		minutes = Math.max(1, Math.round(words / 190));
		activeId = computeActive(items);
	});

	// The active heading is the last one above the middle of the viewport. At the
	// very bottom of the page, headings below the middle can never cross it, so
	// fall back to the last heading that's on screen.
	function computeActive(items: TocItem[]) {
		const atBottom =
			window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
		const line = atBottom ? window.innerHeight : window.innerHeight / 2;
		let current = '';
		for (const item of items) {
			const el = document.getElementById(item.id);
			if (el && el.getBoundingClientRect().top <= line) current = item.id;
		}
		return current;
	}

	function onScroll() {
		activeId = computeActive(tocItems);
	}
</script>

<svelte:window onscroll={onScroll} />

<Seo title={meta.title} description={meta.description} type="article" published={meta.date} />

<div class="content-column post-column">
	<article class="post">
		<!-- Repo links are external. -->
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<header class="post-header">
			<h1 class="page-title">{meta.title}</h1>
			<div class="post-meta meta">
				<ul class="link-row">
					<li><time datetime={meta.date}>{isoDate(meta.date)}</time></li>
					{#if minutes}<li>{minutes} min read</li>{/if}
				</ul>
				{#if meta.code?.length}
					<ul class="link-row">
						<li>code:</li>
						{#each meta.code as url (url)}
							<li><a href={url}>{repoLabel(url)} ↗</a></li>
						{/each}
					</ul>
				{/if}
				{#if demo}
					<a class="demo-link" href={resolve(demo.route)}>▶ try the {demo.name} demo</a>
				{/if}
			</div>
		</header>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->

		<!-- Narrow screens get the contents inline in place of the side rail. It's
		     server-rendered before the headings are known, so the first paint
		     doesn't shift; CSS hides it until then if the post lacks headings. -->
		{#if !tocScanned || tocItems.length >= 2}
			<details class="toc-inline">
				<summary class="meta caps">Contents</summary>
				<nav aria-label="Table of contents">
					<ul class="toc-list bare-list">
						{#each tocItems as item (item.id)}
							<li class:sub={item.level === 3}>
								<a href={'#' + item.id}>{item.text}</a>
							</li>
						{/each}
					</ul>
				</nav>
			</details>
		{/if}

		<div class="prose" bind:this={proseEl}>
			<data.content />
		</div>
	</article>

	<PostNav older={data.older} newer={data.newer} />

	{#if tocItems.length >= 2}
		<!-- A full-height rail beside the article so the nav can stick within it -->
		<aside class="toc-rail">
			<nav class="toc" aria-label="Table of contents">
				<div class="toc-label meta caps">Contents</div>
				<ul class="toc-list bare-list">
					{#each tocItems as item (item.id)}
						<li class:sub={item.level === 3} class:active={activeId === item.id}>
							<a href={'#' + item.id}>{item.text}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>

<style>
	.post-header {
		margin-bottom: 2rem;
		padding-bottom: 1.25rem;
		border-bottom: var(--rule);
	}

	.post-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.35rem;
	}

	.demo-link {
		color: var(--accent);
		text-decoration: none;
	}

	.demo-link:hover {
		text-decoration: underline;
	}

	.post-column {
		position: relative;
	}

	.toc-rail {
		display: none;
	}

	@media (min-width: 1280px) {
		/* Spans the column's padding box top to bottom, just right of the article */
		.toc-rail {
			display: block;
			position: absolute;
			top: 2.5rem;
			bottom: 4rem;
			left: 100%;
			/* Whatever's left between the column and the viewport edge, less a gutter */
			width: min(16rem, 50vw - var(--measure) / 2 - 2 * var(--gutter));
		}

		.toc {
			position: sticky;
			top: calc(2rem + var(--header-height));
			max-height: calc(100vh - 4rem - var(--header-height));
			overflow-y: auto;
			overflow-x: hidden;
			scrollbar-width: thin;
		}
	}

	.toc-label {
		margin-bottom: 0.75rem;
	}

	/* Shared by the side rail and the inline contents */
	.toc-list {
		border-left: 1px solid var(--border);
	}

	.toc-list li {
		padding: 0.2rem 0 0.2rem 0.9rem;
		border-left: 4px solid transparent;
		margin-left: -2.5px;
	}

	.toc-list li.sub {
		padding-left: 1.9rem;
	}

	.toc-list li.active {
		border-left-color: var(--accent);
	}

	.toc-list a {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: 1.45;
		color: var(--muted);
		text-decoration: none;
	}

	.toc-list a:hover,
	.toc-list a:focus-visible {
		color: var(--fg);
	}

	.toc-list li.active > a {
		color: var(--accent);
	}

	/* Inline contents, below the rail's breakpoint ------------------------- */

	.toc-inline {
		margin-bottom: 2rem;
	}

	/* Before hydration: hidden unless the prose has at least two headings */
	.toc-inline:not(:has(+ .prose :global(:is(h2, h3)[id] ~ :is(h2, h3)[id]))) {
		display: none;
	}

	@media (min-width: 1280px) {
		.toc-inline {
			display: none;
		}
	}

	.toc-inline summary {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		list-style: none;
	}

	.toc-inline summary::-webkit-details-marker {
		display: none;
	}

	/* An outlined cell when closed, filled when open */
	.toc-inline summary::before {
		content: '';
		width: 0.5em;
		height: 0.5em;
		border: 2px solid currentColor;
	}

	.toc-inline[open] summary::before {
		background: currentColor;
	}

	.toc-inline summary:hover,
	.toc-inline summary:focus-visible {
		color: var(--accent);
	}

	.toc-inline .toc-list {
		margin-top: 0.75rem;
	}
</style>
