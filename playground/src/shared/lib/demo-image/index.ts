/**
 * Builds an inline SVG data URI so the demo images render without any network access.
 *
 * @param label - Centered caption drawn on the image.
 * @param background - Any CSS color used as the fill.
 * @param width - Intrinsic width in pixels.
 * @param height - Intrinsic height in pixels.
 * @returns A `data:image/svg+xml` URI ready to use as an image source.
 */
export function demoImage(label: string, background: string, width = 320, height = 140): string {
	const svg =
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
		`<rect width="${width}" height="${height}" fill="${background}"/>` +
		`<text x="${width / 2}" y="${height / 2 + 7}" font-family="system-ui" font-size="20" fill="white" text-anchor="middle">${label}</text>` +
		`</svg>`;

	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
