const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const pages = [
  'careers',
  'company',
  'ebooks',
  'heha',
  'laced',
  'index',
  'keen',
  'our-work',
  'project-planner',
  'referrals',
  'researcher',
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
const filePlugins = new CopyPlugin([
  { from: './src/assets/fonts/', to: './assets/fonts' },
  { from: './src/assets/images/', to: './assets/images/' },
  { from: './src/resources/', to: './resources/' }
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
  plugins: [].concat(pagePlugins, filePlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  }
}

module.exports = config
