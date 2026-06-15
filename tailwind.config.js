/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          card: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          gold: 'rgb(var(--color-accent-gold) / <alpha-value>)',
          lightGold: 'rgb(var(--color-accent-gold-hover) / <alpha-value>)',
          cream: 'rgb(var(--color-text-primary) / <alpha-value>)',
          lightCream: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          charcoal: 'rgb(var(--color-text-primary) / <alpha-value>)',
          bronze: 'rgb(var(--color-accent-copper) / <alpha-value>)',
          copper: 'rgb(var(--color-accent-copper) / <alpha-value>)',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #090A0F 0%, #12141C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C5A059 0%, #E5C483 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-delayed': 'fadeIn 0.8s ease-out 0.4s forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
