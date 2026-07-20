/** A single-touch event type dispatchable via {@link fireTouch}. */
export type TouchEventType = 'touchstart' | 'touchmove' | 'touchend';

/** Dispatches a synthetic single-point touch event of the given `type` at `(x, y)`. */
export function fireTouch(element: Element, type: TouchEventType, x: number, y: number): void {
	const event = new Event(type, { bubbles: true, cancelable: true });
	const touch = { clientX: x, clientY: y } as Touch;

	Object.defineProperty(event, 'touches', { value: [touch] });
	Object.defineProperty(event, 'changedTouches', { value: [touch] });

	element.dispatchEvent(event);
}

/** Simulates a swipe: fires `touchstart` then `touchend` offset by `(deltaX, deltaY)`. */
export function swipe(element: Element, deltaX: number, deltaY = 0): void {
	fireTouch(element, 'touchstart', 200, 200);
	fireTouch(element, 'touchend', 200 + deltaX, 200 + deltaY);
}
