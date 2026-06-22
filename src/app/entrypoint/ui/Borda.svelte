<script lang="ts">
	import { onDestroy, onMount, tick, untrack } from 'svelte';

	import { setBordaContext } from '@/entities/borda';
	import { BordaEvent } from '@/entities/event';
	import { useAnimator } from '@/shared/lib/animator';
	import { useFocusTrap } from '@/shared/lib/focus-trap';
	import { useTransitionDelay } from '@/shared/lib/transition-delay';
	import { BordaContainer } from '@/widgets/borda-container';
	import { BordaTourOverlay } from '@/widgets/borda-tour-overlay';

	import { BordaScrollAppearance, BordaTooltipTransition } from '../modules';

	import BordaTour from './BordaTour.svelte';

	import type { BordaApi, BordaProps } from '../model';

	const {
		config,
		controller,
		skip,
		scroll,
		animation,
		eventEmitter,
		mount,
		unmount,
		close
	}: BordaProps = $props();

	let bordaContainer: BordaContainer | null = $state(null);

	let bordaTourOverlay: BordaTourOverlay | null = $state(null);

	let bordaTour: BordaTour | null = $state(null);

	setBordaContext({
		get eventEmitter() {
			return eventEmitter;
		},
		mount: () => mount(),
		unmount: () => unmount(),
		close: () => close()
	});

	const containerAnimator = useAnimator({
		getIsAnimated: () => config.visibility?.isAnimated ?? true,
		getIsHidden: () => config.visibility?.isHidden ?? false,
		classNames: {
			hidden: 'rb-container--hidden',
			in: 'rb-fade-in',
			out: 'rb-fade-out'
		}
	});

	const overlayTransition = useTransitionDelay({
		getTrigger: () => controller.currentStep,
		getDuration: () => animation.overlay.transitionDuration
	});

	useFocusTrap({ getContainer: () => bordaContainer?.getElements()?.root ?? null });

	const rootClasses = $derived(['rb']);

	/** Container chrome isn't per-step content, so it always tracks the live config. */
	const containerProps = $derived({
		...config.container,
		customClasses: {
			...config.container?.customClasses,
			root: [config.container?.customClasses?.root, containerAnimator.classes]
		}
	});

	const tourTooltipAnimation = $derived(animation.isEnabled ? animation.tooltip : false);

	const isAnimated = $derived(animation.isEnabled);

	const hasGlide = $derived(animation.tooltip.transition === BordaTooltipTransition.GLIDE);

	const isShownOnScroll = $derived(
		animation.tooltip.appearance === BordaScrollAppearance.DURING_SCROLL
	);

	const isStepSettling = $derived(scroll.isScrolling || overlayTransition.isActive);

	/** In fade mode, hide the tooltip while the step settles, then fade it in at the new position. */
	const isHidden = $derived(!hasGlide && isAnimated && isStepSettling && !isShownOnScroll);

	/** Seeded once from the initial step so the first render has content; kept in sync by the effect below. */
	let displayed = $state({
		step: untrack(() => controller.step),
		target: untrack(() => controller.currentTarget),
		currentStep: untrack(() => controller.currentStep),
		config: untrack(() => config)
	});

	/**
	 * The settled target as a value-deduped signal: `displayed` is reassigned to a
	 * fresh object on every fade settle, but this only changes when the target
	 * *element* actually changes — so the auto-scroll effect fires once per step
	 * instead of looping through the `isScrolling → isHidden → displayed` cycle.
	 */
	const scrollTarget = $derived(displayed.target);

	const size = $derived(displayed.config.size);

	const shape = $derived(displayed.config.shape);

	const tourOverlayProps = $derived(displayed.config.tourOverlay);

	const tourTooltipProps = $derived(displayed.config.tourTooltip);

	const tourImageProps = $derived(displayed.config.tourImage);

	const tourButtonsProps = $derived(displayed.config.tourButtons);

	const tourProgressProps = $derived(displayed.config.tourProgress);

	const tourSkipProps = $derived(displayed.config.tourSkip);

	const closeButtonProps = $derived(displayed.config.closeButton);

	const tourComponents = $derived.by(() => {
		const components = bordaTour?.getComponents();

		return {
			tourTooltip: components?.tourTooltip ?? null,
			tourImage: components?.tourImage ?? null,
			tourButtons: components?.tourButtons ?? null,
			closeButton: components?.closeButton ?? null,
			tourSkip: components?.tourSkip ?? null
		};
	});

	/** Public API exposed via `bind:this` — grants access to the tour controller, mounted child components and the event bus. */
	export const api: BordaApi = {
		get controller() {
			return controller;
		},
		get components() {
			return {
				container: bordaContainer!,
				tourOverlay: bordaTourOverlay,
				...tourComponents
			};
		},
		get events() {
			return eventEmitter;
		}
	};

	$effect(() => {
		/** Skip auto-scroll to the step target while the widget is hidden. */
		if (config.visibility?.isHidden) return;

		/**
		 * Track the settled target (not `controller.currentTarget`): the tooltip
		 * renders from `displayed.target`, so this is the moment its geometry for
		 * the new step exists. `tick()` then flushes the tooltip's own position
		 * effect so its rect is final before we scroll the union of target +
		 * tooltip into view. Reading the deduped `scrollTarget` keeps this effect
		 * from re-firing on every fade settle.
		 */
		const target = scrollTarget;

		let cancelled = false;

		void (async () => {
			await tick();

			if (cancelled) return;

			const tooltipRect = bordaTour?.getComponents().tourTooltip?.getResolvedRect() ?? null;

			await scroll.scrollTo(target, tooltipRect);
		})();

		/** A new step (or teardown) supersedes this scroll before it starts. */
		return () => {
			cancelled = true;
		};
	});

	$effect(() => {
		if (!isHidden) {
			displayed = {
				step: controller.step,
				target: controller.currentTarget,
				currentStep: controller.currentStep,
				config
			};

			return;
		}

		/**
		 * `step`/`currentTarget`/`currentStep`/`config` (incl. per-step overrides
		 * like `tourProgress`) are live and swap the instant the step index
		 * changes, so binding the tooltip/overlay to them directly would render
		 * the new step's content immediately — visible for a frame before the
		 * fade-out even starts. Keep showing the outgoing step's snapshot while
		 * it fades out, and only swap once it's actually invisible.
		 */
		const timeoutId = setTimeout(() => {
			displayed = {
				step: controller.step,
				target: controller.currentTarget,
				currentStep: controller.currentStep,
				config
			};
		}, animation.tooltip.exitDuration);

		return () => clearTimeout(timeoutId);
	});

	onMount(() => {
		mount();
	});

	onDestroy(() => {
		eventEmitter.emit(BordaEvent.ON_BORDA_DESTROY);
		eventEmitter.clear();
	});
</script>

<div class={rootClasses}>
	<BordaContainer bind:this={bordaContainer} {...containerProps}>
		{#if controller.currentTarget && controller.step}
			{#if tourOverlayProps !== false}
				<BordaTourOverlay
					bind:this={bordaTourOverlay}
					targetElement={displayed.target}
					{isAnimated}
					{...tourOverlayProps}
				/>
			{/if}

			{#if tourTooltipProps !== false}
				<BordaTour
					bind:this={bordaTour}
					step={displayed.step}
					currentTarget={displayed.target}
					currentStep={displayed.currentStep}
					totalSteps={controller.totalSteps}
					isSkipChecked={skip.isSkipped}
					{isHidden}
					{hasGlide}
					{tourTooltipAnimation}
					{size}
					{shape}
					{tourTooltipProps}
					{tourImageProps}
					{tourButtonsProps}
					{tourProgressProps}
					{closeButtonProps}
					{tourSkipProps}
					onNext={controller.next}
					onPrev={controller.prev}
					onFinish={controller.finish}
					onSkip={close}
					onSkipChange={skip.set}
				/>
			{/if}
		{/if}
	</BordaContainer>
</div>
