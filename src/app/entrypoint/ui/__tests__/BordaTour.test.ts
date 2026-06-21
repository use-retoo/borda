import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getBordaContext } from '@/entities/borda';
import type { BordaContext } from '@/entities/borda';
import { ComponentPlacement, ComponentShape, ComponentSize } from '@/shared/enums';

import BordaTour from '../BordaTour.svelte';

import type { BordaTourEvents, BordaTourProps } from '../../model';

vi.mock('@/entities/borda', () => ({ getBordaContext: vi.fn() }));

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

const defaultProps: BordaTourProps & BordaTourEvents = {
	step: {
		target: '#target',
		title: 'Step Title',
		description: 'Step Description',
		placement: ComponentPlacement.BOTTOM_START
	},
	currentTarget: document.createElement('div'),
	currentStep: 1,
	totalSteps: 3,
	size: ComponentSize.MD,
	shape: ComponentShape.CIRCLE,
	isSkipChecked: false,
	isHidden: false,
	hasGlide: false,
	tourTooltipAnimation: false,
	tourTooltipProps: {},
	tourImageProps: {},
	tourButtonsProps: {},
	tourProgressProps: false,
	closeButtonProps: {},
	tourSkipProps: {},
	onNext: vi.fn(),
	onPrev: vi.fn(),
	onFinish: vi.fn(),
	onSkip: vi.fn(),
	onSkipChange: vi.fn()
};

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

describe('BordaTour', () => {
	describe('rendering', () => {
		it('renders step title', () => {
			render(BordaTour, { props: defaultProps });

			expect(screen.getByText('Step Title')).toBeInTheDocument();
		});

		it('renders step description', () => {
			render(BordaTour, { props: defaultProps });

			expect(screen.getByText('Step Description')).toBeInTheDocument();
		});

		it('renders next button on non-last step', () => {
			render(BordaTour, { props: defaultProps });

			expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
		});

		it('renders finish button on last step', () => {
			render(BordaTour, {
				props: { ...defaultProps, currentStep: 3, totalSteps: 3 }
			});

			expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument();
			expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
		});

		it('renders close button by default', () => {
			render(BordaTour, { props: defaultProps });

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
		});

		it('hides close button when closeButtonProps is false', () => {
			render(BordaTour, { props: { ...defaultProps, closeButtonProps: false } });

			expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
		});

		it('renders skip checkbox when tourSkipProps is provided', () => {
			render(BordaTour, { props: { ...defaultProps, tourSkipProps: {} } });

			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		it('hides skip when tourSkipProps is false', () => {
			render(BordaTour, { props: { ...defaultProps, tourSkipProps: false } });

			expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
		});
	});

	describe('interaction', () => {
		it('calls onNext when next button is clicked', async () => {
			const user = userEvent.setup();
			const onNext = vi.fn();

			render(BordaTour, { props: { ...defaultProps, onNext } });

			await user.click(screen.getByRole('button', { name: 'Next' }));

			expect(onNext).toHaveBeenCalledOnce();
		});

		it('calls onFinish when finish button is clicked on last step', async () => {
			const user = userEvent.setup();
			const onFinish = vi.fn();

			render(BordaTour, {
				props: { ...defaultProps, currentStep: 3, totalSteps: 3, onFinish }
			});

			await user.click(screen.getByRole('button', { name: 'Finish' }));

			expect(onFinish).toHaveBeenCalledOnce();
		});
	});
});
