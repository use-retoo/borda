<script lang="ts">
	import { BordaImage } from '@/shared/ui/borda-image';

	import { BordaTourImageVariant } from '../model';

	import type { BordaTourImageElements, BordaTourImageProps } from '../model';

	let {
		id,
		src = '',
		alt = '',
		variant = BordaTourImageVariant.DEFAULT,
		aria,
		customClasses,
		customStyles,
		customHtml
	}: Partial<BordaTourImageProps> = $props();

	let imageComponent: BordaImage | null = $state(null);

	const rootClasses = $derived(['rb-tour-image', `rb-tour-image--${variant}`, customClasses?.root]);

	export function getElements(): BordaTourImageElements {
		return {
			root: imageComponent?.getElements()?.root ?? null
		};
	}
</script>

<BordaImage
	bind:this={imageComponent}
	{id}
	{src}
	{alt}
	{aria}
	customClasses={{ root: rootClasses }}
	{customStyles}
	{customHtml}
/>
