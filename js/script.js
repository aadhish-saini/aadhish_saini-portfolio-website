/* ==========================================================================
   AADHISH SAINI - PORTFOLIO INTERACTION LOGIC & MICRO-ANIMATIONS
   Clean, Performant, Mobile-Friendly, Accessible
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initNavbar();
    initMobileNav();
    initTypingEffect();
    initScrollReveal();
    initMagneticElements();
    initContactForm();
    initCopyEmail();
    initYear();
});

/* ==========================================================================
   1. CUSTOM CURSOR SYSTEM
   ========================================================================== */

function initCursor() {
    // Check if device is touch or doesn't support hover
    const isTouchDevice = window.matchMedia("(hover: none) or (pointer: coarse)").matches;
    if (isTouchDevice) return;

    let dot = document.querySelector(".cursor-dot");
    let ring = document.querySelector(".cursor-ring");

    // Create cursor elements dynamically if not already in DOM
    if (!dot) {
        dot = document.createElement("div");
        dot.className = "cursor-dot";
        document.body.appendChild(dot);
    }
    if (!ring) {
        ring = document.createElement("div");
        ring.className = "cursor-ring";
        document.body.appendChild(ring);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;
    let isMouseDown = false;
    let isVisible = false;

    // Direct tracking for dot, smooth easing for ring
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            dot.style.opacity = "1";
            ring.style.opacity = "1";
        }

        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    window.addEventListener("mouseleave", () => {
        isVisible = false;
        dot.style.opacity = "0";
        ring.style.opacity = "0";
    });

    window.addEventListener("mousedown", () => {
        isMouseDown = true;
        document.body.classList.add("cursor-active");
    });

    window.addEventListener("mouseup", () => {
        isMouseDown = false;
        document.body.classList.remove("cursor-active");
    });

    // Attach hover listeners to all interactive elements
    function attachCursorListeners() {
        const interactives = document.querySelectorAll(
            "a, button, input, textarea, select, .project-card, .skill-card, .journey-card, .achievement-card, .tech-tag, .clickable"
        );

        interactives.forEach((el) => {
            el.removeEventListener("mouseenter", handleElementEnter);
            el.removeEventListener("mouseleave", handleElementLeave);

            el.addEventListener("mouseenter", handleElementEnter);
            el.addEventListener("mouseleave", handleElementLeave);
        });
    }

    function handleElementEnter() {
        isHovering = true;
        document.body.classList.add("cursor-hover");
    }

    function handleElementLeave() {
        isHovering = false;
        document.body.classList.remove("cursor-hover");
    }

    attachCursorListeners();

    // Re-attach after dynamic changes if needed
    window.addEventListener("load", attachCursorListeners);

    // RAF Loop for silky smooth ring interpolation
    function render() {
        if (isVisible) {
            // Lerp easing (0.18 factor for responsive yet organic drag)
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;

            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================================== */

function initNavbar() {
    const header = document.getElementById("header");
    if (!header) return;

    const checkScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */

function initMobileNav() {
    const menuBtn = document.querySelector(".menu-btn");
    const overlay = document.querySelector(".mobile-nav-overlay");
    const drawer = document.querySelector(".mobile-nav-drawer");
    const closeBtn = document.querySelector(".mobile-close-btn");
    const mobileLinks = document.querySelectorAll(".mobile-links a");

    if (!menuBtn || !drawer) return;

    function openMobileMenu() {
        drawer.classList.add("is-active");
        if (overlay) overlay.classList.add("is-active");
        document.body.style.overflow = "hidden";
        menuBtn.setAttribute("aria-expanded", "true");
    }

    function closeMobileMenu() {
        drawer.classList.remove("is-active");
        if (overlay) overlay.classList.remove("is-active");
        document.body.style.overflow = "";
        menuBtn.setAttribute("aria-expanded", "false");
    }

    menuBtn.addEventListener("click", () => {
        if (drawer.classList.contains("is-active")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);
    if (overlay) overlay.addEventListener("click", closeMobileMenu);

    mobileLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("is-active")) {
            closeMobileMenu();
        }
    });
}

/* ==========================================================================
   4. TYPING EFFECT
   ========================================================================== */

function initTypingEffect() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    const words = [
        "Software Developer.",
        "Frontend & React Developer.",
        "AI & Web Enthusiast.",
        "Practical Problem Solver."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   5. SCROLL REVEAL ANIMATIONS
   ========================================================================== */

function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length === 0) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        revealElements.forEach((el) => el.classList.add("show"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   6. MAGNETIC BUTTONS (SUBTLE)
   ========================================================================== */

function initMagneticElements() {
    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches;
    if (isTouch) return;

    const magneticElements = document.querySelectorAll(".magnetic");

    magneticElements.forEach((el) => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle displacement (0.1 max)
            el.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate3d(0, 0, 0)";
            el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        });

        el.addEventListener("mouseenter", () => {
            el.style.transition = "none";
        });
    });
}

/* ==========================================================================
   7. CONTACT FORM HANDLING
   ========================================================================== */

function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;

        // Feedback state
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent Successfully!';
        submitBtn.style.backgroundColor = "var(--success)";
        submitBtn.style.borderColor = "var(--success)";
        submitBtn.disabled = true;

        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = "";
            submitBtn.style.borderColor = "";
            submitBtn.disabled = false;
        }, 3500);
    });
}

/* ==========================================================================
   8. COPY EMAIL BUTTON
   ========================================================================== */

function initCopyEmail() {
    const copyBtns = document.querySelectorAll(".copy-email-btn");

    copyBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const email = "aadhishsaini14@gmail.com";

            navigator.clipboard.writeText(email).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                btn.classList.add("copied");

                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove("copied");
                }, 2200);
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    });
}

/* ==========================================================================
   9. FOOTER YEAR
   ========================================================================== */

function initYear() {
    const yearElements = document.querySelectorAll(".current-year, #year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach((el) => {
        el.textContent = currentYear;
    });
}