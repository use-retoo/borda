<script lang="ts">
	import { AnimationEffect, ComponentPlacement, ComponentSize } from '@/shared/enums';
	import { useAnimator } from '@/shared/lib/animator';
	import { formatComponentStyles } from '@/shared/utils';

	import { useTooltipArrow, useTooltipPosition } from '../model';

	import type {
		BordaTourTooltipElements,
		BordaTourTooltipProps,
		BordaTourTooltipSnippets
	} from '../model';

	let {
		id,
		title = '',
		description = '',
		size = ComponentSize.MD,
		placement = ComponentPlacement.BOTTOM_START,
		targetElement = null,
		arrow,
		aria,
		offset = 12,
		margin = 8,
		padding = 12,
		autoPlacement = true,
		customClasses,
		customStyles,
		customHtml,
		isHidden = false,
		hasGlide = false,
		animation = false,
		image,
		close,
		skip,
		progress,
		footer
	}: Partial<BordaTourTooltipProps & BordaTourTooltipSnippets> = $props();

	let rootElement: HTMLDivElement | null = $state(null);

	let isGlideEnabled = $state(false);

	const tooltipArrow = useTooltipArrow({
		getArrow: () => arrow,
		getPlacement: () => position.effectivePlacement
	});

	const position = useTooltipPosition({
		getTargetElement: () => targetElement,
		getTooltipElement: () => rootElement,
		getPlacement: () => placement,
		getOffset: () => offset,
		getMargin: () => margin,
		getPadding: () => padding,
		getAutoPlacement: () => autoPlacement,
		getArrowSide: () => tooltipArrow.side
	});

	$effect(() => {
		/** Enable position gliding only after the first layout, so the initial placement snaps in instead of sliding from the corner. */
		const frame = requestAnimationFrame(() => {
			isGlideEnabled = true;
		});

		return () => cancelAnimationFrame(frame);
	});

	const isAnimated = $derived(animation !== false);

	const animator = useAnimator({
		getIsAnimated: () => isAnimated,
		getIsHidden: () => isHidden,
		classNames: {
			hidden: 'rb-tour-tooltip--hidden',
			in: 'rb-tour-tooltip--anim-in',
			out: 'rb-tour-tooltip--anim-out'
		}
	});

	const activeAnimation = $derived.by(() => {
		if (!animation) {
			return {
				effect: AnimationEffect.NONE,
				duration: 0,
				className: null,
				easing: 'ease-out'
			};
		}

		return {
			effect: animator.hasHiddenAnimation ? animation.exit : animation.enter,
			duration: animator.hasHiddenAnimation ? animation.exitDuration : animation.enterDuration,
			className: `rb-tour-tooltip--anim-${animator.hasHiddenAnimation ? animation.exit : animation.enter}`,
			easing: animation.easing
		};
	});

	const rootClasses = $derived([
		'rb-tour-tooltip',
		`rb-tour-tooltip--${size}`,
		isGlideEnabled && hasGlide && 'rb-tour-tooltip--glide',
		animator.classes,
		activeAnimation.className,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const headerClasses = $derived(['rb-tour-tooltip__header', customClasses?.header]);

	const headerStyles = $derived(formatComponentStyles(customStyles?.header));

	const titleClasses = $derived(['rb-tour-tooltip__title', customClasses?.title]);

	const titleStyles = $derived(formatComponentStyles(customStyles?.title));

	const descriptionClasses = $derived(['rb-tour-tooltip__description', customClasses?.description]);

	const descriptionStyles = $derived(formatComponentStyles(customStyles?.description));

	export function getElements(): BordaTourTooltipElements {
		return {
			root: rootElement
		};
	}
</script>

<div
	{id}
	bind:this={rootElement}
	class={rootClasses}
	style={rootStyles}
	style:top="{position.top}px"
	style:left="{position.left}px"
	style:--rb-tt-duration="{activeAnimation.duration}ms"
	style:--rb-tt-easing={activeAnimation.easing}
	aria-label={aria?.ariaLabel}
	aria-labelledby={aria?.ariaLabelledby}
	aria-describedby={aria?.ariaDescribedby}
	aria-disabled={aria?.ariaDisabled}
	aria-expanded={aria?.ariaExpanded}
	aria-controls={aria?.ariaControls}
	aria-haspopup={aria?.ariaHaspopup}
	aria-pressed={aria?.ariaPressed}
>
	{#if tooltipArrow.classes}
		<div
			class={tooltipArrow.classes}
			style:--rb-tour-tooltip-arrow-offset="{position.arrowOffset}px"
		></div>
	{/if}

	{#if image}
		{@render image()}
	{/if}

	{#if title || customHtml?.title || close}
		<div class={headerClasses} style={headerStyles}>
			{#if customHtml?.title}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html customHtml.title}
			{:else if title}
				<p class={titleClasses} style={titleStyles}>
					{title}
				</p>
			{/if}

			{#if close}
				{@render close()}
			{/if}
		</div>
	{/if}

	{#if customHtml?.description}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html customHtml.description}
	{:else if description}
		<p class={descriptionClasses} style={descriptionStyles}>
			{description}
		</p>
	{/if}

	{#if skip}
		{@render skip()}
	{/if}

	{#if progress}
		{@render progress()}
	{/if}

	{#if footer}
		{@render footer()}
	{/if}
</div>
