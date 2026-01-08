import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Hogwarts palette
        night: {
          sky: "hsl(var(--night-sky))",
          deep: "hsl(var(--night-deep))",
        },
        castle: {
          stone: "hsl(var(--castle-stone))",
          dark: "hsl(var(--castle-dark))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          bright: "hsl(var(--gold-bright))",
          dim: "hsl(var(--gold-dim))",
        },
        emerald: {
          DEFAULT: "hsl(var(--emerald))",
          glow: "hsl(var(--emerald-glow))",
        },
        aurora: {
          purple: "hsl(var(--aurora-purple))",
          blue: "hsl(var(--aurora-blue))",
        },
        candle: {
          orange: "hsl(var(--candle-orange))",
          yellow: "hsl(var(--candle-yellow))",
        },
        parchment: {
          DEFAULT: "hsl(var(--parchment))",
          aged: "hsl(var(--parchment-aged))",
        },
        wood: {
          dark: "hsl(var(--wood-dark))",
          medium: "hsl(var(--wood-medium))",
        },
        brass: "hsl(var(--brass))",
        leather: {
          dark: "hsl(var(--leather-dark))",
          medium: "hsl(var(--leather-medium))",
        },
      },
      fontFamily: {
        decorative: ['"Cinzel Decorative"', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0) rotateY(0deg)" },
          "25%": { transform: "translateY(-8px) rotateY(2deg)" },
          "75%": { transform: "translateY(-4px) rotateY(-2deg)" },
        },
        "float-book": {
          "0%, 100%": { transform: "translateY(0) rotateX(0deg) rotateZ(0deg)" },
          "33%": { transform: "translateY(-6px) rotateX(2deg) rotateZ(1deg)" },
          "66%": { transform: "translateY(-3px) rotateX(-1deg) rotateZ(-0.5deg)" },
        },
        "chain-sway": {
          "0%, 100%": { transform: "rotateZ(0deg)" },
          "50%": { transform: "rotateZ(1deg)" },
        },
        "aurora-flow": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)", opacity: "0" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "translateX(200%) skewX(-15deg)", opacity: "0" },
        },
        "cloud-drift": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "candle-flicker": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "25%": { opacity: "1", transform: "scale(1.1)" },
          "50%": { opacity: "0.8", transform: "scale(0.95)" },
          "75%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        "lumos-reveal": {
          "0%": { 
            opacity: "0",
            filter: "brightness(0)",
          },
          "30%": {
            opacity: "0.3",
            filter: "brightness(0.3)",
          },
          "100%": { 
            opacity: "1",
            filter: "brightness(1)",
          },
        },
        "grimoire-open": {
          "0%": { 
            transform: "perspective(2000px) rotateY(-90deg) scale(0.5)",
            opacity: "0"
          },
          "60%": { 
            transform: "perspective(2000px) rotateY(10deg) scale(1.05)",
          },
          "100%": { 
            transform: "perspective(2000px) rotateY(0deg) scale(1)",
            opacity: "1"
          },
        },
        "sparkle-trail": {
          "0%": { 
            transform: "scale(1)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(0)",
            opacity: "0"
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsla(43, 80%, 55%, 0.3), 0 0 40px hsla(43, 80%, 55%, 0.2)"
          },
          "50%": {
            boxShadow: "0 0 40px hsla(43, 80%, 55%, 0.5), 0 0 80px hsla(43, 80%, 55%, 0.3)"
          }
        },
        "book-hover-glow": {
          "0%, 100%": {
            boxShadow: "0 0 30px hsla(43, 80%, 55%, 0.4), 0 0 60px hsla(280, 60%, 45%, 0.2)"
          },
          "50%": {
            boxShadow: "0 0 50px hsla(43, 80%, 55%, 0.6), 0 0 100px hsla(280, 60%, 45%, 0.4)"
          }
        },
      },
      animation: {
        "float-gentle": "float-gentle 8s ease-in-out infinite",
        "float-book": "float-book 6s ease-in-out infinite",
        "chain-sway": "chain-sway 4s ease-in-out infinite",
        "aurora-flow": "aurora-flow 8s ease-in-out infinite",
        "cloud-drift": "cloud-drift 60s linear infinite",
        "candle-flicker": "candle-flicker 2s ease-in-out infinite",
        "lumos-reveal": "lumos-reveal 3s ease-out forwards",
        "grimoire-open": "grimoire-open 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "sparkle-trail": "sparkle-trail 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "book-hover-glow": "book-hover-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
