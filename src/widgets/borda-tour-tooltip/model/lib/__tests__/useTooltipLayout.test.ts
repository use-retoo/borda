// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';

import { ComponentPlacement } from '@/shared/enums';

import { useTooltipLayout } from '../';
import { BordaTooltipArrowSide } from '../../enums';

import type { BordaTooltipRect, BordaTooltipSize } from '../../types';

const VIEWPORT: BordaTooltipSize = { width: 1000, height: 800 };

/** Builds a target element with a fixed, mocked viewport rect. */
function createTarget(rect: Omit<BordaTooltipRect, 'right' | 'bottom'>): HTMLElement {
	const element = document.createElement('div');

	const full: BordaTooltipRect = {
		...rect,
		right: rect.left + rect.width,
		bottom: rect.top + rect.height
	};

	element.getBoundingClientRect = () =>
		({
			...full,
			x: full.left,
			y: full.top,
			toJSON: () => full
		}) as DOMRect;

	return element;
}

/** Builds a tooltip element with a fixed, mocked rendered size. */
function createTooltip(size: BordaTooltipSize): HTMLElement {
	const element = document.createElement('div');

	Object.defineProperty(element, 'offsetWidth', { value: size.width });
	Object.defineProperty(element, 'offsetHeight', { value: size.height });

	return element;
}

/** Whether a resolved tooltip box intersects the target's rect. */
function overlapsTarget(
	position: { top: number; left: number },
	tooltipSize: BordaTooltipSize,
	targetRect: BordaTooltipRect
): boolean {
	const overlapsVertically =
		position.top < targetRect.bottom && position.top + tooltipSize.height > targetRect.top;

	const overlapsHorizontally =
		position.left < targetRect.right && position.left + tooltipSize.width > targetRect.left;

	return overlapsVertically && overlapsHorizontally;
}

describe('useTooltipLayout', () => {
	describe('placement', () => {
		it('should keep the requested placement when it fits the viewport', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 300, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: false,
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(result.placement).toBe(ComponentPlacement.BOTTOM_CENTER);
			expect(result.position).toEqual({ top: 358, left: 350 });
		});

		it('should flip to the opposite side when the requested one overflows', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 720, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: true,
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(result.placement).toBe(ComponentPlacement.TOP_CENTER);
		});

		it('should follow an explicit fallback chain in order', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 720, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: { fallback: [ComponentPlacement.MIDDLE_END] },
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(result.placement).toBe(ComponentPlacement.MIDDLE_END);
		});

		it('should keep the requested placement when auto-flip is disabled', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 720, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: false,
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(result.placement).toBe(ComponentPlacement.BOTTOM_CENTER);
		});

		it('should prefer a centered fallback over the opposite-alignment side', () => {
			const result = useTooltipLayout({
				/** START aligns the tooltip's left edge past maxLeft (784); centering pulls it back in. */
				target: createTarget({ left: 820, top: 300, width: 40, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.TOP_START,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: true,
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(result.placement).toBe(ComponentPlacement.TOP_CENTER);
		});
	});

	describe('shift', () => {
		it('should flip above the target when there is no room below, even with auto-flip disabled', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 720, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: false,
				arrowSide: null,
				viewport: VIEWPORT
			});

			/** anchor.top(720) - tooltip.height(80) - offset(8); staying below would overlap the target. */
			expect(result.position.top).toBe(632);
		});

		it('should clamp horizontally when the target hugs the left edge', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 0, top: 300, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: false,
				arrowSide: null,
				viewport: VIEWPORT
			});

			/** edgePadding = offset + margin = 16. */
			expect(result.position.left).toBe(16);
		});
	});

	describe('overlap prevention', () => {
		it('should never overlap the target, even when no side fully fits the viewport', () => {
			/** Target spans nearly the full viewport height, so neither "fully above" nor "fully below" fits. */
			const target = createTarget({ left: 400, top: 50, width: 100, height: 700 });
			const tooltipSize: BordaTooltipSize = { width: 200, height: 100 };

			const result = useTooltipLayout({
				target,
				tooltip: createTooltip(tooltipSize),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: false,
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(overlapsTarget(result.position, tooltipSize, target.getBoundingClientRect())).toBe(
				false
			);
		});

		it('should never overlap the target when auto-flip exhausts every candidate', () => {
			const target = createTarget({ left: 400, top: 50, width: 100, height: 700 });
			const tooltipSize: BordaTooltipSize = { width: 200, height: 100 };

			const result = useTooltipLayout({
				target,
				tooltip: createTooltip(tooltipSize),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: true,
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(overlapsTarget(result.position, tooltipSize, target.getBoundingClientRect())).toBe(
				false
			);
		});
	});

	describe('arrow offset', () => {
		it('should be 0 when no arrow side is given', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 300, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: false,
				arrowSide: null,
				viewport: VIEWPORT
			});

			expect(result.arrowOffset).toBe(0);
		});

		it('should point a horizontal arrow at the target center', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 300, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 0,
				autoPlacement: false,
				arrowSide: BordaTooltipArrowSide.BOTTOM,
				viewport: VIEWPORT
			});

			/** target center x (450) minus the tooltip's left (350). */
			expect(result.arrowOffset).toBe(100);
		});
	});

	describe('padding', () => {
		it('should expand the anchor before positioning', () => {
			const result = useTooltipLayout({
				target: createTarget({ left: 400, top: 300, width: 100, height: 50 }),
				tooltip: createTooltip({ width: 200, height: 80 }),
				placement: ComponentPlacement.BOTTOM_CENTER,
				offset: 8,
				margin: 8,
				padding: 10,
				autoPlacement: false,
				arrowSide: null,
				viewport: VIEWPORT
			});

			/** anchor.bottom grows by padding (350 → 360), so top = 360 + offset. */
			expect(result.position.top).toBe(368);
		});
	});
});
