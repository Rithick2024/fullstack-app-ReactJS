// postcss.config.js
module.exports = {
    plugins: [
      require('@tailwindcss/postcss7-compat'), // Correct plugin for Tailwind CSS
      require('autoprefixer'),
    ],
  }
  