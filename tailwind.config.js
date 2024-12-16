/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // screen sizes // https://tailwindcss.com/docs/breakpoints
      xs: '428px', // mobile      // 4 Column    // 16px margin    // 428px xs:
      sm: '768px', // tablet      // 8 Column    // 28px margin    // 768px sm:
      md: '1024px', // medium      // 10 Column   // 40px margin    // 1024px md:
      lg: '1280px', // desktop     // 12 Column   // 52px margin    // 1280px lg:
      xl: '1440px', // desktop     // 12 Column   // 72px margin    // 1440px xl:
      '2xl': '1920px', // desktop     // 24 Column   // 144px margin   // 1920px 2xl:
      '3xl': '2500px', // desktop     // 24 Column   // 206px margin   // 2500px 3xl:
    },
    fontSize: {
      // font sizes
      small: [
        'clamp(12px, calc(16px + 1.6667vw), 14px);',
        {
          // Info text // H6 // prev —— small
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '300',
        },
      ],
      regular: [
        'clamp(1rem, 1.2rem + 0.667rem, 1.05rem);',
        {
          // Paragraph
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '300',
        },
      ],
      increased: [
        'clamp(1.1rem, calc(1.1rem + 1.6667vw), 1.2rem);',
        {
          // H5 // prev —— increased
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
      medium: [
        'clamp(1.25rem, calc(1.25rem + 2.7778vw), 1.5rem);',
        {
          // H4 // prev —— medium
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
      large: [
        'clamp(1.563rem, calc(1.563rem + 3.125vw), 2.25rem);',
        {
          // H3 // prev —— large
          lineHeight: 'clamp(120%, calc(120% + 0.2vw), 120%)',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
      huge: [
        'clamp(1.953rem, calc(1.953rem + 2.6667vw), 3.375rem);',
        {
          // H2 // prev —— huge
          lineHeight: '1',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
      giant: [
        'clamp(2.441rem, calc(2.441rem + 2.1111vw), 5.063rem);',
        {
          // H1 // prev —— giant
          lineHeight: '1',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
    },

    extend: {
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.86, 0, 0.07, 1)',
      },
      transitionDelay: {
        2000: '2000ms',
      },
      transitionDuration: {
        735: '0.735s',
      },
      fontFamily: {
        // font families
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        display: ['var(--display)'],
        outfit: ['var(--font-outfit)'],
      },

      listStyleImage: {
        star: "url('/icons/Vector.png')",
      },

      colors: {
        mørk: '#262723',
        grå: '#C7C9C2',
        lys: '#F4F4E9',
        signal: {
          gul: '#D9FC00',
          pink: 'hsla(317, 100%, 92%, 100)',
        },
        // Superego farver
        green: '#3BE086',
        purple: '#7B61FF',
        lavendar: '#C9A9EA',
        flamingo: '#EABEEE',
        grey: '#5F727F',
        light: {
          base: '#FCFCFC',
          light: '#EFF1F2',
          0: '#FFFFFF',
          50: '#F0F0F0',
          100: '#E0E0E0',
          200: '#C2C2C2',
          300: '#A3A3A3',
          400: '#858585',
        },
        dark: '#242B31',
        black: '#3D3D3D',
      },
      gridTemplateColumns: {
        // 24-column grid
        24: 'repeat(24, minmax(0, 1fr))', // 24-column grid
        12: 'repeat(12, minmax(0, 1fr))', // 12-column grid
        8: 'repeat(8, minmax(0, 1fr))', // 8-column grid
        4: 'repeat(4, minmax(0, 1fr))', // 4-column grid
        3: 'repeat(3, minmax(0, 1fr))', // 3-column grid
        2: 'repeat(2, minmax(0, 1fr))', // 2-column grid
        '3-small': 'repeat(3, minmax(0, 0.1fr))', // 4-column grid
      },
      spacing: {
        // spacing
        4.5: '1.125rem', // 1.125rem =
        5.5: '1.125rem',
        11.5: '2.875rem',
        13: '3.125rem',
        13.5: '3.25rem',
        19: '4.5rem',
        // Viewport Height
        'vh-75': '75vh',
        'vh-100': '100vh',
        'vh-90': '90vh',
        'vh-80': '80vh',
        'vh-85': '85vh',
      },
      gridColumnEnd: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        // NEGETIVE
        '-1': '-1',
        '-2': '-2',
        '-3': '-3',
        '-4': '-4',
        '-5': '-5',
        '-6': '-6',
        '-7': '-7',
        '-8': '-8',
        '-9': '-9',
        '-10': '-10',
        '-11': '-11',
        '-12': '-12',
        '-13': '-13',
        '-14': '-14',
        '-14': '-14',
        '-15': '-15',
        '-16': '-16',
        '-17': '-17',
        '-18': '-18',
        '-19': '-19',
        '-20': '-20',
        '-21': '-21',
        '-22': '-22',
        '-23': '-23',
        '-24': '-24',
      },
      gridColumnStart: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        // NEGETIVE
        '-1': '-1',
        '-2': '-2',
        '-3': '-3',
        '-4': '-4',
        '-5': '-5',
        '-6': '-6',
        '-7': '-7',
        '-8': '-8',
        '-9': '-9',
        '-10': '-10',
        '-11': '-11',
        '-12': '-12',
        '-13': '-13',
        '-14': '-14',
        '-14': '-14',
        '-15': '-15',
        '-16': '-16',
        '-17': '-17',
        '-18': '-18',
        '-19': '-19',
        '-20': '-20',
        '-21': '-21',
        '-22': '-22',
        '-23': '-23',
        '-24': '-24',
      },
      gridColumn: {
        'span-24': 'span 24 / span 24',
        'span-23': 'span 23 / span 23',
        'span-22': 'span 22 / span 22',
        'span-21': 'span 21 / span 21',
        'span-20': 'span 20 / span 20',
        'span-19': 'span 19 / span 19',
        'span-18': 'span 18 / span 18',
        'span-17': 'span 17 / span 17',
        'span-16': 'span 16 / span 16',
        'span-15': 'span 15 / span 15',
        'span-14': 'span 14 / span 14',
        'span-13': 'span 13 / span 13',
      },
      height: (theme) => ({
        'screen/1.1': 'calc(100vh / 1.1)',
        'screen/1.2': 'calc(100vh / 1.2)',
        'screen/1.5': 'calc(100vh / 1.5)',
        'screen/1.6': 'calc(100vh / 1.6)',
        'screen/2': 'calc(100vh / 2)',
        'screen/2.5': 'calc(100vh / 2.5)',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        'screen/6': 'calc(100vh / 6)',
      }),
      minHeight: (theme) => ({
        'screen/1.1': 'calc(100vh / 1.1)',
        'screen/1.2': 'calc(100vh / 1.2)',
        'screen/1.5': 'calc(100vh / 1.5)',
        'screen/1.6': 'calc(100vh / 1.6)',
        'screen/2': 'calc(100vh / 2)',
        'screen/2.5': 'calc(100vh / 2.5)',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        'screen/6': 'calc(100vh / 6)',
      }),
      maxHeight: (theme) => ({
        'screen/1.1': 'calc(100vh / 1.1)',
        'screen/1.2': 'calc(100vh / 1.2)',
        'screen/1.5': 'calc(100vh / 1.5)',
        'screen/1.6': 'calc(100vh / 1.6)',
        'screen/2': 'calc(100vh / 2)',
        'screen/2.5': 'calc(100vh / 2.5)',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        'screen/6': 'calc(100vh / 6)',
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-debug-screens'),
  ],
}
