import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  name: 'Fleet',
  input: 'src/index.js',
  output: [
    {
			file: 'dist/fire-component.umd.js',
			name: 'blah',
      format: 'umd',
    },
    {
      file: 'dist/fire-component.esm.js',
      format: 'es'
    },
    {
      file: 'dist/fire-component.cjs.js',
      format: 'cjs'
    },
  ],
  plugins: [
    resolve({
      jsnext: true,
      module: true
    }),
    commonjs(),
    vue(),
    sass({
      output: 'dist/css/fleet.css',
      options: {
        // node-sass options
      }
    })
  ]
};