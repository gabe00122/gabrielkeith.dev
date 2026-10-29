<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import PostList from '$lib/components/postList.svelte';
	import DemoList from '$lib/components/demoList.svelte';
	import { demos } from '$lib/demos';
	import { resolve } from '$app/paths';

	let { data } = $props();

	let recent = $derived(data.posts.slice(0, 3));
</script>

<Seo description="I teach agents from experience in social environments." />

<div class="content-column">
	<section>
		<h1 class="home-name">Gabriel Keith</h1>
		<p class="home-tagline">I teach agents from experience in social environments.</p>
		<p class="home-bio">
			Software engineer and self-taught ML researcher. I work on how memory, communication, and
			cooperation emerge in multi-agent reinforcement learning, with agents trained from scratch and
			with LLMs as social agents. <a href={resolve('/about')}>More about me</a>.
		</p>
	</section>

	<section>
		<h2 class="section-label caps">Recent posts</h2>
		<PostList posts={recent} headingLevel={3} />
		<a class="more-link" href={resolve('/posts')}>All posts →</a>
	</section>

	<section>
		<h2 class="section-label caps">Demos</h2>
		<DemoList demos={Object.values(demos)} headingLevel={3} />
	</section>
</div>

<style>
	.home-name {
		font-size: 2.25rem;
		margin-bottom: 0.25rem;
	}

	.home-tagline {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.home-bio {
		max-width: 36rem;
		color: var(--muted);
	}
</style>
