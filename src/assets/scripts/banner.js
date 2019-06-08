function onClick() {
  window.history.go(-1);
}

function bind(button) {
  button.addEventListener('click', onClick)
}

export default function () {
  const bannerButton = document.querySelector(".banner__button");

  if (bannerButton) {
    bind(bannerButton);
  }
}
