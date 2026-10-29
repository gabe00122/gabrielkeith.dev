<script lang="ts">
	import '@fontsource/atkinson-hyperlegible-next/400.css';
	import '@fontsource/atkinson-hyperlegible-next/400-italic.css';
	import '@fontsource/atkinson-hyperlegible-next/600.css';
	import '@fontsource/atkinson-hyperlegible-next/700.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/400-italic.css';
	import '@fontsource/jetbrains-mono/700.css';

	import '../app.css';

	import { onNavigate } from '$app/navigation';
	import Header from './header.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// A brief crossfade between pages (styles in app.css). Skipped where the View
	// Transitions API is missing, under reduced motion, for same-page navigations
	// (query or hash changes), and for back/forward, where mobile browsers already
	// animate their own swipe gesture.
	onNavigate((navigation) => {
		if (
			!document.startViewTransition ||
			matchMedia('(prefers-reduced-motion: reduce)').matches ||
			navigation.type === 'popstate' ||
			navigation.from?.url.pathname === navigation.to?.url.pathname
		) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				// A failed navigation still settles the DOM; don't surface it twice
				await navigation.complete.catch(() => {});
			});
		});
	});
</script>

<div class="site">
	<Header />

	<main>
		{@render children?.()}
	</main>
</div>
