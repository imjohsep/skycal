module.exports = {
  context: __dirname + "/app",

  entry: {
    javascript: "./app.js",
    html: "./index.html",
  },

  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
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
