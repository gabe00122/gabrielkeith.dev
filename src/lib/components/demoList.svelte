<script lang="ts">
	import { repoLabel, type Demo } from '$lib/demos';
	import { asset, resolve } from '$app/paths';

	let { demos, headingLevel = 2 }: { demos: Demo[]; headingLevel?: 2 | 3 } = $props();
</script>

<!-- Repo links are external. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<ul class="item-list demo-list">
	{#each demos as demo (demo.route)}
		<li class="entry" class:has-poster={!!demo.poster}>
			{#if demo.poster}
				<!-- Duplicates the title link for pointer users; hidden from keyboard and screen readers -->
				<a class="poster" href={resolve(demo.route)} tabindex="-1" aria-hidden="true">
					<img
						src={asset(demo.poster.src)}
						width={demo.poster.width}
						height={demo.poster.height}
						alt=""
						loading="lazy"
						decoding="async"
					/>
				</a>
			{/if}
			<div class="body">
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
			</div>
		</li>
	{/each}
</ul>

<style>
	.demo-list {
		container-type: inline-size;
	}

	.link-row {
		margin-top: 0.5rem;
	}

	/* Poster above the text in narrow columns, beside it in wide ones */
	.has-poster {
		display: grid;
		gap: 0.75rem;
	}

	@container (min-width: 32rem) {
		.has-poster {
			grid-template-columns: 10rem 1fr;
			gap: 1.25rem;
			align-items: start;
		}
	}

	.poster {
		display: block;
		width: 10rem;
		max-width: 100%;
		border: var(--rule);
		background: var(--bg-deep);
	}

	.poster img {
		display: block;
		width: 100%;
		height: auto;
	}

	.body {
		min-width: 0;
	}

	/* The frame lifts with the entry and lights up like a selected cell under the pointer */
	.entry:hover .poster,
	.entry:focus-within .poster {
		border-color: var(--muted);
	}

	.poster:hover {
		border-color: var(--accent);
	}
</style>
