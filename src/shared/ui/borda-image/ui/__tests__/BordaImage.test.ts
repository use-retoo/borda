import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import BordaImage from '../BordaImage.svelte';

describe('BordaImage', () => {
	describe('rendering', () => {
		it('renders an img element', () => {
			const { container } = render(BordaImage);

			expect(container.querySelector('img')).toBeInTheDocument();
		});

		it('always has rb-image base class', () => {
			const { container } = render(BordaImage);

			expect(container.querySelector('img')).toHaveClass('rb-image');
		});

		it('applies src', () => {
			const { container } = render(BordaImage, { props: { src: 'https://x/y.png' } });

			expect(container.querySelector('img')).toHaveAttribute('src', 'https://x/y.png');
		});

		it('applies alt', () => {
			const { container } = render(BordaImage, { props: { alt: 'A picture' } });

			expect(container.querySelector('img')).toHaveAttribute('alt', 'A picture');
		});

		it('applies custom class', () => {
			const { container } = render(BordaImage, {
				props: { customClasses: { root: 'my-image' } }
			});

			expect(container.querySelector('img')).toHaveClass('my-image');
		});

		it('renders custom html instead of img', () => {
			const { container } = render(BordaImage, {
				props: { customHtml: { root: '<figure class="custom"></figure>' } }
			});

			expect(container.querySelector('img')).not.toBeInTheDocument();
			expect(container.querySelector('figure.custom')).toBeInTheDocument();
		});
	});
});
