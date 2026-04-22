/**
 * HttpClient — single source for all HTTP requests.
 *
 * Absorbs lib/fetch-json.ts with added CSRF, retry, timeout.
 *
 * @example
 *   const http = new HttpClient();
 *   const data = await http.get<User>('/api/user');
 *   const result = await http.post('/mark/login', { email, password });
 */

export interface HttpClientConfig {
  baseUrl: string;
  timeoutMs: number;
  retryAttempts: number;
  retryDelayMs: number;
}

const DEFAULT_CONFIG: Partial<HttpClientConfig> = {
  baseUrl: '',
  timeoutMs: 10_000,
  retryAttempts: 3,
  retryDelayMs: 1_000,
};

/**
 * Get CSRF token from meta tag or empty string.
 */
export function getCsrfToken(): string {
  return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
}

/**
 * Headers that include CSRF token for state-changing requests.
 */
export function csrfHeaders(): Record<string, string> {
  const token = getCsrfToken();
  return token ? { 'X-CSRF-Token': token } : {};
}

export class HttpClient {
  private config: HttpClientConfig;

  constructor(overrides?: Partial<HttpClientConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...overrides } as HttpClientConfig;
  }

  /**
   * Merge new config into existing config (for late init).
   */
  applyConfig(overrides: Partial<HttpClientConfig>): void {
    this.config = { ...this.config, ...overrides };
  }

  /**
   * GET request.
   */
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { method: 'GET', ...options });
  }

  /**
   * POST request with JSON body.
   */
  async post<T>(url: string, body?: Record<string, unknown>, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...csrfHeaders(), ...options?.headers },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * PUT request with JSON body.
   */
  async put<T>(url: string, body?: Record<string, unknown>, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...csrfHeaders(), ...options?.headers },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * DELETE request.
   */
  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
      headers: { ...csrfHeaders(), ...options?.headers },
      ...options,
    });
  }

  /**
   * Raw request with retry and timeout.
   */
  async request<T>(url: string, options: RequestInit = {}, attempt = 1): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseUrl}${url}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const response = await fetch(fullUrl, {
        ...options,
        signal: controller.signal,
        credentials: options.credentials ?? 'include',
      });

      clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      if (!text) return {} as T;

      try {
        return JSON.parse(text) as T;
      } catch {
        return text as unknown as T;
      }
    } catch (error) {
      clearTimeout(timer);

      if (attempt < this.config.retryAttempts && this.isRetryable(error)) {
        const delay = this.config.retryDelayMs * attempt;
        await new Promise((r) => setTimeout(r, delay));
        return this.request<T>(url, options, attempt + 1);
      }

      throw error;
    }
  }

  /**
   * Check if error is retryable (network error, not abort).
   */
  private isRetryable(error: unknown): boolean {
    return error instanceof DOMException && error.name === 'AbortError'
      ? false
      : true;
  }
}
