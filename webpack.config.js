module.exports = {
  entry: "./lib/PlanarityPuzzle.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
   extensions: ["*", ".js", ".jsx"]
  }
};
