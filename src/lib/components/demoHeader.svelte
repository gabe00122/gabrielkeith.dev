<script lang="ts">
	import { repoLabel, type Demo } from '$lib/demos';
	import { resolve } from '$app/paths';

	let { demo }: { demo: Demo } = $props();
</script>

<!-- Repo links are external. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<header class="demo-header">
	<h1 class="demo-title">
		<a href={resolve('/demos')}>Demos</a> / {demo.name}
	</h1>
	<ul class="link-row meta">
		{#each demo.posts as post (post.slug)}
			<li><a href={resolve('/posts/[slug]', { slug: post.slug })}>post: {post.title}</a></li>
		{/each}
		<li><a href={demo.repo}>code: {repoLabel(demo.repo)} ↗</a></li>
	</ul>
</header>

<style>
	.demo-header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 1.5rem;
		padding: var(--space);
	}

	.demo-title {
		margin: 0 auto 0 0;
		font-size: 1.125rem;
	}

	.demo-title a {
		color: var(--muted);
		text-decoration: none;
	}

	.demo-title a:hover {
		color: var(--accent);
	}
</style>
