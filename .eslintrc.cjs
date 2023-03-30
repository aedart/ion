module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/no-explicit-any': ["warn", { "ignoreRestArgs": true }],
        '@typescript-eslint/no-inferrable-types': 'off'
    }
};