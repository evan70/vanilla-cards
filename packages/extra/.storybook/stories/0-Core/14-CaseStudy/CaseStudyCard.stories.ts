import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Case Study Card — Results & metrics showcase
 *
 * **Data-driven** — Metrics grid + challenges/solutions
 *
 * Case study card for showcasing project results and metrics.
 *
 * ## Usage
 *
 * ```html
 * <div class="card case-study-card">
 *   <div class="case-study-card__header">
 *     <img class="case-study-card__logo" src="logo.png" alt="Client" />
 *   </div>
 *   <h3 class="case-study-card__title">Project Name</h3>
 *   <p class="case-study-card__subtitle">E-Commerce Platform</p>
 *   
 *   <div class="case-study-card__metrics">
 *     <div class="case-study-card__metric">
 *       <p class="case-study-card__metric-value">+125%</p>
 *       <p class="case-study-card__metric-label">Revenue</p>
 *       <span class="case-study-card__metric-change--positive">+125%</span>
 *     </div>
 *   </div>
 *   
 *   <ul class="case-study-card__list">
 *     <li class="case-study-card__list-item">Challenge 1</li>
 *     <li class="case-study-card__list-item">Challenge 2</li>
 *   </ul>
 *   
 *   <div class="case-study-card__footer">
 *     <a href="#" class="case-study-card__cta">Read Case Study</a>
 *   </div>
 * </div>
 * ```
 */

const meta = {
  title: '0-Core/14. Case Study Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Case Study Card** showcases project results with metrics.

### Structure

\`\`\`
.card.card--case-study
├── .card--case-study__header
│   └── .card--case-study__logo
├── .card--case-study__title
├── .card--case-study__subtitle
├── .card--case-study__metrics
│   └── .card--case-study__metric
│       ├── .card--case-study__metric-value
│       ├── .card--case-study__metric-label
│       └── .card--case-study__metric-change
├── .card--case-study__list
│   └── .card--case-study__list-item
└── .card--case-study__footer
    └── .card--case-study__cta
\`\`\`

### Features
- Client logo header
- 3-column metrics grid
- Positive/negative change indicators
- Challenge/solution checklist
- CTA button

### Metric Change Modifiers
- \`--positive\`: Green background (success)
- \`--negative\`: Red background (warning)

### Related
- [Client Card](/docs/0-core-13-client--docs) - Testimonials
- [Project Card](/docs/0-core-12-project--docs) - Project showcase
        `,
      },
    },
  },
  argTypes: {
    showLogo: {
      control: { type: 'boolean' },
      description: 'Show client logo',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showMetrics: {
      control: { type: 'boolean' },
      description: 'Show metrics grid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showList: {
      control: { type: 'boolean' },
      description: 'Show challenges/solutions list',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    metricCount: {
      control: { type: 'select' },
      options: ['1', '2', '3'],
      description: 'Number of metrics',
      table: {
        type: { summary: '1 | 2 | 3' },
        defaultValue: { summary: '3' },
      },
    },
  },
  args: {
    showLogo: true,
    showMetrics: true,
    showList: true,
    metricCount: '3',
  },
  render: ({ showLogo, showMetrics, showList, metricCount }) => {
    const metrics = [];
    const metricData = [
      { value: '+125%', label: 'Revenue', change: '+125%', positive: true },
      { value: '3.5M', label: 'Users Reached', change: '+85%', positive: true },
      { value: '-40%', label: 'Load Time', change: '-40%', positive: true },
    ];
    
    for (let i = 0; i < parseInt(metricCount); i++) {
      if (metricData[i]) {
        const m = metricData[i];
        metrics.push(`
          <div class="case-study-card__metric">
            <p class="case-study-card__metric-value">${m.value}</p>
            <p class="case-study-card__metric-label">${m.label}</p>
            <span class="case-study-card__metric-change ${m.positive ? 'case-study-card__metric-change--positive' : 'case-study-card__metric-change--negative'}">${m.change}</span>
          </div>
        `);
      }
    }

    return `
      <div class="card case-study-card" style="max-width: 500px;">
        ${showLogo ? `
        <div class="case-study-card__header">
          <img class="case-study-card__logo" src="https://picsum.photos/120/60?grayscale" alt="Client logo" />
        </div>
        ` : ''}
        
        <h3 class="case-study-card__title">E-Commerce Transformation</h3>
        <p class="case-study-card__subtitle">Platform Modernization</p>
        
        ${showMetrics ? `
        <div class="case-study-card__metrics">
          ${metrics.join('')}
        </div>
        ` : ''}
        
        ${showList ? `
        <ul class="case-study-card__list">
          <li class="case-study-card__list-item">Legacy system migration</li>
          <li class="case-study-card__list-item">Mobile experience optimization</li>
          <li class="case-study-card__list-item">Real-time inventory sync</li>
        </ul>
        ` : ''}
        
        <div class="case-study-card__footer">
          <a href="#" class="case-study-card__cta">
            Read Case Study
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    showLogo: boolean;
    showMetrics: boolean;
    showList: boolean;
    metricCount: '1' | '2' | '3';
  };
};

/**
 * Full Case Study — All elements
 *
 * Complete case study with metrics and list
 */
export const FullCaseStudy: Story = {
  args: {
    showLogo: true,
    showMetrics: true,
    showList: true,
    metricCount: '3',
  },
  parameters: {
    docs: {
      description: {
        story: '**Full Case Study** with logo, 3 metrics, and challenges list. Complete results showcase.',
      },
      source: {
        code: generateCardCode({
          blockName: 'case-study-card',
          slots: {
            header: '<img class="case-study-card__logo" src="logo.png" alt="Client" />',
            body: `
  <h3 class="case-study-card__title">Title</h3>
  <p class="case-study-card__subtitle">Subtitle</p>
  <div class="case-study-card__metrics">
    <div class="case-study-card__metric">
      <p class="case-study-card__metric-value">+125%</p>
      <p class="case-study-card__metric-label">Revenue</p>
    </div>
  </div>
  <ul class="case-study-card__list">
    <li class="case-study-card__list-item">Item 1</li>
  </ul>
            `.trim(),
            footer: '<a href="#" class="case-study-card__cta">Read More →</a>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * 1 Metric — Single KPI
 *
 * Case study with single metric
 */
export const OneMetric: Story = {
  args: {
    showLogo: false,
    showMetrics: true,
    showList: false,
    metricCount: '1',
  },
  parameters: {
    docs: {
      description: {
        story: '**1 Metric** focuses on a single key performance indicator. Minimal impact layout.',
      },
    },
  },
};

/**
 * 2 Metrics — Comparison
 *
 * Case study with two metrics
 */
export const TwoMetrics: Story = {
  args: {
    showLogo: true,
    showMetrics: true,
    showList: false,
    metricCount: '2',
  },
  parameters: {
    docs: {
      description: {
        story: '**2 Metrics** for before/after or dual KPI comparisons.',
      },
    },
  },
};

/**
 * No Logo — Clean header
 *
 * Case study without client logo
 */
export const NoLogo: Story = {
  args: {
    showLogo: false,
    showMetrics: true,
    showList: true,
    metricCount: '3',
  },
  parameters: {
    docs: {
      description: {
        story: '**No Logo** variant with clean title-focused header.',
      },
    },
  },
};
