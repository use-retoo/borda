import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import BordaProgressText from '../BordaProgressText.svelte';

describe('BordaProgressText', () => {
	describe('rendering', () => {
		it('renders a progressbar', () => {
			render(BordaProgressText);

			expect(screen.getByRole('progressbar')).toBeInTheDocument();
		});

		it('has rb-progress--text class', () => {
			render(BordaProgressText);

			expect(screen.getByRole('progressbar')).toHaveClass('rb-progress--text');
		});

		it('displays current / total text', () => {
			render(BordaProgressText, { props: { current: 2, total: 5 } });

			expect(screen.getByText('2 / 5')).toBeInTheDocument();
		});

		it('exposes aria-valuenow and aria-valuemax', () => {
			render(BordaProgressText, { props: { current: 3, total: 4 } });

			const bar = screen.getByRole('progressbar');

			expect(bar).toHaveAttribute('aria-valuenow', '3');
			expect(bar).toHaveAttribute('aria-valuemax', '4');
			expect(bar).toHaveAttribute('aria-valuemin', '1');
		});

		it('has default aria-label Progress', () => {
			render(BordaProgressText);

			expect(screen.getByRole('progressbar', { name: 'Progress' })).toBeInTheDocument();
		});

		it('applies custom class', () => {
			render(BordaProgressText, {
				props: { customClasses: { root: 'my-text' } }
			});

			expect(screen.getByRole('progressbar')).toHaveClass('my-text');
		});
	});
});
