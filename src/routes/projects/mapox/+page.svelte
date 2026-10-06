<script lang="ts">
	import { asset } from '$app/paths';
	import Seo from '$lib/components/seo.svelte';
	import Maximize from 'lucide-svelte/icons/maximize';
	import Minimize from 'lucide-svelte/icons/minimize';

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

<div class="demo-page">
	<!-- The demo is a standalone eframe/wasm app served from static/mapox/. -->
	<div class="demo-stage" bind:this={stage}>
		<iframe class="demo-frame" src={asset('/mapox/index.html')} title="Mapox live demo"></iframe>
		<button
			class="fullscreen-button outline contrast"
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
	.demo-page {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		/* Fill the viewport below the site header (~5rem tall). */
		height: calc(100dvh - 5rem);
		min-height: 24rem;
		padding: 0 var(--pico-spacing) var(--pico-spacing);
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
		border: 1px solid var(--pico-muted-border-color);
		border-radius: var(--pico-border-radius);
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
		background: var(--pico-background-color);
		opacity: 0.85;
		transition: opacity 0.2s ease-in-out;
	}

	.fullscreen-button:hover,
	.fullscreen-button:focus-visible {
		opacity: 1;
	}
</style>
