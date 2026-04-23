/**
 * Blog page — article cards, search, pagination, scroll animations.
 *
 * Registers itself with the kernel.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('blog', () => {
  // Article card hover effects
  document.querySelectorAll('.card--content').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('card--content--hover');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('card--content--hover');
    });
  });

  // Client-side search over SSR payload
  const searchInput = document.getElementById('blog-search-input') as HTMLInputElement | null;
  const dataElement = document.getElementById('blog-data');
  const grid = document.getElementById('blog-articles');
  const message = document.getElementById('blog-message');

  if (searchInput && dataElement && grid) {
    const raw = dataElement.getAttribute('data-articles') || '[]';
    const articles = JSON.parse(raw) as Array<{
      title: string;
      slug: string;
      excerpt: string;
      image?: string | null;
      published_label?: string | null;
      author_name?: string | null;
      views?: number | null;
    }>;

    const render = (query: string) => {
      const normalized = query.trim().toLowerCase();
      const filtered = normalized
        ? articles.filter((article) =>
            [article.title, article.excerpt, article.author_name ?? ''].some((field) =>
              field.toLowerCase().includes(normalized)
            )
          )
        : articles;

      grid.innerHTML = filtered.map((article) => `
        <article class="blog-card">
          ${article.image
            ? `<img class="blog-card__image" src="${article.image}" alt="${article.title}" loading="lazy">`
            : '<div class="blog-card__image-placeholder" aria-hidden="true">No Image</div>'}
          <div class="blog-card__content">
            <h2 class="blog-card__title"><a href="blog-detail.html?slug=${article.slug}">${article.title}</a></h2>
            <p class="blog-card__excerpt">${article.excerpt ?? ''}</p>
            <div class="blog-card__meta">
              ${article.published_label ? `<span class="blog-card__date">${article.published_label}</span>` : ''}
              ${article.author_name ? `<span class="blog-card__author">${article.author_name}</span>` : ''}
              ${article.views ? `<span class="blog-card__views">${article.views} views</span>` : ''}
            </div>
          </div>
        </article>
      `).join('');

      if (message) {
        if (filtered.length === 0) {
          message.textContent = 'No articles matched your search.';
          message.hidden = false;
        } else {
          message.textContent = '';
          message.hidden = true;
        }
      }
    };

    searchInput.addEventListener('input', (event) => {
      render((event.target as HTMLInputElement).value);
    });

    // Initial render
    render('');
  }

  // Pagination link handling
  document.querySelectorAll('.blog-pagination__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
      }
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.card--content').forEach((card) => {
    card.classList.add('fade-in-up');
    observer.observe(card);
  });
});
