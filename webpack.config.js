const path = require('path');
const webpackMerge = require('webpack-merge');

var base = {
  entry: './src/index.js',
  output: {
    filename: 'firecomponent.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
};

var nodeConfig = webpackMerge(base, {
  target: 'node',
  output: {
    filename: 'firecomponent.node.js',
    path:  path.resolve(__dirname, 'dist')
  }
});

module.exports = [base, nodeConfig];
