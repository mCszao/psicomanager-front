import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/util/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Brand
        royalBlue: '#4169e1',

        // Semantic surface tokens (background layers)
        surface:           'var(--color-surface)',           // page background
        'surface-raised':  'var(--color-surface-raised)',   // cards, dialogs
        'surface-sunken':  'var(--color-surface-sunken)',   // inputs, code blocks
        'surface-hover':   'var(--color-surface-hover)',    // hover states

        // Semantic content tokens (text)
        'content-primary':   'var(--color-content-primary)',   // headings, body
        'content-secondary': 'var(--color-content-secondary)', // muted / labels
        'content-disabled':  'var(--color-content-disabled)',  // placeholders

        // Semantic border token
        'border-default': 'var(--color-border-default)',
      },
    },
  },
  plugins: [],
};
export default config;
