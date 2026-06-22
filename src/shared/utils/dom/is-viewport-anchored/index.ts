import { isBrowser } from '../../environment';

/**
 * Reports whether an element is anchored to the viewport rather than the document.
 *
 * Walks the ancestor chain and returns `true` if the element or any ancestor is
 * `position: fixed` or `position: sticky` — i.e. it can stay put in the viewport
 * while the page scrolls. The tour must track such targets per-frame in viewport
 * coordinates; document-flow targets (the common case) instead let the tour ride
 * along with the page in document coordinates, staying glued without per-frame work.
 *
 * @param element - The element to test.
 * @returns `true` when the element is viewport-anchored.
 */
export function isViewportAnchored(element: HTMLElement | null): boolean {
	if (!isBrowser || !element) return false;

	for (let node: HTMLElement | null = element; node; node = node.parentElement) {
		const position = getComputedStyle(node).position;

		if (position === 'fixed' || position === 'sticky') return true;
	}

	return false;
}
