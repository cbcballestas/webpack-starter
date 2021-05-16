const HtmlWebPlugin           = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: { // Para producción
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  module: {
    rules: [
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
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash][ext]'
        },
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
      filename: '[name].[contentpath].css',
      ignoreOrder: false
    })
  ]
}