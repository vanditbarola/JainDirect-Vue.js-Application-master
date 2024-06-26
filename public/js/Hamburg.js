const leftcard_hamburger = document.querySelector(".leftcard_hamburger");
leftcard_hamburger.addEventListener("click", function () {
    const centerSection = document.getElementById("center-layout");
    const rightSection = document.getElementById("right-layout");
    if (leftcard_hamburger.getAttribute("aria-expanded") === "true") {
        centerSection.style.display = "none";
        rightSection.style.display = "none";

    } else {
        centerSection.style.display = "block";
        rightSection.style.display = "block";
    }
});
