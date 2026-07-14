// Loader
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
    }
});

// Header Scroll Effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");
if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
        const icon = menuBtn.querySelector("i");
        if(nav.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 100;
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

// Smooth Scroll for Nav Links
document.querySelectorAll("nav a, .btn").forEach(link => {
    link.addEventListener("click", function (e) {
        if(this.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                if (nav) {
                    nav.classList.remove("active");
                    const icon = menuBtn.querySelector("i");
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        }
    });
});

// Stats Counter Animation
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = +counter.innerText;
        let count = 0;
        const speed = target / 50;

        const update = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count) + "+";
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "+";
            }
        };
        update();
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector("i");
        
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.style.transform = "rotate(0deg)";
        } else {
            // Close all others
            document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);
            document.querySelectorAll(".faq-question i").forEach(i => i.style.transform = "rotate(0deg)");
            
            // Open clicked
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.style.transform = "rotate(180deg)";
            icon.style.transition = "transform 0.3s ease";
        }
    });
});

// WhatsApp Booking
const whatsappBtn = document.getElementById("whatsappBtn");
if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
        const name = document.querySelector('input[name="Name"]').value || "[Not Provided]";
        const phone = document.querySelector('input[name="Phone"]').value || "[Not Provided]";
        const email = document.querySelector('input[name="Email"]').value || "[Not Provided]";
        const eventType = document.querySelector('select[name="Event Type"]').value || "[Not Selected]";
        const eventDate = document.querySelector('input[name="Event Date"]').value || "[Not Selected]";
        const message = document.querySelector('textarea[name="Message"]').value || "";

        const text = `*New Booking Inquiry*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nEvent: ${eventType}\nDate: ${eventDate}\n\nDetails: ${message}`;
        window.open("https://wa.me/8801533098828?text=" + encodeURIComponent(text), "_blank");
    });
}

// Video Auto-Play on Scroll & Tap to Unmute
const reviewVideo = document.getElementById("reviewVideo");
if (reviewVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                reviewVideo.play();
            } else {
                reviewVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(reviewVideo);

    reviewVideo.addEventListener("click", () => {
        if (reviewVideo.muted) {
            reviewVideo.muted = false;
        } else {
            reviewVideo.muted = true;
        }
    });
}
