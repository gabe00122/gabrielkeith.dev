<script lang="ts">
	import { repoLabel, type Demo } from '$lib/demos';
	import { resolve } from '$app/paths';

	let { demos, headingLevel = 2 }: { demos: Demo[]; headingLevel?: 2 | 3 } = $props();
</script>

<!-- Repo links are external. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<ul class="item-list">
	{#each demos as demo (demo.route)}
		<li class="entry">
			<svelte:element this={`h${headingLevel}`} class="item-title">
				<a href={resolve(demo.route)}>▶ {demo.name}</a>
			</svelte:element>
			<p class="item-description">{demo.description}</p>
			<ul class="link-row meta">
				{#each demo.posts as post (post.slug)}
					<li>
						<a href={resolve('/posts/[slug]', { slug: post.slug })}>post: {post.title}</a>
					</li>
				{/each}
				<li><a href={demo.repo}>code: {repoLabel(demo.repo)} ↗</a></li>
			</ul>
		</li>
	{/each}
</ul>

<style>
	.link-row {
		margin-top: 0.5rem;
	}
</style>
