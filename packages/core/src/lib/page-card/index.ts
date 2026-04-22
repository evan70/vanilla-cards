/**
 * Page Card Module - Public API
 *
 * Main entry point for page card orchestrator component.
 */

export { PageCardController } from './controller';
export { default } from './controller';
export { normalizePageCardPayload } from './normalizers';
export type {
  PageCardConfig,
  PageCardModel,
  RawPageCardPayload,
  MenuItem,
  FooterLink,
  FooterSection,
} from './types';
