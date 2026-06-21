import type { ComponentPlacement } from '@/shared/enums';

/** Data-attribute matcher for {@link BordaStepTargetQuery.data}. */
export interface BordaStepTargetQueryData {
	name: string;
	value: string;
}

/** Structured query for resolving a step target element for {@link BordaStepTarget}. */
export interface BordaStepTargetQuery {
	id: string;
	class: string;
	data: Partial<BordaStepTargetQueryData> & Pick<BordaStepTargetQueryData, 'name'>;
}

/** Accepted shapes for {@link BordaStep.target}. */
export type BordaStepTarget = string | HTMLElement | Partial<BordaStepTargetQuery>;

/** Structured image for {@link BordaStep.image}, carrying its own alt text. */
export interface BordaStepImage {
	src: string;
	alt?: string;
}

/** Accepted shapes for {@link BordaStep.image}. A bare string sets the source with empty alt. */
export type BordaStepImageSource = string | BordaStepImage;

/** A single step in the onboarding tour. */
export interface BordaStep {
	/** Element to spotlight. Accepts a CSS selector string, an HTMLElement, or a structured query. */
	target: BordaStepTarget;
	/** Tooltip heading text. */
	title: string;
	/** Tooltip body text. */
	description: string;
	/** Image shown above the tooltip heading. A string sets the source (empty alt); an object carries its own alt. */
	image?: BordaStepImageSource;
	/** Preferred tooltip placement relative to the target element. */
	placement: ComponentPlacement;
	/**
	 * Called before this step's target is highlighted, after any async `prepareElement` resolves.
	 * Fires before the reactive step index changes.
	 */
	onBeforeHighlighted?: () => void;
	/** Called after this step's target is highlighted (step index has been updated). */
	onHighlighted?: () => void;
	/** Called when navigating away from this step, before the next step is prepared. */
	onDeselected?: () => void;
	/** Step-level next handler; called alongside the tour-level `onNext`. */
	onNext?: () => void;
	/** Step-level previous handler; called alongside the tour-level `onPrev`. */
	onPrev?: () => void;
	/**
	 * Async preparation hook called before entering this step.
	 * Use it to mount dynamic content, expand sections, or fetch data the tooltip depends on.
	 * Navigation waits for the returned Promise to settle before proceeding.
	 */
	prepareElement?: () => Promise<void> | void;
}

/** Options for {@link resolveBordaSteps}. */
export interface ResolveBordaStepsOptions {
	/** Selector for step-marker elements. Defaults to `'[data-borda-step]'`. */
	selector?: string;
	/** Root container to query within. Defaults to `document`. */
	root?: ParentNode;
	/** Default placement when `data-borda-placement` is missing. */
	defaultPlacement?: ComponentPlacement;
}
