<script lang="ts">
	import { asset } from '$app/paths';
	import Seo from '$lib/components/seo.svelte';
	import DemoHeader from '$lib/components/demoHeader.svelte';
	import { getDemo } from '$lib/demos';
	import Maximize from 'lucide-svelte/icons/maximize';
	import Minimize from 'lucide-svelte/icons/minimize';

	const demo = getDemo('mapox');

	let stage: HTMLDivElement;
	let isFullscreen = $state(false);

	function onFullscreenChange() {
		isFullscreen = document.fullscreenElement === stage;
	}

	async function toggleFullscreen() {
		if (document.fullscreenElement) {
			await document.exitFullscreen();
		} else {
			await stage.requestFullscreen();
		}
	}
</script>

<svelte:document onfullscreenchange={onFullscreenChange} />

<Seo
	title="Mapox Demo"
	description="Live multi-agent gridworld demo: a trained policy running in the browser via WebAssembly and WebGPU."
/>

<div class="mapox-page">
	<DemoHeader {demo} />
	<!-- The demo is a standalone eframe/wasm app served from static/mapox/. -->
	<div class="demo-stage" bind:this={stage}>
		<iframe class="demo-frame" src={asset('/mapox/index.html')} title="Mapox live demo"></iframe>
		<button
			class="fullscreen-button"
			type="button"
			onclick={toggleFullscreen}
			aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
			title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
		>
			{#if isFullscreen}
				<Minimize size={18} aria-hidden="true" />
			{:else}
				<Maximize size={18} aria-hidden="true" />
			{/if}
		</button>
	</div>
</div>

<style>
	/* Pin the page to the viewport so the canvas fills exactly what's left
	   below the site header and demo header, edge to edge */
	:global(.site:has(.mapox-page)) {
		height: 100dvh;
		min-height: 24rem;
	}

	.mapox-page {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
	}

	.demo-stage {
		position: relative;
		display: flex;
		flex: 1;
		min-height: 0;
	}

	.demo-stage:fullscreen {
		background: black;
	}

	.demo-frame {
		flex: 1;
		width: 100%;
		min-height: 0;
		border: 0;
		border-top: 1px solid var(--border);
		background: black;
	}

	.fullscreen-button {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		width: auto;
		margin: 0;
		padding: 0.4rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--bg);
		opacity: 0.85;
		transition: opacity 0.2s ease-in-out;
	}

	.fullscreen-button:hover,
	.fullscreen-button:focus-visible {
		opacity: 1;
	}
</style>
