/**
 * article-editor.page.ts — Article Editor page.
 *
 * Thin wrapper — actual editor logic is in mark/components/article-editor.
 */

import { AppKernel } from '@vc/core';
import { getCsrfToken } from '@vc/core/kernel/http/http-client';
import { ArticleEditor, normalizeArticleData, normalizeCategories, normalizeTags } from '@mark/components/article-editor';

AppKernel.getInstance().registerPage('article-editor', () => {
  const container = document.getElementById('article-editor');
  if (!container) return;

  try {
    const mode = (container.dataset.mode as 'create' | 'edit') || 'create';
    const articleId = container.dataset.articleId;
    const csrfToken = container.dataset.csrfToken || getCsrfToken();
    const submitUrl = container.dataset.submitUrl || '';
    const mediaUploadUrl = container.dataset.mediaUploadUrl || '';
    const mediaLibraryUrl = container.dataset.mediaLibraryUrl || '';

    let articleData: Record<string, unknown> = {};
    try { articleData = JSON.parse(container.dataset.article || '{}'); } catch { /* empty */ }

    let categories: Array<{id: string; name: string}> = [];
    try { categories = JSON.parse(container.dataset.categories || '[]'); } catch { /* empty */ }

    let availableTags: Array<{id: string; name: string}> = [];
    try { availableTags = JSON.parse(container.dataset.availableTags || '[]'); } catch { /* empty */ }

    const error = container.dataset.error || '';

    const editor = new ArticleEditor(container, {
      mode,
      articleId,
      csrfToken,
      submitUrl,
      mediaUploadUrl,
      mediaLibraryUrl,
      articleData: normalizeArticleData(articleData),
      categories: normalizeCategories(categories),
      availableTags: normalizeTags(availableTags),
      onError: (message: string) => {
        console.error('[ArticleEditor] Error:', message);
        const statusEl = document.getElementById('article-editor-status');
        if (statusEl) {
          statusEl.textContent = `Error: ${message}`;
          statusEl.classList.add('text-error');
        }
      },
    });

    editor.init();

    if (error) {
      const statusEl = document.getElementById('article-editor-status');
      if (statusEl) {
        statusEl.textContent = error;
        statusEl.classList.add('text-error');
      }
    }

    console.debug('[ArticleEditor] Initialized ✓', { mode, articleId, submitUrl });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[ArticleEditor] Initialization failed:', msg);
    container.innerHTML = `
      <div class="alert-error">
        <h3 class="alert-error__title">Editor Loading Error</h3>
        <p class="alert-error__message">${msg}</p>
      </div>
    `;
  }
});
