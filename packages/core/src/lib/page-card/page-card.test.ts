/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, beforeEach } from 'vitest';

import {
  PageCardController,
  normalizePageCardPayload,
  type PageCardConfig,
  type RawPageCardPayload,
} from './index';

/**
 * NormalizePageCardPayload tests
 */
describe('normalizePageCardPayload', () => {
  it('normalizes raw payload with defaults', () => {
    const raw: RawPageCardPayload = {};

    const result = normalizePageCardPayload(raw);

    expect(result).toEqual({
      currentPage: 'home',
      menuItems: [],
      footerSections: [],
      isGuest: true,
      siteName: 'Nativa CMS',
      logoText: 'responsive.sk',
      showSearch: true,
      showLanguageToggle: true,
      showThemeToggle: true,
    });
  });

  it('normalizes menu items from raw payload', () => {
    const raw: RawPageCardPayload = {
      currentPage: 'blog',
      menuItems: [
        { name: 'Home', href: '/', page: 'home' },
        { name: 'Blog', href: '/blog', page: 'blog', active: true },
      ],
    };

    const result = normalizePageCardPayload(raw);

    expect(result.currentPage).toBe('blog');
    expect(result.menuItems).toHaveLength(2);
    expect(result.menuItems[0]).toEqual({
      name: 'Home',
      href: '/',
      page: 'home',
      active: false,
    });
    expect(result.menuItems[1]).toEqual({
      name: 'Blog',
      href: '/blog',
      page: 'blog',
      active: true,
    });
  });

  it('normalizes footer sections from raw payload', () => {
    const raw: RawPageCardPayload = {
      footerSections: [
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      ],
    };

    const result = normalizePageCardPayload(raw);

    expect(result.footerSections).toHaveLength(1);
    expect(result.footerSections[0]).toEqual({
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    });
  });

  it('handles null values gracefully', () => {
    const raw: RawPageCardPayload = {
      currentPage: null,
      siteName: null,
      logoText: null,
      isGuest: null,
    };

    const result = normalizePageCardPayload(raw);

    expect(result.currentPage).toBe('home');
    expect(result.siteName).toBe('Nativa CMS');
    expect(result.logoText).toBe('responsive.sk');
    expect(result.isGuest).toBe(true);
  });

  it('handles custom configuration values', () => {
    const raw: RawPageCardPayload = {
      siteName: 'My Custom Site',
      logoText: 'custom.logo',
      isGuest: false,
      showSearch: false,
      showLanguageToggle: false,
      showThemeToggle: false,
    };

    const result = normalizePageCardPayload(raw);

    expect(result.siteName).toBe('My Custom Site');
    expect(result.logoText).toBe('custom.logo');
    expect(result.isGuest).toBe(false);
    expect(result.showSearch).toBe(false);
    expect(result.showLanguageToggle).toBe(false);
    expect(result.showThemeToggle).toBe(false);
  });
});

/**
 * PageCardController tests
 */
describe('PageCardController', () => {
  const mockConfig: PageCardConfig = {
    pageData: {
      currentPage: 'home',
      menuItems: [
        { name: 'Home', href: '/', page: 'home' },
        { name: 'Blog', href: '/blog', page: 'blog' },
      ],
      footerSections: [
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      ],
      isGuest: true,
      siteName: 'Nativa CMS',
      logoText: 'responsive.sk',
      showSearch: true,
      showLanguageToggle: true,
      showThemeToggle: true,
    },
  };

  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement('div');
    root.setAttribute('data-page-card', '');
    document.body.appendChild(root);
  });

  it('renders card--header with logo and navigation', () => {
    const controller = new PageCardController(root, mockConfig);
    controller.init();

    const header = root.querySelector('.card--header');
    expect(header).toBeTruthy();

    const logo = root.querySelector('.card--header__logo');
    expect(logo).toBeTruthy();
    expect(logo?.textContent).toContain('responsive.sk');

    const navLinks = root.querySelectorAll('.card--header__nav-link');
    expect(navLinks).toHaveLength(2);
    expect(navLinks[0].textContent?.trim()).toBe('Home');
    expect(navLinks[1].textContent?.trim()).toBe('Blog');
  });

  it('renders body card (main element)', () => {
    const controller = new PageCardController(root, mockConfig);
    controller.init();

    const main = root.querySelector('.page-card__body');
    expect(main).toBeTruthy();
    expect(main?.id).toBe('page-main');
  });

  it('renders card--footer with sections', () => {
    const controller = new PageCardController(root, mockConfig);
    controller.init();

    const footer = root.querySelector('.card--footer');
    expect(footer).toBeTruthy();

    const footerTitle = footer?.querySelector('.card--footer__title');
    expect(footerTitle?.textContent).toBe('Company');

    const footerLinks = footer?.querySelectorAll('.card--footer__link');
    expect(footerLinks).toHaveLength(2);
  });

  it('renders card--nav-mobile', () => {
    const controller = new PageCardController(root, mockConfig);
    controller.init();

    const mobileNav = root.querySelector('.card--nav-mobile');
    expect(mobileNav).toBeTruthy();

    const mobileLinks = mobileNav?.querySelectorAll('.card--nav-mobile__link');
    expect(mobileLinks).toHaveLength(2);
  });

  it('renders mobile-nav-overlay', () => {
    const controller = new PageCardController(root, mockConfig);
    controller.init();

    const overlay = root.querySelector('.mobile-nav-overlay');
    expect(overlay).toBeTruthy();
  });

  it('marks active navigation link based on currentPage', () => {
    const configWithActive: PageCardConfig = {
      pageData: {
        ...mockConfig.pageData,
        currentPage: 'blog',
      },
    };

    const controller = new PageCardController(root, configWithActive);
    controller.init();

    const activeLink = root.querySelector('.card--header__nav-link--active');
    expect(activeLink?.textContent?.trim()).toBe('Blog');

    const activeMobileLink = root.querySelector('.card--nav-mobile__link--active');
    expect(activeMobileLink?.textContent?.trim()).toBe('Blog');
  });

  it('renders action buttons (search, language, theme, mobile)', () => {
    const controller = new PageCardController(root, mockConfig);
    controller.init();

    const searchBtn = root.querySelector('[aria-label="Search"]');
    expect(searchBtn).toBeTruthy();

    const languageBtn = root.querySelector('[aria-label="Language"]');
    expect(languageBtn).toBeTruthy();

    const themeBtn = root.querySelector('.card--header__theme-toggle');
    expect(themeBtn).toBeTruthy();

    const mobileBtn = root.querySelector('.card--header__mobile-toggle');
    expect(mobileBtn).toBeTruthy();
  });

  it('does not render search button when showSearch is false', () => {
    const config: PageCardConfig = {
      pageData: {
        ...mockConfig.pageData,
        showSearch: false,
      },
    };

    const controller = new PageCardController(root, config);
    controller.init();

    const searchBtn = root.querySelector('[aria-label="Search"]');
    expect(searchBtn).toBeFalsy();
  });

  it('does not render language toggle when showLanguageToggle is false', () => {
    const config: PageCardConfig = {
      pageData: {
        ...mockConfig.pageData,
        showLanguageToggle: false,
      },
    };

    const controller = new PageCardController(root, config);
    controller.init();

    const languageBtn = root.querySelector('[aria-label="Language"]');
    expect(languageBtn).toBeFalsy();
  });

  it('does not render theme toggle when showThemeToggle is false', () => {
    const config: PageCardConfig = {
      pageData: {
        ...mockConfig.pageData,
        showThemeToggle: false,
      },
    };

    const controller = new PageCardController(root, config);
    controller.init();

    const themeBtn = root.querySelector('.card--header__theme-toggle');
    expect(themeBtn).toBeFalsy();
  });

  it('destroys controller and clears content', () => {
    const controller = new PageCardController(root, mockConfig);
    controller.init();

    expect(root.querySelector('.card--header')).toBeTruthy();
    expect(root.querySelector('.page-card__body')).toBeTruthy();
    expect(root.querySelector('.card--footer')).toBeTruthy();

    controller.destroy();

    expect(root.innerHTML).toBe('');
  });

  describe('mobile menu', () => {
    it('opens mobile menu on toggle button click', () => {
      const controller = new PageCardController(root, mockConfig);
      controller.init();

      const mobileToggle = root.querySelector('.card--header__mobile-toggle') as HTMLButtonElement;
      const mobileNav = root.querySelector('.card--nav-mobile') as HTMLElement;

      expect(mobileNav.hasAttribute('hidden')).toBe(true);

      mobileToggle?.click();

      expect(mobileNav.hasAttribute('hidden')).toBe(false);
      expect(mobileToggle?.getAttribute('aria-expanded')).toBe('true');
    });

    it('closes mobile menu on overlay click', () => {
      const controller = new PageCardController(root, mockConfig);
      controller.init();

      const mobileToggle = root.querySelector('.card--header__mobile-toggle') as HTMLButtonElement;
      const overlay = root.querySelector('.mobile-nav-overlay') as HTMLElement;

      // Open menu
      mobileToggle?.click();

      // Close on overlay click
      overlay?.click();

      expect(mobileToggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('closes mobile menu on link click', () => {
      const controller = new PageCardController(root, mockConfig);
      controller.init();

      const mobileToggle = root.querySelector('.card--header__mobile-toggle') as HTMLButtonElement;
      const mobileLink = root.querySelector('.card--nav-mobile__link') as HTMLAnchorElement;

      // Open menu
      mobileToggle?.click();

      // Close on link click
      mobileLink?.click();

      expect(mobileToggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('closes mobile menu on escape key', () => {
      const controller = new PageCardController(root, mockConfig);
      controller.init();

      const mobileToggle = root.querySelector('.card--header__mobile-toggle') as HTMLButtonElement;

      // Open menu
      mobileToggle?.click();

      // Press escape
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(mobileToggle.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
