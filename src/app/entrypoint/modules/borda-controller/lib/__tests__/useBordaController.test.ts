import { describe, it, expect, vi } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';
import { BordaEvent, useEventEmitter } from '@/entities/event';
import { ComponentPlacement } from '@/shared/enums';

import { useBordaController } from '../';

function makeStep(overrides = {}) {
	return {
		target: '',
		title: '',
		description: '',
		placement: ComponentPlacement.BOTTOM_START,
		...overrides
	};
}

describe('useBordaController', () => {
	describe('basic functionality', () => {
		it('should have isActivated false when steps is empty', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaController(config, useEventEmitter());

			expect(api.isActivated).toBe(false);
		});

		it('should have isActivated true when steps are provided', () => {
			const config = useBordaConfig({ steps: [makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			expect(api.isActivated).toBe(true);
		});

		it('should reflect totalSteps from config', () => {
			const config = useBordaConfig({
				steps: [makeStep(), makeStep(), makeStep()]
			});

			const { api } = useBordaController(config, useEventEmitter());

			expect(api.totalSteps).toBe(3);
		});

		it('should start at step 1 (index 0) by default', () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			expect(api.currentStep).toBe(1);
			expect(api.currentStepIndex).toBe(0);
		});

		it('should have hasPrevStep false on first step', () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			expect(api.hasPrevStep).toBe(false);
		});

		it('should have hasNextStep true when not on last step', () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			expect(api.hasNextStep).toBe(true);
		});
	});

	describe('apply', () => {
		it('should emit ON_TOUR_START on apply', () => {
			const config = useBordaConfig({ steps: [makeStep()] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_START, handler);

			const { apply } = useBordaController(config, emitter);

			apply();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should call onStart callback on apply', () => {
			const onStart = vi.fn();

			const config = useBordaConfig({
				steps: [makeStep()],
				tour: { onStart }
			});

			const { apply } = useBordaController(config, useEventEmitter());

			apply();

			expect(onStart).toHaveBeenCalledOnce();
		});

		it('should set startStep from tour config on apply', () => {
			const config = useBordaConfig({
				steps: [makeStep(), makeStep(), makeStep()],
				tour: { startStep: 1 }
			});

			const { apply, api } = useBordaController(config, useEventEmitter());

			apply();

			expect(api.currentStepIndex).toBe(1);
			expect(api.currentStep).toBe(2);
		});
	});

	describe('navigation', () => {
		it('should advance to next step with next()', async () => {
			const config = useBordaConfig({
				steps: [makeStep(), makeStep()]
			});

			const { api } = useBordaController(config, useEventEmitter());

			await api.next();

			expect(api.currentStepIndex).toBe(1);
			expect(api.currentStep).toBe(2);
		});

		it('should go to previous step with prev()', async () => {
			const config = useBordaConfig({
				steps: [makeStep(), makeStep()]
			});

			const { api } = useBordaController(config, useEventEmitter());

			await api.next();
			await api.prev();

			expect(api.currentStepIndex).toBe(0);
		});

		it('should emit ON_TOUR_NEXT when next() is called', async () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);

			const { api } = useBordaController(config, emitter);

			await api.next();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_TOUR_PREV when prev() is called', async () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_PREV, handler);

			const { api } = useBordaController(config, emitter);

			await api.next();
			await api.prev();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_TOUR_FINISH when next() is called on last step', async () => {
			const config = useBordaConfig({ steps: [makeStep()] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_FINISH, handler);

			const { api } = useBordaController(config, emitter);

			await api.next();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_TOUR_FINISH when finish() is called', () => {
			const config = useBordaConfig({ steps: [makeStep()] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_FINISH, handler);

			const { api } = useBordaController(config, emitter);

			api.finish();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should not go below first step when prev() is called on step 0', async () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			await api.prev();

			expect(api.currentStepIndex).toBe(0);
		});
	});

	describe('changeStep', () => {
		it('should jump to arbitrary step with changeStep()', async () => {
			const config = useBordaConfig({
				steps: [makeStep(), makeStep(), makeStep()]
			});

			const { api } = useBordaController(config, useEventEmitter());

			await api.changeStep(2);

			expect(api.currentStepIndex).toBe(2);
		});

		it('should be a no-op when changeStep receives out-of-range index', async () => {
			const config = useBordaConfig({ steps: [makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			await api.changeStep(5);

			expect(api.currentStepIndex).toBe(0);
		});

		it('should emit ON_TOUR_STEP_CHANGE with current step number', async () => {
			const config = useBordaConfig({
				steps: [makeStep(), makeStep(), makeStep()]
			});

			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_STEP_CHANGE, handler);

			const { api } = useBordaController(config, emitter);

			await api.changeStep(2);

			expect(handler).toHaveBeenCalledWith(3);
		});
	});

	describe('step callbacks', () => {
		it('should call onNext step callback when next() is called', async () => {
			const onNext = vi.fn();

			const config = useBordaConfig({
				steps: [makeStep({ onNext }), makeStep()]
			});

			const { api } = useBordaController(config, useEventEmitter());

			await api.next();

			expect(onNext).toHaveBeenCalledOnce();
		});

		it('should call tour onNext callback when next() is called', async () => {
			const onNext = vi.fn();

			const config = useBordaConfig({
				steps: [makeStep(), makeStep()],
				tour: { onNext }
			});

			const { api } = useBordaController(config, useEventEmitter());

			await api.next();

			expect(onNext).toHaveBeenCalledOnce();
		});

		it('should call onDeselected on leaving step', async () => {
			const onDeselected = vi.fn();

			const config = useBordaConfig({
				steps: [makeStep({ onDeselected }), makeStep()]
			});

			const { api } = useBordaController(config, useEventEmitter());

			await api.next();

			expect(onDeselected).toHaveBeenCalledOnce();
		});

		it('should call onHighlighted after entering new step', async () => {
			const onHighlighted = vi.fn();

			const config = useBordaConfig({
				steps: [makeStep(), makeStep({ onHighlighted })]
			});

			const { api } = useBordaController(config, useEventEmitter());

			await api.next();

			expect(onHighlighted).toHaveBeenCalledOnce();
		});
	});

	describe('move prevention', () => {
		it('should wait for resume when isMovePrevented before next()', async () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			api.preventMove();

			const nextPromise = api.next();

			expect(api.currentStepIndex).toBe(0);

			api.continue();

			await nextPromise;

			expect(api.currentStepIndex).toBe(1);
		});

		it('should cancel pending move when clearMovePrevented is called', async () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });
			const { api } = useBordaController(config, useEventEmitter());

			api.preventMove();

			const nextPromise = api.next();

			api.clearMovePrevented();

			await nextPromise;

			expect(api.currentStepIndex).toBe(0);
		});
	});

	describe('consistency', () => {
		it('should update hasPrevStep and hasNextStep as steps change', async () => {
			const config = useBordaConfig({
				steps: [makeStep(), makeStep()]
			});

			const { api } = useBordaController(config, useEventEmitter());

			expect(api.hasPrevStep).toBe(false);
			expect(api.hasNextStep).toBe(true);

			await api.next();

			expect(api.hasPrevStep).toBe(true);
			expect(api.hasNextStep).toBe(false);
		});

		it('should create independent instances', async () => {
			const config = useBordaConfig({ steps: [makeStep(), makeStep()] });

			const controllerA = useBordaController(config, useEventEmitter());
			const controllerB = useBordaController(config, useEventEmitter());

			await controllerA.api.next();

			expect(controllerA.api.currentStepIndex).toBe(1);
			expect(controllerB.api.currentStepIndex).toBe(0);
		});
	});
});
