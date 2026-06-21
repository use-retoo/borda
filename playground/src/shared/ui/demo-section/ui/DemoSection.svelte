<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<section class="demo-section">
	{@render children()}
</section>

<style>
	.demo-section {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 64px 0;
		min-height: 50vh;
	}
</style>
