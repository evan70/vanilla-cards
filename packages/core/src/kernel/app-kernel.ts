/**
 * AppKernel — minimal registry for all pages.
 *
 * "Max thin and speedy" refactor:
 *   - Only essential modules are in core (Bus, Theme, DOM).
 *   - Heavy modules (Auth, Http, Notifications) are optional and must be registered.
 *
 * @example
 *   // In entry point:
 *   import { AppKernel } from '@vc/core';
 *   import { HttpClient } from '@vc/core'; // or separate package
 *   
 *   AppKernel.init()
 *     .withHttp({ baseUrl: '/api' })
 *     .withNotifications()
 *     .boot();
 */

import { EventBus } from './state/event-bus';
import { HttpClient } from './http/http-client';
import type { HttpClientConfig } from './http/http-client';
import { AuthState } from './auth/auth-state';
import { NotificationService } from './ui/notification';
import { ThemeManager } from './ui/theme-manager';
import { ObserverPool } from './dom/observer';
import { CookieConsent } from './utils/cookie-consent';

type PageInitFn = () => void;

export class AppKernel {
  private static instance: AppKernel | null = null;

  bus: EventBus;
  theme: ThemeManager;
  readonly dom: {
    observer: ObserverPool;
  };

  private _http?: HttpClient;
  private _auth?: AuthState;
  private _notification?: typeof NotificationService;

  private pages = new Map<string, PageInitFn>();
  private booted = false;

  private constructor() {
    this.bus = new EventBus();
    this.theme = new ThemeManager(this.bus);
    this.dom = {
      observer: new ObserverPool(),
    };

    this.setupListeners();
  }

  private setupListeners(): void {
    this.bus.on<{ id: string; variant: string }>('theme:changed', async (data) => {
      if (this.hasHttp()) {
        try {
          await this.http.post('/api/theme', data);
        } catch (err) {
          // Quiet fail
        }
      }
    });
  }

  /**
   * Init the kernel singleton.
   */
  static init(): AppKernel {
    if (!this.instance) {
      this.instance = new AppKernel();
    }
    return this.instance;
  }

  /**
   * Get the kernel instance.
   */
  static getInstance(): AppKernel {
    if (!this.instance) {
      this.instance = new AppKernel();
    }
    return this.instance;
  }

  /**
   * Register custom ThemeManager.
   */
  withTheme(manager: ThemeManager): this {
    this.theme = manager;
    this.theme.setBus(this.bus);
    return this;
  }

  /**
   * Register optional Http module.
   */
  withHttp(config?: Partial<HttpClientConfig>): this {
    this._http = new HttpClient(config);
    return this;
  }

  /**
   * Register optional Auth module.
   */
  withAuth(): this {
    this._auth = new AuthState();
    return this;
  }

  /**
   * Register optional Notifications module.
   */
  withNotifications(): this {
    this._notification = NotificationService;
    return this;
  }

  /**
   * Getters with lazy-check (throws if module not registered).
   */
  get http(): HttpClient {
    if (!this._http) {
      throw new Error('[Kernel] HttpClient not registered. Call .withHttp() during init.');
    }
    return this._http;
  }

  get auth(): AuthState {
    if (!this._auth) {
      throw new Error('[Kernel] AuthState not registered. Call .withAuth() during init.');
    }
    return this._auth;
  }

  get notification(): typeof NotificationService {
    if (!this._notification) {
      throw new Error('[Kernel] NotificationService not registered. Call .withNotifications() during init.');
    }
    return this._notification;
  }

  hasHttp(): boolean { return !!this._http; }
  hasAuth(): boolean { return !!this._auth; }
  hasNotifications(): boolean { return !!this._notification; }

  /**
   * Backward compatibility for ui.notification.
   */
  get ui() {
    return {
      theme: this.theme,
      notification: this.notification,
    };
  }

  /**
   * Register a page init function.
   */
  registerPage(name: string, initFn: PageInitFn): void {
    if (this.pages.has(name)) {
      console.warn(`[Kernel] Page "${name}" already registered, overwriting`);
    }
    this.pages.set(name, initFn);
  }

  /**
   * Boot the kernel.
   */
  boot(): void {
    if (this.booted) {
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.doBoot());
    } else {
      this.doBoot();
    }
  }

  /**
   * Internal boot logic.
   */
  private doBoot(): void {
    if (this.booted) {
      return;
    }
    this.booted = true;

    // 1. Restore auth if present
    if (this._auth) {
      this._auth.restoreFromDom();
    }

    // 2. Init shared UI modules
    this.theme.init();
    
    if (this._notification) {
      this._notification.consumeQueuedFromStorage();
      this.consumeFlashMeta();
    }

    // 3. Find current page
    const page = document.body.dataset.page;

    // 3a. Init cookie consent
    const consent = new CookieConsent();
    consent.init();

    // 3b. Find and init page
    if (page && this.pages.has(page)) {
      const initFn = this.pages.get(page)!;
      try {
        initFn();
      } catch (err) {
        console.error(`[Kernel] Page "${page}" init error:`, err);
        if (this._notification) {
          this._notification.error(`Failed to initialize page: ${page}`);
        }
      }
    }
  }

  /**
   * Consume flash message from <meta>.
   */
  private consumeFlashMeta(): void {
    if (!this._notification) return;
    
    const meta = document.querySelector<HTMLMetaElement>('meta[name="flash-message"]');
    if (!meta) return;

    const message = meta.content;
    const type = (meta.dataset.type as any) || 'info';

    if (message) {
      this._notification.show({ message, type, duration: 5000 });
    }

    meta.remove();
  }

  registeredPages(): string[] {
    return Array.from(this.pages.keys());
  }
}

/**
 * Shorthand for Kernel.init().boot()
 */
export function bootKernel(): AppKernel {
  const kernel = AppKernel.init();
  // By default, boot minimal. Features can be added before boot if needed.
  kernel.boot();
  return kernel;
}
