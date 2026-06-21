import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import BordaContainer from '../BordaContainer.svelte';

describe('BordaContainer', () => {
	describe('rendering', () => {
		it('renders a div element', () => {
			const { container } = render(BordaContainer);

			expect(container.querySelector('.rb-container')).toBeInTheDocument();
		});

		it('has rb-container base class', () => {
			const { container } = render(BordaContainer);

			expect(container.querySelector('div')).toHaveClass('rb-container');
		});

		it('applies custom class', () => {
			const { container } = render(BordaContainer, {
				props: { customClasses: { root: 'my-container' } }
			});

			expect(container.querySelector('div')).toHaveClass('my-container');
		});

		it('applies custom styles', () => {
			const { container } = render(BordaContainer, {
				props: { customStyles: { root: 'color: red;' } }
			});

			expect(container.querySelector('div')).toHaveAttribute('style', 'color: red;');
		});
	});
});
