import '@vc/core/kernel/pages/code-enhance.css';

const CodeEnhance = {
  init(): void {
    document.querySelectorAll('pre').forEach((block) => {
      block.classList.add('code-enhance');
    });
  },
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CodeEnhance.init());
} else {
  CodeEnhance.init();
}
