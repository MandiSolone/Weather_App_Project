const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Change to 'development' mode for HMR and faster builds
  entry: './src/index.js', // Entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // This will be your bundled JS
  },

  // Watch for changes in development
  watchOptions: {
    aggregateTimeout: 300, // Delay before rebuilding
    poll: 1000, // Poll for changes every second (optional, based on environment)
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i, // Add this rule for CSS
        use: [
          MiniCssExtractPlugin.loader, // For production, extract CSS to its own file
          'css-loader', // Resolve CSS imports
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve content from dist
    },
    devMiddleware: {
      publicPath: '/dist/', // Set the correct public path for assets in development
    },
    compress: true,
    port: 8080, // You can change the port if necessary
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Automatically open the browser when the server starts
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Specify your HTML template location
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output the CSS into a separate file in production
    }),
  ],
};
