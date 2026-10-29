<script lang="ts">
	import type { Post } from '$lib/types';
	import { isoDate } from '$lib/utils';
	import { resolve } from '$app/paths';

	let { posts, headingLevel = 2 }: { posts: Post[]; headingLevel?: 2 | 3 } = $props();
</script>

<ol class="item-list">
	{#each posts as post (post.slug)}
		<li class="entry">
			<time class="meta" datetime={post.date}>{isoDate(post.date)}</time>
			<svelte:element this={`h${headingLevel}`} class="item-title">
				<a href={resolve('/posts/[slug]', { slug: post.slug })}>{post.title}</a>
			</svelte:element>
			<p class="item-description">{post.description}</p>
		</li>
	{/each}
</ol>
