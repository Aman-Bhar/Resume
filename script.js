document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    function showContent() {
        if (loader) {
            loader.style.opacity = '0';
         
            setTimeout(() => {
                loader.style.display = 'none';
                if (content) {
                    content.style.display = 'block';
                   
                    setTimeout(() => { 
                        initScrollReveal();
                        initTypedJs();
                        initParticles();
                    }, 100);
                }
            }, 500); 
        } else if (content) { 
             content.style.display = 'block';
             setTimeout(() => {
                initScrollReveal();
                initTypedJs();
                initParticles();
            }, 100);
        }
    }

    
    let loadTime = 1500; 
    if (window.innerWidth < 768) { 
        loadTime = 800;
    }
    setTimeout(showContent, loadTime);


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navUl.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }



    function initParticles() {
        if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#00f2ea" },
                    "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                    "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                    "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                    "line_linked": { "enable": true, "distance": 150, "color": "#9f50ff", "opacity": 0.4, "width": 1 },
                    "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                    "modes": {
                        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                        "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                        "repulse": { "distance": 100, "duration": 0.4 },
                        "push": { "particles_nb": 4 },
                        "remove": { "particles_nb": 2 }
                    }
                },
                "retina_detect": true
            });
        }
    }


    function initTypedJs() {
        if (document.getElementById('typing-text') && typeof Typed !== 'undefined') {
            new Typed('#typing-text', {
                strings: ['Developer', 'Problem Solver', 'Tech Enthusiast', 'Data Explorer', 'Creator'], // Updated strings for Aman
                typeSpeed: 70,
                backSpeed: 50,
                backDelay: 1200,
                loop: true,
                smartBackspace: true
            });
        }
    }


    
    function initScrollReveal() {
        if (typeof ScrollReveal !== 'undefined') {
            const sr = ScrollReveal({
                origin: 'bottom',
                distance: '50px', 
                duration: 800,   
                delay: 150,     
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                reset: false 
            });

            sr.reveal('#hero h1', { origin: 'top', delay: 400 });
            sr.reveal('#hero .subtitle', { origin: 'top', delay: 600 });
            sr.reveal('#hero .cta-button', { delay: 800 });

            sr.reveal('h2');
            sr.reveal('.about-text', { origin: 'left', delay: 200 });
            sr.reveal('.about-image .placeholder-image', { origin: 'right', delay: 400, distance: '70px' });

            sr.reveal('.skill-card', { interval: 100 });
            sr.reveal('.project-card', { interval: 150, viewFactor: 0.2 }); // viewFactor: item revealed when 20% visible

            sr.reveal('#contact-form input, #contact-form textarea', { interval: 100 });
            sr.reveal('#contact-form button', { delay: 300 });
            sr.reveal('.social-links a', { interval: 100, delay: 400 });
        }
    }


    // 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            if (name && email && message) {
                // Basic email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                // For demo purposes:
                alert(`Thank you for your message, ${name}! (This is a demo form)`);
                console.log({ Name: name, Email: email, Message: message }); // Log to console
                contactForm.reset();
               
            } else {
                alert('Please fill in all fields.');
            }
        });
    }


    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth scrolling for nav links ---
    document.querySelectorAll('header nav ul a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Consider header height for offset if header is fixed
                const headerOffset = document.querySelector('header')?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});