/** @format */

//nav function
const nav = document.querySelector("nav");
const hamburger = document.querySelector("#nav-icon1");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    nav.classList.toggle("open");
});
