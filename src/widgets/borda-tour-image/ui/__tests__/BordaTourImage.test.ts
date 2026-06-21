import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import BordaTourImage from '../BordaTourImage.svelte';

describe('BordaTourImage', () => {
	describe('rendering', () => {
		it('renders the shared image element', () => {
			const { container } = render(BordaTourImage);

			expect(container.querySelector('img.rb-image')).toBeInTheDocument();
		});

		it('forwards src to the image', () => {
			const { container } = render(BordaTourImage, { props: { src: 'https://x/y.png' } });

			expect(container.querySelector('img')).toHaveAttribute('src', 'https://x/y.png');
		});

		it('forwards alt to the image', () => {
			const { container } = render(BordaTourImage, { props: { alt: 'A picture' } });

			expect(container.querySelector('img')).toHaveAttribute('alt', 'A picture');
		});

		it('forwards custom class to the image', () => {
			const { container } = render(BordaTourImage, {
				props: { customClasses: { root: 'my-image' } }
			});

			expect(container.querySelector('img')).toHaveClass('my-image');
		});
	});
});
