// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// module.exports = {
//   entry: "./src/js/script.js", // Entry point for your app
//   output: {
//     path: path.resolve(__dirname, "dist"), // Output directory
//     filename: "bundle.js", // Output file name
//     publicPath: "/", // Public path for assets
//   },
//   mode: "production", // Set mode to 'production' for optimized build
//   module: {
//     rules: [
//       {
//         test: /\.js$/, // Transpile JS files with Babel
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env"],
//           },
//         },
//       },
//       {
//         test: /\.css$/, // Process CSS files
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(), // Clean the 'dist' folder before each build
//     new HtmlWebpackPlugin({
//       template: "./src/index.html", // Use this HTML template
//     }),
//   ],
//   devtool: "source-map", // Generate source maps for debugging
// };

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/script.js", // Entry point for your app
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output file name
    publicPath: "/", // Public path for assets
  },
  mode: "production", // Set mode to 'production' for optimized build
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JS files with Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: [
          // MiniCssExtractPlugin.loader, // Extract CSS into a separate file
          // "css-loader", // Load CSS files
          "style-loader",
          "css-loader",
        ],
      },
      // For SCSS files
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // Load CSS
          "sass-loader", // Compile SCSS to CSS
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the 'dist' folder before each build
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Use this HTML template
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output CSS file
    }),
  ],
  devtool: "source-map", // Generate source maps for debugging
  stats: {
    errorDetails: true, // Show detailed error information
  },
};
