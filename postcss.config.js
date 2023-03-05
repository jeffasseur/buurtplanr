module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'custom-media-queries': {
          // Useful if you use a form of scoped CSS (CSS Modules for example).
          importFrom: './src/assets/styles/media-queries.css'
        }
      }
    }
  }
}
