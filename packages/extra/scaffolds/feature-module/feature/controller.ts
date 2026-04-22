import type { FeatureConfig } from './types';

export class FeatureController {
  private readonly root: HTMLElement;

  private readonly config: FeatureConfig;

  public constructor(root: HTMLElement, config: FeatureConfig) {
    this.root = root;
    this.config = config;
  }

  public init(): void {
    this.render();
    this.bindEvents();
  }

  public destroy(): void {
    this.root.innerHTML = '';
  }

  private render(): void {
    const { title, description, status } = this.config.featureData;

    this.root.innerHTML = `
      <section class="feature" data-state="${this.escapeAttribute(status)}">
        <header class="feature__header">
          <h2 class="feature__title">${this.escapeHtml(title)}</h2>
        </header>
        <div class="feature__body">
          <p class="feature__description">${this.escapeHtml(description)}</p>
        </div>
      </section>
    `;
  }

  private bindEvents(): void {
    this.root.addEventListener('click', this.handleClick);
  }

  private readonly handleClick = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.feature')) {
      return;
    }
  };

  private escapeHtml(value: string): string {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
  }

  private escapeAttribute(value: string): string {
    return this.escapeHtml(value).replace(/"/g, '&quot;');
  }
}

export default FeatureController;
