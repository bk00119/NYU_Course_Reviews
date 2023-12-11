/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'violet': '#57068C',
        'violet-medium': '#7B5AA6',
        'violet-focus': '#7A27B0',
        'gray-stroke': '#BDBDBD',
      },
      width: {
        '7xl': '80rem'
      }
    },
  },
  plugins: [],
}
