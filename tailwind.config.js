/** @type {path.PlatformPath | path} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  content: [path.join(__dirname, './src/**/*.{js,jsx,ts,tsx}')],
  theme: {
    extend: {},
    container: {
      center: true
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["dracula"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
