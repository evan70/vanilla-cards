/**
 * Page Card Module - Controller
 *
 * Orchestrates Nav Card (header), Body Card (main), Footer Card, and Mobile Nav Card.
 * Manages state, events, and dynamic data loading.
 */

import type { PageCardConfig, MenuItem, FooterSection } from './types';
import { escapeHtml } from '../escape-html';

/**
 * SVG Icons for header and mobile menu
 */
const Icons = {
  search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,

  language: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

  sun: `<svg class="card--header__theme-icon card--header__theme-icon--sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,

  moon: `<svg class="card--header__theme-icon card--header__theme-icon--moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,

  hamburger: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle class="card--header__mobile-icon-dot card--header__mobile-icon-dot--top" cx="12" cy="6" r="2.5"/><circle class="card--header__mobile-icon-dot card--header__mobile-icon-dot--middle" cx="12" cy="12" r="2.5"/><circle class="card--header__mobile-icon-dot card--header__mobile-icon-dot--bottom" cx="12" cy="18" r="2.5"/></svg>`,

  close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
};

/**
 * Page Card Controller
 *
 * Orchestrates all page-level cards: header, main, footer, mobile nav
 */
export class PageCardController {
  private readonly root: HTMLElement;
  private readonly config: PageCardConfig;
  private isMobileMenuOpen: boolean = false;

  /**
   * Create Page Card Controller
   *
   * @param root - Root container element with data-page-card attribute
   * @param config - Configuration with normalized page data
   */
  constructor(root: HTMLElement, config: PageCardConfig) {
    this.root = root;
    this.config = config;
  }

  /**
   * Initialize page card orchestrator
   */
  public init(): void {
    console.info('[PageCard] Initializing...');

    // Skip header if already present (server-side rendered via site-header.php)
    if (!document.querySelector('.card--header')) {
      this.renderNavCard();
    } else {
      console.info('[PageCard] Skipping header — already in DOM');
    }

    this.renderBodyCard();

    // Skip footer if already present (server-side rendered via site-footer.php)
    if (!document.querySelector('.card--footer')) {
      this.renderFooterCard();
    } else {
      console.info('[PageCard] Skipping footer — already in DOM');
    }

    this.renderMobileNavCard();
    this.bindEvents();

    console.info('[PageCard] Initialized ✓');
  }

  /**
   * Destroy controller and cleanup
   */
  public destroy(): void {
    this.root.innerHTML = '';
    console.info('[PageCard] Destroyed');
  }

  /**
   * Render Nav Card (card--header)
   */
  private renderNavCard(): void {
    const { currentPage, menuItems, siteName, logoText, showSearch, showLanguageToggle, showThemeToggle } = this.config.pageData;

    const headerHTML = `
      <header class="card--header card" data-theme="dark">
        <div class="card--header__inner">
          ${this.renderLogo(logoText, siteName)}
          ${this.renderDesktopNav(menuItems, currentPage)}
          <div class="card--header__actions">
            ${showSearch ? this.renderSearchButton() : ''}
            ${showLanguageToggle ? this.renderLanguageToggle() : ''}
            ${showThemeToggle ? this.renderThemeToggle() : ''}
            ${this.renderMobileMenuButton()}
          </div>
        </div>
      </header>
    `;

    this.root.insertAdjacentHTML('beforeend', headerHTML);
  }

  /**
   * Render logo
   */
  private renderLogo(logoText: string, _siteName: string): string {
    return `
      <a href="/" class="card--header__logo">
        <span>${escapeHtml(logoText)}</span>
        <span class="card--header__logo-dot">•</span>
      </a>
    `;
  }

  /**
   * Render desktop navigation
   */
  private renderDesktopNav(menuItems: MenuItem[], currentPage: string): string {
    if (menuItems.length === 0) return '';

    const navItems = menuItems
      .map(
        (item) => `
          <li class="card--header__nav-item">
            <a
              href="${escapeHtml(item.href)}"
              class="card--header__nav-link${item.page === currentPage ? ' card--header__nav-link--active' : ''}"
            >
              ${escapeHtml(item.name)}
            </a>
          </li>
        `
      )
      .join('');

    return `
      <ul class="card--header__nav">
        ${navItems}
      </ul>
    `;
  }

  /**
   * Render search button
   */
  private renderSearchButton(): string {
    return `
      <button class="icon-btn icon-btn--sm icon-btn--ghost" aria-label="Search" type="button">
        ${Icons.search}
      </button>
    `;
  }

  /**
   * Render language toggle button
   */
  private renderLanguageToggle(): string {
    return `
      <button class="icon-btn icon-btn--sm icon-btn--ghost" aria-label="Language" type="button">
        ${Icons.language}
      </button>
    `;
  }

  /**
   * Render theme toggle button
   */
  private renderThemeToggle(): string {
    return `
      <button
        class="icon-btn icon-btn--sm icon-btn--ghost card--header__theme-toggle"
        aria-label="Toggle theme"
        type="button"
      >
        ${Icons.sun}
        ${Icons.moon}
      </button>
    `;
  }

  /**
   * Render mobile menu button
   */
  private renderMobileMenuButton(): string {
    return `
      <button
        class="icon-btn icon-btn--sm icon-btn--ghost card--header__mobile-toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded="false"
      >
        ${Icons.hamburger}
      </button>
    `;
  }

  /**
   * Render Body Card (main content wrapper)
   * Uses existing main element inside root
   */
  private renderBodyCard(): void {
    // Find main element inside root (SSR pattern - main is inside page-card-root)
    let main = this.root.querySelector('main.page-card__body');
    
    if (!main) {
      console.warn('[PageCard] No main.page-card__body found inside root, creating one');
      // Create main element if not present
      const mainHTML = `
        <main class="page-card__body" id="page-main">
          <!-- Content should be provided by SSR or injected later -->
        </main>
      `;
      this.root.insertAdjacentHTML('beforeend', mainHTML);
      main = this.root.querySelector('.page-card__body');
    }
  }

  /**
   * Render Footer Card
   */
  private renderFooterCard(): void {
    const { footerSections } = this.config.pageData;

    const footerHTML = `
      <footer class="card--footer">
        <div class="card--footer__inner">
          ${this.renderFooterContent(footerSections)}
          <div class="card--footer__bottom">
            <p>&copy; ${new Date().getFullYear()} Nativa CMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;

    this.root.insertAdjacentHTML('beforeend', footerHTML);
  }

  /**
   * Render footer content sections
   */
  private renderFooterContent(sections: FooterSection[]): string {
    if (sections.length === 0) return '';

    const sectionsHTML = sections
      .map(
        (section) => `
          <div class="card--footer__section">
            <h4 class="card--footer__title">${escapeHtml(section.title)}</h4>
            <ul class="card--footer__links">
              ${section.links
                .map(
                  (link) => `
                    <li>
                      <a href="${escapeHtml(link.href)}" class="card--footer__link">
                        ${escapeHtml(link.label)}
                      </a>
                    </li>
                  `
                )
                .join('')}
            </ul>
          </div>
        `
      )
      .join('');

    return `
      <div class="card--footer__content">
        ${sectionsHTML}
      </div>
    `;
  }

  /**
   * Render Mobile Nav Card
   */
  private renderMobileNavCard(): void {
    const { menuItems, currentPage } = this.config.pageData;

    const mobileNavHTML = `
      <nav class="card--nav-mobile" hidden aria-label="Mobile navigation">
        <div class="card--nav-mobile__nav">
          ${menuItems
            .map(
              (item) => `
                <div class="card--nav-mobile__item">
                  <a
                    href="${escapeHtml(item.href)}"
                    class="card--nav-mobile__link${item.page === currentPage ? ' card--nav-mobile__link--active' : ''}"
                    data-page="${escapeHtml(item.page)}"
                  >
                    ${escapeHtml(item.name)}
                  </a>
                </div>
              `
            )
            .join('')}
        </div>
      </nav>

      <div class="mobile-nav-overlay" hidden></div>
    `;

    this.root.insertAdjacentHTML('beforeend', mobileNavHTML);
  }

  /**
   * Bind event listeners
   */
  private bindEvents(): void {
    // Mobile menu toggle
    const mobileToggle = this.root.querySelector('.card--header__mobile-toggle') as HTMLElement;
    const mobileNav = this.root.querySelector('.card--nav-mobile') as HTMLElement;
    const overlay = this.root.querySelector('.mobile-nav-overlay') as HTMLElement;

    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
      mobileToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    // Close mobile menu on overlay click
    if (overlay) {
      overlay.addEventListener('click', () => this.closeMobileMenu());
    }

    // Close mobile menu on link click
    this.root.querySelectorAll('.card--nav-mobile__link').forEach((link) => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Theme toggle
    const themeToggle = this.root.querySelector('.card--header__theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.handleThemeToggle());
      themeToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.handleThemeToggle();
      });
    }

    console.info('[PageCard] Events bound ✓');
  }

  /**
   * Toggle mobile menu
   */
  private toggleMobileMenu(): void {
    this.isMobileMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
  }

  /**
   * Open mobile menu
   */
  private openMobileMenu(): void {
    const mobileToggle = this.root.querySelector('.card--header__mobile-toggle') as HTMLElement;
    const mobileNav = this.root.querySelector('.card--nav-mobile') as HTMLElement;
    const overlay = this.root.querySelector('.mobile-nav-overlay') as HTMLElement;

    if (!mobileNav || !mobileToggle) return;

    this.isMobileMenuOpen = true;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.classList.add('card--header__mobile-toggle--open');

    mobileNav.removeAttribute('hidden');
    mobileNav.classList.add('card--nav-mobile--open');
    mobileNav.style.display = 'flex';
    mobileNav.style.right = '0';
    mobileNav.style.opacity = '0';
    mobileNav.style.visibility = 'hidden';

    requestAnimationFrame(() => {
      mobileNav.style.opacity = '1';
      mobileNav.style.visibility = 'visible';
    });

    if (overlay) {
      overlay.removeAttribute('hidden');
      overlay.style.display = 'block';
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';

      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
      });
    }

    document.body.style.overflow = 'hidden';
    console.info('[PageCard] Mobile menu opened');
  }

  /**
   * Close mobile menu
   */
  private closeMobileMenu(): void {
    const mobileToggle = this.root.querySelector('.card--header__mobile-toggle') as HTMLElement;
    const mobileNav = this.root.querySelector('.card--nav-mobile') as HTMLElement;
    const overlay = this.root.querySelector('.mobile-nav-overlay') as HTMLElement;

    if (!mobileNav || !mobileToggle) return;

    this.isMobileMenuOpen = false;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('card--header__mobile-toggle--open');

    mobileNav.style.opacity = '0';
    mobileNav.style.visibility = 'hidden';
    mobileNav.style.right = '-280px';

    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    }

    setTimeout(() => {
      if (!this.isMobileMenuOpen) {
        mobileNav.setAttribute('hidden', '');
        mobileNav.classList.remove('card--nav-mobile--open');
        mobileNav.style.display = 'none';

        if (overlay) {
          overlay.setAttribute('hidden', '');
          overlay.style.display = 'none';
        }
      }
    }, 300);

    document.body.style.overflow = '';
    console.info('[PageCard] Mobile menu closed');
  }

  /**
   * Handle theme toggle
   */
  private async handleThemeToggle(): Promise<void> {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // First, toggle locally for immediate feedback
    document.documentElement.setAttribute('data-theme', newTheme);
    console.info('[PageCard] Theme toggled to:', newTheme);

    // Then try to sync with server (optional, non-blocking)
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      // Skip server sync if no CSRF token (demo pages)
      if (!csrfToken) {
        console.debug('[PageCard] Theme sync skipped (no CSRF token)');
        return;
      }

      const response = await fetch('/api/theme/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'same-origin',
      });

      if (!response.ok) {
        // Server sync failed, but local toggle already happened
        console.debug('[PageCard] Theme toggled locally (server sync unavailable)');
        return;
      }

      const data = await response.json();
      
      // Only update from server if we have a cookie response (first toggle)
      // Otherwise keep local toggle to avoid race conditions
      if (data.cookie) {
        document.cookie = `${data.cookie.name}=${data.cookie.value}; Path=${data.cookie.path}; Max-Age=${data.cookie.maxAge}; SameSite=${data.cookie.sameSite}`;
        console.info('[PageCard] Theme synced with server');
      }
    } catch (error) {
      // Network error, but local toggle already happened
      console.debug('[PageCard] Theme toggled locally (network error)');
    }
  }
}

export default PageCardController;
