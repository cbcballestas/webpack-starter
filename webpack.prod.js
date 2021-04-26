const HtmlWebPlugin             = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                = require('copy-webpack-plugin');
const MinifyPlugin              = require('babel-minify-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: { // Para producción
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  output: {
    filename: 'main.[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /styles\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              esModule: false,
              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      // Nombre con hash para prevenir que el navegador mantenga estos archivos en el caché (Producción)
      // filename: '[name].[contenthash].css',
      filename: '[name].[contenthash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets/' }
      ]
    }),
    new MinifyPlugin()
  ]
}