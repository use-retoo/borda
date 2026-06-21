<script lang="ts">
	import { getBordaContext } from '@/entities/borda';
	import { BordaEvent } from '@/entities/event';
	import { IconCross } from '@/shared/assets/icons';
	import { ComponentSize, ComponentShape } from '@/shared/enums';
	import { BordaButton, BordaButtonShape, BordaButtonVariant } from '@/shared/ui/borda-button';
	import { BordaIcon } from '@/shared/ui/borda-icons';
	import { formatComponentStyles, resolveElements } from '@/shared/utils';

	import type { BordaCloseButtonElements, BordaCloseButtonProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		shape = ComponentShape.CIRCLE,
		aria = { ariaLabel: 'Close' },
		customClasses,
		customStyles,
		customHtml,
		onClose
	}: Partial<BordaCloseButtonProps> = $props();

	const { eventEmitter, close } = getBordaContext();

	let rootElement: HTMLDivElement | null = $state(null);

	let buttonElement: BordaButton | null = $state(null);

	let crossElement: BordaIcon | null = $state(null);

	const rootClasses = $derived([
		'rb-close-button',
		`rb-close-button--${size}`,
		`rb-close-button--${shape}`,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	function onCloseButtonClick(event: Event) {
		eventEmitter.emit(BordaEvent.ON_CLOSE_CLICK, event);

		if (onClose) {
			onClose(event);
			return;
		}

		close();
	}

	export function getElements(): BordaCloseButtonElements {
		return {
			root: rootElement,
			button: resolveElements(buttonElement),
			cross: resolveElements(crossElement)
		};
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	{#if customHtml?.button}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html customHtml.button}
	{:else}
		<BordaButton
			bind:this={buttonElement}
			{aria}
			autosize
			shape={BordaButtonShape.CIRCLE}
			variant={BordaButtonVariant.FILLED}
			customClasses={{ root: customClasses?.button }}
			customStyles={{ root: customStyles?.button }}
			onclick={onCloseButtonClick}
		>
			<BordaIcon
				bind:this={crossElement}
				{size}
				customClasses={{ root: customClasses?.cross }}
				customStyles={{ root: customStyles?.cross }}
			>
				<IconCross />
			</BordaIcon>
		</BordaButton>
	{/if}
</div>
