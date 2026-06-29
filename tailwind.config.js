export default {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // CRITICAL: Disable Tailwind CSS reset to protect existing vanilla CSS
  },
  plugins: [],
}
