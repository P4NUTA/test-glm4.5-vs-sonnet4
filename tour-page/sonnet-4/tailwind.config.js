/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        senior: {
          50: '#fefdf8',
          100: '#fefbeb',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      fontSize: {
        'senior-sm': ['16px', '24px'],
        'senior-base': ['18px', '28px'],
        'senior-lg': ['20px', '32px'],
        'senior-xl': ['24px', '36px'],
        'senior-2xl': ['30px', '42px'],
      },
      spacing: {
        'senior': '2rem',
      },
      borderRadius: {
        'senior': '0.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}