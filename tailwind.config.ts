import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#5d7a4a',
          dark: '#3d4a3d',
          medium: '#6b7c5e',
          light: '#8a9a7e',
          pale: '#c4d4b8',
        },
        cream: {
          DEFAULT: '#f8f6f3',
          dark: '#f5f2ed',
        },
        text: {
          dark: '#2d3a2d',
          body: '#4a5a4a',
          muted: '#6b7c5e',
        },
        chakra: {
          root: '#E53935',
          sacral: '#FB8C00',
          solar: '#FDD835',
          heart: '#43A047',
          throat: '#1E88E5',
          'third-eye': '#5E35B1',
          crown: '#8E24AA',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
