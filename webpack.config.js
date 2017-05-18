module.exports = {
  entry: "./lib/planarity-knot.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
   extensions: ["*", ".js", ".jsx"]
  }
};
