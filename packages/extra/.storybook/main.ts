/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    './stories/0-Core/21-Cardboard/**/*.stories.@(js|jsx|ts|tsx)',
    './stories/0-Core/21-Cardboard/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const path = await import('path');
    const fs = await import('fs');
    return mergeConfig(config, {
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mdx'],
        alias: {
          '@vanilla-cards': path.default.resolve(process.cwd()),
          '@vanilla-cards/styles': path.default.resolve(process.cwd(), 'styles'),
          '@vanilla-cards/mark': path.default.resolve(process.cwd(), 'mark'),
          '@vanilla-cards/assets': path.default.resolve(process.cwd(), 'assets'),
          '@vanilla-cards/components': path.default.resolve(process.cwd(), 'components'),
          '@vanilla-cards/lib': path.default.resolve(process.cwd(), 'lib'),
          '@stories-utils': path.default.resolve(process.cwd(), 'stories/utils'),
        },
      },
      plugins: [
        // Add SVG loader for Analytics stories
        {
          name: 'svg-loader',
          transform(code, id) {
            if (id.endsWith('.svg?raw')) {
              // Read the SVG file content and export as string
              const svgPath = id.replace('?raw', '');
              const svgContent = fs.default.readFileSync(svgPath, 'utf-8');
              return {
                code: `export default ${JSON.stringify(svgContent)};`,
                map: null,
              };
            }
            return null;
          },
        },
      ],
    });
  },
};

export default config;