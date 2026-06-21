import { useAxisTarget } from '@/shared/lib/axis-target';
import { useScrollEasing } from '@/shared/lib/scroll-easing';
import { useViewportVisibility } from '@/shared/lib/viewport-visibility';
import { isBrowser } from '@/shared/utils';

import { DEFAULT_SCROLL_CONFIG } from '../constants';

import type { UseBordaConfigReturns } from '../../../model';
import type {
	BordaActiveScrollAnimation,
	BordaScrollConfig,
	UseBordaScrollReturns
} from '../types';

/**
 * Manages the scroll feature that smoothly follows the active tour step.
 *
 * Uses a custom rAF animation so `duration`, `easing` and `offset` are fully
 * configurable. Setting `scroll: false` makes `scrollTo` a no-op. Disabling
 * animations globally (`animation: false` or `animation.isEnabled: false`)
 * keeps the scroll itself but turns it into an instant jump.
 *
 * @param config - The reactive config store.
 * @returns Methods to apply initial state, and a reactive scroll API.
 */
export default function useBordaScroll(config: UseBordaConfigReturns): UseBordaScrollReturns {
	let isScrolling = $state(false);

	let activeAnimation: BordaActiveScrollAnimation | null = null;

	const rawScrollConfig = $derived(config.getConfig().scroll);

	const isScrollEnabled = $derived(rawScrollConfig !== false);

	const scrollOverrides = $derived(rawScrollConfig || {});

	const scrollConfig = $derived(mergeScrollConfig(scrollOverrides));

	const scrollEasing = useScrollEasing({ getEasing: () => scrollConfig.easing });

	const animation = $derived(config.getConfig().animation);

	const isAnimationEnabled = $derived(animation !== false && animation?.isEnabled !== false);

	/** The global animation switch is the master one — when off, the scroll jumps instantly. */
	const effectiveDuration = $derived(isAnimationEnabled ? scrollConfig.duration : 0);

	const axisTarget = useAxisTarget();

	const viewportVisibility = useViewportVisibility();

	const isLocked = $derived(isScrollEnabled && scrollConfig.isLocked);

	function mergeScrollConfig(overrides: Partial<BordaScrollConfig>): BordaScrollConfig {
		return {
			...DEFAULT_SCROLL_CONFIG,
			...overrides,
			offset: {
				...DEFAULT_SCROLL_CONFIG.offset,
				...(overrides.offset ?? {})
			}
		};
	}

	function resolveScrollTargets(element: HTMLElement): { targetX: number; targetY: number } {
		const rect = element.getBoundingClientRect();

		const targetX =
			axisTarget.resolve(
				window.scrollX,
				window.innerWidth,
				rect.left,
				rect.width,
				scrollConfig.inline
			) + (scrollConfig.offset.x ?? 0);

		const targetY =
			axisTarget.resolve(
				window.scrollY,
				window.innerHeight,
				rect.top,
				rect.height,
				scrollConfig.block
			) + (scrollConfig.offset.y ?? 0);

		return { targetX, targetY };
	}

	function cancelActiveAnimation() {
		activeAnimation?.cancel();
		activeAnimation = null;
	}

	/** Swallows user-initiated scroll gestures while leaving programmatic `scrollTo` intact. */
	function preventScroll(event: Event) {
		event.preventDefault();
	}

	function lockScroll() {
		if (!isBrowser) return;

		window.addEventListener('wheel', preventScroll, { passive: false });
		window.addEventListener('touchmove', preventScroll, { passive: false });
	}

	function unlockScroll() {
		if (!isBrowser) return;

		window.removeEventListener('wheel', preventScroll);
		window.removeEventListener('touchmove', preventScroll);
	}

	/**
	 * Runs the rAF-based scroll animation.
	 *
	 * Registers a cancel handle in {@link activeAnimation}; calling it aborts
	 * the rAF chain and resolves the promise early.
	 *
	 * @param targetX - Final document x in pixels.
	 * @param targetY - Final document y in pixels.
	 * @returns Resolves when the animation completes or is cancelled.
	 */
	function runScrollAnimation(targetX: number, targetY: number): Promise<void> {
		return new Promise<void>((resolve) => {
			const startX = window.scrollX;
			const startY = window.scrollY;

			const deltaX = targetX - startX;
			const deltaY = targetY - startY;

			if (deltaX === 0 && deltaY === 0) {
				resolve();
				return;
			}

			if (effectiveDuration <= 0) {
				window.scrollTo(targetX, targetY);
				resolve();
				return;
			}

			const easing = scrollEasing.easingFunction;
			const startTime = performance.now();

			let frameId: number | null = null;
			let cancelled = false;

			activeAnimation = {
				cancel() {
					cancelled = true;
					if (frameId !== null) window.cancelAnimationFrame(frameId);
					resolve();
				}
			};

			const tick = (now: number) => {
				if (cancelled) return;

				const progress = Math.min((now - startTime) / effectiveDuration, 1);
				const easedProgress = easing(progress);

				window.scrollTo(startX + deltaX * easedProgress, startY + deltaY * easedProgress);

				if (progress < 1) {
					frameId = window.requestAnimationFrame(tick);
					return;
				}

				frameId = null;
				activeAnimation = null;

				resolve();
			};

			frameId = window.requestAnimationFrame(tick);
		});
	}

	async function scrollTo(element: HTMLElement | null): Promise<void> {
		if (!isBrowser || !isScrollEnabled || !element) return;

		if (viewportVisibility.isFullyVisible(element)) {
			cancelActiveAnimation();
			isScrolling = false;

			return;
		}

		const { targetX, targetY } = resolveScrollTargets(element);

		cancelActiveAnimation();
		isScrolling = true;

		await runScrollAnimation(targetX, targetY);

		isScrolling = false;
	}

	function apply() {
		if (!isScrollEnabled) return;

		config.mergeConfig({ scroll: scrollConfig });

		if (isLocked) lockScroll();
	}

	function destroy() {
		unlockScroll();
	}

	return {
		apply,
		destroy,
		api: {
			get isScrolling() {
				return isScrolling;
			},
			get isLocked() {
				return isLocked;
			},
			scrollTo
		}
	};
}
