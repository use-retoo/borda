import { ComponentPlacement } from '@/shared/enums';
import { TARGET_CLASS, TARGET_DATA, TARGET_ID } from '~/shared/constants';
import type { DemoTargetProps } from '~/shared/ui';

import type { DemoEntry } from '../types';

/**
 * Page sections in scroll order. The first three targets also carry
 * `data-borda-*` attributes, which back the DOM-driven steps demo.
 */
export const DEMO_ENTRIES: DemoEntry[] = [
	{
		label: 'Target by id',
		target: {
			id: TARGET_ID.byId,
			name: 'Step 1',
			badge: 'id',
			'data-borda-step': '1',
			'data-borda-title': 'Target by id',
			'data-borda-description': 'Pass a CSS selector string.',
			'data-borda-placement': ComponentPlacement.BOTTOM_START
		}
	},
	{
		label: 'Target by class',
		target: {
			id: TARGET_ID.byClass,
			name: 'Step 2',
			badge: 'class',
			class: TARGET_CLASS,
			'data-borda-step': '2',
			'data-borda-title': 'Target by class',
			'data-borda-description': 'Pass a class name as an object.',
			'data-borda-placement': ComponentPlacement.TOP_START
		}
	},
	{
		label: 'Target by data attribute',
		target: {
			id: TARGET_ID.byData,
			name: 'Step 3',
			badge: 'data attribute',
			[`data-${TARGET_DATA.name}`]: TARGET_DATA.value,
			'data-borda-step': '3',
			'data-borda-title': 'Target by data attribute',
			'data-borda-description': 'Pass a data attribute name and value.',
			'data-borda-placement': ComponentPlacement.MIDDLE_START
		}
	},
	{
		label: 'Step overrides',
		target: {
			id: TARGET_ID.overrides,
			name: 'Step 4',
			badge: 'overrides'
		}
	},
	{
		label: 'Sticky target',
		target: {
			id: TARGET_ID.sticky,
			name: 'Sticky',
			badge: 'position: sticky',
			isSticky: true
		}
	}
];

/** The always-visible target pinned to the viewport corner, outside the scrolling page. */
export const FIXED_TARGET: DemoTargetProps = {
	id: TARGET_ID.fixed,
	name: 'Fixed',
	badge: 'position: fixed',
	isFixed: true
};
