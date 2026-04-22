/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import {
  clearDraft,
  loadDraft,
  saveDraft,
  shouldOfferRestore,
  showRestorePrompt,
} from '../components/article-editor/autosave';
import { NotificationService } from '@vc/core';

describe('article-editor autosave', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('saves draft to server via POST', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { id: 'draft-123', saved_at: '2026-04-11 18:00:00' },
      }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    const result = await saveDraft('edit', 'article-42', {
      title: 'Draft title',
      excerpt: 'Draft excerpt',
      content: 'Draft content',
      status: 'draft',
      timestamp: Date.now(),
    });

    expect(result).toEqual({ id: 'draft-123', saved_at: '2026-04-11 18:00:00' });
    expect(fetch).toHaveBeenCalledWith(
      '/mark/api/drafts?article_id=article-42',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
      })
    );
  });

  it('saves new article draft with mode=new', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { id: 'draft-new', saved_at: '2026-04-11 18:00:00' },
      }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    await saveDraft('create', undefined, {
      title: 'New draft',
      excerpt: '',
      content: 'New content',
      status: 'draft',
      timestamp: Date.now(),
    });

    expect(fetch).toHaveBeenCalledWith(
      '/mark/api/drafts?mode=new',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('loads draft from server via GET', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: {
          id: 'draft-123',
          title: 'Loaded title',
          excerpt: 'Loaded excerpt',
          content: 'Loaded content',
          media_ids: ['media-1'],
          status: 'draft',
          saved_at: '2026-04-11 18:00:00',
        },
      }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    const draft = await loadDraft('edit', 'article-42');

    expect(draft).toEqual({
      title: 'Loaded title',
      excerpt: 'Loaded excerpt',
      content: 'Loaded content',
      status: 'draft',
      timestamp: expect.any(Number),
    });
  });

  it('returns null when server has no draft', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        data: null,
      }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    const draft = await loadDraft('create', undefined);

    expect(draft).toBeNull();
  });

  it('returns null when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

    const draft = await loadDraft('edit', 'article-42');

    expect(draft).toBeNull();
  });

  it('clears draft from server via DELETE', async () => {
    const mockResponse = { ok: true };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    await clearDraft('edit', 'article-42');

    expect(fetch).toHaveBeenCalledWith(
      '/mark/api/drafts?article_id=article-42',
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('offers restore for non-empty fresh drafts and not for empty stale ones', () => {
    const freshDraft = {
      title: 'Draft',
      excerpt: '',
      content: 'Restorable content',
      status: 'draft',
      timestamp: Date.now(),
    };
    const staleEmptyDraft = {
      title: 'Draft',
      excerpt: '',
      content: '',
      status: 'draft',
      timestamp: Date.now() - 172800000,
    };

    expect(shouldOfferRestore('', freshDraft)).toBe(true);
    expect(shouldOfferRestore('Existing content', freshDraft)).toBe(true);
    expect(shouldOfferRestore('Existing content', staleEmptyDraft)).toBe(false);
  });

  it('shows restore prompt through notification service', () => {
    const onConfirm = vi.fn();
    const confirmSpy = vi.spyOn(NotificationService, 'showConfirm').mockImplementation(
      () => document.createElement('div') as any
    );

    showRestorePrompt('2026-03-28 23:55', onConfirm);

    expect(confirmSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Auto-saved content from 2026-03-28 23:55',
        confirmText: 'Restore',
        dismissText: 'Dismiss',
        onConfirm,
        duration: 10000,
      })
    );
  });
});
