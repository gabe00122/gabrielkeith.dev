<script lang="ts">
	// Math is rendered to KaTeX HTML at build time (rehype-katex-svelte), so posts
	// only need the stylesheet. Bundled from the same katex version as the renderer;
	// its fonts are @font-face rules, so they download only when math is on screen.
	import 'katex/dist/katex.min.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
