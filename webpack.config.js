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
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/script.js", // Entry point for your app
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output JS file name
    publicPath: "./", // Public path for assets
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
          MiniCssExtractPlugin.loader, // Extract CSS into a separate file
          "css-loader", // Load CSS files
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Handle image files
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]", // Output folder for images
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // Handle font files
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]", // Output folder for fonts
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/imgs"),
          to: "assets/images",
        },
      ],
    }),
    new CleanWebpackPlugin(), // Clean the 'dist' folder before each build
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Use this HTML template
    }),
    new MiniCssExtractPlugin({
      filename: "style.css", // Output CSS file name
    }),
  ],
  devtool: "source-map", // Generate source maps for debugging
  stats: {
    errorDetails: true, // Show detailed error information
  },
};
