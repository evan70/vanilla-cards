/**
 * media.page.ts — Media Library page.
 *
 * Media modal viewer, Cloudinary sync, AJAX upload, delete confirmations.
 * Migrated from mark-media.ts (422 lines → this kernel page).
 */

import { AppKernel, NotificationService, initDeleteConfirmations } from '@vc/core';

AppKernel.getInstance().registerPage('media', () => {
  const kernel = AppKernel.getInstance();

  // ── Media Modal ────────────────────────────────────────
  const modal = document.querySelector('[data-media-modal]') as HTMLElement | null;
  if (modal) {
    const modalEl = modal;
    const body = modalEl.querySelector('[data-media-body]');
    const title = modalEl.querySelector('[data-media-title]');
    const counter = modalEl.querySelector('[data-media-counter]');
    const originalLink = modalEl.querySelector('[data-media-open-original]');
    const openLinks = Array.from(document.querySelectorAll('[data-media-open="true"]')) as HTMLElement[];
    const prevButton = modalEl.querySelector('[data-media-prev="true"]') as HTMLElement | null;
    const nextButton = modalEl.querySelector('[data-media-next="true"]') as HTMLElement | null;
    const closeTriggers = Array.from(modalEl.querySelectorAll('[data-media-close="true"]')) as HTMLElement[];

    const items = openLinks.map((link, index) => ({
      index,
      url: link.getAttribute('data-media-url') || '',
      mime: link.getAttribute('data-media-mime') || '',
      name: link.getAttribute('data-media-name') || 'Media',
    }));

    let currentIndex = 0;

    function render(): void {
      const item = items[currentIndex];
      if (!item || !body || !title || !counter || !originalLink) return;
      title.textContent = item.name;
      counter.textContent = `${currentIndex + 1} / ${items.length}`;
      originalLink.setAttribute('href', item.url);
      (body as HTMLElement).innerHTML = '';

      if (item.mime.startsWith('image/')) {
        const image = document.createElement('img');
        image.className = 'media-modal__image';
        image.src = item.url;
        image.alt = item.name;
        image.loading = 'lazy';
        body.appendChild(image);
      } else if (item.mime.startsWith('video/')) {
        const video = document.createElement('video');
        video.className = 'media-modal__video';
        video.src = item.url;
        video.controls = true;
        video.preload = 'metadata';
        body.appendChild(video);
      } else {
        const fileLink = document.createElement('a');
        fileLink.className = 'media-modal__file-link';
        fileLink.href = item.url;
        fileLink.textContent = 'Open file in new tab';
        fileLink.target = '_blank';
        fileLink.rel = 'noopener noreferrer';
        body.appendChild(fileLink);
      }
    }

    function openModal(index: number): void {
      currentIndex = index;
      render();
      modalEl.hidden = false;
      modalEl.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(): void {
      modalEl.hidden = true;
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => { e.preventDefault(); openModal(index); });
    });
    closeTriggers.forEach((t) => t.addEventListener('click', () => closeModal()));
    nextButton?.addEventListener('click', () => { currentIndex = (currentIndex + 1) % items.length; render(); });
    prevButton?.addEventListener('click', () => { currentIndex = (currentIndex - 1 + items.length) % items.length; render(); });
    document.addEventListener('keydown', (e) => {
      if (modalEl.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % items.length; render(); }
      if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + items.length) % items.length; render(); }
    });
    console.log('[Media] Modal initialized ✓', items.length, 'items');
  }

  // ── Cloudinary Sync ────────────────────────────────────
  const syncBtn = document.getElementById('cloudinary-sync-btn');
  const syncStatus = document.querySelector('.cloudinary-sync-status') as HTMLElement | null;
  if (syncBtn && syncStatus) {
    const btn = syncBtn;
    const status = syncStatus;
    const csrfToken = (document.getElementById('csrf-token') as HTMLInputElement | null)?.value || '';

    async function sync(dryRun = false): Promise<void> {
      btn.setAttribute('disabled', 'true');
      btn.innerHTML = '⏳ Syncing...';
      try {
        const resp = await kernel.http.post('/mark/media/sync-cloudinary', {
          _token: csrfToken,
          dry_run: dryRun,
          limit: 100,
        });
        const data = resp as Record<string, unknown>;
        if (data.success) {
          status.innerHTML = `DONE ${data.message ?? ''}`;
          status.style.cssText = 'padding:1rem;margin:1rem 0;border-radius:.5rem;background:#22c55e20;border:1px solid #22c55e;color:#22c55e;display:block';
          if (!dryRun && (data.stats as Record<string, number>)?.synced > 0) {
            setTimeout(() => window.location.reload(), 2000);
          }
        } else {
          status.innerHTML = `ERROR ${data.error ?? 'Sync failed'}`;
          status.style.cssText = 'padding:1rem;margin:1rem 0;border-radius:.5rem;background:#ef444420;border:1px solid #ef4444;color:#ef4444;display:block';
        }
      } catch {
        status.innerHTML = 'ERROR Network error';
        status.style.cssText = 'padding:1rem;margin:1rem 0;border-radius:.5rem;background:#ef444420;border:1px solid #ef4444;color:#ef4444;display:block';
      } finally {
        btn.removeAttribute('disabled');
        btn.innerHTML = '🔄 Sync Cloudinary';
      }
    }

    btn.addEventListener('click', () => sync(false));
    console.log('[Media] Cloudinary sync initialized ✓');
  }

  // ── Media Upload ───────────────────────────────────────
  const uploadForm = document.querySelector('form.media-library__upload') as HTMLFormElement | null;
  if (uploadForm) {
    const fileInput = uploadForm.querySelector('input[name="file"]') as HTMLInputElement | null;
    const submitBtn = uploadForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    const csrf = uploadForm.querySelector('input[name="_token"]')?.getAttribute('value') || '';

    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!fileInput?.files?.[0]) {
        NotificationService.error('Please select a file to upload');
        return;
      }
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);
      formData.append('_token', csrf);
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Uploading...'; }
      if (fileInput) fileInput.disabled = true;
      try {
        const resp = await fetch('/mark/media', {
          method: 'POST',
          body: formData,
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        const data = await resp.json();
        if (resp.ok && !data.error) {
          NotificationService.success('File uploaded successfully!', 5000);
          setTimeout(() => window.location.reload(), 1500);
        } else {
          NotificationService.error(data.error || 'Upload failed', 8000);
        }
      } catch (err) {
        NotificationService.error('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'), 8000);
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Upload'; }
        if (fileInput) fileInput.disabled = false;
      }
    });
    console.log('[Media] Upload handler initialized ✓');
  }

  // ── Delete confirmations ───────────────────────────────
  initDeleteConfirmations();

  console.info('[Media] Initialized ✓');
});
