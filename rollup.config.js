import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';

let external = Object.keys(pkg.dependencies);

let plugins = [
	vue({ autoStyles: false, styleToImports: true }),
	scss(),
	babel(babelrc()),
	uglify()
];

plugins.push(istanbul({
	exclude: ['test/**/*', 'node_modules/**/*']
}));

export default {
  input: 'src/index.js',
  plugins: plugins,
  external: external,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'fire-component',
      sourceMap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
};