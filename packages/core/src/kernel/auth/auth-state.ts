/**
 * AuthState — centralized authentication state.
 *
 * Used by both public (guest check) and mark (user info) pages.
 *
 * @example
 *   const auth = new AuthState();
 *   auth.restoreFromDom();
 *   if (auth.isAuthenticated) { ... }
 */

export interface UserInfo {
  id: number | string;
  name: string;
  email: string;
  role: string;
}

export class AuthState {
  private _user: UserInfo | null = null;

  /**
   * Whether the current user is authenticated.
   */
  get isAuthenticated(): boolean {
    return this._user !== null;
  }

  /**
   * Current user info, or null if guest.
   */
  get user(): UserInfo | null {
    return this._user;
  }

  /**
   * Set user info (called after successful login or restore).
   */
  setUser(user: UserInfo): void {
    this._user = user;
  }

  /**
   * Clear user info (called after logout).
   */
  clearUser(): void {
    this._user = null;
  }

  /**
   * Restore user from DOM data attributes.
   * Looks for <body data-user-id data-user-name data-user-email data-user-role>
   * or <meta name="user-data" content="...json...">.
   */
  restoreFromDom(): void {
    // Try meta tag first (structured JSON)
    const meta = document.querySelector<HTMLMetaElement>('meta[name="user-data"]');
    if (meta?.content) {
      try {
        this._user = JSON.parse(meta.content) as UserInfo;
        return;
      } catch {
        // Fall through to data attributes
      }
    }

    // Try body data attributes
    const body = document.body;
    const id = body.dataset.userId ?? body.dataset.user ?? null;
    const name = body.dataset.userName ?? '';
    const email = body.dataset.userEmail ?? '';
    const role = body.dataset.userRole ?? 'guest';

    if (id) {
      this._user = { id, name, email, role };
    }
  }
}
