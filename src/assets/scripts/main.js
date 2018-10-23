require("core-js/fn/array/from");
require("core-js/fn/object/assign");

import banner from "../../components/banner/banner.js";
import modal from "../../components/modal/modal.js";
// import slider from "../../components/slider/slider.js";

banner();
modal();
// slider();

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
