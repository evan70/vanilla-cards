/**
 * EventBus — lightweight pub/sub for kernel communication.
 *
 * Replaces scattered CustomEvent usage across components.
 *
 * @example
 *   const bus = new EventBus();
 *   const off = bus.on('auth:login', (user) => { ... });
 *   bus.emit('auth:login', { id: 1, name: 'Admin' });
 *   off(); // unsubscribe
 */

export type EventHandler<T = unknown> = (data: T) => void;

export class EventBus {
  private listeners = new Map<string, Set<EventHandler>>();

  /**
   * Emit an event with optional payload.
   */
  emit<T = unknown>(event: string, data?: T): void {
    const handlers = this.listeners.get(event);
    if (!handlers) return;

    for (const handler of handlers) {
      try {
        handler(data as T);
      } catch (err) {
        console.error(`[EventBus] Handler error for "${event}":`, err);
      }
    }
  }

  /**
   * Subscribe to an event. Returns unsubscribe function.
   */
  on<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler as EventHandler);

    return () => {
      this.off(event, handler);
    };
  }

  /**
   * Unsubscribe a specific handler.
   */
  off<T = unknown>(event: string, handler: EventHandler<T>): void {
    this.listeners.get(event)?.delete(handler as EventHandler);
  }

  /**
   * Remove all handlers for an event (or all events if none specified).
   */
  offAll(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Get active event count (debug).
   */
  stats(): { events: number; handlers: number } {
    let handlers = 0;
    for (const set of this.listeners.values()) {
      handlers += set.size;
    }
    return { events: this.listeners.size, handlers };
  }
}
