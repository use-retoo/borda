import { BordaElement } from '../ui';

/**
 * Returns the custom element constructor if it has already been registered.
 *
 * @returns The registered `CustomElementConstructor`, or `undefined` if not yet defined.
 */
export function getBordaElement() {
	return customElements.get(BordaElement.tagName);
}

/**
 * Registers the `<borda-tour-widget>` custom element in the browser.
 *
 * Safe to call multiple times — skips registration if the element is already defined.
 */
export function defineBordaElement() {
	const customElement = getBordaElement();

	if (customElement) return;

	customElements.define(BordaElement.tagName, BordaElement);
}
