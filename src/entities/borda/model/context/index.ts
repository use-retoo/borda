import { createContext } from 'svelte';

import type { BordaContext } from '../types';

/**
 * Svelte context pair for sharing {@link BordaContext} across the component tree.
 *
 * - `getBordaContext` — retrieve the context in a child component.
 * - `setBordaContext` — provide the context in a parent component.
 */
export const [getBordaContext, setBordaContext] = createContext<BordaContext>();
