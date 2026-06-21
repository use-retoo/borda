import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import { ComponentPlacement } from '@/shared/enums';

import BordaTourTooltip from '../BordaTourTooltip.svelte';

vi.mock('@/shared/lib/animator', () => ({
	useAnimator: () => ({
		isHidden: false,
		hasShownAnimation: false,
		hasHiddenAnimation: false,
		classes: []
	})
}));

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
});
