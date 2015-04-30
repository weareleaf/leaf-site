var Vivus = require('vivus');

new Vivus('animated-logo', {type: 'delayed', duration: 50, file: 'images/logo.svg'}, function() {
  console.log(arguments);
});
