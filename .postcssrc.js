// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-advanced-variables": {},
    "postcss-nested": {},
    "postcss-px2rem-exclude": {
      remUnit: 100,
      exclude: /node_modules/i
    },
    "cssnano": {
      zindex: false
    }
  }
}
