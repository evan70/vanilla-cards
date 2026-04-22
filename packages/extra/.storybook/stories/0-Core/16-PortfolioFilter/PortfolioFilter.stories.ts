import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Portfolio Filter — Search & category filtering
 *
 * **Filter controls** — Search input + category buttons
 *
 * Portfolio filter component for searching and filtering portfolio items.
 *
 * ## Usage
 *
 * ```html
 * <div class="portfolio-filter">
 *   <div class="portfolio-filter__search">
 *     <input 
 *       class="portfolio-filter__input" 
 *       type="text" 
 *       placeholder="Search projects..." 
 *     />
 *   </div>
 *   <div class="portfolio-filter__buttons">
 *     <button class="portfolio-filter__btn portfolio-filter__btn--active">
 *       All
 *     </button>
 *     <button class="portfolio-filter__btn">Web Design</button>
 *     <button class="portfolio-filter__btn">Branding</button>
 *     <button class="portfolio-filter__btn">Photography</button>
 *   </div>
 * </div>
 * ```
 *
 * ## Hidden State
 * Add `.portfolio-card--hidden` to filtered-out items
 */

const meta = {
  title: '0-Core/16. Portfolio Filter',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Portfolio Filter** provides search and category filtering.

### Structure

\`\`\`
.portfolio-filter
├── .portfolio-filter__search
│   └── .portfolio-filter__input
└── .portfolio-filter__buttons
    └── .portfolio-filter__btn
        └── .portfolio-filter__btn--active
\`\`\`

### Features
- Search input with focus state
- Category filter buttons
- Active state indicator
- Responsive layout (stacks on mobile)
- Real-time filtering support

### Button States
- Default: Transparent background
- \`--active\`: Gold background (selected category)
- Hover: Subtle background change

### JavaScript Integration

\`\`\`javascript
// Filter by category
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('--active'));
    btn.classList.add('--active');
    filterItems(btn.textContent);
  });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  items.forEach(item => {
    const matches = item.title.toLowerCase().includes(query);
    item.classList.toggle('portfolio-card--hidden', !matches);
  });
});
\`\`\`

### Related
- [Project Card](/docs/0-core-12-project--docs) - Portfolio items
- [Gallery Card](/docs/0-core-11-gallery--docs) - Image gallery
        `,
      },
    },
  },
  argTypes: {
    showSearch: {
      control: { type: 'boolean' },
      description: 'Show search input',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    activeCategory: {
      control: { type: 'select' },
      options: ['All', 'Web Design', 'Branding', 'Photography', 'Mobile'],
      description: 'Active category',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'All' },
      },
    },
    showCategories: {
      control: { type: 'boolean' },
      description: 'Show category buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    showSearch: true,
    activeCategory: 'All',
    showCategories: true,
  },
  render: ({ showSearch, activeCategory, showCategories }) => {
    const categories = ['All', 'Web Design', 'Branding', 'Photography', 'Mobile'];

    return `
      <div class="card" style="padding: 0; background: transparent; border: none; box-shadow: none; max-width: 800px;">
        <div class="portfolio-filter">
          ${showSearch ? `
          <div class="portfolio-filter__search">
            <input 
              class="portfolio-filter__input" 
              type="text" 
              placeholder="Search projects..." 
              value=""
            />
          </div>
          ` : ''}
          
          ${showCategories ? `
          <div class="portfolio-filter__buttons">
            ${categories.map(cat => `
            <button class="portfolio-filter__btn ${cat === activeCategory ? 'portfolio-filter__btn--active' : ''}">
              ${cat}
            </button>
            `).join('')}
          </div>
          ` : ''}
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    showSearch: boolean;
    activeCategory: 'All' | 'Web Design' | 'Branding' | 'Photography' | 'Mobile';
    showCategories: boolean;
  };
};

/**
 * Full Filter — Search + Categories
 *
 * Complete filter with search and all categories
 */
export const FullFilter: Story = {
  args: {
    showSearch: true,
    activeCategory: 'All',
    showCategories: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Full Filter** with search input and all category buttons. Default layout for portfolio pages.',
      },
      source: {
        code: generateCardCode({
          blockName: 'portfolio-filter',
          slots: {
            search: '<input class="portfolio-filter__input" type="text" placeholder="Search..." />',
            buttons: `
  <button class="portfolio-filter__btn portfolio-filter__btn--active">All</button>
  <button class="portfolio-filter__btn">Web Design</button>
  <button class="portfolio-filter__btn">Branding</button>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Search Only — No categories
 *
 * Filter with just search input
 */
export const SearchOnly: Story = {
  args: {
    showSearch: true,
    activeCategory: 'All',
    showCategories: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Search Only** for simple text-based filtering. Clean, minimal interface.',
      },
    },
  },
};

/**
 * Categories Only — No search
 *
 * Filter with just category buttons
 */
export const CategoriesOnly: Story = {
  args: {
    showSearch: false,
    activeCategory: 'Web Design',
    showCategories: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Categories Only** for category-based navigation. Good for small portfolios.',
      },
    },
  },
};

/**
 * All Categories — 5 buttons
 *
 * Filter with all category options
 */
export const AllCategories: Story = {
  args: {
    showSearch: true,
    activeCategory: 'All',
    showCategories: true,
  },
  render: () => `
    <div class="card" style="padding: 0; background: transparent; border: none; box-shadow: none; max-width: 900px;">
      <div class="portfolio-filter">
        <div class="portfolio-filter__search">
          <input 
            class="portfolio-filter__input" 
            type="text" 
            placeholder="Search projects..." 
          />
        </div>
        <div class="portfolio-filter__buttons">
          <button class="portfolio-filter__btn portfolio-filter__btn--active">All</button>
          <button class="portfolio-filter__btn">Web Design</button>
          <button class="portfolio-filter__btn">Branding</button>
          <button class="portfolio-filter__btn">Photography</button>
          <button class="portfolio-filter__btn">Mobile</button>
          <button class="portfolio-filter__btn">E-Commerce</button>
          <button class="portfolio-filter__btn">UI/UX</button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**All Categories** with extended category list. Buttons wrap on smaller screens.',
      },
    },
  },
};

/**
 * Mobile View — Stacked layout
 *
 * Filter in mobile responsive layout
 */
export const MobileView: Story = {
  render: () => `
    <div class="card" style="padding: 0; background: transparent; border: none; box-shadow: none; max-width: 400px;">
      <div class="portfolio-filter" style="flex-direction: column; align-items: stretch;">
        <div class="portfolio-filter__search" style="max-width: none; margin-bottom: 1rem;">
          <input 
            class="portfolio-filter__input" 
            type="text" 
            placeholder="Search projects..." 
          />
        </div>
        <div class="portfolio-filter__buttons" style="flex-wrap: wrap;">
          <button class="portfolio-filter__btn portfolio-filter__btn--active">All</button>
          <button class="portfolio-filter__btn">Web Design</button>
          <button class="portfolio-filter__btn">Branding</button>
          <button class="portfolio-filter__btn">Photography</button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Mobile View** stacks search and buttons vertically. Buttons wrap for multiple rows.',
      },
    },
  },
};
