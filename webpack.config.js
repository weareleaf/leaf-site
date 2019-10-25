const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const glob = require('glob')
const pages = glob.sync('**/*.pug', {
  cwd: path.resolve(__dirname, 'src/pages')
})

const pagePlugins = pages.map(page => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${page}`,
    filename: page.replace('.pug', '.html')
  })
})
const filePlugins = new CopyPlugin([
  { from: './src/assets/fonts/', to: './assets/fonts' },
  { from: './src/assets/images/', to: './assets/images/' },
  { from: './src/resources/', to: './resources/' },
  { from: './src/robots.txt', to: './robots.txt' }
])

const config = {
  entry: {
    app: './src/assets/scripts/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /^(?!.*\.(js|css|png|jpg|svg|webp)|$).*$/,
          to: context => {
            let { pathname } = context.parsedUrl
            if (pathname.charAt(pathname.length - 1) === '/') {
              pathname = pathname.substring(0, pathname.length - 1)
            }
            return `${pathname}.html`
          }
        }
      ]
    }
  },
  plugins: [].concat(pagePlugins, filePlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader?attrs=false', 'pug-html-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  }
}

module.exports = config
