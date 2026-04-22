/**
 * Article Reactions - Vanilla JavaScript Component
 *
 * Allows users to react to articles with like, love, clap, and insightful reactions
 * Supports both authenticated and anonymous users
 */

/**
 * ArticleReactions functionality
 */
const ArticleReactions = {
  /**
   * Reaction types configuration
   */
  REACTION_TYPES: {
    LIKE: 'like',
    LOVE: 'love',
    CLAP: 'clap',
    INSIGHTFUL: 'insightful',
  } as const,

  /**
   * Reaction icons (SVG)
   */
  ICONS: {
    like: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
    love: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    clap: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
    insightful: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
  },

  /**
   * Reaction labels
   */
  LABELS: {
    like: 'Like',
    love: 'Love',
    clap: 'Clap',
    insightful: 'Insightful',
  },

  /**
   * Component state
   */
  state: {
    articleId: '',
    userId: null as string | null,
    totalCount: 0,
    breakdown: {} as Record<string, number>,
    userReaction: null as string | null,
    isLoading: false,
  },

  /**
   * Initialize article reactions
   */
  init(): void {
    const container = document.getElementById('article-reactions');
    if (!container) {
      console.warn('[ArticleReactions] Container not found');
      return;
    }

    // Get data from container attributes
    this.state.articleId = container.dataset.articleId || '';
    this.state.userId = container.dataset.userId || null;
    
    const initialCounts = container.dataset.initialCounts;
    if (initialCounts) {
      try {
        this.state.breakdown = JSON.parse(initialCounts);
        this.state.totalCount = Object.values(this.state.breakdown).reduce((a, b) => a + b, 0);
      } catch (e) {
        console.error('[ArticleReactions] Failed to parse initial counts', e);
        this.state.breakdown = this.getDefaultBreakdown();
      }
    } else {
      this.state.breakdown = this.getDefaultBreakdown();
    }

    this.state.userReaction = container.dataset.userReaction || null;

    this.render();
    this.bindEvents();
    
    console.info('[ArticleReactions] Initialized ✓', {
      articleId: this.state.articleId,
      totalCount: this.state.totalCount,
    });
  },

  /**
   * Get default breakdown with all reaction types
   */
  getDefaultBreakdown(): Record<string, number> {
    return {
      [this.REACTION_TYPES.LIKE]: 0,
      [this.REACTION_TYPES.LOVE]: 0,
      [this.REACTION_TYPES.CLAP]: 0,
      [this.REACTION_TYPES.INSIGHTFUL]: 0,
    };
  },

  /**
   * Render component
   */
  render(): void {
    const container = document.getElementById('article-reactions');
    if (!container) return;

    container.innerHTML = `
      <div class="article-reactions">
        <div class="article-reactions__total">
          <span class="article-reactions__count">${this.state.totalCount}</span>
          <span class="article-reactions__label">reactions</span>
        </div>
        
        <div class="article-reactions__buttons">
          ${Object.entries(this.REACTION_TYPES).map(([key, type]) => this.renderButton(type)).join('')}
        </div>
        
        <div class="article-reactions__breakdown">
          ${Object.entries(this.state.breakdown).map(([type, count]) => this.renderBreakdownItem(type, count)).join('')}
        </div>
      </div>
      
      <style>
        .article-reactions {
          margin-top: 3rem;
          padding: 2rem;
          background: var(--color-bg-alt, #1a1a1a);
          border-radius: 12px;
          border: 1px solid var(--color-border, #2d2d2d);
        }
        
        .article-reactions__total {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .article-reactions__count {
          font-size: 2rem;
          font-weight: 700;
          color: var(--brand-gold, #d4af37);
          display: block;
        }
        
        .article-reactions__label {
          font-size: 0.875rem;
          color: var(--color-text-muted, #9ca3af);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .article-reactions__buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .article-reactions__button {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          padding: 0.75rem 1rem;
          background: var(--color-bg, #0a0a0a);
          border: 2px solid var(--color-border, #2d2d2d);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--color-text, #ffffff);
        }
        
        .article-reactions__button:hover {
          transform: translateY(-2px);
          border-color: var(--brand-gold, #d4af37);
        }
        
        .article-reactions__button--active {
          border-color: var(--brand-gold, #d4af37);
          background: rgba(212, 175, 55, 0.1);
        }
        
        .article-reactions__button svg {
          width: 24px;
          height: 24px;
        }
        
        .article-reactions__button-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .article-reactions__button-count {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-text-muted, #9ca3af);
        }
        
        .article-reactions__breakdown {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border, #2d2d2d);
        }
        
        .article-reactions__breakdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-muted, #9ca3af);
        }
        
        .article-reactions__breakdown-count {
          font-weight: 600;
          color: var(--color-text, #ffffff);
        }
        
        @keyframes reaction-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .article-reactions__button--animating {
          animation: reaction-pop 0.3s ease;
        }
      </style>
    `;
  },

  /**
   * Render reaction button
   */
  renderButton(type: string): string {
    const isActive = this.state.userReaction === type;
    const count = this.state.breakdown[type] || 0;
    
    return `
      <button 
        class="article-reactions__button ${isActive ? 'article-reactions__button--active' : ''}"
        data-reaction-type="${type}"
        aria-label="${this.LABELS[type as keyof typeof this.LABELS]}"
        aria-pressed="${isActive}"
      >
        ${this.ICONS[type as keyof typeof this.ICONS]}
        <span class="article-reactions__button-label">${this.LABELS[type as keyof typeof this.LABELS]}</span>
        <span class="article-reactions__button-count">${count}</span>
      </button>
    `;
  },

  /**
   * Render breakdown item
   */
  renderBreakdownItem(type: string, count: number): string {
    return `
      <div class="article-reactions__breakdown-item">
        <span class="article-reactions__breakdown-count">${count}</span>
        <span>${this.LABELS[type as keyof typeof this.LABELS]}</span>
      </div>
    `;
  },

  /**
   * Bind event listeners
   */
  bindEvents(): void {
    const container = document.getElementById('article-reactions');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const button = (e.target as HTMLElement).closest('[data-reaction-type]');
      if (button) {
        const type = button.getAttribute('data-reaction-type');
        if (type) {
          this.handleReaction(type);
        }
      }
    });
  },

  /**
   * Handle reaction button click
   */
  async handleReaction(type: string): Promise<void> {
    if (this.state.isLoading) return;

    const isSameType = this.state.userReaction === type;
    
    // Optimistic UI update
    if (isSameType && this.state.userReaction) {
      // Remove reaction
      this.updateState(type, -1, null);
      this.state.isLoading = true;
      await this.removeReactionApi();
    } else {
      // Add/update reaction
      const previousReaction = this.state.userReaction;
      if (previousReaction) {
        this.updateState(previousReaction, -1, type);
      } else {
        this.updateState(type, 1, type);
      }
      this.state.isLoading = true;
      await this.addReactionApi(type);
    }

    // Animate button
    this.animateButton(type);
  },

  /**
   * Update component state
   */
  updateState(type: string, countChange: number, newUserReaction: string | null): void {
    this.state.breakdown[type] = (this.state.breakdown[type] || 0) + countChange;
    this.state.totalCount = Object.values(this.state.breakdown).reduce((a, b) => a + b, 0);
    this.state.userReaction = newUserReaction;
    this.render();
    this.bindEvents();
  },

  /**
   * Animate reaction button
   */
  animateButton(type: string): void {
    const container = document.getElementById('article-reactions');
    if (!container) return;

    const button = container.querySelector(`[data-reaction-type="${type}"]`);
    if (button) {
      button.classList.add('article-reactions__button--animating');
      setTimeout(() => button.classList.remove('article-reactions__button--animating'), 300);
    }
  },

  /**
   * Call add reaction API
   */
  async addReactionApi(type: string): Promise<void> {
    try {
      const response = await fetch(`/api/articles/${this.state.articleId}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error('Failed to add reaction');
      }

      const data = await response.json();
      
      // Update state with server response
      this.state.breakdown = data.data.breakdown;
      this.state.totalCount = data.data.total_count;
      this.state.userReaction = data.data.user_reaction;
      this.render();
      this.bindEvents();
      
      console.log('[ArticleReactions] Reaction added', data);
    } catch (error) {
      console.error('[ArticleReactions] API error', error);
      // Revert optimistic update on error
      this.render();
      this.bindEvents();
    } finally {
      this.state.isLoading = false;
    }
  },

  /**
   * Call remove reaction API
   */
  async removeReactionApi(): Promise<void> {
    try {
      const response = await fetch(`/api/articles/${this.state.articleId}/react`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove reaction');
      }

      const data = await response.json();
      
      // Update state with server response
      this.state.breakdown = data.data.breakdown;
      this.state.totalCount = data.data.total_count;
      this.state.userReaction = data.data.user_reaction;
      this.render();
      this.bindEvents();
      
      console.log('[ArticleReactions] Reaction removed', data);
    } catch (error) {
      console.error('[ArticleReactions] API error', error);
      // Revert optimistic update on error
      this.render();
      this.bindEvents();
    } finally {
      this.state.isLoading = false;
    }
  },
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ArticleReactions.init());
} else {
  ArticleReactions.init();
}

// Export for external use
export { ArticleReactions };
