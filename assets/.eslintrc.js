module.exports = {
  root: true,
  "env": {
    "browser": true,
    "commonjs": true,
    "jquery": true,
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
  },
  "extends": [
    "airbnb",
  ],
  "rules": {
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-console": "error",
  },
};
