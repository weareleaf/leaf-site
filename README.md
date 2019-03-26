# Leaf Website
This is Leaf's static site build. It uses [Pug](https://pugjs.org/api/getting-started.html) for the templating, [npm](https://www.npmjs.com/) for client side dependencies, [Sass](https://sass-lang.com/) for styling and [Webpack](https://webpack.js.org) for the build.

## Install

```
nvm use
npm install
```

## Usage
- Run `npm run start` run the development server
- Run `npm run deploy` to build a production ready version of the site and deploy it to https://weareleaf.com

## Development notes
- Once started, the development server should be viewable at http://localhost:3000.
- Changes to Pug and JavaScript files should automatically reload the page.
- Changes to SCSS will not automatically reload the page.
- When you add new files, you'll need to restart the development server for them to be picked up.

Enjoy ❤️
