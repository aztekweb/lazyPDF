const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = [
  {
    name: "lazypdf-bundled-polyfill",
    entry: ['babel-polyfill', './src/lazypdf.js'],
    output: {
      filename: './dist/lazypdf.bundle.min.js'
    },
    devtool: 'sourcemap',
    plugins: [
      //Minify JS
		  new UglifyJsPlugin()
    ],
    module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel'                                              
      }]
    }
  }
]