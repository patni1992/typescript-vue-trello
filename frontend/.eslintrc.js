module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript', '@vue/prettier'],
    
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "class-methods-use-this": "off",
        "import/no-cycle": "off",
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],

    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
};
