<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import PostList from '$lib/components/postList.svelte';

	let { data } = $props();
</script>

<Seo title="Posts" description="Occasional writing on my projects and ideas." />

<div class="content-column">
	<hgroup>
		<h1 class="page-title">Posts</h1>
		<p class="page-subtitle">Occasional writing on my projects and ideas.</p>
	</hgroup>
	<PostList posts={data.posts} />
</div>
