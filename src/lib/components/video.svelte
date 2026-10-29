<script lang="ts">
	interface Props {
		url: string;
		description: string;
	}

	let { url, description }: Props = $props();

	const uid = $props.id();
	let poster = $derived(url.replace(/\.mp4$/, '-poster.webp'));
</script>

<figure>
	<figcaption id="video-caption-{uid}">{description}</figcaption>
	<video playsinline controls muted aria-describedby="video-caption-{uid}" {poster}>
		<source src={url} type="video/mp4" />
	</video>
</figure>

<style>
	figcaption {
		text-align: center;
	}

	video {
		display: block;
		margin-inline: auto;
	}
</style>
