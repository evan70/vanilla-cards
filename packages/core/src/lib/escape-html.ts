/**
 * Escape HTML to prevent XSS
 * Single source of truth — used across all components.
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
