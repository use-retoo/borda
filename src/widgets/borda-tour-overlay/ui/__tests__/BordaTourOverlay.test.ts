import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getBordaContext } from '@/entities/borda';
import type { BordaContext } from '@/entities/borda';

import BordaTourOverlay from '../BordaTourOverlay.svelte';

vi.mock('@/entities/borda', () => ({ getBordaContext: vi.fn() }));
vi.mock('../model', () => ({
	useOverlay: () => ({
		width: 800,
		height: 600,
		backdropPath: 'M0,0H800V600H0Z',
		cssPosition: 'absolute',
		isTransitioning: false
	})
}));

beforeEach(() => {
	Element.prototype.animate = vi.fn().mockReturnValue({
		finished: Promise.resolve(),
		cancel: vi.fn(),
		finish: vi.fn()
	});

	vi.mocked(getBordaContext).mockReturnValue({
		eventEmitter: {
			emit: vi.fn(),
			on: vi.fn(),
			off: vi.fn(),
			once: vi.fn(),
			remove: vi.fn(),
			clear: vi.fn()
		},
		mount: vi.fn(),
		unmount: vi.fn(),
		close: vi.fn()
	} as BordaContext);
});

describe('BordaTourOverlay', () => {
	describe('rendering', () => {
		it('renders an svg with button role', () => {
			render(BordaTourOverlay);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('has rb-tour-overlay class', () => {
			const { container } = render(BordaTourOverlay);

			expect(container.querySelector('.rb-tour-overlay')).toBeInTheDocument();
		});

		it('renders a backdrop path', () => {
			const { container } = render(BordaTourOverlay);

			expect(container.querySelector('.rb-tour-overlay__backdrop')).toBeInTheDocument();
		});

		it('has default aria-label Close', () => {
			render(BordaTourOverlay);

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
		});

		it('is focusable', () => {
			render(BordaTourOverlay);

			expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
		});

		it('applies custom class', () => {
			const { container } = render(BordaTourOverlay, {
				props: { customClasses: { root: 'my-overlay' } }
			});

			expect(container.querySelector('.rb-tour-overlay')).toHaveClass('my-overlay');
		});
	});
});
