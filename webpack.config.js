module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    path: "/Users/NigelFarageMEP/CODE/Tutorials/WDEssentials/travelsitecopy/app/temp/scripts",
    filename: "App.js"
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}
