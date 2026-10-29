<script lang="ts">
	import { isoDate } from '$lib/utils';
	import Seo from '$lib/components/seo.svelte';
	import { getDemo, repoLabel } from '$lib/demos';
	import type { Post } from '$lib/types';

	let { data } = $props();

	let meta = $derived(data.meta as Post);
	let demo = $derived(meta.demo ? getDemo(meta.demo) : undefined);

	type TocItem = { id: string; text: string; level: 2 | 3 };

	let proseEl: HTMLElement | undefined = $state();
	let tocItems: TocItem[] = $state([]);
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
		const words = proseEl.textContent?.trim().split(/\s+/).length ?? 0;
		minutes = Math.max(1, Math.round(words / 230));
		activeId = computeActive(items);
	});

	function computeActive(items: TocItem[]) {
		let current = '';
		for (const item of items) {
			const el = document.getElementById(item.id);
			if (el && el.getBoundingClientRect().top <= 120) current = item.id;
		}
		return current;
	}

	function onScroll() {
		activeId = computeActive(tocItems);
	}
</script>

<svelte:window onscroll={onScroll} />

<Seo title={meta.title} description={meta.description} type="article" />

<div class="content-column">
	<article class="post">
		<!-- Repo links are external; the demo href is already resolved. -->
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<header class="post-header">
			<h1 class="post-title">{meta.title}</h1>
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
					<a class="demo-link" href={demo.href}>▶ try the {demo.name} demo</a>
				{/if}
			</div>
		</header>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->

		<div class="prose" bind:this={proseEl}>
			<data.content />
		</div>
	</article>
</div>

{#if tocItems.length >= 2}
	<nav class="toc" aria-label="Table of contents">
		<div class="toc-label meta">Contents</div>
		<ul>
			{#each tocItems as item (item.id)}
				<li class:sub={item.level === 3} class:active={activeId === item.id}>
					<a href={'#' + item.id}>{item.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.post-title {
		font-size: 1.75rem;
		line-height: 1.25;
		margin-bottom: 0.5rem;
	}
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

	.toc {
		display: none;
	}

	@media (min-width: 1280px) {
		.toc {
			display: block;
			position: fixed;
			top: 7rem;
			left: calc(50% + 22.5rem);
			width: min(16rem, calc(50vw - 22.5rem - 1.5rem));
			max-height: calc(100vh - 10rem);
			overflow-y: auto;
			overflow-x: hidden;
			scrollbar-width: thin;
		}
	}

	.toc-label {
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0.75rem;
	}

	.toc ul {
		display: block;
		list-style: none;
		margin: 0;
		padding: 0;
		border-left: 1px solid var(--border);
	}

	.toc li {
		display: block;
		margin: 0;
		padding: 0.2rem 0 0.2rem 0.9rem;
		border-left: 4px solid transparent;
		margin-left: -2.5px;
	}

	.toc li.sub {
		padding-left: 1.9rem;
	}

	.toc li.active {
		border-left-color: var(--accent);
	}

	.toc a {
		display: inline-block;
		padding: 0;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1.45;
		color: var(--muted);
		text-decoration: none;
	}

	.toc a:hover,
	.toc a:focus-visible {
		color: var(--fg);
	}

	.toc li.active > a {
		color: var(--accent);
	}
</style>
