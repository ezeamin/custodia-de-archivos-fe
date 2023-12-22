const daisyuiLib = require('daisyui');

const daisyuiTheme = require('daisyui/src/theming/themes');

module.exports = {
  content: ['src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiTheme.light,
          primary: '#3f75a8',
          primaryContent: '#ffffff',
          secondary: '#723fa8',
          accent: '#3fa8a6',
          neutral: '#3b8bc4',
          'base-100': '#345ca8',
          info: '#6366f1',
          success: '#16a249',
          warning: '#fbbf24',
          error: '#dc2828',
          '.bg-skeleton': {
            'background-color': '#bcbdbe',
          },
        },
        dark: {
          ...daisyuiTheme.dark,
          primary: '#3f75a8',
          secondary: '#723fa8',
          accent: '#3fa8a6',
          neutral: '#3b8bc4',
          'base-100': '#345ca8',
          info: '#6366f1',
          success: '#16a249',
          warning: '#fbbf24',
          error: '#dc2828',
          '.bg-skeleton': {
            'background-color': '#2d3641',
          },
        },
      },
    ],
  },
  plugins: [daisyuiLib],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        accent: '#3fa9a6',
        'base-100': '#345ca8',
        error: '#dc2828',
        info: '#6366f1',
        neutral: '#3b8bc4',
        primary: '#3f75a8',
        secondary: '#723fa8',
        success: '#16a249',
        warning: '#fbbf24',
      },
    },
  },
};
