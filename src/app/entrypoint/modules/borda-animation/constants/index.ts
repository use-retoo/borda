import { AnimationEffect } from '@/shared/enums';

import { BordaScrollAppearance, BordaTooltipTransition } from '../enums';

import type { BordaOverlayAnimation, BordaTooltipAnimation } from '../types';

export const DEFAULT_TOOLTIP_ANIMATION: BordaTooltipAnimation = {
	enter: AnimationEffect.FADE,
	exit: AnimationEffect.FADE,
	enterDuration: 200,
	exitDuration: 150,
	easing: 'ease-out',
	appearance: BordaScrollAppearance.AFTER_SCROLL,
	transition: BordaTooltipTransition.FADE
};

export const DEFAULT_OVERLAY_ANIMATION: BordaOverlayAnimation = {
	transitionDuration: 350,
	easing: 'ease-in-out'
};
