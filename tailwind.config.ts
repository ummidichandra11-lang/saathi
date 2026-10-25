import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saathi: {
          saffron: "#F57C00",
          saffronDark: "#E65100",
          saffronLight: "#FFF3E0",
          green: "#2E7D32",
          greenDark: "#1B5E20",
          greenLight: "#E8F5E9",
          navy: "#0A2540",
          navyMuted: "#1E3A8A",
          sand: "#FAF7F2",
          surface: "#FFFFFF",
          border: "#E2E8F0",
          text: "#1E293B",
          subtext: "#64748B",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
