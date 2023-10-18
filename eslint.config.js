import antfu from '@antfu/eslint-config'

export default antfu({

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    'README.md',
  ],

  rules: {
    'node/prefer-global/process': 'off',
  },
})
