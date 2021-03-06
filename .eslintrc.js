module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'standard', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'max-len': [
			'error',
			{
				code: 80,
				tabWidth: 4,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'react/jsx-no-target-blank': 'off',
	},
	ignorePatterns: ['*.png', '*.scss', '*.json'],
	settings: {
		react: {
			version: 'detect',
		},
	},
}
