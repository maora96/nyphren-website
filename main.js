// modal
let modalBtn = document.querySelector(".modal-btn");
let modalBg = document.querySelector(".modal-bg");
let modalX = document.querySelector(".modal-x");

modalBtn.addEventListener("click", () => {
  modalBg.classList.add("modal-active");
});

modalX.addEventListener("click", () => {
  modalBg.classList.remove("modal-active");
});

// menu
let menu = document.querySelector(".menu");
let navLinks = document.querySelector(".nav-links");
let links = document.querySelectorAll(".nav-links li");

menu.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

for (const link of links) {
  link.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}
