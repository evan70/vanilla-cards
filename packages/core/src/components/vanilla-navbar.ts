/**
 * Vanilla Navbar Web Component
 *
 * Structural component for navigation.
 * Handles mobile menu toggle logic.
 *
 * @element vanilla-navbar
 */

export class VanillaNavbar extends HTMLElement {
  private navToggle: HTMLElement | null = null;
  private navMenu: HTMLElement | null = null;

  connectedCallback(): void {
    this.classList.add('nav-header');
    this.init();
  }

  private init(): void {
    this.navToggle = this.querySelector('[data-nav-toggle]') || this.querySelector('.nav-toggle');
    this.navMenu = this.querySelector('[data-nav-menu]') || this.querySelector('.nav-menu');

    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
      
      // Close on link click
      this.navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
    }
  }

  public toggleMenu(): void {
    const isOpen = this.navMenu?.classList.toggle('nav-menu--open');
    this.navToggle?.classList.toggle('nav-toggle--open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    this.dispatchEvent(new CustomEvent('nav:toggle', { detail: { open: isOpen } }));
  }

  public closeMenu(): void {
    this.navMenu?.classList.remove('nav-menu--open');
    this.navToggle?.classList.remove('nav-toggle--open');
    document.body.style.overflow = '';
    this.dispatchEvent(new CustomEvent('nav:toggle', { detail: { open: false } }));
  }
}

if (!customElements.get('vanilla-navbar')) {
  customElements.define('vanilla-navbar', VanillaNavbar);
}
