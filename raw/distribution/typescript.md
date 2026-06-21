# TypeScript

> Type declarations, exported interfaces, and TypeScript integration.

TypeScript declarations are bundled inside the package as `index.d.ts`. The compiler resolves them automatically — no separate `@types/*` package or manual `tsconfig` path mapping needed.

## Setup

Import from `@retoo/borda` and TypeScript resolves everything automatically. Enums, interfaces, and the composable are all available from the same entry point:

```ts
import { useBorda, BordaEvent, ComponentSize, ComponentPlacement } from '@retoo/borda';

import '@retoo/borda/styles';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Browse sections here.',
      placement: ComponentPlacement.MIDDLE_END,
    },
  ],
  size: ComponentSize.MD,
});

instance.api.events.on(BordaEvent.ON_TOUR_FINISH, () => {
  console.log('Tour completed');
});
```

## Types

The types below cover the full public API surface — config input, instance handles, and runtime controls. Import only what you need; the rest is tree-shaken at build time.

#### BordaConfig

Root config passed to `mount()`. Only `steps` is required — everything else is optional.

```ts
type BordaConfig = Partial<BordaOverrides> & Pick<BordaOverrides, 'steps'> & Partial<BordaFeatures>;
```

#### BordaOverrides

Per-component field overrides. Pass `false` to disable a component entirely.

```ts
interface BordaOverrides {
  size: ComponentSize;
  shape: ComponentShape;
  steps: BordaStepConfig[];
  container: Partial<BordaContainerProps>;
  tourOverlay: Partial<BordaTourOverlayProps> | false;
  tourTooltip: Partial<BordaTourTooltipProps> | false;
  tourImage: Partial<BordaTourImageProps> | false;
  tourButtons: Partial<BordaTourButtonsProps> | false;
  tourProgress: Partial<BordaTourProgressProps> | false;
  tourSkip: Partial<BordaTourSkipProps> | false;
  closeButton: Partial<BordaCloseButtonProps> | false;
}
```

#### BordaFeatures

Optional feature sections: tour behavior, visibility, responsive, scroll, skip, and animation.

```ts
interface BordaFeatures {
  tour: Partial<BordaTourConfig>;
  visibility: Partial<BordaVisibilityConfig>;
  responsive: BordaResponsiveConfig;
  scroll: Partial<BordaScrollConfig> | false;
  skip: Partial<BordaSkipConfig> | false;
  animation: Partial<BordaAnimationConfig> | false;
}
```

#### BordaStepConfig

A single step definition with optional per-step component overrides. Override fields shadow the global config while this step is active.

```ts
interface BordaStepConfig extends BordaStep {
  tourOverlay?: Partial<BordaTourOverlayProps> | false;
  tourTooltip?: Partial<BordaTourTooltipProps> | false;
  tourImage?: Partial<BordaTourImageProps> | false;
  tourButtons?: Partial<BordaTourButtonsProps> | false;
  tourProgress?: Partial<BordaTourProgressProps> | false;
  tourSkip?: Partial<BordaTourSkipProps> | false;
  closeButton?: Partial<BordaCloseButtonProps> | false;
}
```

#### BordaStep

A single step in the onboarding tour.

```ts
interface BordaStep {
  target: BordaStepTarget;
  title: string;
  description: string;
  image?: BordaStepImageSource;
  placement: ComponentPlacement;
  onBeforeHighlighted?: () => void;
  onHighlighted?: () => void;
  onDeselected?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  prepareElement?: () => Promise<void> | void;
}
```

#### BordaInstance

Handle returned by `mount()`. Entry point for all runtime APIs.

```ts
interface BordaInstance {
  api: BordaApi;
  component: BordaRef;
  config: UseBordaConfigReturns;
  responsive: BordaResponsiveApi;
  scroll: BordaScrollApi;
  animation: BordaAnimationApi;
  skip: BordaSkipApi;
  visibility: BordaVisibilityApi;
}
```

#### BordaApi

Top-level API surface exposed via `instance.api`.

```ts
interface BordaApi {
  controller: BordaControllerApi;
  components: BordaComponents;
  events: BordaEventEmitter;
}
```

#### BordaControllerApi

Tour navigation API — current step, next, prev, changeStep, finish, and move prevention.

```ts
interface BordaControllerApi {
  isActivated: boolean;
  currentStep: number;
  currentStepIndex: number;
  totalSteps: number;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  currentTarget: HTMLElement | null;
  step: BordaStepConfig | undefined;
  changeStep: (index: number) => Promise<void>;
  prev: () => Promise<void>;
  next: () => Promise<void>;
  finish: () => void;
  isMovePrevented: boolean;
  preventMove: () => void;
  continue: () => void;
  clearMovePrevented: () => void;
}
```

#### BordaComponents

Registry of all component refs within a mounted tour. Required components are always present; optional ones are `null` when disabled via config.

```ts
interface BordaComponents {
  container: BordaContainerRef;
  tourOverlay: BordaTourOverlayRef | null;
  tourTooltip: BordaTourTooltipRef | null;
  tourImage: BordaTourImageRef | null;
  tourButtons: BordaTourButtonsRef | null;
  tourSkip: BordaTourSkipRef | null;
  closeButton: BordaCloseButtonRef | null;
}
```

#### BordaEventEmitter

Pub/sub event bus for widget events.

```ts
interface BordaEventEmitter {
  on(eventName: BordaEvent, handler: BordaEventHandler): void;
  once(eventName: BordaEvent, handler: BordaEventHandler): void;
  off(eventName: BordaEvent, handler: BordaEventHandler): void;
  emit<T>(eventName: BordaEvent, data?: T): void;
  remove(eventName: BordaEvent): void;
  clear(): void;
}
```

#### UseBordaReturns

Return type of `useBorda()` — the tour factory.

```ts
interface UseBordaReturns {
  NAME: string;
  VERSION: string;
  mount: (config: BordaConfig, target?: BordaTarget) => Promise<BordaInstance>;
  unmount: (instance: BordaInstance) => Promise<void>;
  highlight: (step: BordaStepConfig, config?: BordaHighlightConfig, target?: BordaTarget) => Promise<BordaInstance>;
}
```

#### UseBordaConfigReturns

Reactive config store available via `instance.config`. Use `mergeConfig` to patch at runtime, `setConfig` to replace entirely.

```ts
interface UseBordaConfigReturns {
  current: BordaConfig;
  getConfig: () => BordaConfig;
  setConfig: (value: BordaConfig) => void;
  mergeConfig: (partial: Partial<BordaConfig>) => void;
}
```

#### BordaVisibilityApi

Controls widget visibility at runtime. Available via `instance.visibility`.

```ts
interface BordaVisibilityApi {
  isHidden: boolean;
  show: () => void;
  hide: () => void;
}
```

#### BordaSkipApi

Controls the "Don't show again" feature. Available via `instance.skip`.

```ts
interface BordaSkipApi {
  isSkipped: boolean;
  storageKey: string;
  set: (value: boolean) => void;
  clear: () => void;
}
```

#### BordaScrollApi

Scroll-to-target API. Available via `instance.scroll`.

```ts
interface BordaScrollApi {
  isScrolling: boolean;
  isLocked: boolean;
  scrollTo: (element: HTMLElement | null) => Promise<void>;
}
```

#### BordaAnimationApi

Resolved animation settings. Available via `instance.animation`.

```ts
interface BordaAnimationApi {
  isEnabled: boolean;
  tooltip: BordaTooltipAnimation;
  overlay: BordaOverlayAnimation;
}
```

## Enums

All enums are re-exported from the package root. Each value has a string equivalent — pass either form and Borda will accept both.

#### ComponentSize

T-shirt size scale used across all sizeable components.

```ts
enum ComponentSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}
```

#### ComponentShape

Shape variant for components — affects border-radius and aspect ratio.

```ts
enum ComponentShape {
  CIRCLE = 'circle',
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
  SQUARE = 'square',
}
```

#### ComponentPlacement

Tooltip placement relative to the target — a 3×3 grid of named slots.

```ts
enum ComponentPlacement {
  TOP_START = 'top-start',
  TOP_CENTER = 'top-center',
  TOP_END = 'top-end',
  MIDDLE_START = 'middle-start',
  MIDDLE_CENTER = 'middle-center',
  MIDDLE_END = 'middle-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_END = 'bottom-end',
}
```

#### BordaEvent

Event names emitted by the widget event bus.

```ts
enum BordaEvent {
  ON_BORDA_DESTROY = 'borda:on-destroy',
  ON_CLOSE_CLICK = 'close:click',
  ON_OVERLAY_CLICK = 'overlay:click',
  ON_TOUR_START = 'tour:start',
  ON_TOUR_FINISH = 'tour:finish',
  ON_TOUR_CLOSE = 'tour:close',
  ON_TOUR_NEXT = 'tour:next',
  ON_TOUR_PREV = 'tour:prev',
  ON_KEYBOARD_NEXT = 'keyboard:next',
  ON_KEYBOARD_PREV = 'keyboard:prev',
  ON_TOUR_STEP_CHANGE = 'tour:step-change',
  ON_SKIP_CHANGE = 'skip:change',
  ON_SKIP_CLEAR = 'skip:clear',
  ON_VISIBILITY_SHOW = 'visibility:show',
  ON_VISIBILITY_HIDE = 'visibility:hide',
}
```

#### AnimationEffect

Built-in animation effects for tooltip and overlay.

```ts
enum AnimationEffect {
  NONE = 'none',
  FADE = 'fade',
  SCALE = 'scale',
  SLIDE = 'slide',
}
```

#### BordaTourImageVariant

Visual presentation of the tooltip image.

```ts
enum BordaTourImageVariant {
  DEFAULT = 'default',
  BLEED = 'bleed',
}
```

#### BordaTourProgressVariant

Visual style of the progress indicator.

```ts
enum BordaTourProgressVariant {
  DOTS = 'dots',
  TEXT = 'text',
  LINE = 'line',
}
```

## Usage examples

Common patterns for integrating Borda's types into your own code.

#### Typing the config

```ts
import { useBorda, ComponentSize, ComponentPlacement, type BordaConfig } from '@retoo/borda';

const config: BordaConfig = {
  steps: [
    {
      target: '#sidebar',
      title: 'Navigation',
      description: 'Browse sections here.',
      placement: ComponentPlacement.MIDDLE_END,
    },
  ],
  size: ComponentSize.MD,
};

const borda = useBorda();
const instance = await borda.mount(config);
```

#### Typing an event handler

```ts
import { BordaEvent, type BordaEventHandler } from '@retoo/borda';

const onFinish: BordaEventHandler = () => {
  analytics.track('tour_completed');
};

instance.api.events.on(BordaEvent.ON_TOUR_FINISH, onFinish);
```

#### Working with the controller

```ts
import type { BordaControllerApi } from '@retoo/borda';

function logTourState(controller: BordaControllerApi) {
  console.log(controller.currentStep);
  console.log(controller.totalSteps);
  console.log(controller.hasNextStep);
  console.log(controller.currentTarget);
}

logTourState(instance.api.controller);
```

#### Controlling visibility and skip

```ts
import type { BordaVisibilityApi, BordaSkipApi } from '@retoo/borda';

const visibility: BordaVisibilityApi = instance.visibility;
visibility.hide();

const skip: BordaSkipApi = instance.skip;
skip.set(true);
```

#### Using enums in config

Enum values give you autocomplete and catch typos at compile time. String equivalents also work.

```ts
import {
  useBorda,
  ComponentSize,
  ComponentShape,
  ComponentPlacement,
} from '@retoo/borda';

const borda = useBorda();

const instance = await borda.mount({
  steps: [
    {
      target: '#element',
      title: 'Title',
      description: 'Description',
      placement: ComponentPlacement.BOTTOM_CENTER,
    },
  ],
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
});
```
