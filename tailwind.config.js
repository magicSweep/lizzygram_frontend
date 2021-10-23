module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    options: {
      keyframes: false,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        600: "600px",
      },
      minHeight: {
        44: "44px",
      },
      minWidth: {
        44: "44px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
