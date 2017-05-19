module.exports = {
  entry: "./lib/planarity_puzzle.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
   extensions: ["*", ".js", ".jsx"]
  }
};
