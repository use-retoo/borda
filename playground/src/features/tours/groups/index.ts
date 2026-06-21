import { createAnimationGroup } from './animation';
import { createBehaviorsGroup } from './behaviors';
import { createHighlightGroup } from './highlight';
import { createImagesGroup } from './images';
import { createOverridesGroup } from './overrides';
import { createPositioningGroup } from './positioning';
import { createProgressGroup } from './progress';
import { createScrollGroup } from './scroll';
import { createSelectorsGroup } from './selectors';
import { createSizeGroup } from './size';
import { createTransitionGroup } from './transition';

import type { TourGroupFactory } from '../model';

/** Group factories in the order they appear in the navigation. */
export const groupFactories: TourGroupFactory[] = [
	createSelectorsGroup,
	createProgressGroup,
	createAnimationGroup,
	createTransitionGroup,
	createScrollGroup,
	createPositioningGroup,
	createSizeGroup,
	createBehaviorsGroup,
	createImagesGroup,
	createOverridesGroup,
	createHighlightGroup
];
