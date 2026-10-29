<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Seo from '$lib/components/seo.svelte';

	let status = $derived(page.status);
	let notFound = $derived(status === 404);

	let message = $derived.by(() => {
		if (notFound) return "There's nothing at this address.";
		if (status >= 500) return 'Something went wrong on the server. Try again in a moment.';
		return page.error?.message || 'Something went wrong loading this page.';
	});

	const links = [
		{ href: resolve('/'), label: 'Home' },
		{ href: resolve('/posts'), label: 'Posts' },
		{ href: resolve('/demos'), label: 'Demos' }
	];
</script>

<Seo title={notFound ? 'Not found' : `Error ${status}`} />

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- Links are already resolved above. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class="content-column">
	<hgroup class="error-head">
		<h1 class="error-status">{status}</h1>
		<p class="error-message">{message}</p>
		{#if notFound}
			<p class="meta error-path">{page.url.pathname}</p>
		{/if}
	</hgroup>

	<nav aria-label="Back to the site">
		<ul class="link-row meta caps error-links">
			{#each links as link (link.href)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	.error-head {
		margin-bottom: 2rem;
	}

	.error-status {
		margin-bottom: 0.5rem;
		font-size: clamp(4rem, 18vw, 6rem);
		line-height: 1;
		letter-spacing: -0.05em;
	}

	/* A selected cell, like the section markers */
	.error-status::after {
		content: '';
		display: inline-block;
		width: 0.2em;
		height: 0.2em;
		margin-left: 0.15em;
		background: var(--accent);
	}

	.error-message {
		font-size: 1.125rem;
		margin-bottom: 0.25rem;
	}

	.error-path {
		overflow-wrap: anywhere;
	}

	.error-links li + li::before {
		content: '';
		display: inline-block;
		width: 4px;
		height: 4px;
		margin-right: 1.25rem;
		background: var(--border-strong);
		vertical-align: 0.2em;
	}
</style>
