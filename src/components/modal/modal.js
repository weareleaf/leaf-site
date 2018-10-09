import MicroModal from "micromodal";

function modalOnClose() {
  document.body.classList.remove("modal-open");
}

function modalOnShow() {
  document.body.classList.add("modal-open");
}

function bind() {
  MicroModal.init({
    onShow: modalOnShow,
    onClose: modalOnClose,
    awaitCloseAnimation: true,
    disableFocus: true
  });
}

export default function () {
  const modal = document.querySelector(".modal");

  if (modal) {
    bind();
  }
}
