const path = require('path'); // подключаем path к конфигу вебпак

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: { main: './pages/index.js' }, //точка входа, первое место, куда заглянет webpack
  output: { //// указали в какой файл будет собираться весь js и дали ему имя
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''

  },

  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 9000, // порт, чтобы открывать сайт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],


  module: {
    rules: [
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 }, }, 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

};