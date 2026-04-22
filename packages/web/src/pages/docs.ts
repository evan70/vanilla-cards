/**
 * Docs page — table of contents highlighting, search.
 *
 * Registers itself with the kernel.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('docs', () => {
  // Table of contents highlighting
  const tocLinks = document.querySelectorAll('.docs-toc__link');
  if (tocLinks.length > 0) {
    const headings = Array.from(document.querySelectorAll('h2, h3'))
      .filter((h) => h.id)
      .map((h) => ({
        id: h.id,
        element: h as HTMLElement,
        top: (h as HTMLElement).offsetTop - 100,
      }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    headings.forEach((heading) => {
      observer.observe(heading.element);
    });
  }

  // Search functionality
  const searchInput = document.querySelector('.docs-search__input') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      document.querySelectorAll('.card--content').forEach((card) => {
        const text = card.textContent?.toLowerCase() ?? '';
        (card as HTMLElement).style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
});
