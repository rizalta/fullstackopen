module.exports = {
	"env": {
		"node": true,
		"es2021": true,
	},
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module",
	},
	"plugins": [
		"@stylistic/js"
	],
	"extends": "eslint:recommended",
	"rules": {
		"@stylistic/js/indent": [
			"error",
			"tab"
		],
		"@stylistic/js/linebreak-style": [
			"error",
			"unix"
		],
		"@stylistic/js/quotes": [
			"error",
			"double"
		],
		"@stylistic/js/semi": [
			"error",
			"always"
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error",
			"always"
		],
		"no-console": 0
	}
};