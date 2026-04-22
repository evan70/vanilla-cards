/**
 * Blog detail page — reading progress, copy link.
 *
 * Registers itself with the kernel.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('blog-detail', () => {
  // Reading progress bar
  const progress = document.getElementById('blog-progress');
  const article = document.querySelector('.blog-detail');

  if (progress && article) {
    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = Math.max(article.clientHeight - window.innerHeight, 1);
      const current = Math.min(Math.max(-rect.top, 0), total);
      progress.setAttribute('style', `width: ${(current / total) * 100}%`);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // Copy article link
  const button = document.getElementById('blog-copy-btn') as HTMLButtonElement | null;
  const enhancer = document.getElementById('blog-detail-enhancer');

  if (button && enhancer) {
    const url = enhancer.getAttribute('data-url') ?? window.location.href;

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        const original = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(() => {
          button.textContent = original;
        }, 1500);
      } catch {
        window.prompt('Copy article URL:', url);
      }
    });
  }
});
