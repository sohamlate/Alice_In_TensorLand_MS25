export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Fira Code", "Menlo", "Monaco", "Courier New", "monospace"],
      },
    },
  },
  plugins: [
     require('tailwind-scrollbar-hide')
  ],
};
