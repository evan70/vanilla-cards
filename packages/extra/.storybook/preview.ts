import type { Preview } from '@storybook/html-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Import Cardboard entry point (registers Chart.js + all components)
import '@vanilla-cards/entry-points/cardboard.js';

import '@vanilla-cards/styles/core/index.css';

// Page-specific component CSS (not in core)
import '@vanilla-cards/styles/components/card-abstract.css';
import '@vanilla-cards/styles/components/content-card.css';
import '@vanilla-cards/styles/components/action-card.css';
import '@vanilla-cards/styles/components/stats-card.css';
import '@vanilla-cards/styles/components/notification-card.css';
import '@vanilla-cards/styles/components/viewport-card.css';
import '@vanilla-cards/styles/components/gallery/index.css';
import '@vanilla-cards/styles/components/project-card.css';
import '@vanilla-cards/styles/components/client-card.css';
import '@vanilla-cards/styles/components/case-study-card.css';
import '@vanilla-cards/styles/components/skill-card.css';
import '@vanilla-cards/styles/components/fullscreen-card.css';
import '@vanilla-cards/styles/components/cookie-consent.css';
import '@vanilla-cards/styles/components/portfolio-filter.css';

// Storybook-specific overrides for fixed-position components
const storybookStyles = document.createElement('style');
storybookStyles.id = 'storybook-overrides';
storybookStyles.textContent = `
  /* Ensure story wrapper is above Storybook UI */
  [id^="header-story-"] {
    position: relative !important;
    z-index: 1 !important;
  }
  
  /* Override fixed positioning for Storybook display */
  .card--header--story {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    z-index: 10 !important;
  }
  
  .card--header--story .card--header__inner {
    position: relative;
    z-index: 11;
  }
  
  .card--nav-mobile--story {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    z-index: auto !important;
  }
  
  .viewport-card--story {
    position: relative !important;
  }
`;
document.head.appendChild(storybookStyles);

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'Vanilla Cards — BEM CSS card components with no framework dependencies.',
      },
    },
    viewport: {
      options: {
        iphoneSE: {
          name: 'iPhone SE',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        iphone12Pro: {
          name: 'iPhone 12 Pro',
          styles: {
            width: '390px',
            height: '844px',
          },
          type: 'mobile',
        },
        ipadMini: {
          name: 'iPad Mini',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'tablet',
        },
        ipadPro: {
          name: 'iPad Pro',
          styles: {
            width: '1024px',
            height: '1366px',
          },
          type: 'tablet',
        },
      },
    },
    a11y: {
      context: 'main',
      config: {},
      options: {},
      manual: false,
      test: 'todo',
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  tags: ['autodocs'],
};

export default preview;
