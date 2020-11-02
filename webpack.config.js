const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
      main: ["@babel/polyfill",'./src/pages/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
         rules: [ // rules — это массив правил
          // добавим в него объект правил для бабеля
          {
           /*  // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            loader: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/' */
          },
          {
            // применять это правило только к CSS-файлам
              test: /\.css$/,
            // при обработке этих файлов нужно использовать
            // MiniCssExtractPlugin.loader и css-loader
               loader: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1
                  }
                },
                'postcss-loader'
              ],
          },
          // добавили правило для обработки файлов
          {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpe?g|gif|woff2|woff|ttf)$/,
            // при обработке этих файлов нужно использовать file-loader
            loader: 'file-loader'
          },
          // аналогично добавьте правило для работы с html
          {
            test: /\.html$/,
            loader: 'html-loader',
          }
          ]
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
          }),
        new MiniCssExtractPlugin(),
      ] 
};