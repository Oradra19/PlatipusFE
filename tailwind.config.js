/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biru-muda': '#2F57EB',
        'biru-tua': '#0D1B2A',
        'emas': '#FFC947',
        'putih': '#EAE4E4',
        'abu-abu': '#A3A3A3'
      },
    },
  },
  plugins: [],
};
