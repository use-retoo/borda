import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import BordaTourSkip from '../BordaTourSkip.svelte';

describe('BordaTourSkip', () => {
	describe('rendering', () => {
		it('renders a label element', () => {
			const { container } = render(BordaTourSkip);

			expect(container.querySelector('label')).toBeInTheDocument();
		});

		it('renders a checkbox input', () => {
			render(BordaTourSkip);

			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		it('has rb-tour-skip class', () => {
			const { container } = render(BordaTourSkip);

			expect(container.querySelector('.rb-tour-skip')).toBeInTheDocument();
		});

		it('displays default label text', () => {
			render(BordaTourSkip);

			expect(screen.getByText("Don't show again")).toBeInTheDocument();
		});

		it('displays custom label text', () => {
			render(BordaTourSkip, { props: { label: 'Never show' } });

			expect(screen.getByText('Never show')).toBeInTheDocument();
		});

		it('checkbox is unchecked by default', () => {
			render(BordaTourSkip);

			expect(screen.getByRole('checkbox')).not.toBeChecked();
		});

		it('checkbox is checked when checked prop is true', () => {
			render(BordaTourSkip, { props: { checked: true } });

			expect(screen.getByRole('checkbox')).toBeChecked();
		});

		it('checkbox is disabled when disabled prop is true', () => {
			render(BordaTourSkip, { props: { disabled: true } });

			expect(screen.getByRole('checkbox')).toBeDisabled();
		});

		it('applies custom class', () => {
			const { container } = render(BordaTourSkip, {
				props: { customClasses: { root: 'my-skip' } }
			});

			expect(container.querySelector('.rb-tour-skip')).toHaveClass('my-skip');
		});
	});

	describe('interaction', () => {
		it('calls onSkipChange with true when checkbox is checked', async () => {
			const user = userEvent.setup();
			const onSkipChange = vi.fn();

			render(BordaTourSkip, { props: { onSkipChange } });

			await user.click(screen.getByRole('checkbox'));

			expect(onSkipChange).toHaveBeenCalledWith(true);
		});

		it('calls onSkipChange with false when checkbox is unchecked', async () => {
			const user = userEvent.setup();
			const onSkipChange = vi.fn();

			render(BordaTourSkip, { props: { checked: true, onSkipChange } });

			await user.click(screen.getByRole('checkbox'));

			expect(onSkipChange).toHaveBeenCalledWith(false);
		});
	});
});
