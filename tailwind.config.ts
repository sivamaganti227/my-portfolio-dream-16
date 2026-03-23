import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  'hsl(230, 25%, 95%)',
          100: 'hsl(230, 25%, 85%)',
          200: 'hsl(230, 25%, 70%)',
          300: 'hsl(230, 25%, 55%)',
          400: 'hsl(230, 25%, 45%)',
          500: 'hsl(230, 25%, 35%)',
          600: 'hsl(230, 25%, 25%)',
          700: 'hsl(230, 25%, 18%)',
          800: 'hsl(230, 25%, 12%)',
          900: 'hsl(230, 25%, 8%)',
        },
        accent: {
          DEFAULT: 'hsl(263, 70%, 60%)',
          light:   'hsl(263, 70%, 75%)',
          glow:    'hsl(263, 80%, 65%)',
        },
        cyan: {
          DEFAULT: 'hsl(200, 80%, 55%)',
          light:   'hsl(200, 80%, 70%)',
        },
        surface: {
          DEFAULT: 'hsl(230, 25%, 12%)',
          muted:   'hsl(230, 25%, 10%)',
          dark:    'hsl(230, 25%, 6%)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
