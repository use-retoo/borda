<script lang="ts">
	import { ComponentSize } from '@/shared/enums';
	import { formatComponentStyles } from '@/shared/utils';

	import { BordaButtonShape, BordaButtonType, BordaButtonVariant } from '../model';

	import type {
		BordaButtonElements,
		BordaButtonProps,
		BordaButtonEvents,
		BordaButtonSnippets
	} from '../model';

	let {
		id,
		disabled,
		autosize,
		size = ComponentSize.MD,
		shape = BordaButtonShape.RECTANGLE,
		variant = BordaButtonVariant.FILLED,
		type = BordaButtonType.BUTTON,
		aria,
		customClasses,
		customStyles,
		children,
		...rest
	}: Partial<BordaButtonProps & BordaButtonEvents & BordaButtonSnippets> = $props();

	const rootClasses = $derived([
		'rb-button',
		`rb-button--${shape}`,
		`rb-button--${variant}`,
		autosize ? 'rb-button--autosize' : `rb-button--${size}`,
		customClasses?.root
	]);

	let rootElement: HTMLButtonElement | null = $state(null);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements(): BordaButtonElements {
		return {
			root: rootElement
		};
	}
</script>

<button
	bind:this={rootElement}
	{id}
	{type}
	{disabled}
	class={rootClasses}
	style={rootStyles}
	aria-label={aria?.ariaLabel}
	aria-labelledby={aria?.ariaLabelledby}
	aria-describedby={aria?.ariaDescribedby}
	aria-disabled={aria?.ariaDisabled}
	aria-expanded={aria?.ariaExpanded}
	aria-controls={aria?.ariaControls}
	aria-haspopup={aria?.ariaHaspopup}
	aria-pressed={aria?.ariaPressed}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</button>
