/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest';

import { FeatureController, normalizeFeaturePayload } from './index';

describe('feature scaffold', () => {
  it('normalizes raw payload into a stable UI model', () => {
    expect(normalizeFeaturePayload({
      title: 'Feature',
      description: null,
    })).toEqual({
      title: 'Feature',
      description: '',
      status: 'idle',
    });
  });

  it('renders the feature root', () => {
    const root = document.createElement('div');
    const controller = new FeatureController(root, {
      featureData: {
        title: 'Feature',
        description: 'Description',
        status: 'ready',
      },
    });

    controller.init();

    expect(root.querySelector('.feature')).toBeTruthy();
    expect(root.querySelector('.feature__title')?.textContent).toBe('Feature');
  });
});
