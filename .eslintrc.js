module.exports = {
  extends: [require.resolve('amper-scripts/config/eslint')],
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-expect-error': 'allow-with-description' }
    ]
  }
};
