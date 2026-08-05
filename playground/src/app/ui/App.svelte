<script lang="ts">
	import { createTourGroups } from '~/features/tours';
	import { DemoSection, DemoSpacer, DemoTarget } from '~/shared/ui';
	import { TourNav } from '~/widgets/tour-nav';

	import { DEMO_ENTRIES, FIXED_TARGET, useTourRunner } from '../model';

	const runner = useTourRunner();

	const groups = createTourGroups(runner.startTour, runner.startHighlight);
</script>

<header class="demo-page__header">
	<TourNav {groups} onClearSkip={runner.clearSkip} />
</header>

<main class="demo-page__main">
	{#each DEMO_ENTRIES as entry (entry.target.id)}
		<DemoSection label={entry.label}>
			<DemoTarget {...entry.target} />
		</DemoSection>

		<DemoSpacer />
	{/each}
</main>

<DemoTarget {...FIXED_TARGET} />

<style>
	.demo-page__header {
		position: sticky;
		top: 0;
		z-index: var(--pg-z-header);
		background: var(--pg-color-surface);
		border-bottom: 1px solid var(--pg-color-border);
	}

	.demo-page__main {
		max-width: 640px;
		margin: 0 auto;
		padding: 0 24px;
	}
</style>
