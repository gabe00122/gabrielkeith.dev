<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import GitHubIcon from '$lib/components/icons/github.svelte';
	import LinkedInIcon from '$lib/components/icons/linkedin.svelte';
</script>

<Seo
	title="About"
	description="Software engineer and self-taught machine learning researcher studying how agents learn to communicate and cooperate through reinforcement learning."
/>

<div class="content-column">
	<h1 class="page-title">About</h1>
	<div class="bio">
		<section>
			<p>
				Software engineer and self-taught machine learning researcher. I study how agents learn to
				communicate and cooperate through reinforcement learning, particularly the connection
				between memory and communication.
			</p>
			<p>
				I'm especially drawn to settings where communication isn't straightforwardly cooperative:
				deception, trust, and strategic information sharing. I work both with agents trained from
				scratch and with LLMs as social agents.
			</p>
		</section>
		<enhanced:img src="../../../static/profile.webp" alt="Gabriel Keith" class="profile-pic" />
	</div>
	<section>
		<h2 class="section-label caps">Contact</h2>
		<ul class="link-row">
			<li>
				<a href="https://github.com/gabe00122" aria-label="GitHub">
					<GitHubIcon />
				</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/gabriel-keith/" aria-label="LinkedIn">
					<LinkedInIcon />
				</a>
			</li>
			<li><a href="mailto:gabe@gabrielkeith.dev">gabe@gabrielkeith.dev</a></li>
		</ul>
	</section>
</div>

<style>
	.bio {
		display: flex;
		align-items: flex-start;
		gap: var(--space);
	}
	.profile-pic {
		width: 200px;
		min-width: 200px;
	}
	@media (max-width: 576px) {
		.bio {
			flex-direction: column-reverse;
			align-items: center;
		}
		.profile-pic {
			width: 160px;
			min-width: unset;
		}
	}
	/* Keep the icon links' boxes tight around the icons */
	.link-row a {
		display: inline-flex;
	}
</style>
