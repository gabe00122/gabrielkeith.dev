<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import PostList from '$lib/components/postList.svelte';

	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<Seo title="Posts" description="Occasional writing on my projects and ideas." />

<div class="content-column">
	<header class="posts-header">
		<hgroup>
			<h1 class="page-title">Posts</h1>
			<p class="page-subtitle">Occasional writing on my projects and ideas.</p>
		</hgroup>
		<!-- A feed, not a page: opt out of client-side routing -->
		<a class="meta caps feed-link" href={resolve('/rss.xml')} data-sveltekit-reload>RSS</a>
	</header>
	<PostList posts={data.posts} />
</div>

<style>
	.posts-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space);
	}

	/* Keeps its marker and label on one line when the subtitle wraps on phones */
	.feed-link {
		flex: none;
		white-space: nowrap;
		text-decoration: none;
	}

	/* An outlined cell, filled under the pointer */
	.feed-link::before {
		content: '';
		display: inline-block;
		width: 0.5em;
		height: 0.5em;
		margin-right: 0.6em;
		border: 2px solid currentColor;
	}

	.feed-link:hover,
	.feed-link:focus-visible {
		color: var(--accent);
	}

	.feed-link:hover::before,
	.feed-link:focus-visible::before {
		background: currentColor;
	}
</style>
