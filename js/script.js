const words = [
    "Frontend Developer",
    "Software Developer",
    "Python Automation"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const eraseSpeed = 50;
const delay = 1800;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500); // Pause after typing
            return;
        }
    }
    else {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();