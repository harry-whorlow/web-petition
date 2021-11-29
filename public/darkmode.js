/** @format */
//variable setup
const sunMoonContainer = document.querySelector(".sun-moon-container");

let darkMode = localStorage.getItem("darkMode");
let currentRotation = parseInt(
    getComputedStyle(sunMoonContainer).getPropertyValue("--rotation")
);

if (darkMode === "true") {
    document.body.classList.add("dark");
    currentRotation = 180;
    sunMoonContainer.style.setProperty("--rotation", currentRotation);
}

// query slelctors
document.querySelector("#sun_button").addEventListener("click", () => {
    rotate();
    darkmode();
});
document.querySelector("#moon_button").addEventListener("click", () => {
    rotate();
    darkmode();
});

// darkmode
function darkmode() {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "true") {
        enableDarkMode();
        console.log(darkMode);
    } else {
        disableDarkMode();
        console.log(darkMode);
    }
}

// dark mode functions
const enableDarkMode = () => {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "true");
};

const disableDarkMode = () => {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", null);
};

// rotate function
function rotate() {
    currentRotation += 180;
    sunMoonContainer.style.setProperty("--rotation", currentRotation);
}
