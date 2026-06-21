/**
 * Waits for all CSS animations on an element (including its subtree) to finish.
 *
 * A leading `requestAnimationFrame` lets the browser apply pending style changes
 * and start their animations before `getAnimations` is read — otherwise freshly
 * triggered animations would be missed and the promise would resolve too early.
 *
 * @param root - The root element to observe.
 * @returns A promise that resolves once every animation has settled.
 */
export async function waitForAnimations(root: HTMLElement): Promise<void> {
	await new Promise(requestAnimationFrame);

	const animations = root.getAnimations({ subtree: true });

	await Promise.allSettled(animations.map((animation) => animation.finished));
}
