import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import { ComponentPlacement } from '@/shared/enums';
import { swipe } from '@/shared/lib/swipe-touch/model/lib/__tests__/useSwipeTouch.utils';

import BordaTourTooltip from '../BordaTourTooltip.svelte';

vi.mock('@/shared/lib/animator', async () => {
	const { createAnimatorMock } =
		await import('@/shared/lib/animator/model/lib/__tests__/useAnimator.utils');

	return { useAnimator: createAnimatorMock };
});

vi.mock('@/widgets/borda-tour-tooltip/model', async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;

	return {
		...actual,
		useTooltipPosition: () => ({
			top: 100,
			left: 50,
			arrowOffset: 20,
			effectivePlacement: ComponentPlacement.BOTTOM_START
		}),
		useTooltipArrow: () => ({
			side: 'top',
			classes: ['rb-tour-tooltip__arrow', 'rb-tour-tooltip__arrow--top']
		})
	};
});

describe('BordaTourTooltip', () => {
	describe('rendering', () => {
		it('renders a div with rb-tour-tooltip class', () => {
			const { container } = render(BordaTourTooltip);

			expect(container.querySelector('.rb-tour-tooltip')).toBeInTheDocument();
		});

		it('renders title text', () => {
			render(BordaTourTooltip, { props: { title: 'Welcome' } });

			expect(screen.getByText('Welcome')).toBeInTheDocument();
		});

		it('renders description text', () => {
			render(BordaTourTooltip, { props: { description: 'Get started' } });

			expect(screen.getByText('Get started')).toBeInTheDocument();
		});

		it('renders title and description together', () => {
			render(BordaTourTooltip, {
				props: { title: 'Step 1', description: 'Click here' }
			});

			expect(screen.getByText('Step 1')).toBeInTheDocument();
			expect(screen.getByText('Click here')).toBeInTheDocument();
		});

		it('does not render title when not provided', () => {
			const { container } = render(BordaTourTooltip);

			expect(container.querySelector('.rb-tour-tooltip__title')).not.toBeInTheDocument();
		});

		it('does not render description when not provided', () => {
			const { container } = render(BordaTourTooltip);

			expect(container.querySelector('.rb-tour-tooltip__description')).not.toBeInTheDocument();
		});

		it('renders arrow element', () => {
			const { container } = render(BordaTourTooltip);

			expect(container.querySelector('.rb-tour-tooltip__arrow')).toBeInTheDocument();
		});

		it('has rb-tour-tooltip__header when title is provided', () => {
			const { container } = render(BordaTourTooltip, { props: { title: 'Hi' } });

			expect(container.querySelector('.rb-tour-tooltip__header')).toBeInTheDocument();
		});

		it('applies custom class', () => {
			const { container } = render(BordaTourTooltip, {
				props: { customClasses: { root: 'my-tooltip' } }
			});

			expect(container.querySelector('.rb-tour-tooltip')).toHaveClass('my-tooltip');
		});

		it('applies custom title class', () => {
			const { container } = render(BordaTourTooltip, {
				props: { title: 'Test', customClasses: { title: 'my-title' } }
			});

			expect(container.querySelector('.rb-tour-tooltip__title')).toHaveClass('my-title');
		});

		it('applies custom description class', () => {
			const { container } = render(BordaTourTooltip, {
				props: { description: 'Test', customClasses: { description: 'my-desc' } }
			});

			expect(container.querySelector('.rb-tour-tooltip__description')).toHaveClass('my-desc');
		});
	});

	describe('swipe navigation', () => {
		it('calls onSwipeNext on a leftward swipe', () => {
			const onSwipeNext = vi.fn();

			const { container } = render(BordaTourTooltip, { props: { onSwipeNext } });

			swipe(container.querySelector('.rb-tour-tooltip')!, -100);

			expect(onSwipeNext).toHaveBeenCalledOnce();
		});

		it('calls onSwipePrev on a rightward swipe', () => {
			const onSwipePrev = vi.fn();

			const { container } = render(BordaTourTooltip, { props: { onSwipePrev } });

			swipe(container.querySelector('.rb-tour-tooltip')!, 100);

			expect(onSwipePrev).toHaveBeenCalledOnce();
		});

		it('does not call swipe callbacks when hasSwipeControl is false', () => {
			const onSwipeNext = vi.fn();
			const onSwipePrev = vi.fn();

			const { container } = render(BordaTourTooltip, {
				props: { hasSwipeControl: false, onSwipeNext, onSwipePrev }
			});

			const root = container.querySelector('.rb-tour-tooltip')!;

			swipe(root, -100);
			swipe(root, 100);

			expect(onSwipeNext).not.toHaveBeenCalled();
			expect(onSwipePrev).not.toHaveBeenCalled();
		});

		it('ignores a swipe shorter than the distance threshold', () => {
			const onSwipeNext = vi.fn();

			const { container } = render(BordaTourTooltip, { props: { onSwipeNext } });

			swipe(container.querySelector('.rb-tour-tooltip')!, -20);

			expect(onSwipeNext).not.toHaveBeenCalled();
		});

		it('ignores a swipe with excessive vertical travel', () => {
			const onSwipeNext = vi.fn();

			const { container } = render(BordaTourTooltip, { props: { onSwipeNext } });

			swipe(container.querySelector('.rb-tour-tooltip')!, -100, 100);

			expect(onSwipeNext).not.toHaveBeenCalled();
		});
	});
});
