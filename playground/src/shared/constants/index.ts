import { ComponentPlacement } from '@/shared/enums';
import { BordaScrollEasingName } from '@/shared/lib/scroll-easing';

/** localStorage key backing the "don't show again" skip demo. */
export const SKIP_KEY = 'borda-demo';

/** Shared smooth-scroll config reused across the demo tours. */
export const SCROLL = {
	duration: 400,
	easing: BordaScrollEasingName.EASE_OUT,
	block: 'center',
	isLocked: false
} as const;

/** Shared spotlight overlay config reused across the demo tours. */
export const OVERLAY = {
	padding: 12
};

/** Default four-step tour reused by most demos — one per placement side. */
export const STEPS = [
	{
		target: '#step-1',
		title: 'Target by id',
		description: 'Pass a CSS selector string.',
		placement: ComponentPlacement.TOP_CENTER
	},
	{
		target: { class: 'pg-card--step' },
		title: 'Target by class',
		description: 'Pass a class name as an object.',
		placement: ComponentPlacement.MIDDLE_START
	},
	{
		target: { data: { name: 'demo-step', value: '3' } },
		title: 'Target by data attribute',
		description: 'Pass a data attribute name and value.',
		placement: ComponentPlacement.MIDDLE_END
	},
	{
		target: '#step-overrides-target',
		title: 'Target by id',
		description: 'Pass a CSS selector string.',
		placement: ComponentPlacement.BOTTOM_CENTER
	}
];
