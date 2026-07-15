// 1. Header Scroll Effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// 2. Mobile Menu Toggle
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

// 3. Active Nav Link on Scroll
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

// 4. Smooth Scroll for Nav Links
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

// 5. Stats Counter Animation
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

// 6. FAQ Accordion Logic
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

// 7. WhatsApp Booking with Form Validation
const whatsappBtn = document.getElementById("whatsappBtn");
const bookingForm = document.getElementById("bookingForm");

if (whatsappBtn && bookingForm) {
    whatsappBtn.addEventListener("click", function () {
        
        // Checks if all fields are filled before opening WhatsApp
        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity(); // Shows browser warning
            return;
        }

        const name = document.getElementById('bookName').value;
        const phone = document.getElementById('bookPhone').value;
        const email = document.getElementById('bookEmail').value;
        const eventType = document.getElementById('bookEvent').value;
        const eventDate = document.getElementById('bookDate').value;
        const message = document.getElementById('bookMessage').value;

        const text = `*New Booking Inquiry*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nEvent: ${eventType}\nDate: ${eventDate}\n\nDetails: ${message}`;
        window.open("https://wa.me/8801533098828?text=" + encodeURIComponent(text), "_blank");
    });
}

// 8. Video Auto-Play on Scroll & Click to Toggle Sound
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

    // Toggle mute/unmute on click
    reviewVideo.addEventListener("click", () => {
        if (reviewVideo.muted) {
            reviewVideo.muted = false;
        } else {
            reviewVideo.muted = true;
        }
    });
}
