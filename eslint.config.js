'use strict';

const { kaho, node } = require('eslint-config-kaho');

module.exports = [
  ...kaho({ ts: { tsconfigPath: './tsconfig.json' } }),
  ...node({ files: ['./eslint.config.js'] })
];
