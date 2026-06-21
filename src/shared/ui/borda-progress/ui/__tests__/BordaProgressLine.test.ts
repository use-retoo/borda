import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import BordaProgressLine from '../BordaProgressLine.svelte';

describe('BordaProgressLine', () => {
	describe('rendering', () => {
		it('renders a progressbar', () => {
			render(BordaProgressLine);

			expect(screen.getByRole('progressbar')).toBeInTheDocument();
		});

		it('has rb-progress--line class', () => {
			render(BordaProgressLine);

			expect(screen.getByRole('progressbar')).toHaveClass('rb-progress--line');
		});

		it('renders track and progress elements', () => {
			const { container } = render(BordaProgressLine);

			expect(container.querySelector('.rb-progress__track')).toBeInTheDocument();
			expect(container.querySelector('.rb-progress__progress')).toBeInTheDocument();
		});

		it('exposes aria-valuenow and aria-valuemax', () => {
			render(BordaProgressLine, { props: { current: 3, total: 5 } });

			const bar = screen.getByRole('progressbar');

			expect(bar).toHaveAttribute('aria-valuenow', '3');
			expect(bar).toHaveAttribute('aria-valuemax', '5');
			expect(bar).toHaveAttribute('aria-valuemin', '1');
		});

		it('has default aria-label Progress', () => {
			render(BordaProgressLine);

			expect(screen.getByRole('progressbar', { name: 'Progress' })).toBeInTheDocument();
		});

		it('applies custom class', () => {
			render(BordaProgressLine, {
				props: { customClasses: { root: 'my-line' } }
			});

			expect(screen.getByRole('progressbar')).toHaveClass('my-line');
		});
	});
});
