/**
 * @vitest-environment jsdom
 */

import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import {
  submitArticle,
  validateSubmission,
} from '../components/article-editor';

describe('article-editor submit', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('validates required title and content before submit', () => {
    expect(validateSubmission('', 'content')).toBe('Title is required');
    expect(validateSubmission('title', '   ')).toBe('Content is required');
    expect(validateSubmission('title', 'content')).toBeNull();
  });

  it('submits form data with xhr headers and uses redirected response url', async () => {
    const formData = new FormData();
    formData.set('title', 'Article title');

    vi.mocked(fetch).mockResolvedValue({
      redirected: true,
      url: 'http://localhost:8000/mark/articles',
    } as Response);

    await expect(submitArticle('/mark/articles', formData)).resolves.toEqual({
      redirectUrl: 'http://localhost:8000/mark/articles',
    });

    expect(fetch).toHaveBeenCalledWith('/mark/articles', expect.objectContaining({
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }));
  });

  it('falls back to mark articles list on successful non-redirect response', async () => {
    const formData = new FormData();

    vi.mocked(fetch).mockResolvedValue({
      redirected: false,
      ok: true,
      text: vi.fn().mockResolvedValue('<html></html>'),
    } as unknown as Response);

    await expect(submitArticle('/mark/articles/article-1', formData)).resolves.toEqual({
      redirectUrl: '/mark/articles',
    });
  });

  it('parses html error response and throws extracted message', async () => {
    const formData = new FormData();

    vi.mocked(fetch).mockResolvedValue({
      redirected: false,
      ok: false,
      text: vi.fn().mockResolvedValue('<div data-error>Slug already exists</div>'),
    } as unknown as Response);

    await expect(submitArticle('/mark/articles/article-1', formData))
      .rejects
      .toThrow('Slug already exists');
  });

  it('uses generic message when error response has no parsable message', async () => {
    const formData = new FormData();

    vi.mocked(fetch).mockResolvedValue({
      redirected: false,
      ok: false,
      text: vi.fn().mockResolvedValue('<html><body>No explicit error</body></html>'),
    } as unknown as Response);

    await expect(submitArticle('/mark/articles/article-1', formData))
      .rejects
      .toThrow('Failed to save article');
  });
});
