import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import BordaProgressDots from '../BordaProgressDots.svelte';

describe('BordaProgressDots', () => {
	describe('rendering', () => {
		it('renders a progressbar', () => {
			render(BordaProgressDots, { props: { total: 3 } });

			expect(screen.getByRole('progressbar')).toBeInTheDocument();
		});

		it('has rb-progress--dots class', () => {
			render(BordaProgressDots, { props: { total: 3 } });

			expect(screen.getByRole('progressbar')).toHaveClass('rb-progress--dots');
		});

		it('renders correct number of dots', () => {
			const { container } = render(BordaProgressDots, { props: { total: 5 } });

			expect(container.querySelectorAll('.rb-progress__item')).toHaveLength(5);
		});

		it('marks the active dot', () => {
			const { container } = render(BordaProgressDots, {
				props: { current: 2, total: 3 }
			});

			const items = container.querySelectorAll('.rb-progress__item');

			expect(items[0]).not.toHaveClass('rb-progress__item--active');
			expect(items[1]).toHaveClass('rb-progress__item--active');
			expect(items[2]).not.toHaveClass('rb-progress__item--active');
		});

		it('exposes aria-valuenow and aria-valuemax', () => {
			render(BordaProgressDots, { props: { current: 2, total: 4 } });

			const bar = screen.getByRole('progressbar');

			expect(bar).toHaveAttribute('aria-valuenow', '2');
			expect(bar).toHaveAttribute('aria-valuemax', '4');
			expect(bar).toHaveAttribute('aria-valuemin', '1');
		});

		it('has default aria-label Progress', () => {
			render(BordaProgressDots, { props: { total: 2 } });

			expect(screen.getByRole('progressbar', { name: 'Progress' })).toBeInTheDocument();
		});

		it('applies custom class', () => {
			render(BordaProgressDots, {
				props: { total: 2, customClasses: { root: 'my-progress' } }
			});

			expect(screen.getByRole('progressbar')).toHaveClass('my-progress');
		});
	});
});
