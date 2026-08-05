<script lang="ts">
	import type { DemoTargetProps } from '../model';

	const {
		id,
		name,
		badge,
		isSticky = false,
		isFixed = false,
		class: className,
		...rest
	}: DemoTargetProps = $props();

	const classes = $derived([
		'demo-target',
		isSticky && 'demo-target--sticky',
		isFixed && 'demo-target--fixed',
		className
	]);
</script>

<div {id} class={classes} {...rest}>
	<span class="demo-target__name">{name}</span>
	<span class="demo-target__badge">{badge}</span>
</div>

<style>
	.demo-target {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		width: 100%;
		max-width: 360px;
		padding: 12px 16px;
		border: 1px solid var(--pg-color-border);
		border-radius: var(--pg-radius-md);
		background: var(--pg-color-surface-alt);
	}

	.demo-target--sticky {
		position: sticky;
		top: var(--pg-header-height);
		z-index: var(--pg-z-pinned);
	}

	.demo-target--fixed {
		position: fixed;
		right: 16px;
		bottom: 16px;
		z-index: var(--pg-z-pinned);
		width: auto;
		gap: 8px;
		padding: 10px 14px;
		background: var(--pg-color-surface);
		box-shadow: var(--pg-shadow-raised);
	}

	.demo-target__name {
		font-size: 14px;
		font-weight: 500;
	}

	.demo-target__badge {
		font-size: 12px;
		color: var(--pg-color-muted);
	}
</style>
