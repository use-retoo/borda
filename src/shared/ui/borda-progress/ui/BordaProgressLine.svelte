<script lang="ts">
	import { formatComponentStyles } from '@/shared/utils';

	import type { BordaProgressLineProps } from '../model';

	let {
		id,
		current = 1,
		total = 1,
		aria = { ariaLabel: 'Progress' },
		customClasses,
		customStyles
	}: Partial<BordaProgressLineProps> = $props();

	const progress = $derived(total > 0 ? current / total : 0);

	const rootClasses = $derived(['rb-progress', 'rb-progress--line', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const trackClasses = $derived(['rb-progress__track', customClasses?.track]);

	const trackStyles = $derived(formatComponentStyles(customStyles?.track));

	const progressClasses = $derived(['rb-progress__progress', customClasses?.progress]);

	const progressStyles = $derived(formatComponentStyles(customStyles?.progress));
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
	<div class={trackClasses} style={trackStyles}>
		<div class={progressClasses} style={progressStyles} style:width="{progress * 100}%"></div>
	</div>
</div>
