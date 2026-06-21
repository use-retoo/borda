import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ComponentSize } from '@/shared/enums';

import { BordaButtonShape, BordaButtonVariant } from '../../model';
import BordaButton from '../BordaButton.svelte';

describe('BordaButton', () => {
	describe('rendering', () => {
		it('renders a button element', () => {
			render(BordaButton);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('always has rb-button base class', () => {
			const { container } = render(BordaButton);

			expect(container.querySelector('button')).toHaveClass('rb-button');
		});

		it('applies default md size class', () => {
			const { container } = render(BordaButton);

			expect(container.querySelector('button')).toHaveClass('rb-button--md');
		});

		it('applies default rectangle shape class', () => {
			const { container } = render(BordaButton);

			expect(container.querySelector('button')).toHaveClass('rb-button--rectangle');
		});

		it('applies default filled variant class', () => {
			const { container } = render(BordaButton);

			expect(container.querySelector('button')).toHaveClass('rb-button--filled');
		});

		it('applies default button type', () => {
			render(BordaButton);

			expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
		});

		it('applies size class', () => {
			const { container } = render(BordaButton, { props: { size: ComponentSize.LG } });

			expect(container.querySelector('button')).toHaveClass('rb-button--lg');
		});

		it('applies shape class', () => {
			const { container } = render(BordaButton, {
				props: { shape: BordaButtonShape.CIRCLE }
			});

			expect(container.querySelector('button')).toHaveClass('rb-button--circle');
		});

		it('applies variant class', () => {
			const { container } = render(BordaButton, {
				props: { variant: BordaButtonVariant.OUTLINED }
			});

			expect(container.querySelector('button')).toHaveClass('rb-button--outlined');
		});

		it('applies autosize class instead of size class', () => {
			const { container } = render(BordaButton, { props: { autosize: true } });

			expect(container.querySelector('button')).toHaveClass('rb-button--autosize');
			expect(container.querySelector('button')).not.toHaveClass('rb-button--md');
		});

		it('sets disabled attribute', () => {
			render(BordaButton, { props: { disabled: true } });

			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('applies custom class', () => {
			const { container } = render(BordaButton, {
				props: { customClasses: { root: 'my-btn' } }
			});

			expect(container.querySelector('button')).toHaveClass('my-btn');
		});

		it('applies aria-label', () => {
			render(BordaButton, { props: { aria: { ariaLabel: 'Submit' } } });

			expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
		});
	});

	describe('interaction', () => {
		it('dispatches click event', async () => {
			const user = userEvent.setup();
			let clicked = false;

			render(BordaButton, { props: { onclick: () => (clicked = true) } });

			await user.click(screen.getByRole('button'));

			expect(clicked).toBe(true);
		});

		it('does not dispatch click when disabled', async () => {
			const user = userEvent.setup();
			let clicked = false;

			render(BordaButton, { props: { disabled: true, onclick: () => (clicked = true) } });

			await user.click(screen.getByRole('button'));

			expect(clicked).toBe(false);
		});
	});
});
