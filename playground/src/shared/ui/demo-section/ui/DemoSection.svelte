<script lang="ts">
	import type { DemoSectionProps } from '../model';

	const { label, children }: DemoSectionProps = $props();
</script>

<section class="demo-section">
	<span class="demo-section__label">{label}</span>

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

	.demo-section__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--pg-color-muted);
	}
</style>
