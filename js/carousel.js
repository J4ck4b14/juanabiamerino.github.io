document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".carousel-item");
    const dotsContainer = document.getElementById("carouselDots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const track = document.querySelector(".carousel-track");
    let currentIndex = 0;
    const autoplayDelay = 5000;
    let autoplayTimer = null;

    // Create dots (use buttons for accessibility)
    items.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        dot.type = "button";
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
            resetAutoplay();
        });

        dot.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                dot.click();
            }
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".carousel-dot");

    function updateCarousel()
    {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;

        items.forEach((item, i) => {
            const isActive = i === currentIndex;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-hidden", String(!isActive));
            item.setAttribute("tabindex", isActive ? "0" : "-1");
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
        resetAutoplay();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
        resetAutoplay();
    });

    // Keyboard navigation
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });

    // Autoplay with pause on hover/focus
    function startAutoplay() {
        if (autoplayTimer) return;
        autoplayTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }, autoplayDelay);
    }

    function stopAutoplay() {
        if (!autoplayTimer) return;
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    const carouselContainer = document.querySelector(".carousel-container");
    carouselContainer.addEventListener("mouseenter", stopAutoplay);
    carouselContainer.addEventListener("mouseleave", startAutoplay);
    carouselContainer.addEventListener("focusin", stopAutoplay);
    carouselContainer.addEventListener("focusout", startAutoplay);

    // Respect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches) {
        startAutoplay();
    }

    // Show first slide
    updateCarousel();
});