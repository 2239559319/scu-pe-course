const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/index.ts',
  mode: 'production',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: isDev
      ? '/'
      : '//unpkg.luckincdn.com/@xiaochuan-dev/scu-pecourse-html@latest/dist/',
    assetModuleFilename: 'fonts/[hash][ext][query]',
    clean: true,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: isDev ? false : true,
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
    new MiniCssExtractPlugin(),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'crypto-js': 'CryptoJS',
  },
  devServer: {
    port: 9000,
    // hot: true,
  },
};

module.exports = config;
