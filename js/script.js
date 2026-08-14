/* OPENING ANIMATION */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 1800);
    }
});


/* TYPING EFFECT - ONLY HOME PAGE */

const typingElement = document.getElementById("typing");

if (typingElement) {

    const words = [
        "Frontend Developer.",
        "Software Developer.",
        "Python Developer.",
        "Problem Solver."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;
            }
        }

        setTimeout(
            typeEffect,
            deleting ? 50 : 100
        );
    }

    typeEffect();
}


/* NAVBAR SCROLL EFFECT */

const header = document.getElementById("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}


/* SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {
        observer.observe(element);
    });

}


/* ANIMATED COUNTERS */

const stats =
    document.querySelectorAll(".stat h2");

if (stats.length > 0) {

    const statsObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;

                    const target =
                        Number(counter.dataset.target);

                    let current = 0;

                    const increment =
                        Math.max(
                            1,
                            Math.ceil(target / 50)
                        );

                    function updateCounter() {

                        current += increment;

                        if (current >= target) {

                            counter.textContent =
                                target + "+";

                        } else {

                            counter.textContent = current;

                            requestAnimationFrame(
                                updateCounter
                            );
                        }
                    }

                    updateCounter();

                    statsObserver.unobserve(counter);

                });

            },
            {
                threshold: 0.6
            }
        );

    stats.forEach((stat) => {
        statsObserver.observe(stat);
    });

}


/* MAGNETIC BUTTONS */

const magneticElements =
    document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

        const rect =
            element.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        element.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform =
            "translate(0, 0)";

    });

});


/* PAGE TRANSITION */

const transition =
    document.getElementById("page-transition");

if (transition) {

    document.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            const isInternal =
                href &&
                !href.startsWith("http") &&
                !href.startsWith("#") &&
                !href.startsWith("mailto:");

            const opensNewTab =
                link.target === "_blank";

            if (isInternal && !opensNewTab) {

                event.preventDefault();

                transition.classList.add("active");

                setTimeout(() => {

                    window.location.href = href;

                }, 650);

            }

        });

    });

}


/* FOOTER YEAR */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* CONTACT FORM DEMO */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const button =
            contactForm.querySelector(".send-btn");

        const originalText =
            button.innerHTML;

        button.innerHTML =
            'Message Sent <i class="fa-solid fa-check"></i>';

        setTimeout(() => {

            button.innerHTML =
                originalText;

            contactForm.reset();

        }, 2500);

    });

}