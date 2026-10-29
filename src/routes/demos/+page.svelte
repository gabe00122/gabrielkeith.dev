<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import DemoList from '$lib/components/demoList.svelte';
	import { demos } from '$lib/demos';
</script>

<Seo title="Demos" description="Trained agents you can run and play against in the browser." />

<div class="content-column">
	<hgroup>
		<h1 class="page-title">Demos</h1>
		<p class="page-subtitle">Trained agents you can run and play against in the browser.</p>
	</hgroup>
	<DemoList demos={Object.values(demos)} />
</div>
