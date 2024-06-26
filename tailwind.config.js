module.exports = {
  darkMode: 'class', // Enable class-based dark mode

  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'move-left-right': {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-10px) rotate(-10deg)' },
          '50%': { transform: 'translateX(0) rotate(0deg)' },
          '75%': { transform: 'translateX(10px) rotate(10deg)' },
        },
      },
      animation: {
        'move-left-right': 'move-left-right 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
