<script lang="ts">
	import type { TourNavEvents, TourNavProps } from '../model';

	const { groups, onClearSkip }: TourNavProps & TourNavEvents = $props();

	let active = $state<string | null>(null);

	function handleStart(groupLabel: string, tourLabel: string, start: () => void) {
		active = `${groupLabel}::${tourLabel}`;
		start();
	}
</script>

<nav class="tour-nav">
	<div class="tour-nav__strip">
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
		overflow: hidden;
	}

	.tour-nav__strip {
		display: flex;
		gap: 0;
		overflow-x: auto;
		overflow-y: visible;
		scrollbar-width: none;
		padding: 10px 24px;
		align-items: flex-end;
	}

	.tour-nav__strip::-webkit-scrollbar {
		display: none;
	}

	.tour-nav__group {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex-shrink: 0;
		padding-right: 20px;
		margin-right: 20px;
		border-right: 1px solid rgba(17, 17, 17, 0.12);
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
		color: rgb(107, 107, 107);
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
		color: rgb(17, 17, 17);
		background: transparent;
		border: 1px solid rgba(17, 17, 17, 0.12);
		border-radius: 20px;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.12s ease,
			border-color 0.12s ease,
			color 0.12s ease;
	}

	.tour-nav__pill:hover {
		background: rgba(17, 17, 17, 0.05);
	}

	.tour-nav__pill--active {
		background: rgb(17, 17, 17);
		color: rgb(255, 255, 255);
		border-color: rgb(17, 17, 17);
	}

	.tour-nav__pill--active:hover {
		background: rgb(17, 17, 17);
	}
</style>
