
/**
 * Base story template for all Vanilla Cards
 * 
 * This template provides:
 * - Consistent structure for all card stories
 * - BEM class generation
 * - Variant controls
 * - Code snippet output
 * 
 * @example
 * ```ts
 * import { createCardStory } from '../utils/create-card-story';
 * 
 * const meta = {
 *   component: createCardStory({
 *     blockName: 'my-card',
 *     variants: ['elevated', 'filled', 'outlined'],
 *     slots: ['header', 'body', 'footer'],
 *   }),
 * } satisfies Meta<typeof createCardStory>;
 * ```
 */

export interface CardStoryConfig {
  /** BEM block name (e.g., 'header-card', 'action-card') */
  blockName: string;

  /** Available variants (maps to --variant modifier) */
  variants?: string[];

  /** Available slots */
  slots?: string[];

  /** Default slot content */
  defaultContent?: string;

  /** Additional CSS classes to include */
  additionalClasses?: string[];
}

/**
 * Create a card story with standard controls
 */
export function createCardStory(config: CardStoryConfig) {
  const {
    blockName,
    variants = ['elevated', 'filled', 'outlined'],
    slots = ['header', 'body', 'footer'],
    defaultContent = '',
    additionalClasses = [],
  } = config;

  // Base class
  const baseClass = blockName;
  
  // Create args definition
  const args = {
    variant: variants[0] || 'elevated',
    additionalClasses: additionalClasses.join(' '),
  };

  // Add slot args
  slots.forEach((slot) => {
    args[`slot:${slot}`] = '';
  });

  // Create the story function
  const story = ({ variant, additionalClasses, ...slotArgs }) => {
    const classes = [
      baseClass,
      variant ? `${baseClass}--${variant}` : '',
      additionalClasses,
    ]
      .filter(Boolean)
      .join(' ');

    // Build slot content
    let slotContent = '';
    slots.forEach((slot) => {
      const content = slotArgs[`slot:${slot}`] || '';
      if (content) {
        slotContent += `<div class="${baseClass}__${slot}">${content}</div>`;
      }
    });

    // If no slots defined, use default content
    if (!slotContent && defaultContent) {
      slotContent = defaultContent;
    }

    return `<div class="${classes}">${slotContent}</div>`;
  };

  // Create argTypes for controls
  const argTypes = {
    variant: {
      control: { type: 'select' },
      options: variants,
      description: 'Card visual variant',
      table: {
        type: { summary: variants.join(' | ') },
        defaultValue: { summary: variants[0] },
      },
    },
    additionalClasses: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  };

  // Add slot argTypes
  slots.forEach((slot) => {
    argTypes[`slot:${slot}`] = {
      control: { type: 'text' },
      description: `Content for ${slot} slot`,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    };
  });

  return {
    args,
    argTypes,
    render: story,
  };
}

/**
 * Generate code snippet for a card
 */
export function generateCardCode(config: {
  blockName: string;
  variant?: string;
  modifiers?: string[];
  slots?: Record<string, string>;
  additionalClasses?: string;
}) {
  const { blockName, variant, modifiers = [], slots = {}, additionalClasses = '' } = config;

  const classes = [
    blockName,
    variant ? `${blockName}--${variant}` : '',
    ...modifiers.map(m => `${blockName}--${m}`),
    additionalClasses,
  ]
    .filter(Boolean)
    .join(' ');

  let html = `<div class="${classes}">`;

  Object.entries(slots).forEach(([slotName, content]) => {
    if (content) {
      html += `
  <div class="${blockName}__${slotName}">${content}</div>`;
    }
  });

  html += `
</div>`;

  return html;
}
