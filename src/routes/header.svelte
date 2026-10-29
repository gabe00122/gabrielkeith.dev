<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	const links = [
		{ href: resolve('/posts'), label: 'Posts' },
		{ href: resolve('/demos'), label: 'Demos' },
		{ href: resolve('/about'), label: 'About' }
	];

	let path = $derived(page.url.pathname);
</script>

<!-- Links are already resolved above. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<header class="site-header">
	<nav class="site-header-inner" aria-label="Main">
		<a class="site-name" href={resolve('/')}>Gabriel Keith</a>
		<ul class="site-nav bare-list">
			{#each links as link (link.href)}
				<li>
					<a
						class="meta caps"
						href={link.href}
						aria-current={path.startsWith(link.href) ? 'page' : undefined}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		border-bottom: var(--rule);
		background: var(--bg-deep);
	}

	.site-header-inner {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		max-width: 64rem;
		height: var(--header-height);
		margin-inline: auto;
		padding-inline: var(--space);
	}

	.site-name {
		margin-right: auto;
		color: var(--fg);
		font-family: var(--font-mono);
		font-weight: 700;
		letter-spacing: -0.02em;
		white-space: nowrap;
		text-decoration: none;
	}

	.site-nav {
		display: flex;
		gap: 1.5rem;
	}

	@media (max-width: 480px) {
		.site-header-inner,
		.site-nav {
			gap: 1rem;
		}
	}

	.site-nav a {
		text-decoration: none;
	}

	.site-nav a:hover {
		color: var(--fg);
	}

	.site-nav a[aria-current='page'] {
		color: var(--accent);
	}

	.site-nav a[aria-current='page']::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		margin-right: 0.5em;
		background: var(--accent);
		vertical-align: 0.15em;
	}
</style>
