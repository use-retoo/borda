// @vitest-environment jsdom
import { mount as _mount, unmount as _unmount } from 'svelte';
import { beforeEach, expect, describe, it, vi } from 'vitest';

import { useEventEmitter } from '@/entities/event';

import { useBorda } from '../';

vi.mock('svelte', async (importOriginal) => {
	const actual = await importOriginal<typeof import('svelte')>();
	return {
		...actual,
		mount: vi.fn(),
		unmount: vi.fn()
	};
});

vi.mock('@/app/entrypoint/ui', () => ({
	Borda: {}
}));

function createMockComponent() {
	const events = useEventEmitter();

	return {
		api: {
			events,
			controller: {
				currentStep: 1,
				totalSteps: 0,
				currentStepIndex: 0,
				isActivated: false,
				hasNextStep: false,
				hasPrevStep: false,
				isMovePrevented: false,
				step: undefined,
				currentTarget: null,
				next: vi.fn(),
				prev: vi.fn(),
				changeStep: vi.fn(),
				finish: vi.fn(),
				preventMove: vi.fn(),
				continue: vi.fn(),
				clearMovePrevented: vi.fn()
			},
			components: {}
		}
	};
}

function setupMount(mockComponent = createMockComponent()) {
	vi.mocked(_mount).mockImplementation((_comp, options: Record<string, unknown>) => {
		const props = options.props as Record<string, () => void>;

		Promise.resolve().then(() => props.mount());

		return mockComponent;
	});

	return mockComponent;
}

describe('useBorda', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('basic functionality', () => {
		it('should return NAME as string', () => {
			const borda = useBorda();

			expect(typeof borda.NAME).toBe('string');
		});

		it('should return VERSION as string', () => {
			const borda = useBorda();

			expect(typeof borda.VERSION).toBe('string');
		});

		it('should return mount, unmount and highlight functions', () => {
			const borda = useBorda();

			expect(typeof borda.mount).toBe('function');
			expect(typeof borda.unmount).toBe('function');
			expect(typeof borda.highlight).toBe('function');
		});

		it('should resolve instance with api, config, component, visibility, skip, scroll, animation, responsive', async () => {
			const mockComponent = setupMount();

			const borda = useBorda();

			const instance = await borda.mount({ steps: [] });

			expect(instance.api).toBe(mockComponent.api);
			expect(instance.config).toBeDefined();
			expect(instance.component).toBe(mockComponent);
			expect(instance.visibility).toBeDefined();
			expect(instance.skip).toBeDefined();
			expect(instance.scroll).toBeDefined();
			expect(instance.animation).toBeDefined();
			expect(instance.responsive).toBeDefined();
		});

		it('should call svelte unmount with component when unmount is called', async () => {
			const mockComponent = setupMount();

			const borda = useBorda();

			const instance = await borda.mount({ steps: [] });

			await borda.unmount(instance);

			expect(_unmount).toHaveBeenCalledWith(mockComponent);
		});
	});

	describe('case handling', () => {
		it('should mount to document.body when no target provided', async () => {
			setupMount();

			const borda = useBorda();

			await borda.mount({ steps: [] });

			expect(_mount).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					target: document.body
				})
			);
		});

		it('should mount to provided target element', async () => {
			setupMount();

			const borda = useBorda();

			const target = document.createElement('div');

			await borda.mount({ steps: [] }, target);

			expect(_mount).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ target }));
		});

		it('should show widget on mount by default', async () => {
			setupMount();

			const borda = useBorda();

			const instance = await borda.mount({
				steps: []
			});

			expect(instance.config.getConfig().visibility?.isHidden).toBe(false);
		});

		it('should keep widget hidden when isHidden is true', async () => {
			setupMount();

			const borda = useBorda();

			const instance = await borda.mount({
				steps: [],
				visibility: {
					isHidden: true
				}
			});

			expect(instance.config.getConfig().visibility?.isHidden).toBe(true);
		});
	});

	describe('edge cases', () => {
		it('should not throw when unmount is called with no component', async () => {
			const borda = useBorda();

			const instance = {
				api: { components: {} } as never,
				config: { getConfig: () => ({}) } as never,
				component: undefined as never,
				visibility: { hide: () => {} } as never,
				skip: {} as never,
				scroll: {} as never,
				animation: {} as never,
				responsive: { activeBreakpoint: null } as never
			};

			await expect(borda.unmount(instance)).resolves.not.toThrow();
		});
	});

	describe('consistency', () => {
		it('should not mutate config on mount', async () => {
			setupMount();

			const borda = useBorda();

			const config = {
				steps: [],
				visibility: { isHidden: false }
			};

			const snapshot = {
				steps: [],
				visibility: { isHidden: false }
			};

			await borda.mount(config);

			expect(config).toEqual(snapshot);
		});

		it('should create independent instances', async () => {
			const mockComponentA = setupMount();

			const bordaA = useBorda();

			const instanceA = await bordaA.mount({ steps: [] });

			const mockComponentB = setupMount();

			const bordaB = useBorda();

			const instanceB = await bordaB.mount({ steps: [] });

			expect(instanceA.component).toBe(mockComponentA);
			expect(instanceB.component).toBe(mockComponentB);
			expect(instanceA.component).not.toBe(instanceB.component);
		});
	});
});
