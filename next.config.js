const withForgetti = require('forgetti-loader/next');

const nextConfig = withForgetti({
  // Forgetti options. See https://github.com/lxsmnsyc/forgetti/tree/main#configuration for more details.
  preset: 'react'
})({
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  output: 'standalone'
});

module.exports = nextConfig;
