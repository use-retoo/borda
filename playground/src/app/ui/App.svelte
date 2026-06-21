<script lang="ts">
	import { onDestroy } from 'svelte';

	import {
		type BordaConfig,
		type BordaHighlightConfig,
		type BordaInstance,
		type BordaStepConfig,
		useBorda
	} from '@/app/entrypoint';
	import { BordaEvent } from '@/entities/event';
	import { ComponentPlacement } from '@/shared/enums';
	import { createTourGroups } from '~/features/tours';
	import { SKIP_KEY } from '~/shared/constants';
	import { DemoSection, DemoSpacer } from '~/shared/ui';
	import { TourNav } from '~/widgets/tour-nav';

	const widget = useBorda();

	let instance: BordaInstance | null = null;

	let mountVersion = 0;

	let queue = Promise.resolve<void>(undefined);

	function startWith(mountFn: () => Promise<BordaInstance>) {
		const version = ++mountVersion;

		queue = queue
			.then(async () => {
				if (version !== mountVersion) return;

				const prev = instance;

				instance = null;

				if (prev) await widget.unmount(prev);

				if (version !== mountVersion) return;

				const next = await mountFn();

				if (version !== mountVersion) {
					void widget.unmount(next);
					return;
				}

				instance = next;

				next.api.events.once(BordaEvent.ON_BORDA_DESTROY, () => {
					if (instance === next) instance = null;
				});
			})
			.catch(() => {});
	}

	function startTour(config: BordaConfig) {
		startWith(() => widget.mount(config));
	}

	function startHighlight(step: BordaStepConfig, config?: BordaHighlightConfig) {
		startWith(() => widget.highlight(step, config));
	}

	function clearSkip() {
		if (instance) {
			instance.skip.clear();
		} else {
			localStorage.removeItem(SKIP_KEY);
		}
	}

	const groups = createTourGroups(startTour, startHighlight);

	onDestroy(() => {
		if (instance) {
			widget.unmount(instance);
		}
	});
</script>

<header class="pg-header">
	<TourNav {groups} onClearSkip={clearSkip} />
</header>

<main class="pg-main">
	<DemoSection>
		<span class="pg-label">Target by id</span>
		<div
			id="step-1"
			class="pg-item"
			data-borda-step="1"
			data-borda-title="Target by id"
			data-borda-description="Pass a CSS selector string."
			data-borda-placement={ComponentPlacement.BOTTOM_START}
		>
			<span class="pg-item__name">Step 1</span>
			<span class="pg-item__badge">id</span>
		</div>
	</DemoSection>

	<DemoSpacer />

	<DemoSection>
		<span class="pg-label">Target by class</span>
		<div
			class="pg-item pg-card--step"
			data-borda-step="2"
			data-borda-title="Target by class"
			data-borda-description="Pass a class name as an object."
			data-borda-placement={ComponentPlacement.TOP_START}
		>
			<span class="pg-item__name">Step 2</span>
			<span class="pg-item__badge">class</span>
		</div>
	</DemoSection>

	<DemoSpacer />

	<DemoSection>
		<span class="pg-label">Target by data attribute</span>
		<div
			class="pg-item"
			data-demo-step="3"
			data-borda-step="3"
			data-borda-title="Target by data attribute"
			data-borda-description="Pass a data attribute name and value."
			data-borda-placement={ComponentPlacement.MIDDLE_START}
		>
			<span class="pg-item__name">Step 3</span>
			<span class="pg-item__badge">data attribute</span>
		</div>
	</DemoSection>

	<DemoSpacer />

	<DemoSection>
		<span class="pg-label">Step overrides</span>
		<div id="step-overrides-target" class="pg-item">
			<span class="pg-item__name">Step 4</span>
			<span class="pg-item__badge">overrides</span>
		</div>
	</DemoSection>

	<DemoSpacer />

	<DemoSection>
		<span class="pg-label">Sticky target</span>
		<div id="sticky-target" class="pg-item pg-sticky">
			<span class="pg-item__name">Sticky</span>
			<span class="pg-item__badge">position: sticky</span>
		</div>
	</DemoSection>

	<DemoSpacer />
</main>

<div id="fixed-target" class="pg-fixed">
	<span class="pg-item__name">Fixed</span>
	<span class="pg-item__badge">position: fixed</span>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family:
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
		font-size: 14px;
		color: rgb(17, 17, 17);
		background: rgb(255, 255, 255);
	}

	.pg-header {
		position: sticky;
		top: 0;
		/* Above the tour overlay (1000) and tooltip (1010) so the nav stays usable. */
		z-index: 1100;
		background: rgb(255, 255, 255);
		border-bottom: 1px solid rgba(17, 17, 17, 0.12);
	}

	.pg-main {
		max-width: 640px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.pg-label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: rgb(107, 107, 107);
	}

	.pg-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		border: 1px solid rgba(17, 17, 17, 0.12);
		border-radius: 8px;
		background: rgba(17, 17, 17, 0.05);
		width: 100%;
		max-width: 360px;
		box-sizing: border-box;
	}

	.pg-item__name {
		font-size: 14px;
		font-weight: 500;
	}

	.pg-item__badge {
		font-size: 12px;
		color: rgb(107, 107, 107);
	}

	.pg-sticky {
		position: sticky;
		top: 64px;
		z-index: 50;
	}

	.pg-fixed {
		position: fixed;
		right: 16px;
		bottom: 16px;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border: 1px solid rgba(17, 17, 17, 0.12);
		border-radius: 8px;
		background: rgb(255, 255, 255);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}
</style>
