import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Button Component — Reusable button styles
 *
 * **Core UI element** — Primary, secondary, ghost variants
 *
 * Button component for all user interactions.
 *
 * ## Usage
 *
 * ```html
 * <button class="btn btn--primary">Primary Action</button>
 * <button class="btn btn--secondary">Secondary Action</button>
 * <button class="btn btn--ghost">Ghost Action</button>
 * ```
 *
 * ## Variants
 * - `.btn--primary` - Gold background (main actions)
 * - `.btn--secondary` - Outline (secondary actions)
 * - `.btn--ghost` - Transparent (cancel, dismiss)
 * - `.btn--danger` - Red (delete, destructive)
 * - `.btn--success` - Green (confirm, success)
 *
 * ## Sizes
 * - `.btn--sm` - Small (36px)
 * - `.btn` - Default (44px)
 * - `.btn--lg` - Large (52px)
 */

const meta = {
  title: '0-Core/18. Button',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Button** is the core interactive element.

### Structure

\`\`\`
<button class="btn btn--{variant} btn--{size}">
  <svg class="icon">...</svg> (optional)
  Label
</button>
\`\`\`

### Variants
- **primary**: Gold background (main CTA)
- **secondary**: Outline (secondary actions)
- **ghost**: Transparent (cancel, dismiss)
- **danger**: Red (destructive actions)
- **success**: Green (positive actions)

### Sizes
- **sm**: 36px height (compact UI)
- **default**: 44px height (standard)
- **lg**: 52px height (prominent CTAs)

### Shapes
- **default**: Rounded corners (4px)
- **rounded**: Pill shape (full radius)
- **square**: Sharp corners (2px)

### States
- **hover**: Lift + gold border
- **active**: Scale down (0.98)
- **focus**: Gold ring (2px)
- **disabled**: 50% opacity
- **loading**: Spinner animation

### Accessibility
- ✅ Keyboard focus visible
- ✅ High contrast support
- ✅ Reduced motion support
- ✅ Disabled state

### Related
- [Icon Button](/docs/utilities-icon-buttons--docs) - Icon-only buttons
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger', 'success'],
      description: 'Button variant',
      table: {
        type: { summary: 'primary | secondary | ghost | danger | success' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'rounded', 'square'],
      description: 'Button shape',
      table: {
        type: { summary: 'default | rounded | square' },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Button text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'default',
    label: 'Button',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  render: ({ variant, size, shape, label, disabled, loading, showIcon }) => {
    const classes = ['btn'];
    classes.push(`btn--${variant}`);
    if (size !== 'md') classes.push(`btn--${size}`);
    if (shape !== 'default') classes.push(`btn--${shape}`);
    if (disabled) classes.push('btn--disabled');
    if (loading) classes.push('btn--loading');

    const icon = showIcon ? `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    ` : '';

    return `
      <button class="${classes.join(' ')}" ${disabled ? 'disabled' : ''}>
        ${icon}
        ${label}
      </button>
    `;
  },
};

export default meta;

type Story = {
  args: {
    variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
    size: 'sm' | 'md' | 'lg';
    shape: 'default' | 'rounded' | 'square';
    label: string;
    disabled: boolean;
    loading: boolean;
    showIcon: boolean;
  };
};

/**
 * Primary — Main CTA
 *
 * Gold button for primary actions
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'default',
    label: 'Primary Action',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Primary** button with gold background. Use for main call-to-action buttons.',
      },
      source: {
        code: generateCardCode({
          blockName: 'btn',
          modifiers: ['primary'],
          slots: {
            default: 'Primary Action',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Secondary — Outline
 *
 * Outline button for secondary actions
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    shape: 'default',
    label: 'Secondary Action',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Secondary** button with outline. Use for secondary actions or cancel buttons.',
      },
    },
  },
};

/**
 * Ghost — Transparent
 *
 * Transparent button for subtle actions
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    shape: 'default',
    label: 'Ghost Action',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Ghost** button with no background. Use for dismiss, cancel, or subtle actions.',
      },
    },
  },
};

/**
 * Danger — Destructive
 *
 * Red button for destructive actions
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
    shape: 'default',
    label: 'Delete',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Danger** button in red. Use for delete, remove, or destructive actions.',
      },
    },
  },
};

/**
 * Success — Positive
 *
 * Green button for positive actions
 */
export const Success: Story = {
  args: {
    variant: 'success',
    size: 'md',
    shape: 'default',
    label: 'Confirm',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Success** button in green. Use for confirm, approve, or positive actions.',
      },
    },
  },
};

/**
 * Small — Compact
 *
 * Small button (36px)
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    shape: 'default',
    label: 'Small',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Small** button (36px height). Use in compact UI or dense layouts.',
      },
    },
  },
};

/**
 * Large — Prominent
 *
 * Large button (52px)
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    shape: 'default',
    label: 'Large CTA',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Large** button (52px height). Use for prominent CTAs or hero sections.',
      },
    },
  },
};

/**
 * Rounded — Pill shape
 *
 * Button with full border radius
 */
export const Rounded: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    label: 'Rounded',
    disabled: false,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Rounded** button with pill shape. Modern, friendly appearance.',
      },
    },
  },
};

/**
 * With Icon — Icon + text
 *
 * Button with icon and text
 */
export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'default',
    label: 'Continue',
    disabled: false,
    loading: false,
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**With Icon** shows icon before text. Use for navigation or action buttons.',
      },
      source: {
        code: generateCardCode({
          blockName: 'btn',
          modifiers: ['primary'],
          slots: {
            default: `
  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
  Continue
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Icon Only — Square button
 *
 * Button with icon only (no text)
 */
export const IconOnly: Story = {
  render: () => `
    <div class="btn-group">
      <button class="btn btn--primary btn--icon" aria-label="Settings">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
      <button class="btn btn--secondary btn--icon" aria-label="Search">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
      <button class="btn btn--ghost btn--icon" aria-label="Close">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Icon Only** button uses `btn--icon` class for square shape. Always include `aria-label` for accessibility.',
      },
    },
  },
};

/**
 * Loading State — Spinner
 *
 * Button with loading spinner
 */
export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'default',
    label: 'Loading',
    disabled: false,
    loading: true,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Loading** state shows spinner animation. Text is hidden, button is disabled.',
      },
    },
  },
};

/**
 * Disabled State — Non-interactive
 *
 * Disabled button
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'default',
    label: 'Disabled',
    disabled: true,
    loading: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Disabled** state has 50% opacity and no interactions. Use `disabled` attribute.',
      },
    },
  },
};

/**
 * Button Group — Multiple buttons
 *
 * Group of buttons together
 */
export const ButtonGroup: Story = {
  render: () => `
    <div class="btn-group">
      <button class="btn btn--primary">Accept</button>
      <button class="btn btn--secondary">Decline</button>
      <button class="btn btn--ghost">Cancel</button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Button Group** uses `btn-group` container for consistent spacing. Use for related actions.',
      },
      source: {
        code: `
<div class="btn-group">
  <button class="btn btn--primary">Accept</button>
  <button class="btn btn--secondary">Decline</button>
  <button class="btn btn--ghost">Cancel</button>
</div>
        `.trim(),
        language: 'html',
      },
    },
  },
};

/**
 * Full Width — Block button
 *
 * Button that spans full width
 */
export const FullWidth: Story = {
  render: () => `
    <div style="max-width: 300px;">
      <button class="btn btn--primary btn--full-width">Full Width Button</button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Full Width** button uses `btn--full-width` class. Perfect for mobile CTAs or forms.',
      },
    },
  },
};
