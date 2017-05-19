module.exports = {
  entry: "./lib/planarity_knot.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
   extensions: ["*", ".js", ".jsx"]
  }
};
