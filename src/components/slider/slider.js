import Flickity from "flickity";
import imagesLoaded from "flickity-imagesloaded";

function bind(slider) {
  new Flickity(slider, {
    imagesLoaded: true,
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true
  });
}

export default function () {
  const slider = document.querySelector(".slider");

  if (slider) {
    bind(slider);
  }
}
