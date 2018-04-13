import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'fire-component',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve({ browser: true, jsnext: true, main: true }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
			vue({ autoStyles: false, styleToImports: true }),
			scss({
				output: './dist/fire-component.css'
			}),
      uglify()
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
    ],
    plugins: [
			resolve({ browser: true, jsnext: true, main: true }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      vue({ autoStyles: false, styleToImports: true }),
			scss({
				output: './dist/fire-component.css'
			}),
      uglify()
    ]
	}
];