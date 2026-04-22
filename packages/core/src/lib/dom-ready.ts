/**
 * DOM ready utility — executes callback when DOM is ready.
 * Single source of truth — used across all components.
 */
export function onDomReady(fn: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}
