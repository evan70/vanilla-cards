/**
 * Auto-refresh mixin for card components.
 * Single source of truth — used across cardboard, stats-card, card-manager.
 */
export interface AutoRefreshable {
  startAutoRefresh(interval: number): void;
  stopAutoRefresh(): void;
}

export function createAutoRefresh(
  refreshFn: () => Promise<void>,
  visibilityCheck = true
): AutoRefreshable {
  let timer: ReturnType<typeof setInterval> | null = null;

  return {
    startAutoRefresh(interval: number): void {
      if (timer) return;
      timer = setInterval(() => {
        if (visibilityCheck && document.hidden) return;
        refreshFn().catch(() => {
          // Silently fail — retry on next interval
        });
      }, interval);
    },

    stopAutoRefresh(): void {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },
  };
}
