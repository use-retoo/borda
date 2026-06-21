import type { UseFocusTrapProps } from '../types';

/** CSS selector matching natively focusable / tabbable elements. */
const FOCUSABLE_SELECTOR = ['a[href]', 'button', 'input', 'select', 'textarea', '[tabindex]'].join(
	','
);

/**
 * Traps keyboard focus inside a container and restores it on teardown.
 *
 * Cycles Tab / Shift+Tab among focusable descendants and pulls focus back
 * if it escapes. Restores the previously focused element on destroy.
 *
 * @param props - Reactive getter for the trap container.
 */
export default function useFocusTrap({ getContainer }: UseFocusTrapProps): void {
	let previouslyFocused: HTMLElement | null = null;

	/**
	 * Reports whether an element is rendered (has layout boxes).
	 *
	 * @param element - The element to test.
	 * @returns `true` when the element occupies space in the layout.
	 */
	function isVisible(element: HTMLElement): boolean {
		return (
			element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0
		);
	}

	/**
	 * Collects the currently tabbable descendants of a container.
	 *
	 * @param container - The container to query.
	 * @returns The visible, enabled, tabbable elements in DOM order.
	 */
	function getFocusable(container: HTMLElement): HTMLElement[] {
		return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
			(element) =>
				!element.hasAttribute('disabled') && element.tabIndex !== -1 && isVisible(element)
		);
	}

	/** Guards against re-entrant `focusin` fired by our own `.focus()` call. */
	let isFocusing = false;

	/**
	 * Moves focus to the first focusable descendant, falling back to the container.
	 *
	 * @param container - The trap container.
	 */
	function focusFirst(container: HTMLElement) {
		const focusable = getFocusable(container);

		isFocusing = true;

		/** `preventScroll` keeps the browser from jumping to the off-screen container — Borda's scroll module owns scrolling to the step. */
		(focusable[0] ?? container)?.focus({ preventScroll: true });

		isFocusing = false;
	}

	/**
	 * Wraps Tab / Shift+Tab focus at the first and last focusable elements.
	 *
	 * @param event - The originating keydown event.
	 * @param focusable - Ordered list of focusable descendants.
	 */
	function wrapTabFocus(event: KeyboardEvent, focusable: HTMLElement[]) {
		const first = focusable[0];

		/** Shift+Tab on the first element — wrap back to the last. */
		const shouldWrapBackward = event.shiftKey && document.activeElement === first;

		const last = focusable[focusable.length - 1];

		/** Tab on the last element — wrap forward to the first. */
		const shouldWrapForward = !event.shiftKey && document.activeElement === last;

		if (shouldWrapBackward) {
			event.preventDefault();
			last.focus({ preventScroll: true });
		}

		if (shouldWrapForward) {
			event.preventDefault();
			first.focus({ preventScroll: true });
		}
	}

	/**
	 * Cycles Tab / Shift+Tab focus within the container instead of leaving it.
	 *
	 * @param event - The originating keydown event.
	 */
	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab') return;

		const container = getContainer();
		if (!container) return;

		const focusable = getFocusable(container);

		if (focusable.length === 0) {
			event.preventDefault();
			container.focus({ preventScroll: true });
			return;
		}

		wrapTabFocus(event, focusable);
	}

	/**
	 * Pulls focus back inside the container if it escapes while the trap is active.
	 *
	 * @param event - The originating focusin event.
	 */
	function onFocusIn(event: FocusEvent) {
		if (isFocusing) return;

		const container = getContainer();
		if (!container) return;

		const target = event.target as Node | null;

		if (target && container.contains(target)) return;

		focusFirst(container);
	}

	$effect(() => {
		const container = getContainer();
		if (!container) return;

		previouslyFocused = document.activeElement as HTMLElement | null;

		/** Make the container focusable as a neutral fallback when it has no focusable children yet. */
		const hadTabIndex = container.hasAttribute('tabindex');

		if (!hadTabIndex) container.tabIndex = -1;

		container.focus({ preventScroll: true });

		document.addEventListener('keydown', onKeydown, true);
		document.addEventListener('focusin', onFocusIn, true);

		return () => {
			document.removeEventListener('keydown', onKeydown, true);
			document.removeEventListener('focusin', onFocusIn, true);

			if (!hadTabIndex) container.removeAttribute('tabindex');

			previouslyFocused?.focus({ preventScroll: true });
			previouslyFocused = null;
		};
	});
}
