<script lang="ts">
	interface Props {
		url?: string;
		description?: string;
		alt?: string;
		align?: 'center' | 'right';
	}

	let { url = '', description = '', alt = '', align = 'center' }: Props = $props();
</script>

<figure>
	<figcaption>{description}</figcaption>
	<img src={url} {alt} class:right={align === 'right'} />
</figure>

<style>
	figcaption {
		text-align: center;
	}

	img {
		display: block;
		margin-inline: auto;
	}

	img.right {
		margin-right: 0;
	}
</style>
