const items = document.querySelectorAll(".carousel-item");
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

/* Create dots */
items.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dot");

function updateCarousel() {
    items.forEach(item => item.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    items[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");

    /* Update project button link */
    const link = items[currentIndex].dataset.link;
    items[currentIndex]
        .querySelector(".project-link")
        .setAttribute("href", link);
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
});

/* Keyboard navigation */
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
});
