module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
		},
	},
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
	},
	testMatch: ['**/?(*.)(test).ts?(x)'],
	testEnvironment: 'node',
};
