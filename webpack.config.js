const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/basic-webpack-react/' : '/',
    clean: true,
  },
  resolve: {
    // don't need to put extensions on these kinds of files when requried
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    },
  },
    // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 4200,
    watchContentBase: true,
    historyApiFallback: true,
  },
    // Rules of how webpack will take our files, complie & bundle them for the browser 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|gif|jpeg|woff|woff2|eot|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
      {
        test: /\.(png)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: 'file-loader',
          name: '[name].[hash].[ext]',
          outputPath: 'images/',
          publicPath: '/images/'
        }
      },
      {
        test: /\.(otf|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: "index.html",
      inject: false,
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'CNAME', to: '.' },
        { from: 'src/assets', to: 'images' },
        { from: 'src/templates/bart/assets', to: 'images' },
        { from: 'src/templates/bart/assets/colors', to: 'images/colors' },
      ],
    }),
  ],
}