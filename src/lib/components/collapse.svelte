<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		open?: boolean;
		children: Snippet;
	}

	let { title, open = false, children }: Props = $props();
</script>

<details class="collapse" {open}>
	<summary>{title}</summary>
	<div class="collapse-content">
		{@render children()}
	</div>
</details>

<style>
	.collapse {
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 0;
		margin-bottom: var(--flow);
	}

	.collapse > summary {
		padding: calc(var(--space) * 0.75) var(--space);
		margin: 0;
	}

	.collapse[open] > summary {
		border-bottom: 1px solid var(--border);
	}

	.collapse-content {
		padding: var(--space);
	}

	.collapse-content > :global(:last-child) {
		margin-bottom: 0;
	}
</style>
