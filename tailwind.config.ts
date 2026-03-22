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
          50: 'hsl(210, 40%, 96%)',
          100: 'hsl(210, 40%, 90%)',
          200: 'hsl(210, 38%, 80%)',
          300: 'hsl(210, 36%, 65%)',
          400: 'hsl(210, 34%, 50%)',
          500: 'hsl(210, 60%, 38%)',
          600: 'hsl(210, 65%, 30%)',
          700: 'hsl(210, 70%, 22%)',
          800: 'hsl(210, 75%, 15%)',
          900: 'hsl(210, 80%, 10%)',
        },
        accent: {
          DEFAULT: 'hsl(25, 95%, 55%)',
          light: 'hsl(25, 95%, 70%)',
        },
        surface: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          muted: 'hsl(210, 20%, 97%)',
          dark: 'hsl(210, 30%, 8%)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
