<script lang="ts">
	import type { Cell } from './game';

	interface Props {
		cell: Cell;
		preference?: number;
		onclick: () => void;
	}

	let { cell, preference, onclick }: Props = $props();
</script>

<button
	class="cell"
	type="button"
	{onclick}
	disabled={cell !== undefined}
	aria-label={cell ?? 'Empty cell'}
>
	<div class="preference">
		{#if preference !== undefined}
			{preference.toLocaleString(undefined, { style: 'percent' })}
		{/if}
	</div>

	{#if cell === 'X'}
		<svg class="icon x" viewBox="0 0 460.775 460.775" fill="currentColor" aria-hidden="true">
			<path
				d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
			/>
		</svg>
	{:else if cell === 'O'}
		<svg class="icon o" viewBox="0 0 1 1" aria-hidden="true">
			<circle cx="0.5" cy="0.5" r="0.4" fill="none" stroke="currentColor" stroke-width="0.16" />
		</svg>
	{/if}
</button>

<style>
	.cell {
		display: block;
		padding: 0;
		border: 2px solid transparent;
		background: var(--surface);
	}

	/* Open cells highlight like a selected cell */
	.cell:enabled:hover {
		border-color: var(--accent);
	}

	.cell:disabled {
		cursor: default;
	}

	.icon {
		display: block;
		width: 100%;
		padding: 0 25%;
	}

	.x {
		color: var(--accent);
	}

	.o {
		color: var(--code);
	}

	.preference {
		height: 27%;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-align: center;
	}
</style>
