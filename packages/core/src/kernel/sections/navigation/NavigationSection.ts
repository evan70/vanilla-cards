import './navigation.css';
import { BaseSection } from '../BaseSection';
import { AppKernel } from '../../app-kernel';

export default class NavigationSection extends BaseSection {
  private navToggle: HTMLElement | null = null;
  private navMenu: HTMLElement | null = null;
  private themeToggle: HTMLElement | null = null;

  init(): void {
    this.navToggle = this.element.querySelector('#nav-toggle');
    this.navMenu = this.element.querySelector('#nav-menu');
    this.themeToggle = this.element.querySelector('#theme-toggle');

    this.initMobileMenu();
    this.initThemeToggle();
  }

  private initMobileMenu(): void {
    if (!this.navToggle || !this.navMenu) return;

    this.navToggle.addEventListener('click', () => {
      const isOpen = this.navMenu?.classList.toggle('nav-menu--open');
      this.navToggle?.classList.toggle('nav-toggle--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    this.navMenu.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu?.classList.remove('nav-menu--open');
        this.navToggle?.classList.remove('nav-toggle--open');
        document.body.style.overflow = '';
      });
    });
  }

  private initThemeToggle(): void {
    if (!this.themeToggle) return;

    this.themeToggle.addEventListener('click', () => {
      AppKernel.getInstance().ui.theme.toggle();
    });
  }
}
