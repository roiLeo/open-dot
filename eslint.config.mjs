// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default withNuxt([
  eslintConfigPrettier,
  // Custom configs here
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      // 'no-var': 'error',
      // 'unicorn/no-for-loop': 'error',
      // 'max-classes-per-file': ['error', 2]

      // General
      'no-useless-catch': 1,
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { 'avoidEscape': false }],
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'never'],
      'linebreak-style': ['error', 'unix'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-function-paren': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true, 'mode': 'strict' }],
      'sort-imports': ['warn', { 'ignoreDeclarationSort': true, 'allowSeparatedGroups': true }],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': ['error', { 'int32Hint': false }],

      // Typescript
      '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/type-annotation-spacing': 'error',

      // Vuejs
      'vue/multi-word-component-names': 0,
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2, { 'baseIndent': 0 }],
      'vue/keyword-spacing': ['error', { 'before': true, 'after': true }],
      'vue/object-curly-spacing': ['error', 'always'],
      'vue/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true, 'mode': 'strict' }],
      'vue/arrow-spacing': ['error', { 'before': true, 'after': true }],
      'vue/array-bracket-spacing': ['error', 'never'],
      'vue/block-spacing': ['error', 'always'],
      'vue/brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
      'vue/no-mutating-props': 0,
      'vue/space-infix-ops': ['error', { 'int32Hint': false }],
      'vue/max-attributes-per-line': ['error', { 'singleline': { 'max': 10 } }],
      'vue/padding-line-between-blocks': ['error', 'always']
    }
  }
])
