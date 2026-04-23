/**
 * Page Card Module - Public API
 *
 * Main entry point for page card orchestrator component.
 */

export { PageCardController } from '@lib/page-card/controller';
export { default } from '@lib/page-card/controller';
export { normalizePageCardPayload } from '@lib/page-card/normalizers';
export type {
  PageCardConfig,
  PageCardModel,
  RawPageCardPayload,
  MenuItem,
  FooterLink,
  FooterSection,
} from '@lib/page-card/types';
