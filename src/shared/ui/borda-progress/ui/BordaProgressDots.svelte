<script lang="ts">
	import { formatComponentStyles } from '@/shared/utils';

	import type { BordaProgressItemProps } from '../model';

	let {
		id,
		current = 1,
		total = 1,
		aria = { ariaLabel: 'Progress' },
		customClasses,
		customStyles
	}: Partial<BordaProgressItemProps> = $props();

	const rootClasses = $derived(['rb-progress', 'rb-progress--dots', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const itemClasses = $derived(['rb-progress__item', customClasses?.item]);

	const itemStyles = $derived(formatComponentStyles(customStyles?.item));
</script>

<div
	{id}
	class={rootClasses}
	style={rootStyles}
	role="progressbar"
	aria-label={aria?.ariaLabel}
	aria-labelledby={aria?.ariaLabelledby}
	aria-describedby={aria?.ariaDescribedby}
	aria-controls={aria?.ariaControls}
	aria-valuenow={current}
	aria-valuemin={1}
	aria-valuemax={total}
	aria-valuetext="{current} / {total}"
>
	{#each Array.from({ length: total }, (_, i) => i) as i (i)}
		<div
			class={[...itemClasses, i + 1 === current && 'rb-progress__item--active']}
			style={itemStyles}
		></div>
	{/each}
</div>
