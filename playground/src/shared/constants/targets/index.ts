import type { BordaStepTarget } from '@/entities/step';

/** Ids rendered on the demo targets; the tours resolve them as `#id` selectors. */
export const TARGET_ID = {
	byId: 'step-1',
	byClass: 'step-2',
	byData: 'step-3',
	overrides: 'step-overrides',
	sticky: 'step-sticky',
	fixed: 'step-fixed'
};

/** Modifier class the "target by class" step resolves instead of an id. */
export const TARGET_CLASS = 'demo-target--by-class';

/** Data attribute the "target by data attribute" step resolves instead of an id. */
export const TARGET_DATA = { name: 'demo-target', value: 'by-data' };

/** Ready-made step targets, so the markup and the tours can never drift apart. */
export const TARGET = {
	byId: `#${TARGET_ID.byId}`,
	byClass: { class: TARGET_CLASS },
	byData: { data: TARGET_DATA },
	overrides: `#${TARGET_ID.overrides}`,
	sticky: `#${TARGET_ID.sticky}`,
	fixed: `#${TARGET_ID.fixed}`
} satisfies Record<string, BordaStepTarget>;
