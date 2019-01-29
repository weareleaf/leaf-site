require("core-js/fn/array/from");
require("core-js/fn/object/assign");
require('./pageTransitions.js')

import banner from "../../components/banner/banner.js";
import modal from "../../components/modal/modal.js";

banner();
modal();

// Unregister any service workers from the old site.
if(window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
      for (let registration of registrations) {
        console.log("Unregistered service worker.")
        registration.unregister()
      }
      console.log("All service workers unregistered.")
    })
}

function isMobileDevice() {
  var agent = navigator.userAgent
  return agent.match(/Android/i) || agent.match(/webOS/i) || agent.match(/iPhone/i) || agent.match(/iPad/i) || agent.match(/iPod/i) || agent.match(/BlackBerry/i) || agent.match(/Windows Phone/i)
}

function canUseWebP() {
  var elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }
  return false
}

function preload(src) {
  console.log('Preloading', src)
  var i = new Image()
  i.src = src
}

if (!isMobileDevice()) {
  window.addEventListener('load', function() {
    var ext = canUseWebP() ? 'webp' : 'png'

    preload('/assets/images/what-we-do.' + ext)
    preload('/assets/images/company.' + ext)
    preload('/assets/images/home.' + ext)
    preload('/assets/images/ebooks.' + ext)
    preload('/assets/images/jobs.' + ext)
    preload('/assets/images/our-work.' + ext)
    preload('/assets/images/project-planner.' + ext)
    preload('/assets/images/resources.' + ext)
    preload('/assets/images/terms.' + ext)
  })
}
