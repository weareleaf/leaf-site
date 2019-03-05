const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SassPlugin = require('sass-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const pages = [
  'careers',
  'company',
  'ebooks',
  'heha',
  'index',
  'keen',
  'our-work',
  'product-designer',
  'project-planner',
  'referrals',
  'resources',
  'rift',
  'terms',
  'what-we-do',
  'zendesk'
]

const pagePlugins = pages.map((page) => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${page}.pug`,
    filename: `${page}.html`
  })
})
const sassPlugin = new SassPlugin('./src/assets/styles/main.scss', process.env.NODE_ENV)
const filePlugins = new CopyPlugin([
  { from: './src/assets/fonts/', to: './assets/fonts' },
  { from: './src/assets/images/', to: './assets/images/' },
  { from: './src/resources/', to: './resources/' },
  { from: './dist/main.css', to: './assets/styles/' },
  { from: './dist/main.css.map', to: './assets/styles/' }
])

const config = {
  entry: {
    app: './src/assets/scripts/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /^(?!.*\.(js|css|png|jpg|svg|webp)|$).*$/,
          to: (context) => context.parsedUrl.pathname + '.html'
        }
      ]
    }
  },
  plugins: [].concat(sassPlugin, pagePlugins, filePlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports = config
