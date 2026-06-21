import { BordaScrollEasingName } from '@/shared/lib/scroll-easing';

import type { BordaScrollConfig } from '../types';

export const DEFAULT_SCROLL_CONFIG: BordaScrollConfig = {
	block: 'center',
	inline: 'nearest',
	duration: 400,
	easing: BordaScrollEasingName.EASE_IN_OUT,
	offset: {
		x: 0,
		y: 0
	},
	isLocked: true
};
