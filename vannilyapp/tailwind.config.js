/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C1C1C',
        button: '#8B1689',
        background: '#8B1689',
        bar: '#CA2BC7',
        productCarousel: "#e83cff",
        title: '#A61EA4'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: []
}
