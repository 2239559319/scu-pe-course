const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/index.ts',
  mode: 'production',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  performance: {
    maxAssetSize: 50000000,
    maxEntrypointSize: 5000000,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'public', 'index.html'),
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devServer: {
    port: 9000,
    hot: true,
  },
};

module.exports = config;
