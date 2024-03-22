/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bandeins: ['Bandeins', 'sans-serif'],
        sen: ['Sen', 'sans-serif'],
      },
      colors: {
        'exxeta-black': '#000000',
        'exxeta-white': '#FFFFFF',
        'exxeta-turqoise': '#46dcff',
        'exxeta-purple': '#8ca5ff',
        'exxeta-yellow': '#ebff59',
        'exxeta-grey': {
          800: '#333333',
          600: '#666666',
          400: '#999999',
          200: '#CCCCCC',
          100: '#E6E6E6',
          50: '#F2F2F2',
          20: '#FAFAFA',
        },
      },
      borderRadius: {
        'exxeta-border-radius': '24px',
      },
      fontSize: {
        'exxeta-icon-16': '16px',
        'exxeta-icon-24': '24px',
        'exxeta-fontsize-3xl': '100px',
        'exxeta-fontsize-xxl': '64px',
        'exxeta-fontsize-xl': '32px',
        'exxeta-fontsize-l': '24px',
        'exxeta-fontsize-mobile-nav': '20px',
        'exxeta-fontsize-m': '16px',
        'exxeta-fontsize-s': '14px',
      },
      boxShadow: {
        'exxeta-boxshadow': '0 8px 24px 0 rgba(0, 0, 0, 0.15);'
      },
      borderWidth: {
        '3': '3px'
      }

    },

    // Overwrite default Tailwind CSS configuration
    spacing: {
      '0': '0px',
      '0.25': '2px',
      '0.5': '4px',
      '1': '8px',
      '1.5': '12px',
      '2': '16px',
      '3': '24px',
      '4': '32px',
      '5': '40px',
      '6': '48px',
      '7': '56px',
      '8': '64px',
      '9': '72px',
      '10': '80px',
      '11': '88px',
      '12': '96px',
      '13': '122px',
      '14': '138px',
      '15': '154px',
      '16': '170px',
      '17': '186px',
      '18': '202px',
    },

  },
  plugins: [],
}

