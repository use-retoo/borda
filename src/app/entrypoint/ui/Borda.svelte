<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

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

	const size = $derived(config.size);

	const shape = $derived(config.shape);

	const rootClasses = $derived(['rb']);

	const containerProps = $derived({
		...config.container,
		customClasses: {
			...config.container?.customClasses,
			root: [config.container?.customClasses?.root, containerAnimator.classes]
		}
	});

	const tourOverlayProps = $derived(config.tourOverlay);

	const tourTooltipProps = $derived(config.tourTooltip);

	const tourImageProps = $derived(config.tourImage);

	const tourButtonsProps = $derived(config.tourButtons);

	const tourProgressProps = $derived(config.tourProgress);

	const tourSkipProps = $derived(config.tourSkip);

	const closeButtonProps = $derived(config.closeButton);

	const tourTooltipAnimation = $derived(animation.isEnabled ? animation.tooltip : false);

	const isAnimated = $derived(animation.isEnabled);

	const hasGlide = $derived(animation.tooltip.transition === BordaTooltipTransition.GLIDE);

	const isShownOnScroll = $derived(
		animation.tooltip.appearance === BordaScrollAppearance.DURING_SCROLL
	);

	const isStepSettling = $derived(scroll.isScrolling || overlayTransition.isActive);

	/** In fade mode, hide the tooltip while the step settles, then fade it in at the new position. */
	const isHidden = $derived(!hasGlide && isAnimated && isStepSettling && !isShownOnScroll);

	const step = $derived(controller.step);

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

		void scroll.scrollTo(controller.currentTarget);
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
		{#if controller.currentTarget && step}
			{#if tourOverlayProps !== false}
				<BordaTourOverlay
					bind:this={bordaTourOverlay}
					targetElement={controller.currentTarget}
					{isAnimated}
					{...tourOverlayProps}
				/>
			{/if}

			{#if tourTooltipProps !== false}
				<BordaTour
					bind:this={bordaTour}
					{step}
					currentTarget={controller.currentTarget}
					currentStep={controller.currentStep}
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
