/* ==========================================================================
   AADHISH SAINI - PORTFOLIO INTERACTION LOGIC & MICRO-ANIMATIONS
   Clean, Performant, Mobile-Friendly, Accessible
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initCommandPalette();
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

/* ==========================================================================
   10. INITIAL LOADING EXPERIENCE
   ========================================================================== */

function initLoader() {
    let loader = document.getElementById("portfolio-loader");
    
    // Check if user already saw the loader in this session or prefers reduced motion
    const alreadyLoaded = sessionStorage.getItem("portfolio_loaded");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!loader) {
        loader = document.createElement("div");
        loader.id = "portfolio-loader";
        loader.className = "portfolio-loader";
        loader.setAttribute("aria-hidden", "true");
        loader.innerHTML = `
            <div class="loader-inner">
                <div class="loader-logo">
                    <span class="loader-tag">&lt;</span>
                    <span class="loader-monogram">AS</span>
                    <span class="loader-tag">/&gt;</span>
                </div>
                <div class="loader-info">
                    <div class="loader-name">AADHISH SAINI</div>
                    <div class="loader-role">SOFTWARE DEVELOPER</div>
                </div>
                <div class="loader-progress-wrap">
                    <div class="loader-progress-bar" id="loader-progress-bar"></div>
                </div>
                <div class="loader-status" id="loader-status">INITIALIZING PORTFOLIO...</div>
            </div>
        `;
        document.body.prepend(loader);
    }

    const progressBar = loader.querySelector("#loader-progress-bar") || loader.querySelector(".loader-progress-bar");
    const statusText = loader.querySelector("#loader-status") || loader.querySelector(".loader-status");

    if (alreadyLoaded || prefersReducedMotion) {
        loader.classList.add("is-loaded");
        setTimeout(() => {
            if (loader.parentNode) loader.remove();
        }, 300);
        return;
    }

    // First visit in session: perform smooth, lightweight sequence (approx 1.1s)
    let progress = 0;
    const interval = setInterval(() => {
        progress += 18;
        if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;

        if (progress >= 40 && progress < 80 && statusText) {
            statusText.textContent = "LOADING PROJECTS...";
        } else if (progress >= 80 && statusText) {
            statusText.textContent = "READY.";
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add("is-loaded");
                sessionStorage.setItem("portfolio_loaded", "true");
                setTimeout(() => {
                    if (loader.parentNode) loader.remove();
                }, 500);
            }, 250);
        }
    }, 100);
}

/* ==========================================================================
   11. COMMAND PALETTE (CTRL + K)
   ========================================================================== */

function initCommandPalette() {
    let palette = document.getElementById("command-palette");

    const commands = [
        // Navigation
        { group: "Navigation", label: "Home", desc: "Return to homepage", url: "index.html", icon: "fa-solid fa-house" },
        { group: "Navigation", label: "About", desc: "Background, story & philosophy", url: "about.html", icon: "fa-solid fa-user" },
        { group: "Navigation", label: "Skills", desc: "Languages, frontend, databases & tools", url: "skills.html", icon: "fa-solid fa-code" },
        { group: "Navigation", label: "Projects", desc: "Selected platforms & applications", url: "projects.html", icon: "fa-solid fa-layer-group" },
        { group: "Navigation", label: "Journey", desc: "Timeline of milestones & builds", url: "about.html#journey", icon: "fa-solid fa-timeline" },
        { group: "Navigation", label: "Contact", desc: "Get in touch & direct channels", url: "contact.html", icon: "fa-regular fa-paper-plane" },

        // Projects
        { group: "Projects", label: "DhruvNetra", desc: "Antarctic Digital Twin & Remote Operations", url: "projects.html", icon: "fa-solid fa-snowflake" },
        { group: "Projects", label: "AI Voice Detector", desc: "VoiceShield audio classification platform", url: "projects.html", icon: "fa-solid fa-microphone-lines" },
        { group: "Projects", label: "BharatManak", desc: "AI Indian Standards recommendation engine", url: "projects.html", icon: "fa-solid fa-scale-balanced" },
        { group: "Projects", label: "Library Management System", desc: "Full-stack MySQL & Node.js catalog system", url: "https://github.com/aadhish-saini/Library-Management-System.git", icon: "fa-solid fa-book", external: true },
        { group: "Projects", label: "Developer Portfolio", desc: "Personal developer portfolio website repository", url: "https://github.com/aadhish-saini/aadhish_saini-portfolio-website.git", icon: "fa-solid fa-laptop-code", external: true },

        // Actions & Connect
        { group: "Connect & Actions", label: "View Resume", desc: "Open Aadhish's verified PDF resume", url: "files/Aadhish_resume.pdf", icon: "fa-solid fa-file-pdf", external: true },
        { group: "Connect & Actions", label: "GitHub Profile", desc: "github.com/aadhish-saini", url: "https://github.com/aadhish-saini", icon: "fa-brands fa-github", external: true },
        { group: "Connect & Actions", label: "LinkedIn Profile", desc: "linkedin.com/in/aadhish-saini", url: "https://www.linkedin.com/in/aadhish-saini-797036405/", icon: "fa-brands fa-linkedin", external: true },
        { group: "Connect & Actions", label: "Send Email", desc: "aadhishsaini14@gmail.com", url: "mailto:aadhishsaini14@gmail.com", icon: "fa-regular fa-envelope" }
    ];

    if (!palette) {
        palette = document.createElement("div");
        palette.id = "command-palette";
        palette.className = "cmd-palette-backdrop";
        palette.setAttribute("role", "dialog");
        palette.setAttribute("aria-modal", "true");
        palette.setAttribute("aria-label", "Command Palette");
        palette.hidden = true;
        palette.innerHTML = `
            <div class="cmd-palette-modal">
                <div class="cmd-search-header">
                    <i class="fa-solid fa-magnifying-glass cmd-search-icon"></i>
                    <input type="text" id="cmd-search-input" class="cmd-search-input" placeholder="Type a command or search portfolio... (Esc to close)" autocomplete="off" spellcheck="false">
                    <kbd class="cmd-badge">ESC</kbd>
                </div>
                <div class="cmd-results" id="cmd-results" role="listbox"></div>
                <div class="cmd-footer">
                    <div class="cmd-shortcuts">
                        <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                        <span><kbd>↵</kbd> Open</span>
                        <span><kbd>Esc</kbd> Close</span>
                    </div>
                    <span class="cmd-hint">Aadhish Saini</span>
                </div>
            </div>
        `;
        document.body.appendChild(palette);
    }

    const input = palette.querySelector("#cmd-search-input");
    const resultsContainer = palette.querySelector("#cmd-results");
    const triggerBtns = document.querySelectorAll(".cmd-trigger-btn, #cmd-trigger-btn");
    let selectedIndex = 0;
    let filteredCommands = [...commands];

    function renderResults(filterText = "") {
        const query = filterText.trim().toLowerCase();
        filteredCommands = commands.filter((cmd) => {
            return (
                cmd.label.toLowerCase().includes(query) ||
                cmd.desc.toLowerCase().includes(query) ||
                cmd.group.toLowerCase().includes(query)
            );
        });

        resultsContainer.innerHTML = "";

        if (filteredCommands.length === 0) {
            resultsContainer.innerHTML = `<div class="cmd-no-results"><i class="fa-solid fa-circle-question"></i> No matching commands or projects found.</div>`;
            return;
        }

        selectedIndex = 0;
        let currentGroup = "";

        filteredCommands.forEach((cmd, idx) => {
            if (cmd.group !== currentGroup) {
                currentGroup = cmd.group;
                const groupTitle = document.createElement("div");
                groupTitle.className = "cmd-group-title";
                groupTitle.textContent = currentGroup;
                resultsContainer.appendChild(groupTitle);
            }

            const item = document.createElement("a");
            item.href = cmd.url;
            item.className = `cmd-item ${idx === selectedIndex ? "is-selected" : ""}`;
            item.setAttribute("role", "option");
            item.setAttribute("aria-selected", idx === selectedIndex ? "true" : "false");
            if (cmd.external) {
                item.target = "_blank";
                item.rel = "noopener noreferrer";
            }

            item.innerHTML = `
                <div class="cmd-item-left">
                    <i class="${cmd.icon}"></i>
                    <div class="cmd-item-text">
                        <span class="cmd-item-label">${cmd.label}</span>
                        <span class="cmd-item-desc">${cmd.desc}</span>
                    </div>
                </div>
                <i class="fa-solid fa-arrow-right cmd-item-arrow"></i>
            `;

            item.addEventListener("mouseenter", () => {
                selectedIndex = idx;
                updateSelection();
            });

            item.addEventListener("click", () => {
                closePalette();
            });

            resultsContainer.appendChild(item);
        });
    }

    function updateSelection() {
        const items = resultsContainer.querySelectorAll(".cmd-item");
        items.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add("is-selected");
                item.setAttribute("aria-selected", "true");
                item.scrollIntoView({ block: "nearest" });
            } else {
                item.classList.remove("is-selected");
                item.setAttribute("aria-selected", "false");
            }
        });
    }

    function openPalette() {
        palette.hidden = false;
        requestAnimationFrame(() => {
            palette.classList.add("is-open");
        });
        document.body.style.overflow = "hidden";
        if (input) {
            input.value = "";
            renderResults("");
            setTimeout(() => input.focus(), 50);
        }
    }

    function closePalette() {
        palette.classList.remove("is-open");
        setTimeout(() => {
            palette.hidden = true;
            document.body.style.overflow = "";
        }, 200);
    }

    // Trigger button listeners
    triggerBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openPalette();
        });
    });

    // Keyboard shortcuts (Ctrl+K or Cmd+K)
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            if (palette.classList.contains("is-open")) {
                closePalette();
            } else {
                openPalette();
            }
        } else if (e.key === "Escape" && palette.classList.contains("is-open")) {
            e.preventDefault();
            closePalette();
        }
    });

    // Close on backdrop click
    palette.addEventListener("click", (e) => {
        if (e.target === palette) {
            closePalette();
        }
    });

    // Search input listener
    if (input) {
        input.addEventListener("input", (e) => {
            renderResults(e.target.value);
        });

        input.addEventListener("keydown", (e) => {
            if (filteredCommands.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % filteredCommands.length;
                updateSelection();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
                updateSelection();
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selected = filteredCommands[selectedIndex];
                if (selected) {
                    if (selected.external) {
                        window.open(selected.url, "_blank", "noopener,noreferrer");
                    } else {
                        window.location.href = selected.url;
                    }
                    closePalette();
                }
            }
        });
    }
}