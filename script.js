// ==========================
// Premium Portfolio Script
// ==========================

// Loader
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            setTimeout(() => { loader.style.display = "none"; }, 500);
        }, 1500);
    }
});

// Sci-Fi Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;
    const particleCount = 40; // 40 glowing particles

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        
        let size = Math.random() * 4 + 2; 
        let left = Math.random() * 100;
        let duration = Math.random() * 10 + 6; 
        let delay = Math.random() * 5;
        let color = Math.random() > 0.5 ? "#00F0FF" : "#b100e8";
        
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = left + "vw";
        particle.style.animationDuration = duration + "s";
        particle.style.animationDelay = delay + "s";
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;

        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Custom Sci-Fi Cursor
const cursor = document.getElementById("cursor");
if (cursor && window.innerWidth > 768) {
    cursor.style.display = "block";
    
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    const hoverElements = document.querySelectorAll("a, button, .menu-btn, .logo, .gallery img, i");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
    });
}

// Typing Animation
const words = [
    "Professional Photographer",
    "Cinematographer",
    "Computer Course Coordinator",
    "Content Creator",
    "Photo Editor"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
    if (!typing) return;
    const currentWord = words[wordIndex];

    if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typing.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, deleting ? 50 : 100);
}
typeEffect();

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuBtn.innerHTML = nav.classList.contains("active") ? "✕" : "☰";
    });
}

// Smooth Scroll
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            if (nav) nav.classList.remove("active");
            if (menuBtn) menuBtn.innerHTML = "☰";
        }
    });
});

// Scroll Top Button
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    if (!topBtn) return;
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

if (topBtn) {
    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

// Hero Slider
const slides = document.querySelectorAll(".hero-slider img");
let slide = 0;

if (slides.length > 0) {
    setInterval(() => {
        slides.forEach(img => img.classList.remove("active"));
        slide++;
        if (slide >= slides.length) slide = 0;
        slides[slide].classList.add("active");
    }, 4000);
}

// Gallery Lightbox
const gallery = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeLightbox");

if (gallery.length && lightbox && lightboxImg && closeBtn) {
    gallery.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

// Scroll Progress Bar
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById("progressBar");

    if(progressBar){
        progressBar.style.width = progress + "%";
    }
});
// ===== Active Navbar =====

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;

        if(window.scrollY >= top){
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });

});
// ===== Hero Parallax =====

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

if(!hero) return;

hero.style.backgroundPositionY = window.scrollY * 0.4 + "px";

});
// ===== Premium Counter Animation =====

const counters = document.querySelectorAll(".stat h2");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const text = counter.innerText;
    const target = parseInt(text.replace(/\D/g, ""));
    const suffix = text.replace(/[0-9]/g, "");

    let count = 0;
    const speed = target / 80;

    const update = () => {
      count += speed;

      if (count < target) {
        counter.innerText = Math.floor(count) + suffix;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + suffix;
      }
    };

    update();
    counterObserver.unobserve(counter);
  });
});

counters.forEach(counter => counterObserver.observe(counter));
// ===== Fade In Sections =====

const revealItems = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([
{
opacity:0,
transform:"translateY(80px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],{
duration:900,
fill:"forwards",
easing:"ease-out"
});

}

});

},{threshold:.15});

revealItems.forEach(item=>revealObserver.observe(item));
// ===== Testimonial Slider =====

const testimonials = document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

if(testimonials.length){

setInterval(()=>{

testimonials[testimonialIndex].classList.remove("active");

testimonialIndex++;

if(testimonialIndex>=testimonials.length){

testimonialIndex=0;

}

testimonials[testimonialIndex].classList.add("active");

},4000);

}