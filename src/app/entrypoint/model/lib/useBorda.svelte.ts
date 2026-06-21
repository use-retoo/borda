import { mount as _mount, unmount as _unmount } from 'svelte';

import { BordaEvent, useEventEmitter } from '@/entities/event';
import { waitForAnimations } from '@/shared/utils/animation';
import { assertBrowser } from '@/shared/utils/environment';

import {
	useBordaAnimation,
	useBordaController,
	useBordaHighlight,
	useBordaKeyboard,
	useBordaOverrides,
	useBordaResponsive,
	useBordaScroll,
	useBordaSkip,
	useBordaVisibility
} from '../../modules';
import { Borda } from '../../ui';

import { useBordaConfig } from './';

import type { UseBordaReturns, BordaConfig, BordaInstance, BordaTarget } from '../types';

export default function useBorda(): UseBordaReturns {
	/**
	 * Per-instance teardown callbacks, registered on mount and run once during
	 * `unmount`. Keyed weakly so a collected instance drops its callback with it.
	 */
	const cleanupsMap = new WeakMap<BordaInstance, () => void>();

	/**
	 * Instances whose teardown has begun. Guards against re-entrant `unmount`
	 * calls — finish, keyboard Escape and the close button can all fire during
	 * the exit animation, which would otherwise unmount the component twice.
	 */
	const unmountingMap = new WeakSet<BordaInstance>();

	/**
	 * Mounts the borda widget into a target DOM element.
	 *
	 * @param bordaConfig - Widget configuration.
	 * @param bordaTarget - DOM element or ShadowRoot to mount into. Defaults to `document.body`.
	 * @returns A promise that resolves with the {@link BordaInstance} handle.
	 */
	function mount(bordaConfig: BordaConfig, bordaTarget?: BordaTarget): Promise<BordaInstance> {
		assertBrowser('mount');

		/** Safe to read `document.body` here — `assertBrowser` above guarantees DOM is available. */
		const target = bordaTarget ?? document.body;

		return new Promise<BordaInstance>((resolve) => {
			let currentInstance: BordaInstance | null = null;

			const eventEmitter = useEventEmitter();

			const config = useBordaConfig(bordaConfig);

			const configOverrides = useBordaOverrides(config);

			const controller = useBordaController(config, eventEmitter);
			controller.apply();

			/** Sync the initial step's per-step overrides before the component mounts. */
			configOverrides.applyStep(controller.api.step ?? null);

			const skip = useBordaSkip(config, eventEmitter);
			skip.apply();

			if (skip.api.isSkipped) {
				config.mergeConfig({
					visibility: {
						isHidden: true
					}
				});
			}

			const keyboard = useBordaKeyboard(config, eventEmitter);
			keyboard.apply();

			const scroll = useBordaScroll(config);
			scroll.apply();

			const animation = useBordaAnimation(config);
			animation.apply();

			const responsive = useBordaResponsive(config, configOverrides);
			responsive.apply();

			const visibility = useBordaVisibility(config, eventEmitter);
			visibility.apply();

			const component: Borda = _mount(Borda, {
				target,
				props: {
					get config() {
						return configOverrides.resolved;
					},

					get controller() {
						return controller.api;
					},

					get skip() {
						return skip.api;
					},

					get scroll() {
						return scroll.api;
					},

					get animation() {
						return animation.api;
					},

					mount: () => {
						const borda = component as Borda;

						const instance: BordaInstance = {
							api: borda.api,
							config,
							component,
							skip: skip.api,
							scroll: scroll.api,
							animation: animation.api,
							responsive: responsive.api,
							visibility: visibility.api
						};

						currentInstance = instance;

						/** Re-apply per-step overrides whenever the active step changes. */
						eventEmitter.on(BordaEvent.ON_TOUR_STEP_CHANGE, () => {
							configOverrides.applyStep(controller.api.step ?? null);
						});

						/** Forward keyboard navigation events to the tour controller. */
						eventEmitter.on(BordaEvent.ON_KEYBOARD_NEXT, () => {
							void controller.api.next();
						});

						eventEmitter.on(BordaEvent.ON_KEYBOARD_PREV, () => {
							void controller.api.prev();
						});

						cleanupsMap.set(instance, () => {
							keyboard.destroy();
							responsive.destroy();
							scroll.destroy();
						});

						eventEmitter.once(BordaEvent.ON_TOUR_FINISH, async () => {
							const tourConfig = config.getConfig().tour;

							/** Fire the user's finish callback before the exit animation. */
							tourConfig?.onFinish?.();

							await unmount(instance);
						});

						eventEmitter.once(BordaEvent.ON_TOUR_CLOSE, async () => {
							const tourConfig = config.getConfig().tour;

							/** Fire the user's close callback before the exit animation. */
							tourConfig?.onClose?.();

							await unmount(instance);
						});

						resolve(instance);
					},

					unmount: () => {
						if (currentInstance) {
							void unmount(currentInstance);
						}
					},

					close: () => {
						eventEmitter.emit(BordaEvent.ON_TOUR_CLOSE);
					},

					eventEmitter
				}
			});
		});
	}

	/**
	 * Unmounts a previously mounted borda widget instance.
	 *
	 * Plays the exit animation (if any), runs registered cleanupsMap, then removes
	 * the component from the DOM.
	 *
	 * @param instance - The instance handle returned by {@link mount}.
	 */
	async function unmount(instance: BordaInstance) {
		/** Ignore repeat calls while this instance is already tearing down. */
		if (unmountingMap.has(instance)) return;

		unmountingMap.add(instance);

		/**
		 * Play the exit animation before detaching. Skipped when there is nothing
		 * to animate: already hidden, animations disabled, or container unmounted.
		 */
		const containerRoot = instance.api.components.container?.getElements()?.root;

		const visibility = instance.config.getConfig().visibility;

		const isAnimated = visibility?.isAnimated ?? true;

		const isHidden = visibility?.isHidden ?? false;

		if (!isHidden && isAnimated && containerRoot) {
			instance.visibility.hide();

			await waitForAnimations(containerRoot);
		}

		cleanupsMap.get(instance)?.();
		cleanupsMap.delete(instance);

		await _unmount(instance.component);
	}

	return {
		NAME: __NAME__,
		VERSION: __VERSION__,
		mount,
		unmount,
		highlight: useBordaHighlight(mount).highlight
	};
}
