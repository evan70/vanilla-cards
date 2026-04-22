/**
 * Cardboard Auto-Refresh System
 * 
 * Manages periodic refreshing of data for card components.
 */

export interface AutoRefreshOptions {
  interval: number;
  onRefresh: () => Promise<void>;
  enabled?: boolean;
}

export class AutoRefreshSystem {
  private timers = new Map<string, number>();

  /**
   * Register a component for auto-refresh
   */
  register(id: string, options: AutoRefreshOptions): void {
    this.unregister(id);

    if (options.enabled !== false) {
      const timerId = window.setInterval(async () => {
        if (!document.hidden) {
          try {
            await options.onRefresh();
          } catch (error) {
            console.error(`[AutoRefreshSystem] Refresh failed for ${id}:`, error);
          }
        }
      }, options.interval);

      this.timers.set(id, timerId);
    }
  }

  /**
   * Unregister a component
   */
  unregister(id: string): void {
    const timerId = this.timers.get(id);
    if (timerId !== undefined) {
      clearInterval(timerId);
      this.timers.delete(id);
    }
  }

  /**
   * Unregister all components
   */
  destroy(): void {
    this.timers.forEach((timerId) => clearInterval(timerId));
    this.timers.clear();
  }
}

// Export singleton instance
export const autoRefreshSystem = new AutoRefreshSystem();
