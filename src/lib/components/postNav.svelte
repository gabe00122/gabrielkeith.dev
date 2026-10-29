<script lang="ts">
	import type { Post } from '$lib/types';
	import { isoDate } from '$lib/utils';
	import { resolve } from '$app/paths';

	let { older, newer }: { older?: Post; newer?: Post } = $props();
</script>

{#snippet cell(post: Post | undefined, label: string, side: 'older' | 'newer')}
	{#if post}
		<a class="post-nav-cell {side}" href={resolve('/posts/[slug]', { slug: post.slug })}>
			<span class="meta caps">{label}</span>
			<span class="post-nav-title">{post.title}</span>
			<time class="meta" datetime={post.date}>{isoDate(post.date)}</time>
		</a>
	{:else}
		<!-- Holds the grid position so the other cell stays on its side -->
		<div class="post-nav-empty" aria-hidden="true"></div>
	{/if}
{/snippet}

{#if older || newer}
	<nav class="post-nav" aria-label="More posts">
		{@render cell(older, '← Older', 'older')}
		{@render cell(newer, 'Newer →', 'newer')}
	</nav>
{/if}

<style>
	.post-nav {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 3rem;
		padding-top: 1.25rem;
		border-top: var(--rule);
	}

	/* Highlights like a selected cell, as list entries do */
	.post-nav-cell {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 12px;
		border: 2px solid transparent;
		color: inherit;
		text-decoration: none;
	}

	/* Pulled out by their padding so the text lines up with the column edges */
	.post-nav-cell.older {
		margin-left: -12px;
	}

	.post-nav-cell.newer {
		margin-right: -12px;
		align-items: flex-end;
		text-align: right;
	}

	.post-nav-cell:hover,
	.post-nav-cell:focus-visible {
		background: var(--surface);
		border-color: var(--border-strong);
	}

	.post-nav-title {
		font-family: var(--font-mono);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.3;
	}

	.post-nav-cell:hover .post-nav-title,
	.post-nav-cell:focus-visible .post-nav-title {
		color: var(--accent);
	}

	/* Stacked on phones, everything flush left */
	@media (max-width: 30rem) {
		.post-nav {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}

		.post-nav-cell {
			margin-inline: -12px;
		}

		.post-nav-cell.newer {
			align-items: flex-start;
			text-align: left;
		}

		.post-nav-empty {
			display: none;
		}
	}
</style>
