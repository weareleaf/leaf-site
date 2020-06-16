# Leaf Website

This is Leaf's static site build. It uses [Pug](https://pugjs.org/api/getting-started.html) for the templating, [npm](https://www.npmjs.com/) for client side dependencies, [Sass](https://sass-lang.com/) for styling and [Webpack](https://webpack.js.org) for the build.

## Initial Setup

First, install [Homebrew](https://brew.sh) and use it to set up [NVM](https://github.com/creationix/nvm) (Node Version Manager):

```
brew install nvm
```

Then, install the required version of node and install the dependencies for the project:

```
nvm install 10.20.1
nvm use
npm install
```

## Usage

- Run `npm run start` run the development server
- Run `npm run build:jpgs` to create jpg copies of all png images on the site with a `#3d18c3` background colour.
- Run `npm run deploy` to build a production ready version of the site and deploy it to https://weareleaf.com

## Development Notes

- Once started, the development server should be viewable at http://localhost:3000.
- Changes to Pug and JavaScript files should automatically reload the page.
- Changes to SCSS will not automatically reload the page.
- When you add new files, you'll need to restart the development server for them to be picked up.
- If you want to change the background colour of generated jpg images, update the value in `scripts/png-convert.js`.

## Adding blog posts

1.  Copy the existing blog post `src/pages/blog/goals-matter` to a new file. Choose a sensible name with dash-separated words, as this will form the URL of your post.
2.  Start or restart the development server so that it picks up the new file.
3.  View your post at http://localhost:3000/blog/your-post-filename
4.  Edit your blog content by updating your new pug file.
5.  Update the variables at the top of your blog post file, this is important as they're used to display a correct link preview when sharing on social media.
6.  Update the `gridItems` array in `src/assets/scripts/blog.js` to include an entry for your blog post as the the first entry in the array. This will ensure the blog post displays on http://localhost:3000/blog, and is included in the thumbnails at the bottom of each blog post automatically.
7.  Check everything is as you want it, and put your post up for review by submitting a pull request on Github!

Enjoy ❤️
