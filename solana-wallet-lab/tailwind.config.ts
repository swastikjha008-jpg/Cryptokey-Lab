import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050608",
        panel: "rgba(13, 15, 20, 0.72)",
        "panel-line": "rgba(237, 235, 230, 0.09)",
        ink: "#EDEBE6",
        mute: "#8B8F98",
        sol: {
          green: "#14F195",
          violet: "#9945FF",
        },
        eth: {
          blue: "#627EEA",
          light: "#8C9EFF",
        },
        signal: "#E8B94D",
      },
      fontFamily: {
        mono: ["var(--font-jbmono)", "ui-monospace", "monospace"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "sol-gradient": "linear-gradient(135deg, #9945FF 0%, #14F195 100%)",
        "eth-gradient": "linear-gradient(135deg, #627EEA 0%, #8C9EFF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
