export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Instrument Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },

      fontSize: {
        xs: ["12px", "150%"],
        sm: ["14px", "150%"],
        base: ["16px", "150%"],
        lg: ["18px", "150%"],
        xl: ["24px", "150%"],
        "2xl": ["32px", "150%"],
      },

      fontWeight: {
        regular: "400",
        semibold: "600",
        bold: "700",
      },

      colors: {
        primary: "#633CFF",
        "primary-soft": "#EFEBFF",
        "primary-light": "#BEADFF",
        "text-dark": "#333333",
        "text-gray": "#737373",
        "text-light": "#D9D9D9",
        white: "#FFFFFF",
        "bg-light": "#FAFAFA",
        "bg-soft": "#EFEBFF",
        "border-default": "#D9D9D9",
        "border-dark": "#333333",
        error: "#FF3939",
        success: "#2ECC71",
        warning: "#F1C40F",
        github: "#1A1A1A",
        youtube: "#EE3939",
        linkedin: "#2D68FF",
        twitter: "#43B7E9",
        facebook: "#2442AC",
        twitch: "#9146FF",
        devto: "#333333",
        codewars: "#8A1A50",
        codepen: "#000000",
        freecodecamp: "#302267",
        gitlab: "#EB4925",
        hashnode: "#0330D1",
        stackoverflow: "#EC7100",
        frontendmentor: "#67BECE",
      },

      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },

      boxShadow: {
        sm: "0px 2px 8px rgba(0,0,0,0.05)",
        md: "0px 4px 16px rgba(0,0,0,0.1)",
        focus: "0 0 0 1px #633CFF",
      },

      spacing: {
        18: "72px",
        22: "88px",
        26: "104px",
      },

      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },

  plugins: [],
};
