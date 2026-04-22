import type { FeatureModel, RawFeaturePayload } from './types';

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function normalizeFeaturePayload(raw: RawFeaturePayload): FeatureModel {
  return {
    title: asString(raw.title),
    description: asString(raw.description),
    status: asString(raw.status) || 'idle',
  };
}
