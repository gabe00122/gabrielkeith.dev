<script lang="ts">
	import { onMount } from 'svelte';
	import * as tf from '@tensorflow/tfjs';
	import { ModelWrapper } from './model';
	import { initialGameState, turn } from './game';
	import Cell from './cell.svelte';
	import Seo from '$lib/components/seo.svelte';
	import DemoHeader from '$lib/components/demoHeader.svelte';
	import { demos } from '$lib/demos';
	import { asset } from '$app/paths';

	const demo = demos.tictactoe;

	async function onCellClick(cellNumber: number) {
		const isValidAction = game.board[cellNumber] === undefined;

		if (!aiCalculating && game.result === 'ongoing' && isValidAction) {
			game = turn(game, cellNumber);

			if (game.result === 'ongoing') {
				await playAITurn();
			}
		}
	}

	function restart() {
		game = initialGameState;
		previousGame = initialGameState;
		value = 0.0;
		preferences = [0, 0, 0, 0, 0, 0, 0, 0, 0];

		gameStart = true;
		aiHasMoved = false;
	}

	function playAsX() {
		gameStart = false;
		playerWentFirst = true;
	}

	async function playAsO() {
		playerWentFirst = false;
		await playAITurn();
		gameStart = false;
	}

	async function playAITurn() {
		aiCalculating = true;

		const result = await modelWrapper.act(game);
		previousGame = game;
		preferences = result.preferences;
		value = result.value;
		game = turn(game, result.action);

		aiCalculating = false;
		aiHasMoved = true;
	}

	let model: tf.GraphModel<string>;
	let modelWrapper: ModelWrapper;

	let loading = $state(true);
	let gameStart = $state(true);
	let showPreferences = $state(false);
	let aiHasMoved = $state(false);

	let playerWentFirst = $state(true);
	let aiCalculating = false;

	let value = $state(0.0);

	let preferences = $state([0, 0, 0, 0, 0, 0, 0, 0, 0]);
	let previousGame = $state(initialGameState);
	let game = $state(initialGameState);

	onMount(() => {
		(async () => {
			if (!model) {
				model = await tf.loadGraphModel(asset('/tictactoe/selfplay/model.json'));
				modelWrapper = new ModelWrapper(model);

				// Warm up the model
				await modelWrapper.act(game);
				loading = false;
			}
		})();

		return () => {
			modelWrapper?.dispose();
		};
	});
</script>

<Seo
	title="Tic-tac-toe Demo"
	description="Challenge yourself against an (nearly) unbeatable Tic Tac Toe AI trained with Reinforcement Learning."
/>

<!-- Same full-width frame as the Mapox demo, so the DemoHeader lays out identically -->
<div class="demo-page">
	<DemoHeader {demo} />

	{#if gameStart}
		<div class="control-group">
			<button onclick={playAsX}>I want to go first</button>
			<button onclick={playAsO}>I want to go second</button>
		</div>
	{:else if loading}
		<div class="control-group">Loading Model...</div>
	{:else}
		<div class="board">
			{#each game.board as boardCell, index (index)}
				{@const showPreference =
					aiHasMoved && showPreferences && previousGame.board[index] === undefined}
				<Cell
					cell={boardCell}
					preference={showPreference ? preferences[index] : undefined}
					onclick={() => onCellClick(index)}
				/>
			{/each}
		</div>

		{#if game.result !== 'ongoing'}
			<div class="control-group">
				{#if game.result === 'draw'}
					It's a draw!
				{:else if playerWentFirst === (game.activePlayer === 'O')}
					You won!
				{:else}
					You lost!
				{/if}
			</div>
			<div class="control-group">
				<button onclick={restart}>Play Again?</button>
			</div>
		{/if}

		<div class="control-group meta">Critic value: {value.toFixed(3)}</div>
		<div class="control-group">
			<label>
				<input type="checkbox" bind:checked={showPreferences} />
				Show preferences
			</label>
		</div>
		<p class="control-group meta">
			This model was trained with self play in less than a minute on a RTX 3070
		</p>
	{/if}
</div>

<style>
	.demo-page {
		padding-bottom: 4rem;
	}

	.board {
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
		gap: 2px;
		width: 300px;
		height: 300px;
		margin: 0 auto var(--space);
		border: 2px solid var(--border-strong);
		background: var(--border-strong);
	}

	.control-group {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin: 0 var(--space) 0.75rem;
		text-align: center;
	}
</style>
