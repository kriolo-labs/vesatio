import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          DEFAULT: "#050505",
          50: "#0F0F0F",
          100: "#1A1A1A",
          200: "#252525",
          300: "#303030",
          400: "#404040",
          500: "#505050",
          600: "#606060",
          700: "#707070",
          800: "#808080",
          900: "#909090",
        },
        gold: {
          DEFAULT: "#BF953F",
          light: "#FCF6BA",
          dark: "#B38728",
          dim: "#AA822F",
          50: "#FFFBE6",
          100: "#FFF5CC",
          200: "#FFEB99",
          300: "#FFE066",
          400: "#FFD633",
          500: "#BF953F",
          600: "#997732",
          700: "#735926",
          800: "#4D3C19",
          900: "#261E0D",
        },
        diamond: {
          DEFAULT: "#E6E6E6",
          muted: "#C0C0C0", // Lightened from #A0A0A0
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
        },
        status: {
          success: "#22C55E", // Green-500
          success_bg: "rgba(34, 197, 94, 0.1)",
          warning: "#F59E0B", // Amber-500
          warning_bg: "rgba(245, 158, 11, 0.1)",
          error: "#EF4444", // Red-500
          error_bg: "rgba(239, 68, 68, 0.1)",
          info: "#3B82F6", // Blue-500
          info_bg: "rgba(59, 130, 246, 0.1)",
        },
      },
      fontFamily: {
        serif: ["'Cinzel Decorative'", "Georgia", "serif"],
        sans: ["'Manrope'", "'Inter'", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)",
        "gold-radial": "radial-gradient(circle, rgba(191,149,63,0.15) 0%, rgba(5,5,5,0) 70%)",
        glass:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(191,149,63,0.3)",
        "gold-glow-lg": "0 0 40px rgba(191,149,63,0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-gold": "pulseGold 2s infinite",
        "accordion-down": "accordionDown 0.2s ease-out",
        "accordion-up": "accordionUp 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(191,149,63,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(191,149,63,0.6)" },
        },
        accordionDown: {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        accordionUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
