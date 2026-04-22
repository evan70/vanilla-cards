import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Skill Card — Skills & competencies
 *
 * **Progress display** — Icon + progress bar + tags
 *
 * Skill card for showcasing technical abilities and proficiency levels.
 *
 * ## Usage
 *
 * ```html
 * <div class="card skill-card">
 *   <div class="skill-card__header">
 *     <div class="skill-card__icon skill-card__icon--gold">A</div>
 *     <div>
 *       <h4 class="skill-card__title">React</h4>
 *       <p class="skill-card__level">Senior</p>
 *     </div>
 *   </div>
 *   <div class="skill-card__progress">
 *     <div class="skill-card__progress-fill" style="width: 90%"></div>
 *   </div>
 *   <span class="skill-card__percentage">90%</span>
 *   <div class="skill-card__tags">
 *     <span class="skill-card__tag">Frontend</span>
 *     <span class="skill-card__tag">JavaScript</span>
 *   </div>
 * </div>
 * ```
 *
 * ## Icon Color Variants
 * Use `.variant-icon-{color}` from utilities:
 * - `.variant-icon-gold`
 * - `.variant-icon-emerald`
 * - `.variant-icon-ruby`
 * - `.variant-icon-sapphire`
 * - `.variant-icon-amethyst`
 */

const meta = {
  title: '0-Core/15. Skill Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Skill Card** displays technical skills with progress indicators.

### Structure

\`\`\`
.card.card--skill
├── .card--skill__header
│   ├── .card--skill__icon
│   ├── .card--skill__title
│   └── .card--skill__level
├── .card--skill__progress
│   └── .card--skill__progress-fill
├── .card--skill__percentage
└── .card--skill__tags
    └── .card--skill__tag
\`\`\`

### Features
- Icon with color variants
- Proficiency level indicator
- Progress bar with animation
- Percentage display
- Skill tags

### Icon Color Variants
Use utilities from \`color-variants.css\`:
- \`variant-icon-gold\`
- \`variant-icon-emerald\`
- \`variant-icon-ruby\`
- \`variant-icon-sapphire\`
- \`variant-icon-amethyst\`

### Modifiers
- \`--compact\`: No progress bar
- \`--minimal\`: Icon + name only

### Related
- [Action Card](/docs/0-core-5-action--docs) - Action cards
        `,
      },
    },
  },
  argTypes: {
    iconColor: {
      control: { type: 'select' },
      options: ['gold', 'emerald', 'ruby', 'sapphire', 'amethyst'],
      description: 'Icon color variant',
      table: {
        type: { summary: 'gold | emerald | ruby | sapphire | amethyst' },
        defaultValue: { summary: 'gold' },
      },
    },
    showLevel: {
      control: { type: 'boolean' },
      description: 'Show proficiency level',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showProgress: {
      control: { type: 'boolean' },
      description: 'Show progress bar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showTags: {
      control: { type: 'boolean' },
      description: 'Show skill tags',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    percentage: {
      control: { type: 'slider', min: 0, max: 100 },
      description: 'Skill percentage',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '75' },
      },
    },
  },
  args: {
    iconColor: 'gold',
    showLevel: true,
    showProgress: true,
    showTags: true,
    percentage: 90,
  },
  render: ({ iconColor, showLevel, showProgress, showTags, percentage }) => {
    const iconColors = {
      gold: 'skill-card__icon--gold',
      emerald: 'skill-card__icon--emerald',
      ruby: 'skill-card__icon--ruby',
      sapphire: 'skill-card__icon--sapphire',
      amethyst: 'skill-card__icon--amethyst',
    };

    const icons = {
      gold: 'A',
      emerald: 'P',
      ruby: 'D',
      sapphire: 'S',
      amethyst: 'F',
    };

    return `
      <div class="card skill-card" style="max-width: 350px;">
        <div class="skill-card__header">
          <div class="skill-card__icon ${iconColors[iconColor]}">${icons[iconColor]}</div>
          <div>
            <h4 class="skill-card__title">React</h4>
            ${showLevel ? '<p class="skill-card__level">Senior</p>' : ''}
          </div>
        </div>
        
        ${showProgress ? `
        <div class="skill-card__progress">
          <div class="skill-card__progress-fill" style="width: ${percentage}%"></div>
        </div>
        ` : ''}
        
        ${showProgress ? `<span class="skill-card__percentage">${percentage}%</span>` : ''}
        
        ${showTags ? `
        <div class="skill-card__tags">
          <span class="skill-card__tag">Frontend</span>
          <span class="skill-card__tag">JavaScript</span>
        </div>
        ` : ''}
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    iconColor: 'gold' | 'emerald' | 'ruby' | 'sapphire' | 'amethyst';
    showLevel: boolean;
    showProgress: boolean;
    showTags: boolean;
    percentage: number;
  };
};

/**
 * Gold Icon — Default variant
 *
 * Skill card with gold icon
 */
export const GoldIcon: Story = {
  args: {
    iconColor: 'gold',
    showLevel: true,
    showProgress: true,
    showTags: true,
    percentage: 90,
  },
  parameters: {
    docs: {
      description: {
        story: '**Gold Icon** is the default variant. Warm, premium feel.',
      },
      source: {
        code: generateCardCode({
          blockName: 'skill-card',
          slots: {
            header: `
  <div class="skill-card__icon skill-card__icon--gold">A</div>
  <div>
    <h4 class="skill-card__title">React</h4>
    <p class="skill-card__level">Senior</p>
  </div>
            `.trim(),
            progress: '<div class="skill-card__progress-fill" style="width: 90%"></div>',
            percentage: '90%',
            tags: `
  <span class="skill-card__tag">Frontend</span>
  <span class="skill-card__tag">JavaScript</span>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Emerald Icon — Green variant
 *
 * Skill card with emerald icon
 */
export const EmeraldIcon: Story = {
  args: {
    iconColor: 'emerald',
    showLevel: true,
    showProgress: true,
    showTags: true,
    percentage: 85,
  },
  parameters: {
    docs: {
      description: {
        story: '**Emerald Icon** for backend, DevOps, or infrastructure skills.',
      },
    },
  },
};

/**
 * Ruby Icon — Red variant
 *
 * Skill card with ruby icon
 */
export const RubyIcon: Story = {
  args: {
    iconColor: 'ruby',
    showLevel: true,
    showProgress: true,
    showTags: true,
    percentage: 80,
  },
  parameters: {
    docs: {
      description: {
        story: '**Ruby Icon** for design, creative, or UI/UX skills.',
      },
    },
  },
};

/**
 * Sapphire Icon — Blue variant
 *
 * Skill card with sapphire icon
 */
export const SapphireIcon: Story = {
  args: {
    iconColor: 'sapphire',
    showLevel: true,
    showProgress: true,
    showTags: true,
    percentage: 75,
  },
  parameters: {
    docs: {
      description: {
        story: '**Sapphire Icon** for database, data, or API skills.',
      },
    },
  },
};

/**
 * Amethyst Icon — Purple variant
 *
 * Skill card with amethyst icon
 */
export const AmethystIcon: Story = {
  args: {
    iconColor: 'amethyst',
    showLevel: true,
    showProgress: true,
    showTags: true,
    percentage: 70,
  },
  parameters: {
    docs: {
      description: {
        story: '**Amethyst Icon** for performance, optimization, or special skills.',
      },
    },
  },
};

/**
 * No Progress — Compact
 *
 * Skill card without progress bar
 */
export const NoProgress: Story = {
  args: {
    iconColor: 'gold',
    showLevel: true,
    showProgress: false,
    showTags: true,
    percentage: 90,
  },
  parameters: {
    docs: {
      description: {
        story: '**No Progress** variant uses \`--compact\` modifier. Cleaner, simpler layout.',
      },
    },
  },
};

/**
 * No Tags — Minimal
 *
 * Skill card without tags
 */
export const NoTags: Story = {
  args: {
    iconColor: 'gold',
    showLevel: true,
    showProgress: true,
    showTags: false,
    percentage: 90,
  },
  parameters: {
    docs: {
      description: {
        story: '**No Tags** focuses on the skill name and proficiency only.',
      },
    },
  },
};
