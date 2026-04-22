import { addons } from 'storybook/manager-api';

addons.register('theme-sync', () => {
  const channel = addons.getChannel();
  
  channel.on('globalsUpdated', ({ globals }) => {
    const theme = globals?.theme || 'light';
    
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    const docsStory = document.getElementById('storybook-docs');
    if (docsStory) {
      docsStory.setAttribute('data-theme', theme);
      docsStory.classList.forEach(cls => {
        if (cls.startsWith('css-')) {
          docsStory.classList.add(`${cls}-theme-synced`);
        }
      });
    }
  });
});
