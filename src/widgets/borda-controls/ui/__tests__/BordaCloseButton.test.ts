import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getBordaContext } from '@/entities/borda';
import type { BordaContext } from '@/entities/borda';
import { BordaEvent } from '@/entities/event';
import { ComponentShape, ComponentSize } from '@/shared/enums';

import BordaCloseButton from '../BordaCloseButton.svelte';

vi.mock('@/entities/borda', () => ({ getBordaContext: vi.fn() }));

let mockEmit: ReturnType<typeof vi.fn>;
let mockClose: ReturnType<typeof vi.fn>;

beforeEach(() => {
	mockEmit = vi.fn();
	mockClose = vi.fn();

	vi.mocked(getBordaContext).mockReturnValue({
		eventEmitter: {
			emit: mockEmit,
			on: vi.fn(),
			off: vi.fn(),
			once: vi.fn(),
			remove: vi.fn(),
			clear: vi.fn()
		},
		mount: vi.fn(),
		unmount: vi.fn(),
		close: mockClose
	} as BordaContext);
});

describe('BordaCloseButton', () => {
	describe('rendering', () => {
		it('renders a button element', () => {
			render(BordaCloseButton);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('has default aria-label Close', () => {
			render(BordaCloseButton);

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
		});

		it('has rb-close-button base class', () => {
			const { container } = render(BordaCloseButton);

			expect(container.querySelector('.rb-close-button')).toBeInTheDocument();
		});

		it('applies default md size class', () => {
			const { container } = render(BordaCloseButton);

			expect(container.querySelector('.rb-close-button')).toHaveClass('rb-close-button--md');
		});

		it('applies default circle shape class', () => {
			const { container } = render(BordaCloseButton);

			expect(container.querySelector('.rb-close-button')).toHaveClass('rb-close-button--circle');
		});

		it('applies size class', () => {
			const { container } = render(BordaCloseButton, {
				props: { size: ComponentSize.LG }
			});

			expect(container.querySelector('.rb-close-button')).toHaveClass('rb-close-button--lg');
		});

		it('applies shape class', () => {
			const { container } = render(BordaCloseButton, {
				props: { shape: ComponentShape.SQUARE }
			});

			expect(container.querySelector('.rb-close-button')).toHaveClass('rb-close-button--square');
		});

		it('applies custom class', () => {
			const { container } = render(BordaCloseButton, {
				props: { customClasses: { root: 'my-close' } }
			});

			expect(container.querySelector('.rb-close-button')).toHaveClass('my-close');
		});
	});

	describe('interaction', () => {
		it('emits ON_CLOSE_CLICK on click', async () => {
			const user = userEvent.setup();

			render(BordaCloseButton);

			await user.click(screen.getByRole('button'));

			expect(mockEmit).toHaveBeenCalledWith(BordaEvent.ON_CLOSE_CLICK, expect.any(Event));
		});

		it('calls close by default on click', async () => {
			const user = userEvent.setup();

			render(BordaCloseButton);

			await user.click(screen.getByRole('button'));

			expect(mockClose).toHaveBeenCalledOnce();
		});

		it('calls onClose instead of close when onClose is provided', async () => {
			const user = userEvent.setup();
			const onClose = vi.fn();

			render(BordaCloseButton, { props: { onClose } });

			await user.click(screen.getByRole('button'));

			expect(onClose).toHaveBeenCalledOnce();
			expect(mockClose).not.toHaveBeenCalled();
		});
	});
});
