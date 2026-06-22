<script lang="ts">
	import { onMount } from 'svelte';

	import { getBordaContext } from '@/entities/borda';
	import { BordaEvent } from '@/entities/event';
	import { formatComponentStyles } from '@/shared/utils';

	import { useOverlay } from '../model';

	import type {
		BordaTourOverlayElements,
		BordaTourOverlayEvents,
		BordaTourOverlayProps
	} from '../model';

	let {
		id,
		targetElement = null,
		borderRadius = 8,
		padding = 12,
		isAnimated = true,
		hasCloseOnBackdropClick = false,
		aria = { ariaLabel: 'Close' },
		customClasses,
		customStyles,
		onClose
	}: Partial<BordaTourOverlayProps & BordaTourOverlayEvents> = $props();

	const { eventEmitter, close } = getBordaContext();

	let rootElement: SVGSVGElement | null = $state(null);

	let backdropElement: SVGPathElement | null = $state(null);

	const overlay = useOverlay({
		getTargetElement: () => targetElement,
		getBorderRadius: () => borderRadius,
		getPadding: () => padding,
		getIsAnimated: () => isAnimated
	});

	const rootClasses = $derived(['rb-tour-overlay', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const backdropClasses = $derived([
		'rb-tour-overlay__backdrop',
		overlay.isTransitioning && 'rb-tour-overlay__backdrop--transitioning',
		customClasses?.backdrop
	]);

	const backdropStyles = $derived(formatComponentStyles(customStyles?.backdrop));

	function onBackdropKeydown(event: KeyboardEvent) {
		if (event.key !== ' ') return;

		handleBackdropClick(event);
	}

	function handleBackdropClick(event: Event) {
		eventEmitter.emit(BordaEvent.ON_OVERLAY_CLICK, event);

		if (onClose) {
			onClose(event as MouseEvent);
			return;
		}

		if (hasCloseOnBackdropClick) {
			close();
		}
	}

	onMount(() => {
		rootElement?.addEventListener('click', handleBackdropClick);
		rootElement?.addEventListener('keydown', onBackdropKeydown);

		return () => {
			rootElement?.removeEventListener('click', handleBackdropClick);
			rootElement?.removeEventListener('keydown', onBackdropKeydown);
		};
	});

	export function getElements(): BordaTourOverlayElements {
		return {
			root: rootElement,
			backdrop: backdropElement
		};
	}
</script>

<svg
	{id}
	bind:this={rootElement}
	class={rootClasses}
	style={rootStyles}
	style:position={overlay.cssPosition}
	style:width="{overlay.width}px"
	style:height="{overlay.height}px"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
	role="button"
	tabindex="0"
	aria-label={aria?.ariaLabel}
	aria-labelledby={aria?.ariaLabelledby}
	aria-describedby={aria?.ariaDescribedby}
	aria-disabled={aria?.ariaDisabled}
	aria-expanded={aria?.ariaExpanded}
	aria-controls={aria?.ariaControls}
	aria-haspopup={aria?.ariaHaspopup}
	aria-pressed={aria?.ariaPressed}
>
	<path
		bind:this={backdropElement}
		class={backdropClasses}
		style={backdropStyles}
		d={overlay.backdropPath}
		fill-rule="evenodd"
	/>
</svg>
