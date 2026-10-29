import type { RouteId } from '$app/types';

export type Demo = {
	name: string;
	description: string;
	/** Unresolved route; pass it through resolve() where the link renders */
	route: Extract<RouteId, `/demos/${string}`>;
	repo: string;
	/** Posts that explain the work behind the demo */
	posts: { slug: string; title: string }[];
};

export const demos = {
	mapox: {
		name: 'Mapox',
		description:
			'Multi-agent, partially-observable gridworlds with a trained policy running live in the browser via WebAssembly and WebGPU.',
		route: '/demos/mapox',
		repo: 'https://github.com/gabe00122/mapox',
		posts: [{ slug: 'memory', title: 'Memory and Implicit Communication' }]
	},
	tictactoe: {
		name: 'Self-play tic-tac-toe',
		description:
			'Play against an actor-critic agent that learned to match minimax with under a minute of self play on a single GPU.',
		route: '/demos/tictactoe',
		repo: 'https://github.com/gabe00122/tictactoe-rl',
		posts: [{ slug: 'vanilla-actor-critic', title: 'Vanilla Actor Critic' }]
	}
} satisfies Record<string, Demo>;

export type DemoId = keyof typeof demos;

/** Short label for a repo link: the last path segment of its URL */
export function repoLabel(url: string) {
	return new URL(url).pathname.split('/').filter(Boolean).at(-1) ?? url;
}
