import { resolve } from '$app/paths';

export type DemoId = 'mapox' | 'tictactoe';

export type Demo = {
	id: DemoId;
	name: string;
	description: string;
	href: string;
	repo: string;
	/** Posts that explain the work behind the demo */
	posts: { slug: string; title: string }[];
};

// A function rather than a constant so resolve() runs per render, not at import time
export function getDemos(): Demo[] {
	return [
		{
			id: 'mapox',
			name: 'Mapox',
			description:
				'Multi-agent, partially-observable gridworlds with a trained policy running live in the browser via WebAssembly and WebGPU.',
			href: resolve('/demos/mapox'),
			repo: 'https://github.com/gabe00122/mapox',
			posts: [{ slug: 'memory', title: 'Memory and Implicit Communication' }]
		},
		{
			id: 'tictactoe',
			name: 'Self-play tic-tac-toe',
			description:
				'Play against an actor-critic agent that learned to match minimax with under a minute of self play on a single GPU.',
			href: resolve('/demos/tictactoe'),
			repo: 'https://github.com/gabe00122/tictactoe-rl',
			posts: [{ slug: 'vanilla-actor-critic', title: 'Vanilla Actor Critic' }]
		}
	];
}

export function getDemo(id: DemoId): Demo {
	const demo = getDemos().find((d) => d.id === id);
	if (!demo) throw new Error(`Unknown demo: ${id}`);
	return demo;
}

/** Short label for a repo link: the last path segment of its URL */
export function repoLabel(url: string) {
	return new URL(url).pathname.split('/').filter(Boolean).at(-1) ?? url;
}
