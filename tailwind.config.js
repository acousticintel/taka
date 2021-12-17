module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Source Sans Pro', 'san-serif'],
      },
      colors: {
        'dark-blue': "#0F1624"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
