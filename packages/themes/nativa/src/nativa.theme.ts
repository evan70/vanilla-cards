/**
 * Nativa Theme — First Theme Definition
 *
 * Formalizes the current default: brand gold, Playfair Display + Inter fonts.
 */

import type { ThemeDefinition } from '@vc/core';
import { ThemeRegistry } from '@vc/core';

export const NativaTheme: ThemeDefinition = {
  id: 'nativa',
  name: 'Nativa',
  variants: ['dark', 'light'],
  defaultVariant: 'dark',
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter',
  },
};

// Auto-register on import
ThemeRegistry.register(NativaTheme);
