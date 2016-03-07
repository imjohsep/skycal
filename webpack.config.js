module.exports = {
  port: 8081,
  devtool: 'eval-source-map',
  context: __dirname + "/app",
  entry: {
    javascript: "./app.js",
    html: "./index.html",
  },
  entry: 
   [ 'webpack-dev-server/client?http://127.0.0.1:8081',
     'webpack/hot/only-dev-server',
     './src/index' ],
  output: {
    path: __dirname + '/dist/assets',
    filename: 'bundle.js',
    publicPath: '/assets/' 
  },
  devServer: { 
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: 8081,
    publicPath: '/assets/',
    noInfo: false 
  },
  module: {
    loaders: [
      { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel", 
          query:
            {
              presets:['react']
            }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
    ]
  },
  node: {
    console: true,
    debug: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
