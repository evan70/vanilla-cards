/**
 * Cardboard Data Manager
 * 
 * Handles data fetching, caching, retries, and subscriptions for Cardboard components.
 */

export interface DataManagerConfig {
  cacheTTL: number;
  retryAttempts: number;
  retryDelay: number;
}

export type DataCallback = (data: any) => void;

export class CardboardDataManagerClass {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private subscribers = new Map<string, Set<DataCallback>>();
  private pendingFetches = new Map<string, Promise<any>>();
  private config: DataManagerConfig = {
    cacheTTL: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  };

  /**
   * Configure the data manager
   */
  configure(config: Partial<DataManagerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Fetch data from URL with caching and retries
   */
  async fetch(url: string): Promise<any> {
    // Check cache
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTTL) {
      return cached.data;
    }

    // Check for pending fetch to same URL
    if (this.pendingFetches.has(url)) {
      return this.pendingFetches.get(url);
    }

    const fetchPromise = this.fetchWithRetry(url);
    this.pendingFetches.set(url, fetchPromise);

    try {
      const data = await fetchPromise;
      this.cache.set(url, { data, timestamp: Date.now() });
      this.notifySubscribers(url, data);
      return data;
    } finally {
      this.pendingFetches.delete(url);
    }
  }

  /**
   * Fetch with retry logic
   */
  private async fetchWithRetry(url: string, attempt: number = 1): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt < this.config.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        return this.fetchWithRetry(url, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Subscribe to data updates for a URL
   */
  subscribe(url: string, callback: DataCallback): () => void {
    if (!this.subscribers.has(url)) {
      this.subscribers.set(url, new Set());
    }
    this.subscribers.get(url)!.add(callback);

    // Return unsubscribe function
    return () => {
      const subs = this.subscribers.get(url);
      if (subs) {
        subs.delete(callback);
        if (subs.size === 0) {
          this.subscribers.delete(url);
        }
      }
    };
  }

  /**
   * Invalidate cache for a URL
   */
  invalidate(url: string): void {
    this.cache.delete(url);
  }

  /**
   * Invalidate all cache
   */
  invalidateAll(): void {
    this.cache.clear();
  }

  /**
   * Notify subscribers of new data
   */
  private notifySubscribers(url: string, data: any): void {
    const subs = this.subscribers.get(url);
    if (subs) {
      subs.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[CardboardDataManager] Subscriber error for ${url}:`, error);
        }
      });
    }
  }

  /**
   * Get manager stats
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const CardboardDataManager = new CardboardDataManagerClass();
