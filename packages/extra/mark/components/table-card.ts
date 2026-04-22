/**
 * TableCard Component
 *
 * Cardboard table card for displaying tabular data with sorting and pagination.
 * Extends vanilla-card with table-specific functionality.
 *
 * @element table-card
 *
 * @attr {string} title - Card title
 * @attr {string} columns - JSON array of columns: [{label, key, sortable}, ...]
 * @attr {string} rows - JSON array of rows: [{key: value}, ...]
 * @attr {string} data-endpoint - API endpoint to fetch data
 * @attr {string} action-url - URL for action button (e.g., "New Article")
 * @attr {string} action-text - Action button text (default: "New")
 * @attr {boolean} sortable - Enable column sorting
 * @attr {number} page - Current page number
 * @attr {number} per-page - Items per page
 * @attr {boolean} loading - Loading state
 *
 * @example
 * ```html
 * <table-card
 *   title="Articles"
 *   columns='[{"label":"Title","key":"title"},{"label":"Author","key":"author"}]'
 *   rows='[{"title":"Article 1","author":"John"}]'
 *   action-url="/articles/new"
 *   action-text="New Article"
 *   sortable
 * ></table-card>
 * ```
 */

import { VanillaCard } from '@vc/core';
import { escapeHtml } from '@vc/core/lib/escape-html';

interface Column {
  label: string;
  key: string;
  sortable?: boolean;
}

interface Row {
  [key: string]: any;
}

export class TableCard extends VanillaCard {
  /**
   * Observed attributes
   */
  static get observedAttributes(): string[] {
    return [
      ...super.observedAttributes,
      'title',
      'columns',
      'rows',
      'data-endpoint',
      'action-url',
      'action-text',
      'sortable',
      'page',
      'per-page',
      'loading'
    ];
  }

  /**
   * Card title
   */
  get title(): string {
    return this.getAttribute('title') || '';
  }

  set title(val: string) {
    this.setAttribute('title', val);
  }

  /**
   * Columns as JSON
   */
  get columns(): Column[] {
    const columnsAttr = this.getAttribute('columns');
    if (!columnsAttr) return [];

    try {
      return JSON.parse(columnsAttr);
    } catch (e) {
      console.error('[TableCard] Invalid JSON for columns', { error: e });
      return [];
    }
  }

  set columns(val: Column[]) {
    this.setAttribute('columns', JSON.stringify(val));
  }

  /**
   * Rows as JSON
   */
  get rows(): Row[] {
    const rowsAttr = this.getAttribute('rows');
    if (!rowsAttr) return [];

    try {
      return JSON.parse(rowsAttr);
    } catch (e) {
      console.error('[TableCard] Invalid JSON for rows', { error: e });
      return [];
    }
  }

  set rows(val: Row[]) {
    this.setAttribute('rows', JSON.stringify(val));
  }

  /**
   * Data endpoint
   */
  get dataEndpoint(): string {
    return this.getAttribute('data-endpoint') || '';
  }

  set dataEndpoint(val: string) {
    this.setAttribute('data-endpoint', val);
  }

  /**
   * Action URL
   */
  get actionUrl(): string {
    return this.getAttribute('action-url') || '';
  }

  set actionUrl(val: string) {
    this.setAttribute('action-url', val);
  }

  /**
   * Action text
   */
  get actionText(): string {
    return this.getAttribute('action-text') || 'New';
  }

  set actionText(val: string) {
    this.setAttribute('action-text', val);
  }

  /**
   * Sortable enabled
   */
  get sortable(): boolean {
    return this.hasAttribute('sortable');
  }

  set sortable(val: boolean) {
    val ? this.setAttribute('sortable', '') : this.removeAttribute('sortable');
  }

  /**
   * Current page
   */
  get page(): number {
    return parseInt(this.getAttribute('page') || '1', 10);
  }

  set page(val: number) {
    this.setAttribute('page', String(val));
  }

  /**
   * Items per page
   */
  get perPage(): number {
    return parseInt(this.getAttribute('per-page') || '20', 10);
  }

  set perPage(val: number) {
    this.setAttribute('per-page', String(val));
  }

  /**
   * Loading state
   */
  get loading(): boolean {
    return this.hasAttribute('loading');
  }

  set loading(val: boolean) {
    val ? this.setAttribute('loading', '') : this.removeAttribute('loading');
  }

  /**
   * Current sort column and direction
   */
  private sortColumn: string = '';
  private sortDirection: 'asc' | 'desc' = 'asc';

  /**
   * Total items (for pagination)
   */
  private totalItems: number = 0;

  /**
   * Called when connected to DOM
   */
  connectedCallback(): void {
    // Set variant to table
    this.setAttribute('variant', 'table');

    // Call parent connectedCallback
    super.connectedCallback();

    // Fetch data if endpoint provided
    if (this.dataEndpoint) {
      this.fetchData();
    } else {
      // Render with provided data
      this.render();
    }

    console.info('[TableCard] Initialized', {
      title: this.title,
      columnCount: this.columns.length,
      rowCount: this.rows.length
    });
  }

  /**
   * Called when attributes change
   */
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (oldValue === newValue) return;

    // Re-render on data changes
    if (['title', 'columns', 'rows', 'page', 'per-page'].includes(name)) {
      this.render();
    }

    // Handle data endpoint changes
    if (name === 'data-endpoint' && this.dataEndpoint) {
      this.fetchData();
    }
  }

  /**
   * Render the table card
   */
  render(): void {
    const headersHtml = this.renderHeaders();
    const rowsHtml = this.renderRows();
    const actionHtml = this.renderAction();
    const paginationHtml = this.renderPagination();

    const escapedTitle = escapeHtml(this.title);

    this.innerHTML = `
      <div class="card__header card__header--with-action">
        <h1 class="card__title">${escapedTitle}</h1>
        ${actionHtml}
      </div>
      <div class="card__content">
        <div class="card--table__wrapper">
          <table class="card--table">
            <thead>
              <tr>${headersHtml}</tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
      ${paginationHtml ? `<div class="card__footer">${paginationHtml}</div>` : ''}
    `;

    // Attach sort event listeners
    if (this.sortable) {
      this.attachSortListeners();
    }
  }

  /**
   * Render column headers
   */
  private renderHeaders(): string {
    return this.columns.map(column => {
      const label = escapeHtml(column.label);
      const labelAttr = this.escapeAttribute(column.label);
      const isSortable = this.sortable && column.sortable !== false;
      const sortClass = isSortable ? 'card--table__header--sortable' : '';
      const sortIcon = this.sortColumn === column.key
        ? (this.sortDirection === 'asc' ? ' ↑' : ' ↓')
        : '';

      return `
        <th
          class="card--table__header ${sortClass}"
          data-column="${this.escapeAttribute(column.key)}"
          ${isSortable ? 'tabindex="0" role="button" aria-label="Sort by ' + labelAttr + '"' : ''}
        >
          ${label}${sortIcon}
        </th>
      `;
    }).join('');
  }

  /**
   * Render table rows
   */
  private renderRows(): string {
    const startIndex = (this.page - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    const paginatedRows = this.rows.slice(startIndex, endIndex);

    return paginatedRows.map(row => {
      const cells = this.columns.map(column => {
        const value = row[column.key] ?? '';
        return `<td>${escapeHtml(String(value))}</td>`;
      }).join('');

      return `<tr>${cells}</tr>`;
    }).join('');
  }

  /**
   * Render action button
   */
  private renderAction(): string {
    if (!this.actionUrl) return '';

    const text = escapeHtml(this.actionText);
    const url = this.escapeAttribute(this.actionUrl);
    return `<a href="${url}" class="btn btn--primary">${text}</a>`;
  }

  /**
   * Render pagination
   */
  private renderPagination(): string {
    const totalPages = Math.ceil(this.rows.length / this.perPage);

    if (totalPages <= 1) return '';

    const currentPage = this.page;
    const pages: (number | string)[] = [];

    // Simple pagination: 1 ... prev current next ... last
    if (currentPage > 3) {
      pages.push(1, '...');
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...', totalPages);
    }

    const pagesHtml = pages.map(page => {
      if (page === '...') {
        return '<span class="card__pagination-ellipsis">...</span>';
      }

      const pageNum = page as number;
      const isActive = pageNum === currentPage;
      const activeClass = isActive ? ' card__pagination-item--active' : '';

      return `
        <button
          class="card__pagination-item${activeClass}"
          data-page="${pageNum}"
          ${isActive ? 'aria-current="page"' : ''}
        >
          ${pageNum}
        </button>
      `;
    }).join('');

    return `
      <div class="card__pagination">
        <button
          class="card__pagination-prev"
          data-page="${currentPage - 1}"
          ${currentPage === 1 ? 'disabled' : ''}
        >
          Previous
        </button>
        ${pagesHtml}
        <button
          class="card__pagination-next"
          data-page="${currentPage + 1}"
          ${currentPage === totalPages ? 'disabled' : ''}
        >
          Next
        </button>
      </div>
    `;
  }

  /**
   * Attach sort event listeners
   */
  private attachSortListeners(): void {
    const headers = this.querySelectorAll('.card--table__header--sortable');

    headers.forEach(header => {
      const columnKey = header.getAttribute('data-column');

      // Click handler
      header.addEventListener('click', () => {
        if (columnKey) {
          this.sortBy(columnKey);
        }
      });

      // Keyboard handler
      header.addEventListener('keydown', (e: Event) => {
        const event = e as KeyboardEvent;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (columnKey) {
            this.sortBy(columnKey);
          }
        }
      });
    });
  }

  /**
   * Sort by column
   */
  sortBy(columnKey: string): void {
    if (this.sortColumn === columnKey) {
      // Toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to asc
      this.sortColumn = columnKey;
      this.sortDirection = 'asc';
    }

    // Sort rows
    const rows = this.rows;
    rows.sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Update rows attribute
    this.rows = rows;

    this.render();

    this.dispatchEvent(new CustomEvent('table:sort', {
      bubbles: true,
      detail: {
        column: columnKey,
        direction: this.sortDirection
      }
    }));
  }

  /**
   * Fetch data from API
   */
  async fetchData(): Promise<void> {
    if (!this.dataEndpoint) {
      return;
    }

    this.loading = true;
    this.showLoading();

    try {
      const response = await fetch(this.dataEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.rows = data.rows || data.items || data;
      this.totalItems = data.total || this.rows.length;

      this.loading = false;
      this.hideLoading();
      this.render();

      this.dispatchEvent(new CustomEvent('table:loaded', {
        bubbles: true,
        detail: { data }
      }));

      console.info('[TableCard] Data loaded', { rowCount: this.rows.length });
    } catch (error) {
      console.error('[TableCard] Fetch failed', { error });
      this.loading = false;
      this.hideLoading();

      this.dispatchEvent(new CustomEvent('table:error', {
        bubbles: true,
        detail: { error }
      }));
    }
  }

  /**
   * Show loading state
   */
  private showLoading(): void {
    this.innerHTML = `
      <div class="cardboard__loading-spinner" aria-label="Loading">
        <svg class="cardboard__spinner" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-dasharray="80"
            stroke-dashoffset="60"
          />
        </svg>
      </div>
    `;
  }

  /**
   * Hide loading state
   */
  private hideLoading(): void {
    // Content will be re-rendered
  }

  /**
   * Escape HTML attribute
   */
  private escapeAttribute(text: string): string {
    return escapeHtml(text)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Update data from external source
   */
  updateData(rows: Row[], total?: number): void {
    this.rows = rows;
    if (total !== undefined) {
      this.totalItems = total;
    }
    this.render();
  }

  /**
   * Go to page
   */
  goToPage(page: number): void {
    const totalPages = Math.ceil(this.rows.length / this.perPage);
    if (page < 1 || page > totalPages) return;

    this.page = page;
    this.render();

    this.dispatchEvent(new CustomEvent('table:page', {
      bubbles: true,
      detail: { page }
    }));
  }
}

// Register custom element
if (!customElements.get('table-card')) {
  customElements.define('table-card', TableCard);
}

// Export for programmatic use
export default TableCard;

// Declare global TypeScript types
declare global {
  interface HTMLElementTagNameMap {
    'table-card': TableCard;
  }

  interface HTMLElementEventMap {
    'table:loaded': CustomEvent<{ data: any }>;
    'table:error': CustomEvent<{ error: Error }>;
    'table:sort': CustomEvent<{ column: string; direction: 'asc' | 'desc' }>;
    'table:page': CustomEvent<{ page: number }>;
  }
}
