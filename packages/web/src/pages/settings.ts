/**
 * Settings page — tab switching + flash message consumption.
 *
 * Registers itself with the kernel via side-effect import.
 * Migrated from mark/entry-points/mark-settings.ts.
 *
 * Server flash messages are consumed via <meta name="flash-message">
 * which the kernel processes in boot().
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('settings', () => {
  const tabs = document.querySelectorAll('.settings-tab');
  const activeTabInput = document.getElementById('active_tab') as HTMLInputElement | null;

  if (tabs.length === 0) {
    return;
  }

  function activateTab(tabName: string): void {
    document.querySelectorAll('.settings-tab').forEach((tab) => {
      tab.classList.remove('settings-tab--active');
    });

    document.querySelectorAll('.settings-section').forEach((section) => {
      section.classList.remove('settings-section--active');
    });

    const tabElement = document.querySelector(`.settings-tab[data-tab="${tabName}"]`);
    const sectionElement = document.getElementById(tabName);

    if (tabElement) {
      tabElement.classList.add('settings-tab--active');
    }

    if (sectionElement) {
      sectionElement.classList.add('settings-section--active');
    }
  }

  // Add click listeners to tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', function (this: HTMLElement) {
      const tabName = this.getAttribute('data-tab');

      if (!tabName) {
        return;
      }

      activateTab(tabName);

      // Update URL hash without scrolling
      history.pushState(null, '', '#' + tabName);

      // Update hidden input for form submission
      if (activeTabInput) {
        activeTabInput.value = tabName;
      }
    });
  });

  // Activate tab from URL hash on page load
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    activateTab(hash);
    if (activeTabInput) {
      activeTabInput.value = hash;
    }
  } else if (activeTabInput?.value) {
    activateTab(activeTabInput.value);
  }
});
