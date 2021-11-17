/* const colors = {
  primary: "#1976d2", // "#7986cb", //#303f9f
  secondary: "#9c27b0", //"#ff4081",
  paper: "#fff",
  white: "#fff",
  disabled: "#bdbdbd",
  title: "rgba(0, 0, 0, 0.87)",
  body: "rgba(0, 0, 0, 0.54)",
  error: "#d32f2f",
  info: "#0288d1",
  warning: "#ED6C02",
  success: "#2e7d32",
}; */

const colors = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  disabled: "var(--color-disabled)",
  white: "var(--color-white)",
  error: "var(--color-error)",
  info: "var(--color-info)",
  warning: "var(--color-warning)",
  success: "var(--color-success)",
  body: "var(--color-text)",
  title: "var(--color-title)",
};

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    //safelist: ["width-0-important"],
    options: {
      keyframes: false,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        /* primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        disabled: "var(--color-disabled)", */
        ...colors,
        paper: "var(--color-paper)",
        backdrop: "rgba(0, 0, 0, 0.3)",
        //"btn-hover": "var(--color-btn-hover)"
      },
      textColor: {
        //title: "var(--color-title)",
        //body: "var(--color-body)",
        ...colors,
        /* disabled: "var(--color-disabled)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)", */
      },
      borderColor: {
        ...colors,
      },
      maxHeight: {
        600: "600px",
        "9/10": "90%",
      },
      height: {
        18: "72px",
      },
      width: {
        600: "600px",
      },
      minHeight: {
        44: "44px",
        260: "260px",
      },
      minWidth: {
        44: "44px",
      },
      maxWidth: {
        600: "600px",
      },
    },
  },
  variants: {
    extend: {
      padding: ["last"],
    },
  },
  plugins: [],
};
