import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ComponentSize } from '@/shared/enums';

import BordaTourButtons from '../BordaTourButtons.svelte';

describe('BordaTourButtons', () => {
	describe('rendering', () => {
		it('renders prev and next buttons on first step', () => {
			render(BordaTourButtons, { props: { currentStep: 1, totalSteps: 3 } });

			expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
		});

		it('renders finish button on last step', () => {
			render(BordaTourButtons, { props: { currentStep: 3, totalSteps: 3 } });

			expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument();
			expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
		});

		it('disables prev button on first step', () => {
			render(BordaTourButtons, { props: { currentStep: 1, totalSteps: 3 } });

			expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
		});

		it('renders skip button when skip is truthy', () => {
			render(BordaTourButtons, { props: { currentStep: 1, totalSteps: 3, skip: {} } });

			expect(screen.getByRole('button', { name: 'Skip' })).toBeInTheDocument();
		});

		it('does not render skip button when skip is false', () => {
			render(BordaTourButtons, { props: { currentStep: 1, totalSteps: 3, skip: false } });

			expect(screen.queryByRole('button', { name: 'Skip' })).not.toBeInTheDocument();
		});

		it('has rb-tour-buttons class', () => {
			const { container } = render(BordaTourButtons);

			expect(container.querySelector('.rb-tour-buttons')).toBeInTheDocument();
		});
	});

	describe('size', () => {
		it('defaults every button to md', () => {
			render(BordaTourButtons, { props: { currentStep: 1, totalSteps: 3, skip: {} } });

			expect(screen.getByRole('button', { name: 'Back' })).toHaveClass('rb-button--md');
			expect(screen.getByRole('button', { name: 'Next' })).toHaveClass('rb-button--md');
			expect(screen.getByRole('button', { name: 'Skip' })).toHaveClass('rb-button--md');
		});

		it('propagates the bar size to every button', () => {
			render(BordaTourButtons, {
				props: { currentStep: 1, totalSteps: 3, size: ComponentSize.LG, skip: {} }
			});

			expect(screen.getByRole('button', { name: 'Back' })).toHaveClass('rb-button--lg');
			expect(screen.getByRole('button', { name: 'Next' })).toHaveClass('rb-button--lg');
			expect(screen.getByRole('button', { name: 'Skip' })).toHaveClass('rb-button--lg');
		});

		it('lets a per-button size override the bar size', () => {
			render(BordaTourButtons, {
				props: {
					currentStep: 1,
					totalSteps: 3,
					size: ComponentSize.LG,
					next: { size: ComponentSize.SM }
				}
			});

			expect(screen.getByRole('button', { name: 'Next' })).toHaveClass('rb-button--sm');
			expect(screen.getByRole('button', { name: 'Back' })).toHaveClass('rb-button--lg');
		});
	});

	describe('interaction', () => {
		it('calls onNext when next is clicked', async () => {
			const user = userEvent.setup();
			const onNext = vi.fn();

			render(BordaTourButtons, {
				props: { currentStep: 1, totalSteps: 3, onNext }
			});

			await user.click(screen.getByRole('button', { name: 'Next' }));

			expect(onNext).toHaveBeenCalledOnce();
		});

		it('calls onPrev when prev is clicked', async () => {
			const user = userEvent.setup();
			const onPrev = vi.fn();

			render(BordaTourButtons, {
				props: { currentStep: 2, totalSteps: 3, onPrev }
			});

			await user.click(screen.getByRole('button', { name: 'Back' }));

			expect(onPrev).toHaveBeenCalledOnce();
		});

		it('calls onFinish when finish is clicked on last step', async () => {
			const user = userEvent.setup();
			const onFinish = vi.fn();

			render(BordaTourButtons, {
				props: { currentStep: 3, totalSteps: 3, onFinish }
			});

			await user.click(screen.getByRole('button', { name: 'Finish' }));

			expect(onFinish).toHaveBeenCalledOnce();
		});

		it('calls onSkip when skip is clicked', async () => {
			const user = userEvent.setup();
			const onSkip = vi.fn();

			render(BordaTourButtons, {
				props: { currentStep: 1, totalSteps: 3, skip: {}, onSkip }
			});

			await user.click(screen.getByRole('button', { name: 'Skip' }));

			expect(onSkip).toHaveBeenCalledOnce();
		});
	});
});
