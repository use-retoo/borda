<script lang="ts">
	import { useHorizontalScroll } from '~/shared/lib';

	import type { TourNavEvents, TourNavProps } from '../model';

	const { groups, onClearSkip }: TourNavProps & TourNavEvents = $props();

	let stripElement: HTMLDivElement | null = $state(null);

	let active = $state<string | null>(null);

	const strip = useHorizontalScroll({ getContainer: () => stripElement });

	const rootClasses = $derived([
		'tour-nav',
		strip.hasStartOverflow && 'tour-nav--overflow-start',
		strip.hasEndOverflow && 'tour-nav--overflow-end'
	]);

	function handleStart(groupLabel: string, tourLabel: string, start: () => void) {
		active = `${groupLabel}::${tourLabel}`;
		start();
	}
</script>

<nav class={rootClasses}>
	<div class="tour-nav__strip" bind:this={stripElement}>
		{#each groups as group (group.label)}
			<div class="tour-nav__group">
				<span class="tour-nav__label">{group.label}</span>
				<div class="tour-nav__pills">
					{#each group.tours as tour (tour.label)}
						<button
							class={[
								'tour-nav__pill',
								active === `${group.label}::${tour.label}` && 'tour-nav__pill--active'
							]}
							onclick={() => handleStart(group.label, tour.label, tour.start)}
						>
							{tour.label}
						</button>
					{/each}
				</div>
			</div>
		{/each}

		<div class="tour-nav__group">
			<span class="tour-nav__label">Utils</span>
			<div class="tour-nav__pills">
				<button class="tour-nav__pill" onclick={onClearSkip}>Reset skip</button>
			</div>
		</div>
	</div>
</nav>

<style>
	.tour-nav {
		position: relative;
	}

	/* Fades hint at the groups still hidden past either edge of the strip. */
	.tour-nav::before,
	.tour-nav::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 32px;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.12s ease;
	}

	.tour-nav::before {
		left: 0;
		background: linear-gradient(to right, var(--pg-color-surface), transparent);
	}

	.tour-nav::after {
		right: 0;
		background: linear-gradient(to left, var(--pg-color-surface), transparent);
	}

	.tour-nav--overflow-start::before,
	.tour-nav--overflow-end::after {
		opacity: 1;
	}

	.tour-nav__strip {
		display: flex;
		align-items: flex-end;
		gap: 0;
		padding: 10px 24px;
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: contain;
		scrollbar-width: thin;
		scrollbar-color: var(--pg-color-border) transparent;
	}

	.tour-nav__strip::-webkit-scrollbar {
		height: 6px;
	}

	.tour-nav__strip::-webkit-scrollbar-thumb {
		border-radius: var(--pg-radius-pill);
		background: var(--pg-color-border);
	}

	.tour-nav__group {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex-shrink: 0;
		padding-right: 20px;
		margin-right: 20px;
		border-right: 1px solid var(--pg-color-border);
	}

	.tour-nav__group:last-child {
		padding-right: 0;
		margin-right: 0;
		border-right: none;
	}

	.tour-nav__label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--pg-color-muted);
		white-space: nowrap;
	}

	.tour-nav__pills {
		display: flex;
		gap: 4px;
	}

	.tour-nav__pill {
		padding: 5px 11px;
		font-family: inherit;
		font-size: 12px;
		font-weight: 500;
		color: var(--pg-color-text);
		background: transparent;
		border: 1px solid var(--pg-color-border);
		border-radius: var(--pg-radius-pill);
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.12s ease,
			border-color 0.12s ease,
			color 0.12s ease;
	}

	.tour-nav__pill:hover {
		background: var(--pg-color-surface-alt);
	}

	.tour-nav__pill--active {
		background: var(--pg-color-text);
		color: var(--pg-color-text-inverse);
		border-color: var(--pg-color-text);
	}

	.tour-nav__pill--active:hover {
		background: var(--pg-color-text);
	}
</style>
