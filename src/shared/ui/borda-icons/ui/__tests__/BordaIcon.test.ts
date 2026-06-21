import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import { ComponentSize } from '@/shared/enums';

import BordaIcon from '../BordaIcon.svelte';

describe('BordaIcon', () => {
	describe('rendering', () => {
		it('renders an svg element', () => {
			const { container } = render(BordaIcon);

			expect(container.querySelector('svg')).toBeInTheDocument();
		});

		it('always has rb-icon base class', () => {
			const { container } = render(BordaIcon);

			expect(container.querySelector('svg')).toHaveClass('rb-icon');
		});

		it('applies default md size class', () => {
			const { container } = render(BordaIcon);

			expect(container.querySelector('svg')).toHaveClass('rb-icon--md');
		});

		it('applies size class', () => {
			const { container } = render(BordaIcon, { props: { size: ComponentSize.SM } });

			expect(container.querySelector('svg')).toHaveClass('rb-icon--sm');
		});

		it('has default viewBox of 0 0 16 16', () => {
			const { container } = render(BordaIcon);

			expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 16 16');
		});

		it('applies custom viewBox', () => {
			const { container } = render(BordaIcon, { props: { viewBox: '0 0 24 24' } });

			expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
		});

		it('is hidden from the accessibility tree', () => {
			const { container } = render(BordaIcon);

			expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
		});

		it('is not focusable', () => {
			const { container } = render(BordaIcon);

			expect(container.querySelector('svg')).toHaveAttribute('focusable', 'false');
		});

		it('applies custom class', () => {
			const { container } = render(BordaIcon, {
				props: { customClasses: { root: 'my-icon' } }
			});

			expect(container.querySelector('svg')).toHaveClass('my-icon');
		});
	});
});
