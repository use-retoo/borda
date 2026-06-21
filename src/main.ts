import { defineBordaElement } from '@/app/custom-element';
import { useBorda } from '@/app/entrypoint';
import { isBrowser } from '@/shared/utils';

if (isBrowser) {
	/** Exposes the widget factory for programmatic usage by host apps. */
	window.bordaWidget = useBorda;

	/** Exposes the custom element registration for declarative usage by host apps. */
	window.defineBordaElement = defineBordaElement;
}

export * from '@/app/entrypoint/model';
export * from '@/app/entrypoint/modules';

export * from '@/app/custom-element/model';
export * from '@/app/custom-element/lib';

export * from '@/widgets/borda-container/model';
export * from '@/widgets/borda-controls/model';
export * from '@/widgets/borda-tour-buttons/model';
export * from '@/widgets/borda-tour-image/model';
export * from '@/widgets/borda-tour-overlay/model';
export * from '@/widgets/borda-tour-progress/model';
export * from '@/widgets/borda-tour-skip/model';
export * from '@/widgets/borda-tour-tooltip/model';

export * from '@/entities/borda/model';
export * from '@/entities/event/model';

export * from '@/shared/enums';
export * from '@/shared/ui/borda-button/model';
export * from '@/shared/ui/borda-icons/model';
export * from '@/shared/ui/borda-image/model';
export * from '@/shared/ui/borda-progress/model';
export type * from '@/shared/types';
