/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}", // Include stories if they use Tailwind classes
    // Add other paths that contain Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        'brand-lime': 'var(--color-brand-lime)',
        'brand-dark-gray': 'var(--color-brand-dark-gray)',
        'brand-black': 'var(--color-brand-black)',
        'brand-white': 'var(--color-brand-white)',
      },
      fontFamily: {
        'owners': ['var(--font-owners)', 'sans-serif'], // Include fallback
        'owners-bold': ['var(--font-owners-bold)', 'sans-serif'], // Include fallback
        'inter': ['var(--font-inter)', 'sans-serif'], // Include fallback
        'inter-bold': ['var(--font-inter-bold)', 'sans-serif'], // Include fallback
      },
      // Add other theme extensions if needed
    },
  },
  plugins: [],
}
