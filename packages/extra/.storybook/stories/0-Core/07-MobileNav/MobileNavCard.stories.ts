import type { Meta, StoryObj } from '@storybook/html-vite';

/**
 * Mobile Nav Card — Mobile navigation panel
 *
 * Uses the EXACT same implementation as /components/cards
 * Structure: header-card + mobile-nav-card + mobile-nav-overlay
 */
const meta = {
  title: '0-Core/07. Mobile Nav Card',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color theme - dark (default) or light',
    },
  },
  args: {
    theme: 'dark',
  },
  render: ({ theme }) => {
    const colors = theme === 'dark'
      ? { bg: '#0a0a0a', card: 'rgba(255,255,255,0.05)', text: '#f1f5f9', border: '#2d2d2d' }
      : { bg: '#f8fafc', card: 'rgba(0,0,0,0.05)', text: '#0f172a', border: '#e2e8f0' };

    return `
    <div style="min-height: 100vh; background: ${colors.bg}; font-family: system-ui, sans-serif;" data-theme="${theme}">
      <!-- Load Design Tokens from CSS file -->
      <link rel="stylesheet" href="/src/Templat@vanilla-cards/styles/tokens/base.css">
      
      <!-- Header Card (same as /components/cards) -->
      <header class="header-card" style="position: fixed; top: 0; left: 0; right: 0; height: 70px; background: ${theme === 'dark' ? 'rgba(10,10,10,0.8)' : 'rgba(255,255,255,0.8)'}; backdrop-filter: blur(8px); border-bottom: 1px solid ${colors.border}; z-index: 1000; padding: 0 2rem;">
        <div class="header-card__inner" style="display: flex; justify-content: space-between; align-items: center; height: 100%; max-width: 1440px; margin: 0 auto;">
          <a href="/" class="header-card__logo" style="font-size: 1.5rem; font-weight: 700; color: ${colors.text}; text-decoration: none;">
            <span>Nativa</span>
            <span class="header-card__logo-dot" style="color: #d4af37;">•</span>
            <span>CMS</span>
          </a>
          
          <div class="header-card__actions" style="display: flex; gap: 0.5rem;">
            <!-- Mobile Menu Toggle -->
            <button class="header-card__action-btn header-card__mobile-toggle" aria-label="Menu" type="button" style="background: none; border: none; color: ${colors.text}; cursor: pointer; padding: 0.5rem; display: flex; align-items: center; justify-content: center;">
              <svg class="header-card__mobile-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle class="header-card__mobile-icon-dot header-card__mobile-icon-dot--top" cx="12" cy="6" r="2.5"/>
                <circle class="header-card__mobile-icon-dot header-card__mobile-icon-dot--middle" cx="12" cy="12" r="2.5"/>
                <circle class="header-card__mobile-icon-dot header-card__mobile-icon-dot--bottom" cx="12" cy="18" r="2.5"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Card (same structure as /components/cards) -->
      <nav class="mobile-nav-card" aria-label="Mobile navigation" hidden>
        <div class="mobile-nav-card__nav">
          <div class="mobile-nav-card__item"><a href="#" class="mobile-nav-card__link" data-page="cards"><span class="mobile-nav-card__text">Cards</span></a></div>
          <div class="mobile-nav-card__item"><a href="#" class="mobile-nav-card__link" data-page="docs"><span class="mobile-nav-card__text">Docs</span></a></div>
          <div class="mobile-nav-card__item"><a href="#" class="mobile-nav-card__link" data-page="blog"><span class="mobile-nav-card__text">Blog</span></a></div>
          <div class="mobile-nav-card__item"><a href="#" class="mobile-nav-card__link" data-page="portfolio"><span class="mobile-nav-card__text">Portfolio</span></a></div>
          <div class="mobile-nav-card__item"><a href="#" class="mobile-nav-card__link" data-page="contact"><span class="mobile-nav-card__text">Contact</span></a></div>
        </div>
      </nav>

      <!-- Mobile Navigation Overlay -->
      <div class="mobile-nav-overlay" hidden></div>

      <!-- Demo content -->
      <main style="padding-top: 120px; padding-left: 2rem; padding-right: 2rem; max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem; color: ${colors.text};">Mobile Navigation Demo</h1>
        <p style="color: ${theme === 'dark' ? '#94a3b8' : '#64748b'}; margin-bottom: 2rem; line-height: 1.6;">
          Click the menu button (top right) to open the mobile navigation.
        </p>
        <p style="color: ${theme === 'dark' ? '#94a3b8' : '#64748b'}; margin-bottom: 2rem; line-height: 1.6;">
          Uses the EXACT same implementation as /components/cards page.
        </p>
        
        <!-- Additional content for scrolling demo -->
        <div style="margin-top: 3rem;">
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: ${colors.text};">Features</h2>
          <ul style="color: ${theme === 'dark' ? '#94a3b8' : '#64748b'}; line-height: 2; margin-bottom: 2rem;">
            <li>Dual Toggle Pattern - Hamburger icon animates to X when opened</li>
            <li>Smooth animations - Slide + fade transitions (300ms)</li>
            <li>Theme-aware - Supports light and dark themes</li>
            <li>Accessible - ARIA attributes, keyboard navigation</li>
            <li>Overlay backdrop - Click to close</li>
          </ul>
        </div>
        
        <div style="margin-top: 3rem;">
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: ${colors.text};">Design Tokens</h2>
          <p style="color: ${theme === 'dark' ? '#94a3b8' : '#64748b'}; margin-bottom: 1rem; line-height: 1.6;">
            This component uses CSS custom properties from <code style="background: ${colors.card}; padding: 0.25rem 0.5rem; border-radius: 4px;">tokens/base.css</code>:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
            <thead>
              <tr style="border-bottom: 2px solid ${colors.border};">
                <th style="text-align: left; padding: 0.75rem; color: ${colors.text};">Token</th>
                <th style="text-align: left; padding: 0.75rem; color: ${colors.text};">Value</th>
                <th style="text-align: left; padding: 0.75rem; color: ${colors.text};">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid ${colors.border};">
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#f9d96e' : '#d4af37'}; font-family: monospace;">--header-height</td>
                <td style="padding: 0.75rem; color: ${colors.text};">70px</td>
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#94a3b8' : '#64748b'};">Header height offset</td>
              </tr>
              <tr style="border-bottom: 1px solid ${colors.border};">
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#f9d96e' : '#d4af37'}; font-family: monospace;">--container-max</td>
                <td style="padding: 0.75rem; color: ${colors.text};">1400px</td>
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#94a3b8' : '#64748b'};">Max container width</td>
              </tr>
              <tr style="border-bottom: 1px solid ${colors.border};">
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#f9d96e' : '#d4af37'}; font-family: monospace;">--space-4</td>
                <td style="padding: 0.75rem; color: ${colors.text};">1rem (16px)</td>
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#94a3b8' : '#64748b'};">Base spacing unit</td>
              </tr>
              <tr style="border-bottom: 1px solid ${colors.border};">
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#f9d96e' : '#d4af37'}; font-family: monospace;">--transition-base</td>
                <td style="padding: 0.75rem; color: ${colors.text};">250ms ease</td>
                <td style="padding: 0.75rem; color: ${theme === 'dark' ? '#94a3b8' : '#64748b'};">Standard transition</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: ${colors.card}; border: 1px solid ${colors.border}; border-radius: 8px;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: ${colors.text};">Accessibility</h3>
          <p style="color: ${theme === 'dark' ? '#94a3b8' : '#64748b'}; line-height: 1.6;">
            The mobile navigation follows WAI-ARIA best practices with proper ARIA labels, 
            keyboard navigation support (Escape to close), and screen reader announcements.
          </p>
        </div>
      </main>

      <script>
        (function() {
          // Design Token: Header height (read from global CSS tokens/base.css)
          const HEADER_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
          
          const mobileMenuBtn = document.querySelector('.card--header__mobile-toggle');
          const mobileMenu = document.querySelector('.card--nav-mobile');
          const mobileOverlay = document.querySelector('.mobile-nav-overlay');

          if (!mobileMenuBtn || !mobileMenu) {
            console.log('[Mobile Nav] Elements not found');
            return;
          }

          console.log('[Mobile Nav] Button:', !!mobileMenuBtn, 'Menu:', !!mobileMenu);

          // CRITICAL: Set initial inline styles (same as header-footer.js)
          mobileMenu.style.display = 'none';
          mobileMenu.style.position = 'fixed';
          mobileMenu.style.top = HEADER_HEIGHT + 'px';
          mobileMenu.style.right = '0';
          mobileMenu.style.bottom = '0';
          mobileMenu.style.width = '280px';
          mobileMenu.style.maxWidth = '80vw';
          mobileMenu.style.background = '${theme === 'dark' ? '#0a0a0a' : '#ffffff'}';
          mobileMenu.style.borderLeft = '1px solid ${colors.border}';
          mobileMenu.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.3)';
          mobileMenu.style.zIndex = '9999';
          mobileMenu.style.overflowY = 'auto';
          mobileMenu.style.opacity = '0';
          mobileMenu.style.visibility = 'hidden';
          mobileMenu.style.transform = 'translateX(100%)';
          mobileMenu.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease';
          
          // Set data-theme for CSS class-based styling when opened
          mobileMenu.setAttribute('data-theme', '${theme}');
          
          // Apply theme-aware styles to links
          const links = mobileMenu.querySelectorAll('.card--nav-mobile__link');
          links.forEach(link => {
            link.style.color = '${theme === 'dark' ? '#f1f5f9' : '#0f172a'}';
            link.style.background = '${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}';
            link.style.borderColor = '${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}';
          });

          if (mobileOverlay) {
            mobileOverlay.style.display = 'none';
            mobileOverlay.style.position = 'fixed';
            mobileOverlay.style.top = HEADER_HEIGHT + 'px';
            mobileOverlay.style.left = '0';
            mobileOverlay.style.right = '0';
            mobileOverlay.style.bottom = '0';
            mobileOverlay.style.background = 'rgba(0, 0, 0, 0.8)';
            mobileOverlay.style.zIndex = '9998';
            mobileOverlay.style.opacity = '0';
            mobileOverlay.style.visibility = 'hidden';
          }

          // SVG Icons
          const Icons = {
            hamburger: \`<svg class="header-card__mobile-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle class="header-card__mobile-icon-dot header-card__mobile-icon-dot--top" cx="12" cy="6" r="2.5"/>
              <circle class="header-card__mobile-icon-dot header-card__mobile-icon-dot--middle" cx="12" cy="12" r="2.5"/>
              <circle class="header-card__mobile-icon-dot header-card__mobile-icon-dot--bottom" cx="12" cy="18" r="2.5"/>
            </svg>\`,
            close: \`<svg class="header-card__mobile-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>\`
          };

          // Inject hamburger icon
          mobileMenuBtn.innerHTML = Icons.hamburger;

          let isOpen = false;

          const openMenu = () => {
            console.log('[Mobile Nav] Opening menu...');
            isOpen = true;
            mobileMenu.removeAttribute('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');

            // Swap to close icon
            mobileMenuBtn.innerHTML = Icons.close;

            // Add body class
            document.body.classList.add('mobile-menu-open');

            // Toggle class
            mobileMenu.classList.add('mobile-nav-card--open');

            // Smooth fade + slide in
            mobileMenu.style.display = 'flex';
            mobileMenu.style.transform = 'translateX(0)';

            requestAnimationFrame(() => {
              mobileMenu.style.opacity = '1';
              mobileMenu.style.visibility = 'visible';
            });

            if (mobileOverlay) {
              mobileOverlay.removeAttribute('hidden');
              mobileOverlay.style.display = 'block';

              requestAnimationFrame(() => {
                mobileOverlay.style.opacity = '1';
                mobileOverlay.style.visibility = 'visible';
              });
            }

            document.body.style.overflow = 'hidden';
            console.log('[Mobile Nav] Menu opened');
          };

          const closeMenu = () => {
            console.log('[Mobile Nav] Closing menu...');
            isOpen = false;
            mobileMenuBtn.setAttribute('aria-expanded', 'false');

            // Swap back to hamburger
            mobileMenuBtn.innerHTML = Icons.hamburger;

            // Remove body class
            document.body.classList.remove('mobile-menu-open');

            // Smooth fade + slide out
            mobileMenu.style.opacity = '0';
            mobileMenu.style.visibility = 'hidden';
            mobileMenu.style.transform = 'translateX(100%)';

            if (mobileOverlay) {
              mobileOverlay.style.opacity = '0';
              mobileOverlay.style.visibility = 'hidden';
            }

            setTimeout(() => {
              if (!isOpen) {
                mobileMenu.setAttribute('hidden', '');
                mobileMenu.classList.remove('mobile-nav-card--open');
                mobileMenu.style.display = 'none';
                mobileMenu.style.transform = 'translateX(0)';

                if (mobileOverlay) {
                  mobileOverlay.setAttribute('hidden', '');
                  mobileOverlay.style.display = 'none';
                }
              }
            }, 300);

            document.body.style.overflow = '';
            console.log('[Mobile Nav] Menu closed');
          };

          // Click handlers
          mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isOpen) {
              closeMenu();
            } else {
              openMenu();
            }
          });

          // Close on overlay click
          if (mobileOverlay) {
            mobileOverlay.addEventListener('click', (e) => {
              e.preventDefault();
              closeMenu();
            });
          }

          // Close on link click
          mobileMenu.querySelectorAll('.card--nav-mobile__link').forEach(link => {
            link.addEventListener('click', () => {
              closeMenu();
            });
          });

          // Close on escape key
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) {
              closeMenu();
            }
          });

          console.log('[Mobile Nav] Initialized (same as /components/cards)');
        })();
      </script>
    </div>
  `;
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Dark theme variant (default)
 */
export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

/**
 * Light theme variant
 */
export const Light: Story = {
  args: {
    theme: 'light',
  },
};
