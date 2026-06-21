import { BordaScrollAppearance } from '@/app/entrypoint';
import { AnimationEffect } from '@/shared/enums';

/** Shared tooltip animation timings reused by the effect helper. */
const ANIMATION_BASE = {
	enterDuration: 300,
	exitDuration: 200,
	easing: 'ease'
} as const;

/**
 * Builds a tooltip animation config fragment for the given effect and scroll appearance.
 *
 * @param effect - Enter/exit animation effect.
 * @param appearance - When the tooltip appears relative to scrolling.
 * @returns A config fragment to spread into a tour config.
 */
export function withEffect(
	effect: AnimationEffect,
	appearance = BordaScrollAppearance.AFTER_SCROLL
) {
	return {
		animation: {
			tooltip: { enter: effect, exit: effect, ...ANIMATION_BASE, appearance }
		}
	} as const;
}
