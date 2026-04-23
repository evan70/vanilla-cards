/**
 * Portfolio page — filters, scroll reveal, skill progress, count-up, parallax.
 *
 * Registers itself with the kernel.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('portfolio', () => {
  // Filter with staggered card animation
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('.portfolio__filter-btn[data-filter]')
  );
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.card--project[data-category]'));
  const grid = document.querySelector<HTMLElement>('.portfolio__grid');

  if (buttons.length > 0 && cards.length > 0) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = (button.dataset.filter ?? 'all').toLowerCase();

        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('portfolio__filter-btn--active', active);
          item.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        // Hide non-matching cards
        cards.forEach((card) => {
          const category = (card.dataset.category ?? '').toLowerCase();
          const shouldShow = filter === 'all' || category.includes(filter);

          if (!shouldShow) {
            card.style.transition = 'opacity 450ms ease, transform 450ms ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              card.style.display = 'none';
              card.hidden = true;
            }, 450);
          }
        });

        // Show matching cards with stagger
        let visibleIndex = 0;
        cards.forEach((card) => {
          const category = (card.dataset.category ?? '').toLowerCase();
          const shouldShow = filter === 'all' || category.includes(filter);

          if (shouldShow) {
            card.style.display = '';
            card.hidden = false;
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            card.style.transition = 'opacity 450ms ease, transform 450ms ease';
            void card.offsetHeight;
            card.style.transitionDelay = `${visibleIndex * 120}ms`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            visibleIndex++;
          }
        });

        if (grid) {
          setTimeout(() => {
            void grid.offsetHeight;
          }, 500);
        }
      });
    });
  }

  // Scroll reveal
  const revealTargets = document.querySelectorAll<HTMLElement>('.portfolio-reveal, .portfolio-reveal-stagger, .card--skill');
  if (revealTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  // Skill progress bars
  document.querySelectorAll<HTMLElement>('.card--skill').forEach((card) => {
    const fill = card.querySelector<HTMLElement>('.card--skill__progress-fill');
    if (!fill) return;

    const width = card.dataset.progress ?? fill.style.width ?? '0%';
    fill.style.removeProperty('width');
    card.style.setProperty('--progress-width', width);
  });

  // Count-up animation for metrics
  const metricValues = document.querySelectorAll<HTMLElement>('.card--case-study__metric-value');
  if (metricValues.length > 0) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const text = el.textContent?.trim() ?? '';
          const prefix = text.match(/^[^\d.-]*/)?.[0] ?? '';
          const suffix = text.match(/[^\d.-]*$/)?.[0] ?? '';
          const numMatch = text.match(/-?[\d.]+/);
          if (!numMatch) return;

          const target = parseFloat(numMatch[0]);
          const hasDecimal = numMatch[0].includes('.');
          const duration = 1200;
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            el.textContent =
              prefix + (hasDecimal ? current.toFixed(1) : Math.round(current).toString()) + suffix;

            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    metricValues.forEach((el) => countObserver.observe(el));
  }

  // Parallax on hero stats
  const stats = document.querySelector<HTMLElement>('.portfolio__hero-stats');
  if (stats) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const offset = Math.min(scrollY * 0.08, 20);
        stats.style.transform = `translateY(${-offset}px)`;
        stats.style.opacity = String(Math.max(1 - scrollY * 0.001, 0.3));
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }
});
