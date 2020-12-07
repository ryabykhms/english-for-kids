module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb/base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'class-methods-use-this': ['warn'],
    'no-useless-constructor': ['warn'],
    'prettier/prettier': ['error'],
  },
};
