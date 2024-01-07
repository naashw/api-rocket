module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: 'tsconfig.eslint.json',
	},
	ignorePatterns: ['node_modules', 'dist'],
	overrides: [
		{
			files: ['src/**/*.ts'],
			plugins: ['@typescript-eslint'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
			],
			parser: '@typescript-eslint/parser',
			rules: {
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: ['interface', 'function', 'class'],
						format: ['StrictPascalCase'],
					},
				],
			},
		},
	],
};
