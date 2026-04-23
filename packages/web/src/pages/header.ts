/**
 * Header page — shared header behavior.
 *
 * Registers itself with the kernel.
 * Uses kernel.ui.theme (cookie-based, single source of truth).
 * Uses kernel auth state if present.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('header', () => {
  const kernel = AppKernel.getInstance();

  // Init theme from cookie (single source of truth — no localStorage gap)
  kernel.ui.theme.init();

  // Set --header-height for main content spacing
  const header = document.querySelector('.card--header') as HTMLElement | null;
  if (header) {
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');

    // Recalculate on resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
      }, 100);
    });
  }

  // Bind header-specific clock
  const clockTime = document.getElementById('clock-time');
  const clockDate = document.getElementById('clock-date');

  // Get locale from header element's data attribute or default to Slovak
  const headerElement = document.querySelector('vanilla-card[variant="header"], .card--header') as HTMLElement | null;
  const locale = headerElement?.dataset.locale || 'sk-SK';

  if (clockTime || clockDate) {
    updateClock();
    setInterval(updateClock, 1000);
  }

  function updateClock(): void {
    try {
      const now = new Date();

      if (clockTime) {
        clockTime.textContent = now.toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
        });
      }

      if (clockDate) {
        clockDate.textContent = now.toLocaleDateString(locale, {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
        });
      }
    } catch {
      // Fallback to default locale if configured locale fails
      const now = new Date();
      if (clockTime) {
        clockTime.textContent = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      if (clockDate) {
        clockDate.textContent = now.toLocaleDateString('en-US', {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
        });
      }
    }
  }
});
