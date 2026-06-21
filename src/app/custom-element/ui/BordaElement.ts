import { useBorda } from '@/app/entrypoint';
import type { BordaConfig, BordaInstance, UseBordaReturns } from '@/app/entrypoint';

import { TAG_NAME, SAFE_HTML_ELEMENT } from '../model';

/**
 * Custom HTML element that wraps the borda tour widget.
 *
 * Register via {@link defineBordaElement}, then use as `<borda-tour-widget>` in HTML.
 * Dispatches `borda:mount` and `borda:unmount` custom events on the element.
 *
 * @example
 * ```ts
 * defineBordaElement();
 * const el = document.createElement('borda-tour-widget');
 * document.body.appendChild(el);
 * const instance = await el.mount({ steps: [...] });
 * ```
 */
export class BordaElement extends SAFE_HTML_ELEMENT {
	static readonly tagName = TAG_NAME;

	private _instance: BordaInstance | null = null;
	private _borda: UseBordaReturns | null = null;

	private _connected = false;

	/** Mount promise; concurrent calls share this instead of racing. */
	private _mountPending: Promise<BordaInstance> | null = null;

	/** Unmount promise; concurrent calls share this instead of racing. */
	private _unmountPending: Promise<void> | null = null;

	/** The borda factory used to create and destroy the widget. */
	get borda(): UseBordaReturns | null {
		return this._borda;
	}

	/** The mounted widget instance, or `null` if not yet mounted. */
	get instance(): BordaInstance | null {
		return this._instance;
	}

	connectedCallback() {
		this._connected = true;
	}

	disconnectedCallback() {
		this._connected = false;

		void this.unmount().catch((error) => {
			console.error('[borda] unmount failed on disconnect:', error);
		});
	}

	/**
	 * Mounts the borda widget inside this custom element.
	 *
	 * If already mounted, updates the config instead.
	 * If a mount or unmount is in flight, waits for it before proceeding —
	 * concurrent calls share the same promise instead of racing.
	 * Dispatches a `borda:mount` CustomEvent with the instance as `detail`.
	 *
	 * @param config - Widget configuration.
	 * @returns A promise resolving with the {@link BordaInstance}.
	 */
	mount(config: BordaConfig): Promise<BordaInstance> {
		if (this._mountPending) {
			return this._mountPending;
		}

		this._mountPending = this._mount(config).finally(() => {
			this._mountPending = null;
		});

		return this._mountPending;
	}

	private async _mount(config: BordaConfig): Promise<BordaInstance> {
		if (this._unmountPending) {
			await this._unmountPending;
		}

		if (this._instance) {
			this._instance.config.setConfig(config);
			return this._instance;
		}

		const borda = useBorda();
		const instance = await borda.mount(config);

		this._borda = borda;
		this._instance = instance;

		this.dispatchEvent(
			new CustomEvent<BordaInstance>('borda:mount', {
				detail: instance,
				bubbles: true,
				composed: true
			})
		);

		return instance;
	}

	/**
	 * Unmounts the borda widget and dispatches a `borda:unmount` event.
	 * No-op if the widget is not currently mounted.
	 * Concurrent calls share the same in-flight promise.
	 */
	unmount(): Promise<void> {
		if (this._unmountPending) {
			return this._unmountPending;
		}

		if (!this._borda || !this._instance) {
			return Promise.resolve();
		}

		this._unmountPending = this._unmount().finally(() => {
			this._unmountPending = null;
		});

		return this._unmountPending;
	}

	private async _unmount(): Promise<void> {
		if (this._mountPending) {
			await this._mountPending;
		}

		if (!this._borda || !this._instance) {
			return;
		}

		const borda = this._borda;
		const instance = this._instance;

		this._borda = null;
		this._instance = null;

		await borda.unmount(instance);

		this.dispatchEvent(
			new CustomEvent<void>('borda:unmount', {
				bubbles: true,
				composed: true
			})
		);
	}
}
