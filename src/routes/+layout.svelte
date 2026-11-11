<script lang="ts">
	import '@fontsource/atkinson-hyperlegible-next/400.css';
	import '@fontsource/atkinson-hyperlegible-next/400-italic.css';
	import '@fontsource/atkinson-hyperlegible-next/600.css';
	import '@fontsource/atkinson-hyperlegible-next/700.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/400-italic.css';
	import '@fontsource/jetbrains-mono/700.css';

	import '../app.css';

	import Header from './header.svelte';
	import { resolve } from '$app/paths';
	import { siteTitle } from '$lib/site';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title={siteTitle} href={resolve('/rss.xml')} />
</svelte:head>

<div class="site">
	<!-- First tab stop: lets keyboard users jump past the pinned header -->
	<a class="skip-link" href="#content">Skip to content</a>
	<Header />

	<!-- tabindex so the skip link moves focus here, not just the scroll position -->
	<main id="content" tabindex="-1">
		{@render children?.()}
	</main>
</div>

<style>
	.skip-link {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 20;
		padding: 0.6rem 1rem;
		background: var(--accent);
		color: var(--accent-fg);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		text-decoration: none;
		transform: translateY(-100%);
	}

	.skip-link:focus {
		transform: none;
	}

	main:focus {
		outline: none;
	}
</style>
