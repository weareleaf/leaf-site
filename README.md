# Leaf Project Template • 0.0.1

## Introduction

The aim of this project is to provide a good starting point for the front end of all Leaf sites, whether they be basic HTML/CSS or a single page JavaScript app.

### Technologies

 - [Jade](http://jade-lang.com/) - For markup
 - [Sass](http://sass-lang.com/) - For styles
 - [Browserify](http://browserify.org/) - For bundling JavaScript
 - [npm](https://www.npmjs.com/) - For managing dependencies & running scripts
 - [Gulp](http://gulpjs.com/) - For automating the development workflow

### Features

 - Automatic compilation of Jade, Sass and JavaScript.
 - Automatic page refreshing.
 - Automatic optimisation of images.
 - Ability to build out either a regular HTML/CSS/JS site, or a single page app from the same template.
 - WIP: 1 command to generate screenshots of all pages.
 - WIP: 1 command deployment.
 - WIP: 1 command to run automated tests for pages in supported browsers.
 - WIP: 1 command google page speed insights

## Installation

 1. Install [node.js](https://nodejs.org/). You can get this from the official site, **or** via [homebrew](http://brew.sh/) using nvm - node version manager (recommended).
 2. Clone this project to your local machine with `git@github.com:leafagency/leaf-project-template.git`
 3. Rename the cloned folder to create your new site
 4. In your terminal `cd` into the project template
 5. Type `npm install`
 
## Working with the project

The following commands all need to be run from the directory of your project, use `cd` to get there:
 
### Starting the project server

Once started, a browser window will open to the homepage of your site. Any changes to the `./code/` directory while the server is running will be automatically detected and trigger a rebuild of the sass/jade/js and cause the browser to refresh.

```
npm run start
```

### Running the tests (not yet implemented)

```
npm run test
```

### Forcing a rebuild of the code

```
npm run build
```

