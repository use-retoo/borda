import { useAxisTarget } from '@/shared/lib/axis-target';
import { useScrollEasing } from '@/shared/lib/scroll-easing';
import { isBrowser } from '@/shared/utils';

import { DEFAULT_SCROLL_CONFIG } from '../constants';

import type { UseBordaConfigReturns } from '../../../model';
import type {
	BordaActiveScrollAnimation,
	BordaScrollConfig,
	BordaScrollRect,
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

	/**
	 * Builds the smallest viewport-relative rect containing the target and,
	 * when present, the tooltip pointing at it.
	 *
	 * Prefers the union of target + tooltip so both end up visible. But when that
	 * union is larger than the viewport — typically a very tall target — aligning
	 * it just centers the target and pushes the tooltip (which carries the step's
	 * controls) off-screen. In that case it falls back to revealing the tooltip
	 * alone, since the tooltip is the part the user must reach.
	 *
	 * @param target - The step's target element.
	 * @param tooltipRect - The tooltip's resolved viewport rect, or `null` if not yet known.
	 * @returns The rect to scroll into view, in viewport coordinates.
	 */
	function buildBoundingRect(
		target: HTMLElement,
		tooltipRect: BordaScrollRect | null
	): BordaScrollRect {
		const a = target.getBoundingClientRect();

		if (!tooltipRect) {
			return { top: a.top, left: a.left, width: a.width, height: a.height };
		}

		const top = Math.min(a.top, tooltipRect.top);
		const left = Math.min(a.left, tooltipRect.left);
		const right = Math.max(a.right, tooltipRect.left + tooltipRect.width);
		const bottom = Math.max(a.bottom, tooltipRect.top + tooltipRect.height);

		const union = { top, left, width: right - left, height: bottom - top };

		if (union.height > window.innerHeight || union.width > window.innerWidth) {
			return tooltipRect;
		}

		return union;
	}

	/**
	 * Tests whether a viewport-relative rect already sits fully inside the viewport.
	 *
	 * @param rect - The rect to test.
	 * @returns `true` when no scroll is needed to reveal it.
	 */
	function isRectFullyVisible(rect: BordaScrollRect): boolean {
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.top + rect.height <= window.innerHeight &&
			rect.left + rect.width <= window.innerWidth
		);
	}

	/**
	 * Resolves the scroll destination that brings the given rect into view per
	 * the configured `block`/`inline` alignment.
	 *
	 * @param rect - The rect to reveal (from {@link buildBoundingRect}), in viewport coordinates.
	 * @returns The destination document scroll offsets.
	 */
	function resolveScrollTargets(rect: BordaScrollRect): { targetX: number; targetY: number } {
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

	async function scrollTo(
		target: HTMLElement | null,
		tooltipRect: BordaScrollRect | null = null
	): Promise<void> {
		if (!isBrowser || !isScrollEnabled || !target) return;

		const rect = buildBoundingRect(target, tooltipRect);

		if (isRectFullyVisible(rect)) {
			cancelActiveAnimation();
			isScrolling = false;

			return;
		}

		const { targetX, targetY } = resolveScrollTargets(rect);

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
		/** Stop any in-flight rAF scroll loop so it doesn't run on after teardown. */
		cancelActiveAnimation();
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
