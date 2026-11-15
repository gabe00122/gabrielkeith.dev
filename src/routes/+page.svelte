<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import PostList from '$lib/components/postList.svelte';
	import DemoList from '$lib/components/demoList.svelte';
	import GitHubIcon from '$lib/components/icons/github.svelte';
	import LinkedInIcon from '$lib/components/icons/linkedin.svelte';
	import Mail from 'lucide-svelte/icons/mail';
	import { demos } from '$lib/demos';
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<Seo description="I teach agents from experience in social environments." />

<div class="content-column">
	<section>
		<h1 class="home-name">Gabriel Keith</h1>
		<p class="home-tagline">I teach agents from experience in social environments.</p>
		<p class="home-bio">
			Software engineer and self-taught ML researcher. Professionally I work on LLM-based agentic
			systems for banking automation; outside of work I build training environments and RL
			infrastructure.
		</p>
		<p class="home-bio">
			My primary interests are reinforcement learning and social environments where cooperation,
			competition, trust, and deception are emergent strategies. I've worked on multi-agent,
			multi-task grid-world experiments and on from-scratch LLM inference and RL training. Now I'm
			trying to bridge the two by applying multi-agent RL training to LLMs.
		</p>
		<ul class="link-row home-links">
			<li>
				<a href="https://github.com/gabe00122" aria-label="GitHub">
					<GitHubIcon size={20} />
				</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/gabriel-keith/" aria-label="LinkedIn">
					<LinkedInIcon size={20} />
				</a>
			</li>
			<li>
				<a href="mailto:gabe@gabrielkeith.dev" aria-label="Email">
					<Mail size={20} aria-hidden="true" />
				</a>
			</li>
		</ul>
	</section>

	<section>
		<h2 class="section-label caps">Recent posts</h2>
		<PostList posts={data.posts} headingLevel={3} />
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

	.home-links {
		margin-top: 1.25rem;
	}

	/* Keep the icon links' boxes tight around the icons */
	.home-links a {
		display: inline-flex;
	}
</style>
