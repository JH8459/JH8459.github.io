/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './content/**/*.{md,mdx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1080px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Nanum Gothic',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
      },
      maxWidth: {
        content: '720px',
      },
      padding: {
        'content-x': '15px',
      },
      maxHeight: {
        'content-image': '560px',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              borderBottom: '0.05em solid',
              borderColor: 'var(--link-text-color)',
              '&.anchor': {
                borderBottom: 'none',
              },
            },
            hr: {
              height: '0.25em',
              margin: '24px 0',
              backgroundColor: 'var(--markdown-border-color)',
              border: '0',
            },
            blockquote: {
              padding: '0 1em',
              color: '#6a737d',
              borderLeft: '0.25em solid var(--markdown-blockquote-border-color)',
              quotes: 'none',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'code:not(pre > code)': {
              background: 'rgba(135, 131, 120, 0.15)',
              color: '#EB5757',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontSize: '85%',
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
