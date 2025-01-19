/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FAA96c',
        secundary: 'FAD7BE',
        greenaport: '#D7E2B6',
        slateUtil: '#778983'

      }
    },
  },
  plugins: [],
}

