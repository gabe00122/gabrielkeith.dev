import type { DemoId } from '$lib/demos';

export type Categories = 'reinforcement learning' | 'jax' | 'transformer';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
	/** Repo URLs, shown as "code" links in the post header */
	code?: string[];
	/** Related demo, shown as a "demo" link in the post header */
	demo?: DemoId;
};
