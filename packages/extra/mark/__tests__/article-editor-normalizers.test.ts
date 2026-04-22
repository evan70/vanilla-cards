import { describe, expect, it } from 'vitest';

import {
  normalizeArticleData,
  normalizeCategories,
  normalizeMediaItem,
  normalizeTags,
} from '../components/article-editor';

describe('article-editor normalizers', () => {
  it('normalizes legacy snake_case article payloads into editor model', () => {
    const article = normalizeArticleData({
      id: 'article-1',
      title: 'Test title',
      slug: 'test-title',
      content: 'Article body',
      status: 'published',
      category_id: 'cat-1',
      tags: ['tag-1', 'tag-2'],
      meta_title: 'Meta title',
      canonical_url: 'https://example.com/articles/test-title',
      author_name: 'Alias',
      media: [{
        media_id: 'media-1',
        path: '/storage/test.jpg',
        mime_type: 'image/jpeg',
        original_name: 'test.jpg',
      }],
    });

    expect(article).toMatchObject({
      id: 'article-1',
      title: 'Test title',
      slug: 'test-title',
      content: 'Article body',
      status: 'published',
      categoryId: 'cat-1',
      tags: ['tag-1', 'tag-2'],
      metaTitle: 'Meta title',
      canonicalUrl: 'https://example.com/articles/test-title',
      authorName: 'Alias',
    });
    expect(article.media).toHaveLength(1);
    expect(article.media[0]).toMatchObject({
      mediaId: 'media-1',
      url: '/storage/test.jpg',
      filename: 'test.jpg',
      mimeType: 'image/jpeg',
      isImage: true,
    });
  });

  it('provides safe defaults for nullable and invalid article fields', () => {
    const article = normalizeArticleData({
      title: null,
      content: undefined,
      category_id: null,
      tags: 'not-an-array',
      media: [null, 'bad-item'],
    } as any);

    expect(article.title).toBe('');
    expect(article.content).toBe('');
    expect(article.categoryId).toBe('');
    expect(article.tags).toEqual([]);
    expect(article.media).toEqual([]);
    expect(article.status).toBe('draft');
  });

  it('normalizes media items and infers image flag from mime type', () => {
    const media = normalizeMediaItem({
      id: 'db-id',
      media_id: 'media-2',
      path: '/storage/manual.pdf',
      mime_type: 'application/pdf',
      original_name: 'manual.pdf',
    });

    expect(media).toEqual({
      id: 'db-id',
      mediaId: 'media-2',
      url: '/storage/manual.pdf',
      mimeType: 'application/pdf',
      filename: 'manual.pdf',
      size: undefined,
      caption: undefined,
      isImage: false,
    });
  });

  it('filters invalid category and tag options', () => {
    expect(normalizeCategories([
      { id: 'cat-1', name: 'News' },
      { id: '', name: 'Invalid' },
      { id: 'cat-2' },
      'bad',
    ])).toEqual([
      { id: 'cat-1', name: 'News' },
    ]);

    expect(normalizeTags([
      { id: 'tag-1', name: 'Tech' },
      { id: 'tag-2', name: '' },
      null,
    ])).toEqual([
      { id: 'tag-1', name: 'Tech' },
    ]);
  });
});
