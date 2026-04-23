/**
 * fetch-json — backward-compatible re-export.
 *
 * Actual implementation moved to kernel/http/http-client.ts.
 * This file exists so existing imports continue to work during migration.
 *
 * Note: fetchJson() requires Kernel to be initialized first.
 * For new code, use Kernel.http directly.
 */

export {
  getCsrfToken,
  csrfHeaders,
} from '@kernel/http/http-client';

import { AppKernel } from '@kernel/app-kernel';

/**
 * @deprecated Use Kernel.http.get/post/put/delete instead.
 * Requires Kernel.init() to be called first.
 */
export async function fetchJson<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  // Lazy init kernel if not already done (backward compatibility)
  const kernel = AppKernel.init();
  return kernel.http.request<T>(url, options);
}
