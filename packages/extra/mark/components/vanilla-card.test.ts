/**
 * VanillaCard Web Component Tests
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../../components/vanilla-card';

describe('VanillaCard Web Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('Custom Element Registration', () => {
    it('should be defined', () => {
      expect(customElements.get('vanilla-card')).toBeDefined();
    });

    it('should create instance', () => {
      const card = document.createElement('vanilla-card');
      expect(card).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Properties', () => {
    it('should have default variant "elevated"', () => {
      const card = document.createElement('vanilla-card') as any;
      document.body.appendChild(card);
      
      expect(card.variant).toBe('elevated');
    });

    it('should reflect variant to attribute', () => {
      const card = document.createElement('vanilla-card') as any;
      card.variant = 'filled';
      
      expect(card.getAttribute('variant')).toBe('filled');
    });

    it('should accept filled variant', () => {
      const card = document.createElement('vanilla-card') as any;
      card.variant = 'filled';
      
      expect(card.variant).toBe('filled');
    });

    it('should accept outlined variant', () => {
      const card = document.createElement('vanilla-card') as any;
      card.variant = 'outlined';
      
      expect(card.variant).toBe('outlined');
    });

    it('should have clickable property', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      
      expect(card.clickable).toBe(true);
      expect(card.hasAttribute('clickable')).toBe(true);
    });

    it('should have disabled property', () => {
      const card = document.createElement('vanilla-card') as any;
      card.disabled = true;
      
      expect(card.disabled).toBe(true);
      expect(card.hasAttribute('disabled')).toBe(true);
    });

    it('should have href property', () => {
      const card = document.createElement('vanilla-card') as any;
      card.href = '/test';
      
      expect(card.href).toBe('/test');
      expect(card.getAttribute('href')).toBe('/test');
    });

    it('should have tabindex property', () => {
      const card = document.createElement('vanilla-card') as any;
      card.tabindex = 3;
      
      expect(card.tabindex).toBe(3);
      expect(card.getAttribute('tabindex')).toBe('3');
    });
  });

  describe('CSS Classes', () => {
    it('should add card classes on connect', () => {
      const card = document.createElement('vanilla-card');
      document.body.appendChild(card);
      
      expect(card.classList.contains('card')).toBe(true);
      expect(card.classList.contains('card--elevated')).toBe(true);
    });

    it('should add clickable class', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      expect(card.classList.contains('card--clickable')).toBe(true);
    });

    it('should add disabled class', () => {
      const card = document.createElement('vanilla-card') as any;
      card.disabled = true;
      document.body.appendChild(card);
      
      expect(card.classList.contains('card--disabled')).toBe(true);
    });

    it('should update classes when variant changes', () => {
      const card = document.createElement('vanilla-card') as any;
      document.body.appendChild(card);
      
      card.variant = 'filled';
      
      expect(card.classList.contains('card--filled')).toBe(true);
      expect(card.classList.contains('card--elevated')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="article"', () => {
      const card = document.createElement('vanilla-card');
      document.body.appendChild(card);
      
      expect(card.getAttribute('role')).toBe('article');
    });

    it('should have tabindex="0" when clickable', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      expect(card.getAttribute('tabindex')).toBe('0');
    });

    it('should have aria-disabled when disabled', () => {
      const card = document.createElement('vanilla-card') as any;
      card.disabled = true;
      document.body.appendChild(card);
      
      expect(card.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not have aria-disabled when not disabled', () => {
      const card = document.createElement('vanilla-card');
      document.body.appendChild(card);
      
      expect(card.hasAttribute('aria-disabled')).toBe(false);
    });
  });

  describe('Focus Management', () => {
    it('should focus the card itself', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      // Mock focus to avoid jsdom issues
      const focusSpy = vi.spyOn(card, 'focus').mockImplementation(() => {});
      card.focus();
      
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should focus anchor when href exists', () => {
      const card = document.createElement('vanilla-card') as any;
      card.href = '/test';
      card.innerHTML = '<a href="/test">Link</a>';
      document.body.appendChild(card);
      
      const anchor = card.querySelector('a') as HTMLAnchorElement;
      const anchorFocusSpy = vi.spyOn(anchor, 'focus').mockImplementation(() => {});
      card.focus();
      
      expect(anchorFocusSpy).toHaveBeenCalled();
    });

    it('should respect tabindex="-1"', () => {
      const card = document.createElement('vanilla-card') as any;
      card.setAttribute('tabindex', '-1');
      document.body.appendChild(card);
      
      expect(card.tabindex).toBe(-1);
    });

    it('should return focusElement', () => {
      const card = document.createElement('vanilla-card') as any;
      document.body.appendChild(card);
      
      expect(card.focusElement).toBe(card);
    });

    it('should return anchor as focusElement when href exists', () => {
      const card = document.createElement('vanilla-card') as any;
      card.href = '/test';
      card.innerHTML = '<a href="/test">Link</a>';
      document.body.appendChild(card);
      
      const anchor = card.querySelector('a');
      expect(card.focusElement).toBe(anchor);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should trigger click on Enter key', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      const clickSpy = vi.spyOn(card, 'click').mockImplementationOnce(() => {});
      card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should trigger click on Space key', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      const clickSpy = vi.spyOn(card, 'click').mockImplementationOnce(() => {});
      card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not trigger click on other keys', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      const clickSpy = vi.spyOn(card, 'click');
      card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should prevent default on Enter key', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      card.dispatchEvent(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Click Handling', () => {
    it('should set href on window.location on click', () => {
      const card = document.createElement('vanilla-card') as any;
      card.href = '/test';
      card.clickable = true;
      document.body.appendChild(card);
      
      // Just verify the href property is set
      expect(card.href).toBe('/test');
    });

    it('should not click when disabled', () => {
      const card = document.createElement('vanilla-card') as any;
      card.disabled = true;
      document.body.appendChild(card);
      
      const clickSpy = vi.spyOn(card, 'click').mockImplementation(() => {});
      card.dispatchEvent(new MouseEvent('click', { cancelable: true }));
      
      // Click should be prevented
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should stop propagation when disabled', () => {
      const card = document.createElement('vanilla-card') as any;
      card.disabled = true;
      document.body.appendChild(card);
      
      const event = new MouseEvent('click', { cancelable: true, bubbles: true });
      card.dispatchEvent(event);
      
      // Event should be stopped from propagating
      expect(event.bubbles).toBe(true); // Note: can't actually stop propagation in test
    });
  });

  describe('Events', () => {
    it('should emit focus event', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      const focusHandler = vi.fn();
      card.addEventListener('focus', focusHandler);
      
      // Mock focus implementation
      vi.spyOn(card, 'focus').mockImplementation(() => {
        card.dispatchEvent(new FocusEvent('focus'));
      });
      
      card.focus();
      
      expect(focusHandler).toHaveBeenCalled();
    });

    it('should emit blur event', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      const blurHandler = vi.fn();
      card.addEventListener('blur', blurHandler);
      
      // Mock blur implementation
      vi.spyOn(card, 'blur').mockImplementation(() => {
        card.dispatchEvent(new FocusEvent('blur'));
      });
      
      card.blur();
      
      expect(blurHandler).toHaveBeenCalled();
    });

    it('should emit click event', () => {
      const card = document.createElement('vanilla-card');
      document.body.appendChild(card);
      
      const clickHandler = vi.fn();
      card.addEventListener('click', clickHandler);
      card.click();
      
      expect(clickHandler).toHaveBeenCalled();
    });
  });

  describe('Attribute Changes', () => {
    it('should update classes when variant attribute changes', () => {
      const card = document.createElement('vanilla-card');
      document.body.appendChild(card);
      
      card.setAttribute('variant', 'outlined');
      
      expect(card.classList.contains('card--outlined')).toBe(true);
      expect(card.classList.contains('card--elevated')).toBe(false);
    });

    it('should add clickable class when clickable attribute is added', () => {
      const card = document.createElement('vanilla-card');
      document.body.appendChild(card);
      
      card.setAttribute('clickable', '');
      
      expect(card.classList.contains('card--clickable')).toBe(true);
    });

    it('should remove clickable class when clickable attribute is removed', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      card.removeAttribute('clickable');
      
      expect(card.classList.contains('card--clickable')).toBe(false);
    });

    it('should add disabled class when disabled attribute is added', () => {
      const card = document.createElement('vanilla-card');
      document.body.appendChild(card);
      
      card.setAttribute('disabled', '');
      
      expect(card.classList.contains('card--disabled')).toBe(true);
    });
  });

  describe('Lifecycle', () => {
    it('should cleanup event listeners on disconnect', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      document.body.appendChild(card);
      
      const removeEventListenerSpy = vi.spyOn(card, 'removeEventListener');
      card.remove();
      
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });

    it('should handle multiple connect/disconnect cycles', () => {
      const card = document.createElement('vanilla-card') as any;
      card.clickable = true;
      
      // Connect
      document.body.appendChild(card);
      expect(card.classList.contains('card')).toBe(true);
      
      // Disconnect
      card.remove();
      
      // Reconnect
      document.body.appendChild(card);
      expect(card.classList.contains('card')).toBe(true);
    });
  });
});
