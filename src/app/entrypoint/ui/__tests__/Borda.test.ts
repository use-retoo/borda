import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BordaScrollAppearance, BordaTooltipTransition } from '@/app/entrypoint';
import type { BordaProps } from '@/app/entrypoint';
import { AnimationEffect, ComponentPlacement, ComponentShape, ComponentSize } from '@/shared/enums';

import Borda from '../Borda.svelte';

const mockEventEmitter = {
	emit: vi.fn(),
	on: vi.fn(),
	off: vi.fn(),
	once: vi.fn(),
	remove: vi.fn(),
	clear: vi.fn()
};

const mockContext = {
	eventEmitter: mockEventEmitter,
	mount: vi.fn(),
	unmount: vi.fn(),
	close: vi.fn()
};

vi.mock('@/entities/borda', () => ({
	setBordaContext: vi.fn(),
	getBordaContext: vi.fn(() => mockContext)
}));

vi.mock('@/shared/lib/animator', () => ({
	useAnimator: () => ({
		isHidden: false,
		hasShownAnimation: false,
		hasHiddenAnimation: false,
		classes: []
	})
}));

vi.mock('@/shared/lib/focus-trap', () => ({
	useFocusTrap: vi.fn()
}));

vi.mock('@/shared/lib/transition-delay', () => ({
	useTransitionDelay: () => ({ isActive: false })
}));

vi.mock('@/widgets/borda-tour-overlay/model', () => ({
	useOverlay: () => ({
		width: 800,
		height: 600,
		backdropPath: 'M0,0H800V600H0Z',
		cssPosition: 'absolute',
		isTransitioning: false
	})
}));

vi.mock('@/widgets/borda-tour-tooltip/model', async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;

	return {
		...actual,
		useTooltipPosition: () => ({
			top: 100,
			left: 50,
			cssPosition: 'absolute',
			arrowOffset: 20,
			effectivePlacement: ComponentPlacement.BOTTOM_START
		}),
		useTooltipArrow: () => ({
			side: 'top',
			classes: ['rb-tour-tooltip__arrow', 'rb-tour-tooltip__arrow--top']
		})
	};
});

const mockController = {
	isActivated: true,
	currentStep: 1,
	currentStepIndex: 0,
	totalSteps: 3,
	hasNextStep: true,
	hasPrevStep: false,
	step: {
		target: '#target',
		title: 'Welcome',
		description: 'Get started',
		placement: ComponentPlacement.BOTTOM_START
	},
	currentTarget: document.createElement('div'),
	next: vi.fn(),
	prev: vi.fn(),
	finish: vi.fn(),
	changeStep: vi.fn(),
	isMovePrevented: false,
	preventMove: vi.fn(),
	continue: vi.fn(),
	clearMovePrevented: vi.fn()
};

const mockScroll = {
	scrollTo: vi.fn().mockResolvedValue(undefined),
	isScrolling: false,
	isLocked: false
};

const mockAnimation = {
	isEnabled: false,
	tooltip: {
		enter: AnimationEffect.FADE,
		exit: AnimationEffect.FADE,
		enterDuration: 150,
		exitDuration: 150,
		easing: 'ease-out',
		appearance: BordaScrollAppearance.AFTER_SCROLL,
		transition: BordaTooltipTransition.FADE
	},
	overlay: {
		transitionDuration: 0,
		easing: 'ease-in-out'
	}
};

const mockSkip = {
	isSkipped: false,
	storageKey: 'borda:skip',
	set: vi.fn(),
	clear: vi.fn()
};

const defaultProps: BordaProps = {
	config: {
		steps: [],
		size: ComponentSize.MD,
		shape: ComponentShape.CIRCLE,
		visibility: { isAnimated: true, isHidden: false },
		container: {},
		tourOverlay: {},
		tourTooltip: {},
		tourButtons: {},
		tourProgress: false,
		closeButton: {},
		tourSkip: {}
	},
	controller: mockController,
	scroll: mockScroll,
	animation: mockAnimation,
	skip: mockSkip,
	eventEmitter: mockEventEmitter,
	mount: vi.fn(),
	unmount: vi.fn(),
	close: vi.fn()
};

beforeEach(() => {
	Element.prototype.animate = vi.fn().mockReturnValue({
		finished: Promise.resolve(),
		cancel: vi.fn(),
		finish: vi.fn()
	});

	vi.clearAllMocks();
});

describe('Borda', () => {
	describe('rendering', () => {
		it('renders a root div with rb class', () => {
			const { container } = render(Borda, { props: defaultProps });

			expect(container.querySelector('.rb')).toBeInTheDocument();
		});

		it('renders the container', () => {
			const { container } = render(Borda, { props: defaultProps });

			expect(container.querySelector('.rb-container')).toBeInTheDocument();
		});

		it('renders overlay when currentTarget exists', () => {
			const { container } = render(Borda, { props: defaultProps });

			expect(container.querySelector('.rb-tour-overlay')).toBeInTheDocument();
		});

		it('renders tooltip with title when step exists', () => {
			render(Borda, { props: defaultProps });

			expect(screen.getByText('Welcome')).toBeInTheDocument();
		});

		it('renders tooltip description', () => {
			render(Borda, { props: defaultProps });

			expect(screen.getByText('Get started')).toBeInTheDocument();
		});

		it('renders close button', () => {
			const { container } = render(Borda, { props: defaultProps });

			expect(container.querySelector('.rb-close-button button')).toBeInTheDocument();
		});

		it('hides overlay when tourOverlay is false', () => {
			const { container } = render(Borda, {
				props: {
					...defaultProps,
					config: { ...defaultProps.config, tourOverlay: false }
				}
			});

			expect(container.querySelector('.rb-tour-overlay')).not.toBeInTheDocument();
		});

		it('hides tooltip when tourTooltip is false', () => {
			render(Borda, {
				props: {
					...defaultProps,
					config: { ...defaultProps.config, tourTooltip: false }
				}
			});

			expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
		});

		it('does not render overlay when currentTarget is null', () => {
			const { container } = render(Borda, {
				props: {
					...defaultProps,
					controller: { ...mockController, currentTarget: null }
				}
			});

			expect(container.querySelector('.rb-tour-overlay')).not.toBeInTheDocument();
		});

		it('calls mount on init', () => {
			const mount = vi.fn();

			render(Borda, { props: { ...defaultProps, mount } });

			expect(mount).toHaveBeenCalledOnce();
		});
	});
});
