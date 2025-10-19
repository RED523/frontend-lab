module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
    'no-var': 'error'
  },
  overrides: [
    {
      files: ['*.vue'],
      extends: ['plugin:vue/vue3-recommended'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
      }
    },
    {
      files: ['*.jsx', '*.tsx'],
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ]
}
