let modalBtn = document.querySelector(".modal-btn");
let modalBg = document.querySelector(".modal-bg");
let modalX = document.querySelector(".modal-x");

modalBtn.addEventListener("click", () => {
  modalBg.classList.add("modal-active");
});

modalX.addEventListener("click", () => {
  modalBg.classList.remove("modal-active");
});
