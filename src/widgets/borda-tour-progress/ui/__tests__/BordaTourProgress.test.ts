import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import { BordaTourProgressVariant } from '../../model';
import BordaTourProgress from '../BordaTourProgress.svelte';

describe('BordaTourProgress', () => {
	describe('rendering', () => {
		it('renders dots variant by default', () => {
			render(BordaTourProgress, { props: { currentStep: 1, totalSteps: 3 } });

			expect(screen.getByRole('progressbar')).toBeInTheDocument();
			expect(screen.getByRole('progressbar')).toHaveClass('rb-progress--dots');
		});

		it('renders text variant', () => {
			render(BordaTourProgress, {
				props: { currentStep: 2, totalSteps: 4, variant: BordaTourProgressVariant.TEXT }
			});

			expect(screen.getByRole('progressbar')).toHaveClass('rb-progress--text');
			expect(screen.getByText('2 / 4')).toBeInTheDocument();
		});

		it('renders line variant', () => {
			render(BordaTourProgress, {
				props: { currentStep: 1, totalSteps: 3, variant: BordaTourProgressVariant.LINE }
			});

			expect(screen.getByRole('progressbar')).toHaveClass('rb-progress--line');
		});

		it('has rb-tour-progress class', () => {
			const { container } = render(BordaTourProgress, {
				props: { totalSteps: 2 }
			});

			expect(container.querySelector('.rb-tour-progress')).toBeInTheDocument();
		});

		it('applies variant class', () => {
			const { container } = render(BordaTourProgress, {
				props: { totalSteps: 2, variant: BordaTourProgressVariant.TEXT }
			});

			expect(container.querySelector('.rb-tour-progress')).toHaveClass('rb-tour-progress--text');
		});

		it('applies custom class', () => {
			const { container } = render(BordaTourProgress, {
				props: { totalSteps: 2, customClasses: { root: 'my-progress' } }
			});

			expect(container.querySelector('.rb-tour-progress')).toHaveClass('my-progress');
		});
	});
});
